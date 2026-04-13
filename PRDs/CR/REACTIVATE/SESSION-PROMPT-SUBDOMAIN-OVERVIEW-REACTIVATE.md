# Session Prompt: CR-REACTIVATE Sub-Domain Overview

## Context

I'm working on the CBM CRM implementation. Three of the four CR sub-domains have completed process definition: CR-PARTNER (PROSPECT + MANAGE), CR-MARKETING (CONTACTS + CAMPAIGNS), and CR-EVENTS (MANAGE + CONVERT). CR-REACTIVATE is the fourth and final sub-domain. This session produces the CR-REACTIVATE **Sub-Domain Overview** (Phase 4) — the upstream context document that will then drive one or more CR-REACTIVATE process documents in subsequent sessions.

Per the Document Production Process v1.7, a Sub-Domain Overview follows the four-section structure defined in the Domain Overview Activity of Phase 4, scoped to the sub-domain: Purpose, Personas, Business Processes (inventory with dependency ordering), and Data Reference. In practice, CR sub-domain overviews have also included Cross-Sub-Domain Touchpoints, Updates to Prior Documents, Open Issues, and Interview Transcript sections, consistent with the pattern established by the CR-PARTNER, CR-MARKETING, and CR-EVENTS Sub-Domain Overviews.

This session prompt supersedes the earlier CR-REACTIVATE session prompt that was written alongside the CR Domain Overview v1.0. That earlier prompt predates all CR sub-domain process definition work and is now missing important context. This prompt incorporates the inherited context from the three completed sub-domains and should be used instead.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Document Production Process at `PRDs/process/CRM-Builder-Document-Production-Process.docx` in the crmbuilder repo (Phase 4 Domain Overview Activity)
3. Read all documents uploaded with this prompt

## Sub-Domain Scope (Proposed — Refine During Interview)

**CR-REACTIVATE — Client Reactivation and Recovery**

The CR Domain Overview v1.1 establishes CR-REACTIVATE as the sub-domain responsible for re-engaging people who have previously interacted with CBM but are not currently active. The original description identified five candidate populations:

1. Former clients who may benefit from another round of mentoring
2. Incomplete applications (people who started but did not finish the application)
3. Unconverted workshop and webinar attendees
4. Past inquiries that did not progress
5. Structured referral requests to successful former clients

Two of those populations now have concrete inbound contracts established by completed sub-domain work:

* **Unconverted event attendees** flow from the Reactivation Candidates — Event Attendees saved list owned by CR-EVENTS-CONVERT. Membership is computed on read; criteria are Contact has ≥1 Event Registration at attendanceStatus = Attended, Contact is not linked to any Account at clientStatus = Applicant or further, most recent Attended Event Registration's Event.dateEnd was ≥ 180 days ago (configurable). There is no flag, no Segment record, no scheduled job, no manual handoff action — the list is purely a query result. CR-REACTIVATE-OUTREACH consumes the list.

* **Inactive marketing prospects** are inferable from Contact marketing engagement roll-up fields established by CR-MARKETING-CONTACTS and CR-MARKETING-CAMPAIGNS: lastMarketingEngagement, totalCampaignsSent, totalOpens, totalClicks, plus prospectStatus. An "inactive" definition threshold is a decision point for this session.

**In scope:**

* Identification and segmentation of reactivation candidates from all in-scope inbound populations
* Reactivation outreach execution — message composition, sending, cadence management
* Response tracking (what happens when a reactivation recipient replies, clicks through, re-registers for an event, or explicitly opts out)
* Transition logic when a reactivated Contact converts — handoff to MN-INTAKE for reactivated past clients; attribution capture for the cross-sub-domain channel effectiveness report (the "Returning Client" howDidYouHearAboutCbm value rolls up to CR-REACTIVATE per CR-MARKETING SDO Section 4.7)
* Measurement of reactivation channel effectiveness

**Out of scope:**

* Event creation, registration, attendance recording → owned by CR-EVENTS-MANAGE
* Broad marketing campaign execution → owned by CR-MARKETING-CAMPAIGNS (CR-REACTIVATE may execute sends through different mechanisms)
* Application handoff mechanics → owned by MN-INTAKE v2.4 pending (v2.3 plus the Account.applicantSince update pending carry-forward from CR-EVENTS-CONVERT)
* Cross-sub-domain channel effectiveness report definition → owned by CR Domain Reconciliation (Phase 5); CR-REACTIVATE contributes attribution data

## Key Inputs Established Upstream

The completed sub-domains provide a substantial amount of relevant context. The most important items:

**From CR-EVENTS-CONVERT v1.0 (the handoff contract):**

