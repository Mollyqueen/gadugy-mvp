# Engineering Handoff — Gadugy MVP

## Project

**Gadugy** is a standalone MVP for values-driven Los Angeles homeschool and preparing-to-homeschool families with children ages 0–9 to find and meet nearby families based on shared morals, values, hopes for the future, family goals, education philosophy, child ages, faith/worldview preferences, technology attitudes, and location.

**Domain:** `gadugy.com`  
**Meaning:** Gadugy is a Cherokee word meaning people banding together to work for the community.

## Repo / Paths

- GitHub repo: `https://github.com/Mollyqueen/gadugy-mvp`
- Local path: `/Users/mollywang/good-soil-families-mvp`
- Current deploy target: GitHub Pages from `main` branch root
- Custom domain: `gadugy.com`
- Key file: `index.html`

## Current Deployment Status

GitHub Pages is configured and built:

- Source: `main` branch, `/` root
- CNAME: `gadugy.com`
- DNS: Namecheap PremiumDNS should point root `A` records to GitHub Pages and `www` CNAME to `Mollyqueen.github.io`
- HTTPS is pending GitHub certificate issuance. Do not change DNS while certificate is pending unless DNS is wrong.

Correct DNS records:

```txt
A @ 185.199.108.153
A @ 185.199.109.153
A @ 185.199.110.153
A @ 185.199.111.153
CNAME www Mollyqueen.github.io
```

Check GitHub Pages status:

```bash
gh api repos/Mollyqueen/gadugy-mvp/pages
```

Try enabling HTTPS once GitHub certificate exists:

```bash
gh api -X PUT repos/Mollyqueen/gadugy-mvp/pages -F https_enforced=true
```

## Current Product Decisions

- Launch geography: Los Angeles County broadly, emphasizing local communities like South Bay, Pasadena, Valley, Glendale/Burbank, Santa Clarita, Long Beach/Torrance-adjacent areas, and other homeschool pockets.
- Public positioning: “values-driven homeschool families,” not explicitly conservative on the front page.
- Core promise: “Meet local homeschool families who share your hopes for your children’s future.”
- Age range: children ages 0–9.
- Included families: already homeschooling, preparing to homeschool, seriously considering homeschooling, and values-driven families considering alternatives.
- Matching priorities:
  - Shared morals/values
  - Long-term family goals
  - Education philosophy
  - Child ages
  - Local area/community cluster
  - Faith/worldview importance
  - Technology/screen-time attitudes
  - AI vs human matching preference
- Matching mode: test strict, balanced, and open; current instinct is balanced.
- Connection model: direct messaging after mutual match.
- Trust model: manual approval + government ID likely, but timing should be tested.
- Profile visibility: medium by default, with toggles for what is visible before match, after mutual match, or only used privately for matching.
- Photos: test with early users; leaning toward photos only after manual review.
- Child details: age/interests visible, no child names by default, parent controls visibility.

## Government ID Copy To Preserve

> To keep this community safe and parent-only, every family is reviewed before joining. ID verification helps us confirm that real local parents are behind each profile. Your ID is never shown to other families.

## Current Prototype Screens

`index.html` contains a self-contained clickable prototype with six screens:

1. Landing page
2. Early access / intake start
3. Family profile builder
4. Recommended matches
5. Match detail page
6. Mutual messaging screen

## Local Commands

Run locally:

```bash
cd /Users/mollywang/good-soil-families-mvp
npm run check
npm run start
```

Preview:

```txt
http://127.0.0.1:5178/index.html
```

Commit/push changes:

```bash
cd /Users/mollywang/good-soil-families-mvp
git status
git add .
git commit -m "feat: describe change"
git push origin main
```

GitHub Pages deploys from `main` automatically.

## Recommended Engineering Next Steps

### Phase 1 — Make current static MVP production-clean

1. Keep `index.html` functional and readable.
2. Add clear “Join LA Early Access” form action or integrate with a real form provider.
3. Add analytics/tracking for CTA clicks and screen navigation.
4. Ensure mobile responsiveness for all six screens.
5. Add Open Graph/meta tags for sharing.
6. Verify `gadugy.com` HTTPS once GitHub cert is issued.

### Phase 2 — Convert prototype into a real app shell

Recommended stack:

- Next.js or Vite/React
- Supabase for auth/database
- Resend or similar for transactional email
- Stripe later for founding membership/payment tests

Core tables likely needed:

- `families`
- `parents`
- `children_age_ranges`
- `profile_answers`
- `profile_visibility_settings`
- `verification_statuses`
- `match_scores`
- `connection_requests`
- `messages`
- `reports_blocks`
- `admin_notes`

### Phase 3 — Build real MVP features

1. Auth / parent account
2. Family profile intake
3. Privacy controls
4. Manual approval admin dashboard
5. Rules-based matching engine
6. Recommended matches view
7. Limited browse mode
8. Mutual connection requests
9. Direct messaging after mutual match
10. Verification status workflow

## Product Artifacts In Repo

- `README.md`
- `brand-shortlist.md`
- `landing-page-copy.md`
- `intake-questionnaire.md`
- `mvp-spec.md`
- `validation-plan.md`
- `ENGINEERING_HANDOFF.md`

## Acceptance Criteria For Immediate Engineering Agent Work

A successful first engineering pass should:

- Keep the site live and deployable from GitHub Pages.
- Not break the existing six-screen clickable prototype.
- Preserve Gadugy branding and meaning.
- Preserve the government ID trust copy.
- Add or improve only clearly scoped functionality.
- Run `npm run check` before committing.
- Push changes to `main` or open a PR, depending on Jimmy’s preference.
