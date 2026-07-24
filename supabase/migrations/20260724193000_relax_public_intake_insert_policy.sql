-- Allow public publishable keys to create intake submissions while keeping rows private.
-- Supabase's newer publishable keys can arrive through anon-style public clients,
-- but this policy intentionally covers both anon and authenticated insert paths.
-- No public SELECT/UPDATE/DELETE policy is added.

drop policy if exists "Public can create intake submissions" on public.intake_submissions;

create policy "Public can create intake submissions"
on public.intake_submissions
for insert
to anon, authenticated
with check (true);

grant usage on schema public to anon, authenticated;
grant insert on public.intake_submissions to anon, authenticated;
