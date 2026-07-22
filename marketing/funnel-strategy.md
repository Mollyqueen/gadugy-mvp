# Gadugy — Master Marketing Funnel Strategy v1

**Product:** Gadugy (gadugy.com) — a private, parent-only matching community for values-driven Los Angeles homeschool and preparing-to-homeschool families with children ages 0–9.
**Funnel objective:** Visitors → waitlist → founding members ($12/mo, locked-in founding rate for life).
**Founder constraints:** Solo founder, no ad accounts, no CRM, no email platform yet. Everything below runs on free or near-free tools.

---

## 1. Funnel Map

```
AWARENESS  →  CAPTURE  →  NURTURE  →  CONVERT  →  REFER
(stranger      (visitor     (waitlist    (founding    (member
 hears of      joins         member       member      brings
 Gadugy)       waitlist)     warms up)    at $12/mo)   2 friends)
```

### Stage 1 — Awareness

| | |
|---|---|
| **Goal** | Get Gadugy in front of values-driven LA parents of kids 0–9 who are homeschooling or considering it |
| **CTA** | "See how it works" → gadugy.com |
| **Primary metric** | Landing page sessions (with UTMs) |
| **Secondary metric** | Which cluster/content angle drives the most visits |

**Channels (in priority order):**

1. **Local homeschool Facebook groups & co-op lists** — Pasadena/Altadena, South Bay, SFV, Glendale/Burbank, Long Beach, Santa Clarita, Westside. Post as a founder, not a brand: "I'm building this because I needed it." Ask group admins before posting where required.
2. **In-person park days, co-ops, church/community groups, homeschool meetups** — bring a simple QR card. Face-to-face trust converts better than any ad for this audience.
3. **Founder-led content (weekly)** — one honest post per week on the founder's own channels (X, Instagram, or a simple Substack): the why, LA homeschool realities, what "finding your people" actually looks like. Repurpose into the newsletter.
4. **Reddit & niche forums** — r/homeschool, r/LosAngeles parenting threads, local parent Discords. Participate genuinely first; share Gadugy only when relevant.
5. **Word of mouth seeding** — personally onboard the first 20–30 families you already know or meet. Ask each: "Who's one other family you wish lived closer?"

**Not now:** paid ads. Revisit in month 4+ only if organic CAC signals look strong.

### Stage 2 — Capture

| | |
|---|---|
| **Goal** | Turn a visitor into a waitlist signup |
| **CTA** | "Join LA Early Access" (landing page intake form) |
| **Primary metric** | Waitlist signup conversion rate (signups ÷ sessions) |
| **Secondary metric** | Intake completion rate; signups by cluster |

**What runs this stage:**
- Landing page (live) with one CTA into the early-access intake form.
- **Immediate fix:** the intake currently opens a prefilled email to hello@gadugy.com — replace with a real form (Tally or the Buttondown/MailerLite signup form) so every signup auto-captures an email address into the list. A prefilled email loses everyone who doesn't hit send and gives you no list to nurture.
- Ask "How did you hear about us?" on the intake (already in the questionnaire) — this is your attribution layer until analytics mature.
- Every signup triggers the 6-email welcome sequence (see email-welcome-sequence.md).

### Stage 3 — Nurture

| | |
|---|---|
| **Goal** | Build trust and readiness so a founding-member ask feels natural |
| **CTA** | Varies per email (see sequence); one CTA per email |
| **Primary metric** | Email open rate and click rate per email |
| **Secondary metric** | Reply rate (founder reads and answers every reply — replies are the strongest warm signal) |

**What runs this stage:**
- The 6-email welcome sequence (days 0, 2, 5, 9, 14, 18).
- A light monthly newsletter after the sequence ends: one LA homeschool note, one Gadugy update, one member-facing ask. Warm, plain, founder-voiced — never a marketing blast.
- Personal founder emails to anyone who replies. At MVP scale, this is the whole game.

### Stage 4 — Convert

| | |
|---|---|
| **Goal** | Waitlist member becomes a founding member at $12/mo (founding rate locked for life) |
| **CTA** | "Become a Founding Member" → gadugy.com |
| **Primary metric** | Waitlist → founding member conversion rate |
| **Secondary metric** | Time-to-convert from signup; conversion by cluster |

