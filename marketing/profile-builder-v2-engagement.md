# Gadugy — Profile Builder v2: Engagement Engine + Education Layer

**Status:** Draft for founder review → then engineering handoff
**Builds on:** `marketing/post-signup-onboarding.md` (voice, tone guide, 5-step structure)
**Founder sign-off:** Jimmy and Sara

---

## 1. Channel strategy — one job per channel

Every message a family receives should have exactly one reason to exist. If a message doesn't have a distinct job, it doesn't get sent.

| Channel | Its ONE job | Outcome it produces | What it must NEVER do |
|---|---|---|---|
| **Welcome email** | Drive one click: profile setup | Parent feels chosen, knows a human reviews them, clicks "Set up your family profile" | Re-explain the product, list features, ask for anything else, mention SMS |
| **SMS** *(on hold — see verdict)* | Open a two-way human conversation at a moment that matters | Parent replies; a real relationship starts | Repeat the email, "notify," market, or nudge |
| **In-product (profile builder)** | Convert investment into identity | Parent completes sections, watches match quality rise, returns voluntarily | Guilt, fake urgency, punishing streaks |

### SMS verdict — when it earns its place

A welcome text that says "welcome!" is email with worse formatting. **Hold SMS until it has a job email structurally cannot do:**

1. **Cluster-opening moment** (recommended first use): *"Pasadena just opened 🌱 Three reviewed families are now visible to you. See who's nearby: {{link}}"* — time-sensitive, personal, and the link goes somewhere email already primed them to understand.
2. **A human conversation opener**: a text from Jimmy or Sara that expects a *reply*, not a click. SMS is the only channel where "just reply, a person reads this" is literally true in the same thread.

Until one of those exists, phone numbers are collected (optional + consent checkbox) but nothing is sent.

### Contrast examples

❌ **Bad (same job twice):**
- Email: "Welcome! Set up your profile →"
- SMS: "Welcome! Set up your profile →"

✅ **Good (distinct jobs):**
- Email: "You're in. Here's what happens on our end — and the one thing to do when you have 10 minutes."
- SMS (weeks later, cluster opens): "The Westside cluster just opened. Three families near you — want me to introduce you to the Hendricks family first? — Sara"

---

## 2. Profile Builder v2 — engagement map

**Core loop:** endowed progress → visible consequence → identity milestone → anticipation for what's next.

### The super-user ladder

| Rung | Name | Unlock condition | Celebration moment |
|---|---|---|---|
| 1 | **New family** | Intake submitted | Thank-you page + welcome email |
| 2 | **Rooted family** | Profile 100% complete | Seedling→tree animation: "Your family is rooted here 🌳" |
| 3 | **Reviewed family** | Passes manual review | Email: "You're officially a Gadugy family" + badge on profile |
| 4 | **Connected family** | First mutual match | "Your first connection — the Moreno family also said yes" |
| 5 | **Gathering family** | First meetup logged/confirmed | "You did the thing Gadugy exists for" |
| 6 | **Pillar family** | Referred family completes intake | "You just grew your own village" + founding-pillar recognition |

### Per-section engagement design

| Section | Psychological hook | Visible reward mechanic |
|---|---|---|
| **Basics** (pre-filled) | Endowed progress — starts at ~40%, "most of this is already done" | Meter jumps on confirm; instant early win |
| **Family intro** | Identity statement — "this is who we are" crystallized in words | Profile preview renders live as they type: "this is how nearby families will meet you" |
| **Values / education / faith / screens** | Investment loop — the questions that *feel* like they matter most | Match-quality indicator visibly rises per subsection: "Your matches just got meaningfully sharper" |
| **Community & privacy** | Autonomy/control — they're practicing the control they keep forever | "Your boundaries are set" confirmation; toggles respond instantly |
| **Review & finish** | Curiosity gap + anticipation — see profile as others will | Rooted-family celebration; status page shows "Review: in progress · your area opens as the cluster fills" |

### Profile strength meter (labels, honest not gamey)

- 0–40%: *Getting started*
- 40–70%: *Taking shape*
- 70–90%: *Strong profile — noticeably better matches*
- 90–100%: *Match-ready*
- 100%: *Rooted 🌳*

Rule: the meter reflects **match consequence**, not busywork. Every tick is labeled with what it improves.

### Dark-pattern guardrails (hard rules)

