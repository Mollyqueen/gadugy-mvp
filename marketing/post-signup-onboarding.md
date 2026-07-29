# Gadugy — Post-Signup Content & First-Time UX Flow

**Status:** Ready for engineering handoff
**Audience:** Families who just submitted "Request Early Access" on gadugy.com
**Deliverables:** (1) Welcome email, (2) Welcome SMS, (3) First-sign-in onboarding UX with full microcopy, (4) Tone guide
**Voice baseline:** warm, wholesome, rooted, practical — one parent writing to another (matches existing welcome-sequence voice in `marketing/email-welcome-sequence.md`).

---

## 1. Welcome Email — sent immediately after "Request Early Access" is submitted

**From:** [Founder first name] at hello@gadugy.com
**Format:** HTML-friendly, light template (warm cream background `#FAF6EF`, cocoa brown text `#4A3728`, sage accent `#7D9B76` for the CTA button). One CTA only.
**Reply-to:** hello@gadugy.com (replies are our highest-intent signal — keep this personal).

### Subject line options (A/B/C)

- **A (warm + plain):** You're in — welcome to Gadugy 🌱
- **B (action-forward):** One small step: set up your family profile
- **C (expectation-setting):** Welcome to Gadugy — here's what happens next

### Preheader

You're on the early-access list. Here's your next step, and what we'll do on our end.

### Body

---

Hi {{first_name}},

Welcome — I'm really glad you're here.

Thank you for requesting early access to Gadugy. You're joining a growing group of values-driven families across Los Angeles — from the San Fernando Valley to Pasadena, the Westside, the Conejo Valley, and Long Beach — who are looking for a real local village: parent friendships, park days, co-ops, and kids growing up alongside families who share what matters to you.

**Here's what happens next:**

1. **Set up your family profile.** We saved everything from your intake form, so this is light work — a short intro, a few preferences, and your privacy choices. It takes about 10 minutes.
2. **We review every family by hand.** Gadugy is parent-only and private, and that's protected by a real person reviewing each new family before they appear in the community. Expect to hear from us within **2–3 days**.
3. **Matching opens neighborhood by neighborhood.** When your area's cluster opens, your profile is what helps us introduce you to well-fit families nearby. The more complete it is, the better your first matches will be.

Ready when you are — no password needed:

**[ Set up your family profile → ]** (button, links to magic link: `{{magic_link_url}}`)
*This link is just for you and works for 7 days. If it expires, request a fresh one at gadugy.com.*

One small heads-up: you may also get a short welcome text from us at {{phone_number}}. It's just us saying hello — reply anytime, a real person reads it.

And if you have a question, a hesitation, or just want to tell me what you're hoping to find — hit reply. I read every note.

With gratitude,
{{founder_name}}
Founder, Gadugy

*P.S. Every family here is reviewed by a real person, child names are never public by default, and your exact address is never shown. This is a community built on trust from the first click.*

---

**Ops notes for engineering:**
- Send immediately on intake-form submission (not on magic-link click).
- Merge tags: `{{first_name}}`, `{{phone_number}}`, `{{founder_name}}`, `{{magic_link_url}}`.
- Magic link expiry: 7 days; expired-link landing page should offer one-click resend.
- UTM: append `utm_source=email&utm_medium=email&utm_campaign=onboarding&utm_content=welcome-immediate` to the CTA URL before tokenizing the magic link.

---

## 2. Welcome SMS — sent right after registration

**Send window:** within 5 minutes of intake submission, 9am–8pm PT only (queue overnight signups for 9am).
**Length:** 296 characters including placeholder.

> Hi {{first_name}}, it's {{founder_name}} from Gadugy — welcome! 🌱 You're on the early-access list. When you have 10 min, set up your family profile here: {{profile_link}}. A real person reviews every family before matching opens. Questions? Just reply — a human reads these.

*(296 chars with `{{profile_link}}` counted as-is; assume shortlink ≤23 chars post-resolution → well under 300.)*

**Notes:**
- No marketing language, no "don't miss out" urgency — this is a hello, not an ad.
- Replies route to the founder inbox (same SLA as email replies: within 24h).
- Stop/unsubscribe must work via standard carrier keywords (Twilio default handling is fine).

---

## 3. First-Sign-In Onboarding UX — after clicking the magic link

### Entry state

User clicks **"Set up your family profile"** in the welcome email → magic link authenticates → lands on the profile builder welcome screen. Intake answers (Part 1 of the intake form: name, location cluster, family stage, kids' ages, what they're hoping to find) are **pre-filled and confirmed, never re-asked cold**.

### Global UI patterns

- **Progress indicator:** persistent top bar — "Step X of 5" plus a growing plant/seedling motif (seed → sprout → seedling → young tree → tree in full leaf) in sage green. Label it honestly: *"About 10 minutes total — most of this is already filled in for you."*
- **Every screen has:** a way to skip-and-return-later ("I'll do this later" link, except Step 1), and an autosave state ("Saved ✓ — pick up where you left off anytime").
- **Back navigation** on every step; no dead ends.
- **Privacy reassurance microcopy** pinned under the progress bar on Steps 2–4: *"You control what's visible. Some answers are used only for matching and are never shown."*

### Step-by-step walkthrough

#### Screen 0 — Welcome (post-auth landing)

- **Header:** Welcome home, {{first_name}} 🌱
- **Body:** You're one of the founding families shaping this community. Let's set up your family profile — it's how nearby families will meet you, and how we'll introduce you to families who fit. We already saved your intake answers, so most of this is a quick review.
- **CTA:** Let's begin →
- **Secondary:** I'll do this later *(exits to a holding screen: "No rush — your spot is saved. We'll email you a reminder in a couple of days.")*