**What runs this stage:**
- E5 and E6 of the welcome sequence carry the offer with soft cohort-closing urgency.
- In-product: when matches are ready, the founding membership is the door — messaging unlocks for founding members.
- Checkout via **Stripe Payment Links** ($12/mo subscription) — no code, no backend work.
- Founder hand-approves and personally welcomes every founding family. The review step is a selling point, not friction — say so in the copy.

### Stage 5 — Refer

| | |
|---|---|
| **Goal** | Every happy founding member brings 1–2 more families |
| **CTA** | "Forward this to a family you'd want nearby" |
| **Primary metric** | Referral signups per member |
| **Secondary metric** | % of new signups attributed to referral |

**What runs this stage:**
- E6 makes the referral ask explicitly.
- Simple referral mechanic: a personal link or just "reply with their name and I'll invite them personally." At MVP scale, founder-handled invites beat referral software.
- Thank-you note (personal email) for every successful referral. Recognition drives the next referral.
- Later (post-90 days): "founding families get a free month for each family that joins" — only if organic referrals stall.

---

## 2. Tool Stack (free/cheap, solo-founder operable)

| Job | Recommendation | Cost at MVP scale | Why |
|---|---|---|---|
| Email list + welcome sequence + newsletter | **Buttondown** (free to 100 subs, then ~$9/mo) — MailerLite free tier (1,000 subs) is the alternative | $0–9/mo | Plain-text-friendly (fits the warm founder voice), automation on the free/cheap tier, Markdown-native |
| Intake/signup form | **Tally** (free) embedded or linked from the landing page; pipes into the email list via Zapier free tier or manual weekly import | $0 | Replaces the prefilled-email flow; captures every signup |
| Waitlist data / light CRM | **Airtable** free tier (or a plain spreadsheet for the first 100) | $0 | Tag by cluster, stage, source, founding-member status |
| Payments | **Stripe Payment Links** | ~2.9% + 30¢/transaction | No code; founding rate locked via a dedicated "founding" price you later archive |
| Landing analytics | **Plausible** ($9/mo) or free **GoatCounter**; Vercel's built-in analytics is already available | $0–9/mo | UTM source/medium breakdown without GA complexity |
| Scheduling founder calls (optional) | Cal.com free tier | $0 | For 1:1 onboarding of the first founding families |
| QR cards for meetups | Canva free + home print / local print shop | ~$0–20 one-time | Links to a UTM-tagged URL per cluster |

**Total monthly tool cost at MVP: $0–20.**

---

## 3. UTM Naming Conventions

Consistent, lowercase, hyphen-separated. Format: `utm_source / utm_medium / utm_campaign / utm_content`.

**Rules:**
- `utm_source` = where the click came from: `facebook`, `instagram`, `substack`, `newsletter`, `qr`, `reddit`, `referral`, `email`
- `utm_medium` = the type of channel: `social`, `email`, `offline`, `community`, `referral`
- `utm_campaign` = the initiative, always dated: `la-launch-2026-07`, `founding-cohort-01`, `welcome-seq`
- `utm_content` = the specific variant/cluster: `pasadena`, `south-bay`, `sfv`, `glendale-burbank`, `long-beach`, `santa-clarita`, `westside`, `e5-offer`

**Examples:**

| Use | URL |
|---|---|
| FB group post, Pasadena | `https://gadugy.com/?utm_source=facebook&utm_medium=community&utm_campaign=la-launch-2026-07&utm_content=pasadena` |
| QR card at a South Bay park day | `https://gadugy.com/?utm_source=qr&utm_medium=offline&utm_campaign=la-launch-2026-07&utm_content=south-bay` |
| E5 founding-member CTA | `https://gadugy.com/?utm_source=email&utm_medium=email&utm_campaign=welcome-seq&utm_content=e5-offer` |
| Member referral forward | `https://gadugy.com/?utm_source=referral&utm_medium=referral&utm_campaign=founding-cohort-01` |

