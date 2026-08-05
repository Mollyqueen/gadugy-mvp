-- Review workflow + activity tracking foundation.

-- Review actions are recorded per family by the founders.
alter table public.intake_submissions
  add column if not exists admin_notes text;

-- Activity events: page views and heartbeats from identified families.
create table if not exists public.activity_events (
  id bigint generated always as identity primary key,
  intake_id uuid references public.intake_submissions (id) on delete cascade,
  event text not null check (event in ('page_view', 'heartbeat')),
  screen text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists activity_events_intake_idx on public.activity_events (intake_id, created_at desc);
create index if not exists activity_events_created_idx on public.activity_events (created_at desc);

alter table public.activity_events enable row level security;

-- Public may insert events only (no reads).
create policy "Public can log activity"
on public.activity_events
for insert
to anon, authenticated
with check (true);

grant insert on public.activity_events to anon, authenticated;

-- Daily rollup per family for the admin dashboard.
create or replace view public.daily_activity
with (security_invoker = false) as
select
  intake_id,
  date_trunc('day', created_at)::date as day,
  count(*) filter (where event = 'heartbeat') as minutes_active,
  count(*) filter (where event = 'page_view') as page_views,
  array_agg(distinct screen) filter (where screen is not null) as screens
from public.activity_events
group by intake_id, date_trunc('day', created_at)::date;
