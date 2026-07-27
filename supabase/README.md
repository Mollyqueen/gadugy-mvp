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
3. Click **Request Early Access**.
4. Confirm the page shows the thank-you screen and tells the family to check email.
5. In Supabase Table Editor, confirm a new row appears in `public.intake_submissions` with `status = pending_review`.

## 4. Automatic welcome email (active)

The pipeline is: intake insert → Postgres trigger `intake_submissions_welcome_email` (pg_net) → `send-welcome-email` Edge Function → Resend API.

- Migration: `supabase/migrations/20260724210000_welcome_email_trigger.sql`
- Secrets (server-only, set via `supabase secrets set`): `RESEND_API_KEY`, `WELCOME_EMAIL_FROM`, `WELCOME_EMAIL_REPLY_TO`.
- **Deliverability:** while `WELCOME_EMAIL_FROM` is `onboarding@resend.dev`, Resend only delivers to the Resend account owner's email. To email real families, verify `gadugy.com` at resend.com/domains (add their DKIM/SPF DNS records), then set `WELCOME_EMAIL_FROM='Gadugy <hello@gadugy.com>'` via `supabase secrets set`.

Never put Resend, Postmark, SendGrid, or SMTP secrets in `index.html`.

## Security model

- Anonymous visitors can only `insert` intake rows.
- Anonymous visitors cannot `select`, `update`, or `delete` any intake rows.
- Authenticated/admin tooling can review and update submissions.
- Private family answers are stored in structured columns plus `profile_snapshot` for future matching/profile hydration.
