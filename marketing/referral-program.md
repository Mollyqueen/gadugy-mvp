# Gadugy Referral Program: "Bring Your Village"

**One-liner:** Founding members earn 1 free month for every friend who becomes a founding member — and the friend gets 1 free month too. Because villages grow by invitation.

---

## 1. Program spec

**Name:** Bring Your Village
**Eligibility:** Active founding members ($12/mo) only. Waitlist members can see it teased as a founding-member perk ("founding members grow their village with free months") — a gentle conversion nudge.

**Reward — double-sided:**
- **Referrer:** 1 month free per referral who becomes a paying founding member.
- **Referred friend:** 1 month free applied to their first billing cycle (i.e., month 2 free, or month 1 free if billing starts at signup — pick one and keep it simple: **recommended: both sides get their next month free after the friend's first paid month**, so the reward is tied to a real, retained member).

**Caps & guardrails:**
- No cap on referrals — if someone brings 12 families, they homeschool for free for a year. At this scale, that's a feature, not a bug: $12/mo is cheap CAC for a matched, retained member.
- Rewards apply only when the referred family completes signup AND stays past their first paid month (prevents churn-and-burn).
- One referral credit per new family; first code submitted wins.
- No self-referrals / same-household referrals (honor system + a quick eyeball at review — human review is already a pillar).
- Free months stack and apply automatically to the next invoice(s).

**Why double-sided:** Gadugy's whole brand is mutuality (mutual match, both families say yes). A one-sided bounty would feel off-brand. "Both of you get a month" reads like an introduction between friends, not a kickback.

---

## 2. Tracking (scrappy, no software)

Two redundant mechanisms — cheap and human-reviewed:

**A. "How did you hear about us?" field**
- Add to the intake (for now: a line in the mailto template / future form): *"How did you hear about us? If a friend sent you, tell us their first name so we can thank them (and give you both a free month)."*
- This is the primary source of truth. Most referred people will happily name their friend.

**B. Unique first-name codes**
- Every founding member gets a personal code: their first name + "sent me" phrasing, e.g. **SARAH-VILLAGE**, **MARCUS-VILLAGE** — or simply "mention Sarah sent you."
- Keep it first-name based on purpose: it's memorable, it's human, and it reinforces that this is a person-to-person community, not a growth funnel.
- Members can share their code in texts, DMs, park-day conversations, or on the QR flyer handouts.

**Ledger:** One Google Sheet, columns: `Date | Referred family (first name + cluster) | Code used | Referrer | Friend's 1st paid month date | Referrer reward applied (month) | Friend reward applied (month) | Notes`. Founder updates it weekly during normal review rounds — 5 minutes, no tooling.

---

## 3. Launch email copy (to founding members)

> **Subject:** Bring your village (and get a free month) 🌱
>
> Hi [First name],
>
> Quick question: who's the first family that comes to mind when you think, *"they should be here"*?
>
> The one you'd text after a great park day. The one who's been circling the idea of homeschooling for a year and just needs to know their people exist.
>
> Today we're opening something simple for founding members: **Bring Your Village.**
>
> Here's how it works:
>
> - **Invite a family** you know — a friend, a neighbor, someone from your co-op or church or park day.
> - **When they join as founding members, you both get a free month.** One for you, one for them, applied automatically.
> - **There's no limit.** Bring three families, that's three free months. Bring twelve, and your village has covered your year.
>
> To make sure you both get credit, just have them mention your first name when they join (there's a "How did you hear about us?" spot at signup). Your personal code, if you'd like something shareable, is **[FIRSTNAME-VILLAGE]** — but honestly, "tell them Sarah sent you" works just as well.
>
> We built Gadugy on the belief that the best communities grow the way real ones always have: one trusted introduction at a time. You know who belongs here better than any algorithm ever will.
>
> So — who came to mind? Send them this note, forward this email, or just bring it up at the next park day.
>
> With gratitude,
> [Founder name]
> Gadugy • gadugy.com • hello@gadugy.com
>
> *P.S. Free months apply after your friend's first paid month — so the reward celebrates a family who's really here, not just passing through.*

---

## 4. Social post captions (3 variants)

### Post 1 — The heart-forward one (Instagram/Facebook, warm photo: two families at a park)

> The best homeschool communities don't grow from ads. They grow from "you have to meet my friend."
>
> Bring Your Village is live for Gadugy founding members: invite a family you love, and when they join, you *both* get a free month. No cap. No catch. Just the way villages have always grown — one trusted introduction at a time.
>
> Who's the first family that came to mind? Tag them. 🌱
>
> #LAHomeschool #HomeschoolCommunity #FindYourVillage #GadugyFamilies

### Post 2 — The practical one (story-friendly, short)

> Founding members: your next 12 months could be free. 👀
>
> Bring Your Village: every family you refer who joins Gadugy = 1 free month for you AND 1 for them. Bring 12 families, homeschool community for a year, on us.
>
> Details in your inbox — or hello@gadugy.com 🌱

### Post 3 — The values one (quote-card or plain text, works on Facebook groups where allowed)

> "It takes a village" was never supposed to be a metaphor.
>
> We built Gadugy so values-driven LA homeschool families could find their people — safely, privately, nearby. And now founding members can grow that village directly: invite a family, and you both get a free month when they join.
>
> Because the algorithm doesn't know who belongs in your village. You do.
>
> gadugy.com 🌱

---

## 5. Ops checklist (founder, ~1 hour to launch)

1. [ ] Add the "How did you hear about us?" line to the intake email template / form.
2. [ ] Create the Google Sheet ledger (columns above).
3. [ ] Assign codes to current founding members (5 min: first name + VILLAGE).
4. [ ] Send the launch email.
5. [ ] Schedule the 3 social posts over 2 weeks.
6. [ ] Weekly habit: reconcile new signups against the ledger during normal review rounds; email each referrer a personal thank-you when a reward lands ("The family you sent just joined — your next month is on us. Thank you for growing the village.").
