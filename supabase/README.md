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

## 4. Automatic welcome email

The static site cannot safely send email directly because email provider API keys must stay server-only. Use the included Supabase Edge Function as the server-side email sender:

```bash
supabase functions deploy send-welcome-email
supabase secrets set RESEND_API_KEY=<resend-api-key>
supabase secrets set WELCOME_EMAIL_FROM='Gadugy <hello@gadugy.com>'
supabase secrets set WELCOME_EMAIL_REPLY_TO='hello@gadugy.com'
```

Then create a Supabase Database Webhook:

1. Go to Supabase Dashboard → Database → Webhooks.
2. Create a webhook for table `public.intake_submissions`.
3. Fire it on `INSERT` only.
4. Use the Edge Function URL for `send-welcome-email` as the POST target.
5. Include the inserted row payload.

The function sends a welcome email that thanks the family, confirms the request was saved, and explains what happens next. Do not put Resend, Postmark, SendGrid, or SMTP secrets in `index.html`.

## Security model

- Anonymous visitors can only `insert` intake rows.
- Anonymous visitors cannot `select`, `update`, or `delete` any intake rows.
- Authenticated/admin tooling can review and update submissions.
- Private family answers are stored in structured columns plus `profile_snapshot` for future matching/profile hydration.
