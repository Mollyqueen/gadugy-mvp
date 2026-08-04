-- Server-side secret for signing profile edit tokens.
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.app_secrets (
  name text primary key,
  value text not null
);
alter table public.app_secrets enable row level security;
-- No public policies: only service role / definer functions can read.

insert into public.app_secrets (name, value)
values ('profile_edit_secret', encode(extensions.gen_random_bytes(32), 'hex'))
on conflict (name) do nothing;

-- Signed token = intake_id:expiry:hmac, base64url-encoded.
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
begin
  select value into v_secret from public.app_secrets where name = 'profile_edit_secret';
  v_expiry := extract(epoch from now() + interval '30 days')::bigint;
  v_payload := p_intake_id::text || ':' || v_expiry::text;
  v_sig := encode(extensions.hmac(v_payload, v_secret, 'sha256'), 'hex');
  return translate(encode((v_payload || ':' || v_sig)::bytea, 'base64'), '+/=', '-_');
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
  v_decoded text;
  v_id uuid;
  v_expiry bigint;
  v_sig text;
  v_expected text;
begin
  select value into v_secret from public.app_secrets where name = 'profile_edit_secret';
  v_decoded := convert_from(decode(translate(p_token, '-_', '+/'), 'base64'), 'utf8');
  v_id := split_part(v_decoded, ':', 1)::uuid;
  v_expiry := split_part(v_decoded, ':', 2)::bigint;
  v_sig := split_part(v_decoded, ':', 3);
  v_expected := encode(extensions.hmac(v_id::text || ':' || v_expiry::text, v_secret, 'sha256'), 'hex');
  if v_sig <> v_expected then
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
