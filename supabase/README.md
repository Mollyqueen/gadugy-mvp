# Gadugy Supabase intake setup

This static MVP submits early access applications directly to Supabase's REST API using the public anon key. The anon key is safe to ship in frontend code **only because RLS allows inserts and blocks public reads/updates/deletes**.

## 1. Apply the intake table migration

From this repo after linking the Supabase project:

```bash
supabase link --project-ref <project-ref>
supabase db push
```

Or paste `supabase/migrations/20260724000000_create_intake_submissions.sql` into the Supabase SQL editor and run it.

## 2. Configure the static site

In `index.html`, replace these placeholders with the production project's public values:

```js
const SUPABASE_URL = 'https://YOUR_PROJECT_REF.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

Do **not** put a service-role key in `index.html`. The service-role key bypasses RLS and must stay server-only.

## 3. Verify

1. Open the site locally with `npm start`.
2. Fill the early access form.
3. Click **Submit early access interest**.
4. Confirm the page shows the in-page success message and navigates to the profile builder.
5. In Supabase Table Editor, confirm a new row appears in `public.intake_submissions` with `status = pending_review`.

## Security model

- Anonymous visitors can only `insert` intake rows.
- Anonymous visitors cannot `select`, `update`, or `delete` any intake rows.
- Authenticated/admin tooling can review and update submissions.
- Private family answers are stored in structured columns plus `profile_snapshot` for future matching/profile hydration.
