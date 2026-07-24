-- Gadugy early access intake submissions.
-- Apply with: supabase db push
-- Or paste into the Supabase SQL editor for the production project.

create extension if not exists pgcrypto;

create table if not exists public.intake_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'pending_review'
    check (status in ('pending_review', 'reviewing', 'approved', 'waitlisted', 'rejected', 'archived')),

  parent_name text not null,
  email text not null,
  community_cluster text not null,
  other_city text,
  homeschool_stage text not null,
  children_age_ranges text[] not null default '{}',
  community_goals text[] not null default '{}',

  homeschool_reasons text,
  education_aspirations text[] not null default '{}',
  education_aspiration_other text,
  school_issues text,
  american_excellence text,
  family_values text[] not null default '{}',
  family_interests text,
  homeschool_fears text,
  distance_preference text,
  current_setup text,
  connection_goals text[] not null default '{}',
  connection_goal_other text,
  nontraditional_subjects text,

  price_variant integer check (price_variant between 9 and 18),
  intro text,
  referral_source text,
  referral_code text,
  consent_parent_review boolean not null default true,

  profile_snapshot jsonb not null default '{}'::jsonb,
  page_url text,
  user_agent text
);

create index if not exists intake_submissions_created_at_idx on public.intake_submissions (created_at desc);
create index if not exists intake_submissions_status_idx on public.intake_submissions (status);
create index if not exists intake_submissions_email_idx on public.intake_submissions (lower(email));
create index if not exists intake_submissions_cluster_idx on public.intake_submissions (community_cluster);

create or replace function public.set_intake_submissions_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_intake_submissions_updated_at on public.intake_submissions;
create trigger set_intake_submissions_updated_at
before update on public.intake_submissions
for each row execute function public.set_intake_submissions_updated_at();

alter table public.intake_submissions enable row level security;

-- Public visitors may submit applications with the public anon key.
-- They cannot read, update, or delete rows unless additional policies are added.
drop policy if exists "Public can create intake submissions" on public.intake_submissions;
create policy "Public can create intake submissions"
on public.intake_submissions
for insert
to anon
with check (consent_parent_review is true);

grant usage on schema public to anon;
grant insert on public.intake_submissions to anon;

grant usage on schema public to authenticated;
grant select, insert, update on public.intake_submissions to authenticated;
