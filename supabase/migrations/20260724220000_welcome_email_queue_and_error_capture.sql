-- Queue table keeps an auditable record of welcome email sends and failures.
create table if not exists public.welcome_email_queue (
  id bigint generated always as identity primary key,
  intake_id uuid,
  email text not null,
  parent_name text,
  status text not null default 'pending',
  error text,
  created_at timestamptz not null default now()
);

alter table public.welcome_email_queue enable row level security;
-- No public policies: anonymous users cannot read this audit table.

create or replace function public.send_intake_welcome_email()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
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
    insert into public.welcome_email_queue (intake_id, email, parent_name, status)
    values (new.id, new.email, new.parent_name, 'sent');
  exception when others then
    insert into public.welcome_email_queue (intake_id, email, parent_name, status, error)
    values (new.id, new.email, new.parent_name, 'failed', SQLERRM);
  end;
  return new;
end;
$$;
