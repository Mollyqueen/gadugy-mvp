-- Trigger welcome email Edge Function on each new intake submission.
-- Uses pg_net to POST the inserted row to the deployed send-welcome-email function.

create extension if not exists pg_net;

create or replace function public.send_intake_welcome_email()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url := 'https://elgexnkkszmuolebfzdz.supabase.co/functions/v1/send-welcome-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer sb_publishable_oIZXyl17mRiSQmT_amVCFA_GVxwKo7r'
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'intake_submissions',
      'record', to_jsonb(new)
    )
  );
  return new;
end;
$$;

drop trigger if exists intake_submissions_welcome_email on public.intake_submissions;

create trigger intake_submissions_welcome_email
  after insert on public.intake_submissions
  for each row
  execute function public.send_intake_welcome_email();