* Reactivation Candidates — Event Attendees saved list specification as described above
* Conversion-push architectural pattern as reference architecture: a non-Campaign, activity-stream-recorded outreach channel with a single supporting Contact field (lastConversionPushSentAt) rather than Campaign records or a dedicated engagement-tracking entity. This pattern is directly relevant to the analogous decision CR-REACTIVATE must make for its own outreach channel
* Layered authority policy honored throughout: Point 1 attribution at Contact creation takes precedence over Point 2 application self-report
* Three new fields in the data model that CR-REACTIVATE will reference: Contact.lastConversionPushSentAt (carry-forward to Contact Entity PRD v1.4), Account.applicantSince (carry-forward to Account Entity PRD v1.4), Event Registration.postEventFollowUpSentAt

**From CR-MARKETING-CONTACTS v1.0 and CR-MARKETING-CAMPAIGNS v1.0:**

* Segment entity (still a deferred Phase 2b Entity PRD) is the CR-MARKETING segmentation primitive. Whether CR-REACTIVATE uses Segment records, a saved-list query model like CR-EVENTS-CONVERT, or a new CR-REACTIVATE-specific grouping mechanism is a decision point
* Campaign entity is owned exclusively by CR-MARKETING-CAMPAIGNS with Client Recruiter as sole operator and channel enum Email/SMS. Whether CR-REACTIVATE sends create Campaign records or use a distinct mechanism mirrors the decision made in CR-EVENTS-CONVERT Question 4
* Four Contact roll-up fields (lastMarketingEngagement, totalCampaignsSent, totalOpens, totalClicks) plus prospectStatus give CR-REACTIVATE the substrate for defining an "inactive marketing prospect" population
* Compliance is Client Recruiter discipline (no automatic sync gate), the pattern CR-REACTIVATE should be expected to follow
* emailOptOut and smsOptOut honored for all marketing communications

**From CR-MARKETING SDO v1.2 Section 4.7 (layered authority policy):**

* howDidYouHearAboutCbm enum includes "Returning Client" which rolls up to CR-REACTIVATE
* Point 1 writes at Contact creation; Point 2 writes only if blank; Point 3 allows Client Admin override with audit-trail preservation

**From MN-INTAKE v2.3 (v2.4 pending):**

* Application handoff mechanics. Account.applicantSince will be system-populated when clientStatus transitions to Applicant (pending carry-forward). CR-REACTIVATE uses this for conversion detection when a reactivation recipient submits an application
* Existing-Contact detection on email match — the MN-INTAKE REQ-010 pathway ensures that a reactivated past client who submits an application updates their existing Contact rather than creating a duplicate

## Key Questions to Address

The interview should address the following, in rough order:

1. **Sub-domain purpose and tier.** The CR Domain Overview currently designates CR-REACTIVATE as Important tier. Is that still the right designation in light of what we now know about CBM's operational reality? What is the realistic near-term volume of reactivation outreach at CBM?

2. **Inbound population scope.** Which of the five candidate populations is actually in scope for v1.0? Unconverted event attendees and inactive marketing prospects have concrete inbound contracts already; former clients, incomplete applications, past inquiries, and referral-to-former-clients are less defined. Each population added expands the sub-domain's operational surface area.

3. **Personas.** Client Recruiter (MST-PER-007) is the committed primary operator. Supporting personas?

4. **Process inventory and dependency ordering.** One unified CR-REACTIVATE-OUTREACH process, or multiple processes? The earlier session prompt assumed one; with two now-concrete inbound populations each with distinct data substrates, the decision should be reconsidered. If multiple, what are the boundaries — by population type, by activity phase (identification vs outreach vs response handling), or by something else?

5. **Segmentation model.** Does CR-REACTIVATE use Segment records from CR-MARKETING-CONTACTS, saved-list queries like CR-EVENTS-CONVERT uses for its Unconverted Event Attendees list, or a distinct mechanism? The choice between Segment (a stored record) and saved-list query (computed on read) is the same architectural decision CR-EVENTS-CONVERT made — with different tradeoffs since reactivation segments may be more durable than ad-hoc conversion-push lists.

6. **Outreach execution mechanism.** Does CR-REACTIVATE use Campaign records (requiring scope expansion to CR-MARKETING-CAMPAIGNS to share ownership, or an explicit subtype distinction) or a distinct mechanism like the conversion-push pattern from CR-EVENTS-CONVERT? The decision shapes what engagement tracking is available (Campaign Engagement provides opens/clicks/bounces; conversion-push-pattern provides only a send timestamp).

