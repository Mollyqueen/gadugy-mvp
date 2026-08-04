-- Fix profile edit tokens: strip whitespace from base64 output (it breaks URLs),
-- and lock make_profile_edit_token to service_role only (it mints credentials).

create or replace function public.make_profile_edit_token(p_intake_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_secret text;
  v_expiry bigint;
  v_payload text;
  v_sig text;
  v_b64 text;
begin
  select value into v_secret from public.app_secrets where name = 'profile_edit_secret';
  v_expiry := extract(epoch from now() + interval '30 days')::bigint;
  v_payload := p_intake_id::text || ':' || v_expiry::text;
  v_sig := encode(extensions.hmac(v_payload::bytea, v_secret::bytea, 'sha256'), 'hex');
  v_b64 := replace(replace(encode((v_payload || ':' || v_sig)::bytea, 'base64'), chr(10), ''), chr(13), '');
  return translate(v_b64, '+/=', '-_');
end;
$$;

create or replace function public.verify_profile_edit_token(p_token text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_secret text;
  v_b64 text;
  v_decoded text;
  v_id uuid;
  v_expiry bigint;
  v_sig text;
  v_expected text;
begin
  select value into v_secret from public.app_secrets where name = 'profile_edit_secret';
  v_b64 := translate(p_token, '-_', '+/');
  while length(v_b64) % 4 <> 0 loop
    v_b64 := v_b64 || '=';
  end loop;
  v_decoded := convert_from(decode(v_b64, 'base64'), 'utf8');
  v_id := split_part(v_decoded, ':', 1)::uuid;
  v_expiry := split_part(v_decoded, ':', 2)::bigint;
  v_sig := split_part(v_decoded, ':', 3);
  v_expected := encode(extensions.hmac((v_id::text || ':' || v_expiry::text)::bytea, v_secret::bytea, 'sha256'), 'hex');
  if v_sig is null or v_sig <> v_expected then
    return null;
  end if;
  if v_expiry < extract(epoch from now())::bigint then
    return null;
  end if;
  return v_id;
exception when others then
  return null;
end;
$$;

-- Only service role may mint tokens; the Edge Function uses the service key.
revoke execute on function public.make_profile_edit_token(uuid) from public, anon, authenticated;
grant execute on function public.make_profile_edit_token(uuid) to service_role;

-- Verification stays callable by the Edge Function (service key); no public grant needed either.
revoke execute on function public.verify_profile_edit_token(text) from public, anon, authenticated;
grant execute on function public.verify_profile_edit_token(text) to service_role;