Keep a one-line-per-link log in the Airtable/spreadsheet so nothing gets invented twice.

---

## 4. KPI Table — Realistic MVP Targets (90 days)

| Stage | KPI | 30-day target | 60-day target | 90-day target |
|---|---|---|---|---|
| Awareness | Landing sessions | 400 | 900 | 1,600 |
| Capture | Waitlist signups (cumulative) | 60 | 150 | 280 |
| Capture | Visitor → signup rate | 12% | 15% | 18% |
| Nurture | Welcome-seq avg open rate | 55%+ | 55%+ | 55%+ |
| Nurture | E5/E6 click rate | 8%+ | 10%+ | 12%+ |
| Convert | Founding members (cumulative) | 8 | 25 | 50 |
| Convert | Waitlist → founding rate | — | 15% | 18% |
| Convert | MRR | ~$96 | ~$300 | ~$600 |
| Refer | % of new signups from referrals | 10% | 20% | 30% |

**Notes:**
- Open rates on a warm, small waitlist should run far above industry averages — if opens drop below 40%, the list source or subject lines need work, not the audience.
- 50 founding members at $12/mo = $600 MRR is deliberately modest. The 90-day goal is *proving* waitlist→paid conversion and referral motion, not maximizing revenue.
- Track weekly in one Airtable view. Fifteen minutes every Monday.

---

## 5. 90-Day Rollout Plan

### Weeks 1–2 — Plumbing & First Families

- Set up Buttondown (or MailerLite): list, sender domain authentication, the 6-email welcome sequence loaded as an automation.
- Replace the prefilled-email intake with a Tally form that feeds the list. Keep hello@gadugy.com as the reply-to.
- Add UTM-tagged links everywhere; stand up GoatCounter/Plausible.
- Set up the Airtable waitlist tracker (cluster, source, stage, status).
- Personally recruit 15–20 families you already know or meet at one local homeschool event into the waitlist. Watch them go through the emails. Fix what confuses them.
- **Gate to week 3:** welcome sequence live end-to-end; every signup gets E1 within minutes.

### Weeks 3–6 — Awareness Push & First Founding Members

- Post founder-voiced intros in 2–3 local homeschool FB groups per week, rotating clusters (one UTM link per cluster).
- Publish one founder-content post per week (Substack/IG/X) — repurpose into the newsletter.
- Attend at least two in-person homeschool/co-op events with QR cards.
- Open founding membership to the waitlist (E5/E6 do the asking; Stripe Payment Link goes live).
- Hand-approve and personally welcome every founding family; ask each for one referral.
- **Gate to week 7:** ≥25 founding members OR waitlist→paid ≥12%. If short, run founder 1:1 calls with 10 warm waitlist members to find the objection before scaling awareness.

### Weeks 7–12 — Double Down on What Worked

- Shift effort to the top-2 channels by signup-per-hour (read from UTMs + "how did you hear").
- Launch the monthly newsletter to the full list.
- Formalize the referral ask: personal founder invite per referral, thank-you note, track in Airtable.
- Test one conversion lever if conversion lags: a founding-cohort deadline ("Cohort 1 closes when we hit 50 families") or a 1:1 founder onboarding call for new members.
- Draft the month-4 decision memo: stay organic, or test a small paid channel (local newsletter sponsorships before Meta ads for this audience).
- **90-day exit criteria:** ~50 founding members, referral ≥25% of new signups, and a clear read on which 2 channels scale.

---

## 6. Standing Rules

1. **Voice:** warm, wholesome, rooted, practical. Always "values-driven families" and "local family community." Never lead with overt political language — alignment is conveyed through the matching dimensions, not slogans.
2. **Trust is the product:** every external message reinforces the five pillars — human review of every family, ID verification (never shown), no child names public by default, messaging only after mutual match, exact addresses never shown.
3. **One CTA per asset.** Every post, email, and card asks for exactly one thing.
4. **Founder replies to everything.** At this scale, the founder inbox is the highest-converting channel in the funnel.
5. **Measure weekly, change monthly.** No mid-week pivots on vibes; let each UTM channel collect enough signal.
