# Gadugy MVP — Engineering Handoff

## Project

**Gadugy** is a local family-matching MVP for values-driven Los Angeles homeschool and preparing-to-homeschool families with children ages 0–9.

Domain: `gadugy.com`  
Repo: `https://github.com/Mollyqueen/gadugy-mvp`  
Current hosting: GitHub Pages from `main` branch root  
Local path: `/Users/mollywang/good-soil-families-mvp`

## Brand Meaning

Gadugy is a Cherokee word meaning people banding together to work for the community.

## Current State

The current MVP is a static clickable prototype in:

- `index.html`

It includes six screens:

1. Landing page
2. Early access / intake start
3. Family profile builder
4. Recommended matches
5. Match detail page
6. Mutual messaging screen

Supporting product docs:

- `README.md`
- `landing-page-copy.md`
- `intake-questionnaire.md`
- `mvp-spec.md`
- `validation-plan.md`
- `brand-shortlist.md`

## Current Deployment

GitHub Pages has been enabled and built successfully.

Namecheap DNS was changed to GitHub Pages records:

- `A @ 185.199.108.153`
- `A @ 185.199.109.153`
- `A @ 185.199.110.153`
- `A @ 185.199.111.153`
- `CNAME www Mollyqueen.github.io`

At time of handoff, public DNS was resolving correctly, but some local/browser caches may still show old Namecheap forwarding. HTTPS certificate was not available yet from GitHub Pages, so HTTPS enforcement may need to be retried later.

## Commands

Run static validation:

```bash
npm run check
```

Start local server:

```bash
npm start
```

Then open:

```txt
http://127.0.0.1:5178/index.html
```

Deploy workflow:

```bash
git add .
git commit -m "feat: describe change"
git push origin main
```

GitHub Pages should rebuild automatically.

## Product Requirements

### Positioning

Public-facing language should use:

- Values-driven families
- Homeschool and preparing-to-homeschool families
- Shared hopes for children’s future
- Local family community
- Parent friendships, playdates, co-op possibilities, learning pods, long-term local village

Avoid leading with overt political language. The audience is conservative / values-driven, but the landing page should stay warm, wholesome, rooted, and practical.

### Audience

- Los Angeles County broadly
- Emphasize South Bay, Pasadena, the Valley, Glendale/Burbank, Santa Clarita, Long Beach/Torrance-adjacent areas, and similar local communities
- Families with children ages 0–9
- Already homeschooling, preparing to homeschool, seriously considering homeschooling, or considering values-driven alternative education

### Matching Criteria

Initial matching should emphasize:

- Shared morals / values
- Long-term family goals
- Education philosophy
- Child ages
- Location / LA community cluster
- Faith/worldview importance
- Technology and screen-time attitudes
- AI vs human matching preference
- Desired community type

### Safety / Trust

Keep this copy:

> To keep this community safe and parent-only, every family is reviewed before joining. ID verification helps us confirm that real local parents are behind each profile. Your ID is never shown to other families.

Safety assumptions:

- Manual approval is important
- Government ID verification is likely, but timing should be tested
- Direct messaging opens only after mutual match
- Child names should not be visible by default
- Preferred direction: children’s ages + interests visible, no names, parent controls visibility
- Photos should be tested with early users; current leaning is photos only after manual review

### Testing Assumptions

Test matching strictness:

1. Strict: fewer, stronger matches
2. Balanced: strong matches first, broader browse second
3. Open: wider browsing with filters

Current instinct: balanced.

Test ID timing:

- Before profile approval
- Before appearing in matches
- Before messaging
- Before events

Test revenue:

- Free early access
- $49/year founding family membership
- $9–$19/month membership
- Paid messaging/connect
- Paid curated local events

## Engineering Roadmap

### Phase 0 — Static MVP polish

- Improve responsive/mobile layout
- Add real early-access CTA behavior
- Add analytics events
- Add SEO/social metadata
- Add favicon/logo assets
- Add privacy policy placeholder and community guidelines page

### Phase 1 — Validation backend

Fast path:

- Keep static frontend
- Add Tally/Typeform or custom form endpoint
- Store applications in Airtable/Supabase
- Manual approval in Airtable/Supabase
- Manual/AI-assisted matching in admin workflow

Recommended production-ish path:

- Convert to Next.js or keep static + Supabase
- Supabase tables for family profiles, applications, preferences, match suggestions, connection requests, messages
- Add auth later, after landing/intake validates

### Phase 2 — Real app MVP

- Auth
- Family profiles
- Privacy controls
- Admin review queue
- Verification status
- Matching score
- Recommended matches
- Browse filters
- Mutual connect request
- Direct messaging after mutual match
- Report/block
- Metrics dashboard

## Acceptance Criteria For Next Engineering Agent

Before marking a task complete:

1. `npm run check` passes.
2. Local preview works.
3. If deployed, GitHub Pages/custom domain is checked.
4. All copy remains aligned with warm, rooted, values-driven positioning.
5. No child-identifying details are exposed by default.
6. Commit and push changes to `main` unless instructed to use a PR branch.

