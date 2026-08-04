-- New intake fields: family culture words, core values selection, values-in-practice,
-- and free-text "other" for first-hope goals.

alter table public.intake_submissions
  add column if not exists community_goal_other text,
  add column if not exists family_culture_words text,
  add column if not exists core_values text[] not null default '{}',
  add column if not exists core_values_other text,
  add column if not exists values_in_practice text;
