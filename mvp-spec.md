# Gadugy — Real Web App MVP Spec v1

## Goal

Build a real web app MVP behind a landing page/intake flow that helps values-driven LA homeschool and preparing-to-homeschool families with children ages 0–9 find compatible nearby families and message after mutual match.

## Core Promise

Meet local homeschool families who share your hopes for your children’s future.

## Users

### Parent user
A parent/guardian representing a family profile.

### Admin user
Reviews applications, manages verification status, reviews flagged profiles/messages, and can inspect matching quality.

## MVP Modules

### 1. Landing page
- Public marketing page
- Early access CTA
- Explains curated matching, privacy, ID verification, and LA launch

### 2. Auth
- Email/password or magic link
- Phone verification recommended
- Parent account only

### 3. Family profile
Fields:
- Parent name/display name
- General LA area/community cluster
- Children age ranges: 0–2, 3–4, 5–7, 8–9
- Homeschool stage
- Family intro
- Desired community types
- Morals/values priorities
- Long-term family goals
- Education philosophy
- Faith/worldview and importance
- Technology/screen-time attitudes
- AI vs human matching preference
- Dealbreakers/private fit notes

### 4. Privacy controls
For each sensitive section:
- Visible before mutual match
- Visible only after mutual match
- Use for matching only, keep private

Sensitive sections:
- Faith/worldview details
- Long-form family goals
- Dealbreakers
- Technology philosophy details
- Photos, if any
- More exact location

### 5. Application/manual approval
Statuses:
- Draft profile
- Submitted
- Needs more info
- Approved
- Rejected
- Suspended

Admin can:
- Review profile
- Request edits
- Approve/reject
- Add internal notes
- Mark verification status

### 6. ID verification status
MVP can store status without integrating full vendor immediately.

Statuses:
- Not requested
- Requested
- Submitted
- Verified
- Failed
- Exempt/manual

Recommended testing:
- Test timing with early users: before profile approval vs before appearing in matches vs before messaging.

Copy to use:
> To keep this community safe and parent-only, every family is reviewed before joining. ID verification helps us confirm that real local parents are behind each profile. Your ID is never shown to other families.

### 7. Matching engine
Initial matching can be rules-based and transparent.

Core weighted dimensions:
- Location/community cluster proximity
- Child age overlap
- Homeschool stage compatibility
- Desired community type overlap
- Shared morals/values
- Long-term family goal overlap
- Education philosophy compatibility
- Faith/worldview preference compatibility
- Technology/screen-time attitude compatibility
- AI/human matching preference
- Dealbreaker conflicts

Output:
- Compatibility label: Strong Fit / Possible Fit / Low Fit
- Alignment highlights
- Possible friction notes hidden from other families but available to admin

### 8. Recommended matches
Parent sees a small set of suggested families:
- Family display name
- General area
- Child age ranges
- Homeschool stage
- Shared alignment highlights
- Compatibility explanation
- Request to connect button

### 9. Browse mode
Because matching strictness should be tested, support limited browsing with filters:
- Area
- Child age range
- Homeschool stage
- Community type
- Education philosophy
- Broad values tags

Browse visibility should obey profile privacy controls.

### 10. Mutual connect
Flow:
1. Family A requests to connect with Family B
2. Family B sees profile preview and compatibility highlights
3. Family B accepts or declines
4. If accepted, direct messaging opens

Statuses:
- None
- Requested
- Accepted
- Declined
- Blocked

### 11. Messaging
- Text-only MVP
- Only after mutual match
- Report/block controls
- Safety reminder before exchanging personal info or meeting

### 12. Admin dashboard
Admin needs:
- Applications queue
- Family profiles
- Verification statuses
- Match suggestions preview
- Reported users/messages
- Metrics dashboard

## Metrics

Track:
- Landing page visits
- Early access signups
- Intake completion rate
- Application approval rate
- ID verification willingness
- Matching preference: AI / human / hybrid / browse
- Match request rate
- Mutual match rate
- Message start rate
- Self-reported meetup rate
- Willingness to pay signals

## MVP Testing Toggles

### Matching strictness
Test:
- Strict: fewer, stronger matches
- Balanced: strong matches first plus broader nearby families
- Open: wider browsing with filters

### Verification timing
Test:
- Before profile approval
- Before appearing in matches
- Before direct messaging
- Before attending events

### Matching mode
Test:
- Recommended only
- Browse only
- Hybrid recommended + browse
- Concierge/human-reviewed matching

### Revenue model
Test:
- Free early access
- $49/year founding family
- $9–$19/month membership
- Paid messaging/connect
- Paid local events/curated meetups

## Phase 1 Build Recommendation

Before full app:
- Brand/domain decision
- Landing page
- Intake form
- Airtable/Supabase backend
- Manual approval
- Manual/AI-assisted matching
- Email introductions or prototype dashboard

## Phase 2 Build Recommendation

Real web app:
- Auth
- Profiles
- Privacy controls
- Matching score
- Recommendations
- Browse
- Connect requests
- Messaging
- Admin dashboard