#### Step 1 of 5 — Your family basics *(pre-filled review)*

- **Header:** Let's confirm the basics
- **Helper text:** These came from your intake form. Fix anything that's changed — everything here can be edited later.
- **Fields (pre-filled):** parent name, LA neighborhood cluster, family stage (already homeschooling / preparing / considering), kids' age ranges, what you're hoping to find first.
- **Empty-state copy (if a field was skipped at intake):** *"Not sure yet is a perfectly good answer. Pick what's closest today — you can change it anytime."*
- **CTA:** Looks right →

#### Step 2 of 5 — Your family intro

- **Header:** Introduce your family
- **Helper text:** A few warm sentences are plenty. Nearby families will see this — write it like you'd introduce yourself at a park day.
- **Fields:** short family intro (textarea with prompt: *"Tell nearby families a little about your home, your children's ages, and the kind of community you hope to find."*), three words that describe your family culture, the kind of families you most hope to meet.
- **Empty-state copy:** *"Staring at a blank box? Try this: 'We're a family of ___ in ___. Our days look like ___. We'd love to meet families who ___.'"*
- **Privacy note under intro field:** Visible to reviewed families in your area. Children's names are never shown unless you add them yourself — we suggest first initials.
- **CTA:** Continue →

#### Step 3 of 5 — What matters to you *(values, education, faith, screens)*

- **Header:** What matters most in your home
- **Helper text:** This is the heart of good matching. Be honest, not aspirational — these answers shape which families we introduce you to.
- **Sections (collapsible, in order):** character qualities (pick up to 7), education styles, structure preference, faith/worldview (marked *Optional — always your choice*), screen-time approach.
- **Empty-state copy:** *"Still figuring some of this out? Most families here are too. Choose what's true today — nothing here is locked in."*
- **Privacy callout on the faith section:** *"You choose: visible before a mutual match, visible only after, used for matching only, or not used at all."*
- **CTA:** Continue →

#### Step 4 of 5 — Community & privacy preferences

- **Header:** How you'd like to connect
- **Helper text:** Tell us what good community looks like for you, and set your comfort levels.
- **Fields:** what you're looking for (playdates, park days, co-ops, etc.), ideal meetup frequency, preferred settings, matching preference (human-reviewed / hybrid / browse myself).
- **Privacy controls panel:** per-section visibility toggles (Show before mutual match / Show only after mutual match / Matching only, keep private) with sensible defaults pre-selected.
- **Empty-state copy:** *"Defaults are set on the cautious side. Loosen or tighten anything — you can change these whenever you like."*
- **CTA:** Almost there →

#### Step 5 of 5 — Review & finish

- **Header:** Here's your family profile
- **Helper text:** Take a look at how nearby families will see you. Anything in a **matching-only** section stays private.
- **UI:** read-only profile preview rendered exactly as another reviewed family would see it, with edit buttons per section.
- **CTA:** Finish my profile →

#### Completion celebration moment

- **Full-screen moment** (warm cream background, animated seedling → tree in sage, gentle 1.5s animation, respects `prefers-reduced-motion`).
- **Header:** Your family is part of Gadugy now 🌳
- **Body:** Your profile is complete and in the review queue. A real person — not an algorithm — reads every family before they join the community. You'll hear from us within **2–3 days**, and the moment your neighborhood's cluster opens, you'll be among the first families introduced.
- **Sub-line:** Gadugy means people banding together for the good of the community. That's what you just did.
- **Primary CTA:** Done *(→ returns to a simple "You're all set" status page showing review status)*
- **Secondary:** Know a family who belongs here? Share Gadugy → *(referral link; one family telling another is how this community grows)*
- **Confetti policy:** no generic confetti — the growing-tree motif only. Restraint is on-brand.

### Post-completion status page (persistent home for pre-matching users)

- **Header:** You're all set, {{first_name}}
- **Status card:** *"Profile: complete ✓ · Review: in progress · Your area: {{neighborhood_cluster}} — matching opens as the cluster fills."*
- **Edit link:** Update your profile anytime.
- **Empty-state (review pending >3 days):** *"Still with us — reviews are done by hand, and we won't rush the thing that keeps this community safe. Questions? Reply to your welcome email anytime."*

---

## 4. Gadugy Tone Guide — 5 rules

- **Write like one parent to another, not a brand to a user.** Warm first names, contractions, short sentences. If a sentence couldn't be said aloud at a park day, rewrite it. ("I'm really glad you're here" — yes. "We're excited to onboard you" — no.)
- **Protective, never fearful.** Safety and privacy are framed as care and craftsmanship ("a real person reviews every family"), never as warnings or threats. No red-flag language, no "bad actors," no urgency-by-anxiety.
- **Unhurried on purpose.** Gadugy is deliberately slow and careful — the copy owns that as a virtue. Never manufacture urgency; when there is real scarcity (founding cohort), state it plainly and without pressure. "No rush — your spot is saved."
- **Specific and concrete over inspirational.** Name real things: Pasadena, park days, kids' ages, 2–3 days, 10 minutes. Skip abstractions ("journey," "empower," "community-driven platform") in favor of what will actually happen next.
- **Faith-friendly and values-proud, never preachy or political.** Character, childhood, family bonds, and faith are spoken of warmly and openly — but as an invitation, never a gate. Every faith question carries "optional, always your choice," and the voice never implies one right way to raise a family.

---

*Handoff notes: all merge tags, UTM conventions, send windows, and accessibility notes (reduced-motion, SMS hours) are implementation-ready above. Voice should match `marketing/email-welcome-sequence.md`; if the two ever conflict, this document wins for post-signup surfaces.*