7. **Cadence and frequency management.** Is there a system-enforced minimum gap between reactivation touches to the same Contact? A maximum attempt count before the Contact is considered permanently unreachable? How does this interact with CR-MARKETING campaigns that may also touch the same Contact?

8. **Response tracking.** When a reactivation recipient engages (clicks through, replies, re-registers for an event, submits an application), how is the outcome captured? Does the Contact exit the reactivation population automatically on certain events (e.g., submitted an application → MN-INTAKE takes over)?

9. **Terminal states.** When is a Contact considered permanently unreachable? This may tie to emailOptOut, a maximum attempt count, explicit staff judgment, or time-based expiration.

10. **Entities used and new fields.** Which existing entities does CR-REACTIVATE use, and what new fields are needed? Candidates include Contact fields (reactivationAttempts, lastReactivationAttempt, reactivationOutcome) or a dedicated Reactivation Outreach entity. The decision is downstream of the outreach-execution-mechanism decision in Question 6.

11. **Reporting.** What reports does CR-REACTIVATE own — per-campaign effectiveness, per-population effectiveness, per-Client-Recruiter activity, re-conversion rate? How do they sit relative to CR-MARKETING campaign reports and the cross-sub-domain channel effectiveness report Phase 5 will define?

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Domain-Overview-ClientRecruiting.docx** — the parent CR Domain Overview (from `PRDs/CR/`)
2. **CBM-SubDomain-Overview-Partner.docx** — the CR-PARTNER Sub-Domain Overview (from `PRDs/CR/PARTNER/`) — for SDO structural consistency
3. **CBM-SubDomain-Overview-Marketing.docx** — the CR-MARKETING Sub-Domain Overview (from `PRDs/CR/MARKETING/`) — for layered authority policy, marketing engagement tracking, and Returning Client attribution
4. **CBM-SubDomain-Overview-Events.docx** — the CR-EVENTS Sub-Domain Overview (from `PRDs/CR/EVENTS/`)
5. **CR-MARKETING-CONTACTS.docx** — for the Segment entity model and segmentation patterns (from `PRDs/CR/MARKETING/`)
6. **CR-MARKETING-CAMPAIGNS.docx** — for the Campaign / Campaign Group / Campaign Engagement model as reference (from `PRDs/CR/MARKETING/`)
7. **CR-EVENTS-CONVERT.docx** — for the Reactivation Candidates handoff contract and the conversion-push pattern as reference architecture (from `PRDs/CR/EVENTS/`)
8. **CBM-Master-PRD.docx** — for Universal Contact-Creation Rules and persona definitions (from `PRDs/`)
9. **CBM-Entity-Inventory.docx** — for the resolved entity list (from `PRDs/`)
10. **Contact-Entity-PRD.docx** — for Contact fields (from `PRDs/entities/`)
11. **Account-Entity-PRD.docx** — for Account fields (from `PRDs/entities/`)
12. **Engagement-Entity-PRD.docx** — for Engagement fields (former-client identification via closed Engagements) (from `PRDs/entities/`)

## Output

Produce the CR-REACTIVATE Sub-Domain Overview as a Word document and commit to:
`PRDs/CR/REACTIVATE/CBM-SubDomain-Overview-Reactivate.docx`

Also produce one or more session prompts for the subsequent CR-REACTIVATE process document(s), matching the decision made in Question 4 about process inventory. Commit session prompts to `PRDs/CR/REACTIVATE/`.

## After This Session

* The CR-REACTIVATE Sub-Domain Overview will enable subsequent CR-REACTIVATE process document(s), for which session prompts will be produced alongside the SDO.
* Once all CR-REACTIVATE process documents are complete, all four CR sub-domains will have finished Phase 4 process definition. CR Domain Reconciliation (Phase 5) becomes eligible.
* Six Phase 2b Entity PRDs remain eligible: Marketing Campaign, Campaign Group, Campaign Engagement, Segment, Event, Event Registration. Any new CR-REACTIVATE entities surfaced during this SDO session would be added to the eligible list.
* Four carry-forward updates remain pending from CR-EVENTS work and will be applied in dedicated update sessions or batched with CR Domain Reconciliation: Contact Entity PRD v1.3 → v1.4 (presenterBio, presenterTopics, lastConversionPushSentAt), Account Entity PRD v1.3 → v1.4 (applicantSince), MN-INTAKE v2.3 → v2.4 (extend REQ-011 to populate applicantSince), CR Domain Overview v1.1 → v1.2 (add CR-EVENTS-ISS-001 to Section 4.7 open issues table). CR-REACTIVATE work may surface additional carry-forward updates to these or other documents.