- No fake scarcity, countdown timers, or "spots remaining"
- No streaks; nothing decays; a quiet month costs nothing
- No guilt copy ("your profile is still incomplete!")
- Honest numbers only (2–3 days review because that's true)
- Every nudge must name the benefit to *their* family, not to Gadugy

---

## 3. Education layer — "why we ask this"

### Entry explainer (shown once at profile builder entry, ~150 words)

> **How Gadugy matching works**
>
> Most apps match on proximity and hope. Gadugy matches on what actually predicts a lasting friendship: **shared values first, then distance, then children's ages** — and a real person reviews every family before anyone appears.
>
> That's why this profile asks things a normal signup wouldn't. Your answers do two jobs at once: they shape which families we introduce you to, and they become the profile those families see. About ten minutes here is what makes the difference between "another app" and the park-day friendship that lasts a decade.
>
> You control visibility on every sensitive answer — before match, after match, or matching-only.

### Per-section "why we ask" snippets

- **Basics (name, cluster, stage, ages):** *Children's friendships stick when ages overlap by about two years — this is how we make sure the families you meet have kids who'll actually click with yours.*
- **Neighborhood cluster:** *Community that survives is local. We open neighborhoods one at a time so every family you meet is close enough for a Tuesday park day, not just a profile you admire from 40 miles away.*
- **Family intro:** *This is the first thing reviewed families read. Specific beats polished — "Saturday pancakes and creek walks" tells another family more about fit than a perfect paragraph.*
- **Values & character priorities:** *This is how we prevent mismatched friendships before they start. Families who want the same things for their kids become each other's village; families who don't, quietly never meet.*
- **Education aspirations:** *Your homeschool style shapes everything from meetup format to co-op fit. Classical, unschoolish, hybrid — there are families nearby walking the same path.*
- **Faith / worldview (optional):** *Optional because it's yours — and because honest optional answers make matching stronger, never weaker. You choose whether it's visible, matching-only, or unused.*
- **Screen-time approach:** *Few things quietly strain a new friendship like opposite screen rhythms at a playdate. A honest answer here saves awkward afternoons later.*
- **Homeschool fears/frustrations:** *This one is never shown to other families. It helps us understand what support your family needs — and it's matching-only, always.*
- **Privacy controls:** *You're practicing the control you'll always have here. Every sensitive answer can be visible before a match, only after, or used privately for matching. These defaults start cautious on purpose.*

---

## 4. Welcome email v2 — one job: the click

**Subject options:**
- A: *You're in — welcome to Gadugy 🌱*
- B: *One thing to do when you have 10 minutes*

**Preheader:** *You're on the early-access list. A real person — not an algorithm — reviews every family.*

**Body (<200 words):**

---

Hi {{first_name}},

Welcome — we're really glad you're here.

You just joined a small, growing group of values-driven LA families building something deliberate: real local village life — park days, parent friendships, kids growing up alongside families who share what matters to you.

Two things to know:

**1. A real person reviews every family.** That's how Gadugy stays parent-only and worth trusting. Expect to hear from us within 2–3 days.

**2. Your intake answers are already saved.** All that's left is shaping them into your family profile — about ten minutes, no password needed.

**[ Set up your family profile → ]** *(magic link, 7 days)*

Questions, hesitations, hopes for what you'll find here? Hit reply. We read every note.

With gratitude,
**Jimmy and Sara**
Founders, Gadugy

*P.S. Child names are never public, your exact address is never shown, and every family is reviewed by hand. Trust from the first click.*

---

---

## 5. Microcopy bank

**Progress bar:**
- "Step {{n}} of 5 · about 10 minutes total — most is already filled in"
- "Saved ✓ — pick up where you left off anytime"

**Meter unlocks:**
- 70%: "Strong profile — your matches just got meaningfully sharper"
- 100%: "Match-ready 🌳"

**Milestone moments:**
- Rooted: "Your family is rooted here 🌳 Profile complete and in the review queue."
- Reviewed: "Official: you're a Gadugy family. Welcome in."
- First match: "The {{family}} family said yes too — you're connected."
- First meetup: "You did the thing Gadugy exists for. How was it?"
- Pillar: "You just grew your own village. This community is built one family telling another — you did that."

**Empty states:**
- Intro blank: "Try: 'We're a family of ___ in ___. Our days look like ___. We'd love to meet families who ___.'"
- Values unsure: "Still figuring some of this out? Most families here are too. Choose what's true today — nothing is locked in."
- Privacy defaults: "Defaults start on the cautious side. Loosen or tighten anytime."

**Status page:**
- "Profile: complete ✓ · Review: in progress · {{cluster}} — matching opens as the cluster fills."
- Review >3 days: "Still with us — reviews are done by hand, and we won't rush the thing that keeps this community safe."

---

*Handoff: hooks, meter labels, ladder rungs, and education snippets map directly to profile-builder sections in `index.html`. Voice per `post-signup-onboarding.md`; on conflict this document wins for post-signup surfaces. SMS stays unsent until a distinct-job trigger (cluster opening or human conversation opener) is implemented.*
