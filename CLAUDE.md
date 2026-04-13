# CLAUDE.md — Cleveland Business Mentors CRM Implementation

This file provides guidance for Claude when working on the Cleveland
Business Mentors CRM implementation.

**Note on this repo's local directory name.** The GitHub repo is
`dbower44022/ClevelandBusinessMentoring` (long form). Doug's local clone
is at `~/Dropbox/Projects/ClevelandBusinessMentors/` — the short form,
ending in `Mentors`. When a session prompt or instruction refers to a
local path on Doug's machine, use the short name. A previous two-
directory split was reconciled on 04-10-26; only the short-named clone
now exists locally.

## First — Read the Process Guide

Before doing any work in this repository, read the Document Production
Process section in the CRM Builder CLAUDE.md:

```
https://github.com/dbower44022/crmbuilder/blob/main/CLAUDE.md
```

The full process specification is:

```
https://github.com/dbower44022/crmbuilder/blob/main/PRDs/application/CRM-Builder-Document-Production-Process.docx
```

That document defines the required sequence for producing all CRM
implementation documents. Following it is mandatory. Do not skip steps
or produce documents out of sequence.

---

## This Repository

This is the **Cleveland Business Mentors (CBM)** client implementation
repository. It contains all PRD documents, YAML program files, and
generated documentation for the CBM CRM implementation.

CBM is a nonprofit organization providing free business mentoring and
education to entrepreneurs, small businesses, and nonprofits in
Northeast Ohio.

---

## Current Implementation State

**Process status: All MR domain work complete. CR-PARTNER sub-domain process definition finished (both process documents v1.0). CR-MARKETING sub-domain process definition finished (both process documents v1.0). CR-EVENTS Sub-Domain Overview v1.0 complete. CR-EVENTS-MANAGE process document v1.0 complete (04-13-26). Current versions of upstream documents: Master PRD v2.5, Contact Entity PRD v1.3, Account Entity PRD v1.3, MN-INTAKE v2.3, CR Domain Overview v1.1, Entity Inventory v1.4, CR-MARKETING SDO v1.2, CR-EVENTS SDO v1.0, CR-EVENTS-MANAGE v1.0. Six deferred Phase 2b Entity PRDs: Marketing Campaign, Campaign Group, Campaign Engagement, Segment, Event, Event Registration. Two carry-forward updates pending from CR-EVENTS SDO: Contact Entity PRD v1.3 → v1.4 (add presenterBio and presenterTopics; update Section 5.7 narrative) and CR Domain Overview v1.1 → v1.2 (add CR-EVENTS-ISS-001 to Section 4.7 open issues table). Next: CR-EVENTS-CONVERT process definition (Phase 4).**

**Process validation pilot (04-13-26):** The MR domain is the
subject of a methodology pilot running Phases 9 → 11 → 12 → 13
(YAML Generation → Deployment → Configuration → Verification) to
validate that the document production methodology actually produces a
deployable CRM. Pilot scope, decisions, and findings are logged in
`PRDs/pilot/PILOT-FINDINGS.md`.

**Phase 9 complete (04-13-26).** Four artifacts produced and
committed to `programs/MR/`: `MR-Dues.yaml` (Dues entity, 7 custom
fields, one Contact-Dues relationship), `MR-Contact.yaml` (42
Contact custom fields across 12 panels), `EXCEPTIONS.md` (5
exceptions — all on Contact enum value lists and two field-name
reconciliations between the Mentor Recruitment Domain PRD v1.0 and
the Contact Entity PRD v1.3), and `MANUAL-CONFIG.md` (38 items
across 10 categories for post-deployment hand-off to Phase 12).
Three methodology findings added to `PILOT-FINDINGS.md`: Finding 4
(YAML schema v1.0 cannot express several commonly-required CRM
constructs), Finding 5 (unresolved open issues on required fields
blocked clean Phase 9 execution), and Finding 6
(`howDidYouHearAboutCbm` scope change has downstream impact outside
the MR domain). Finding 2 status updated from "Confirmed — must be
formalized" to "Confirmed — Phase 9 Interview Guide authored and
exercised." Finding 3 (legacy programs archive) marked Resolved.

**Follow-up documents pending from MR Phase 9.** Contact Entity PRD
v1.3 → v1.4 (adopt 8-value `howDidYouHearAboutCbm` list; enumerate
`mentoringFocusAreas`, `skillsExpertiseTags`, and `fluentLanguages`
option lists; rename `skillsAndExpertiseTags` to
`skillsExpertiseTags`). CR-MARKETING Sub-Domain Overview v1.2 → v1.3
(revise channel-rollup design for the collapsed 8-value list).
Account Entity PRD v1.3 → v1.4 (enumerate the 20 NAICS sectors on
`industrySector`). Mentor Recruitment Domain PRD v1.0 → v1.1
(rename two fields; resolve CON-ISS-005 through CON-ISS-008 with
values supplied in the Phase 9 conversation).

**Next step in the pilot:** Phase 11 (CRM Deployment) — provision an
instance of the target CRM. Outside Claude.ai. After Phase 11, Phase
12 applies the YAML and works through `MANUAL-CONFIG.md`.

Three earlier methodology decisions recorded during the Phase 9
Interview Guide authoring session on 04-13-26: (1) Cross-Domain
Service PRDs deliberately skipped for MR (Finding 1); (2) Manual
Configuration List formalized as a Phase 9 output (Finding 2); (3)
legacy `programs/` directory archived before Phase 9 conversation
(Finding 3, Resolved). The Phase 9 Interview Guide
(`crmbuilder/PRDs/process/interviews/guide-yaml-generation.md`, v1.0)
was authored during the same session that ran Phase 9 for MR.

The Mentoring (MN) domain has five completed process documents and a
reconciled Domain PRD produced under the new document production
process. Entity Discovery has been completed retroactively, producing
the Entity Inventory. Five Entity PRDs (Contact, Account, Engagement,
Session, Dues) are complete — all MN-domain and MR-domain entities
are now fully defined.

The Mentor Recruitment (MR) domain has completed Phase 5 domain
reconciliation. All five process documents and the reconciled MR Domain
PRD are finished. Two reconciliation decisions were made: reactivation
is available from both Resigned and Departed status (MR-RECON-DEC-001),
and applicationDeclineReason uses a reconciled 7-value enum
(MR-RECON-DEC-002). SME Request entity was removed from process scope.

### Mentoring Domain Process Documents (new process)

| Document | File | Version |
|---|---|---|
| Client Intake | `PRDs/MN/MN-INTAKE.docx` | v2.3 |
| Mentor Matching | `PRDs/MN/MN-MATCH.docx` | v2.2 |
| Engagement Management | `PRDs/MN/MN-ENGAGE.docx` | v2.3 |
| Activity Monitoring | `PRDs/MN/MN-INACTIVE.docx` | v1.2 |
| Engagement Closure | `PRDs/MN/MN-CLOSE.docx` | v1.1 |

**Latest structural change (04-13-26):** CR-EVENTS-MANAGE process document v1.0 complete. First of two CR-EVENTS process documents. Defines the full event lifecycle from Event creation at Draft status through attendance recording at Completed status. Content and Event Administrator (MST-PER-009) is the sole operator; Partner Coordinator (MST-PER-008) participates only through out-of-band coordination. 54 system requirements (REQ-001 through REQ-054). 48 data items (DAT-001 through DAT-048): 18 read-only references across Contact (13) and Account (5); 30 created or updated items across Event (15 fields), Event Registration (11 fields — including six new ones), and Contact (update pathways for contactType append, howDidYouHearAboutCbm, sourceAttributionDetails, and standard form fields under update-only-if-blank). Six new Event Registration fields introduced by this process: specialRequests, confirmationSentAt, remindersSent, lastCommunicationBouncedAt, cancellationDate, cancellationReason. Key decisions: all Event status transitions are fully manual (no system-driven transitions at dateStart or dateEnd); online self-cancellation removed entirely (all cancellations are staff-initiated); Draft requires only name, format, dateStart, while Scheduled requires the full field set including at least one presenter; format-specific reminder schedule (In-Person seven-day and one-day, Virtual one-day and one-hour, Hybrid all three); transactional event communications ignore Contact.emailOptOut (the transactional-versus-marketing distinction is intentional); registration blocked when dateEnd has passed regardless of Event status; dedicated Add Walk-In action on Event detail view with email optional; presenter contactType auto-appended on first linkage and preserved on unlink; coSponsoringPartners picker does not filter by partnerStatus (all values selectable); Event.documents is staff-only with participant-facing materials distributed via email attachments; seven operational reports fully defined. One new open issue: CR-EVENTS-MANAGE-ISS-001 (virtual attendance import tooling deferred). One carry-forward open issue referenced: CR-MARKETING-ISS-004 (hard-bounce threshold). No updates to prior documents triggered by this session. Session prompt for CR-EVENTS-CONVERT updated with carry-forward context reflecting the manual-transitions decision and the emailOptOut framing question.

**Prior structural change (04-13-26):** CR-EVENTS Sub-Domain Overview v1.0 complete. Third of four CR Sub-Domain Overviews. Establishes the Workshops and Event Management sub-domain (Important tier) containing two processes in dependency order: CR-EVENTS-MANAGE (Event Lifecycle Management) and CR-EVENTS-CONVERT (Post-Event Follow-Up and Conversion). Content and Event Administrator (MST-PER-009) is the primary operator across both processes; Partner Coordinator (MST-PER-008) supports through out-of-band coordination only (no system notification on co-sponsorship linkage); Client Administrator (MST-PER-003) is the MN-INTAKE handoff persona; Client (MST-PER-013) is the target. Client Recruiter (MST-PER-007) takes ownership after the CR-REACTIVATE handoff. Key decisions: single-record Event model for all three formats (In-Person, Virtual, Hybrid — Hybrid aspirational); 6-value Event status lifecycle (Draft / Scheduled / In Progress / Completed / Cancelled / Postponed); 10-value Event topic enum; no capacity enforcement and no waitlist (venueCapacity is informational only); CRM-hosted registration forms with hardcoded contactType = Client and update-only-if-blank on email match; Point 1 source attribution (howDidYouHearAboutCbm = Workshop or Event) at new-Contact creation; walk-in registration path for in-person events; self-cancellation via link in confirmation email; binary attendance (Attended / No-Show) with judgment on partial attendance; all presenters are Contact records (no free-text external presenter field, no role distinction, no compensation tracking); Event.coSponsoringPartners link-multiple only with no co-sponsorship-specific fields; recording and LMS publishing out of scope; event feedback surveys deferred to future Survey Service (new open issue CR-EVENTS-ISS-001); conversion detection via Contact → Event Registration → application chain with configurable window (default 180 days); seven operational metrics; five effectiveness reporting dimensions (per event, by topic, by format, by partner co-sponsorship, by geography — geography dependent on CR-MARKETING-ISS-001); cross-sub-domain channel effectiveness comparison governed at CR Domain Reconciliation, not in CR-EVENTS. Two Contact entity field additions: presenterBio (wysiwyg) and presenterTopics (multiEnum aligned with Event.topic). No new entities (Event and Event Registration already present in Entity Inventory v1.4 with type and owning domain resolved). Two carry-forward updates pending: Contact Entity PRD v1.3 → v1.4 (add two presenter fields; update Section 5.7 narrative) and CR Domain Overview v1.1 → v1.2 (add CR-EVENTS-ISS-001 to open issues table). Session prompts for both CR-EVENTS process documents committed alongside the SDO.

**Prior structural change (04-10-26):** CR-MARKETING-CAMPAIGNS process document v1.0 complete. Second and final process document in the CR-MARKETING sub-domain. Defines campaign execution and tracking covering the full campaign lifecycle from placeholder creation through engagement tracking and channel effectiveness reporting. Client Recruiter (MST-PER-007) sole operator; Partner Coordinator (MST-PER-008) supporting out-of-band only. 21 system requirements (REQ-001 through REQ-021). 59 data items (DAT-001 through DAT-059): 22 read-only references across Contact (13), Account (3), Segment (5), and one reference value list; 37 created/updated items across Campaign (15 fields), Campaign Group (4 fields), Campaign Engagement (12 fields), and Contact (6 fields). Three new custom entities fully specified for the first time: Campaign (one record per outbound send, 15 fields, five-value status lifecycle: Draft, Scheduled, Sent, Complete, Cancelled), Campaign Group (lightweight organizational container, 4 fields, no independent status), Campaign Engagement (per-Contact-per-Campaign engagement tracking, 12 fields including sent/opened/clicked/bounced/unsubscribed with timestamps). Dual-mode operation throughout: fully manual when marketing platform integration is limited, fully automatic when deeply connected, or any combination. externalCampaignId links CRM Campaign to marketing platform counterpart. Six Campaign aggregate metrics (totalRecipients, totalSent, totalOpened, totalClicked, totalBounced, totalUnsubscribed) workflow-updated from Campaign Engagement records. Four Contact roll-up fields (lastMarketingEngagement, totalCampaignsSent, totalOpens, totalClicks) always system-calculated. Campaign tracking parameters enable Point 1 source attribution (howDidYouHearAboutCbm = Email Marketing) at web inquiry form submission. Compliance is Client Recruiter discipline (no automatic sync gate). Three campaign-specific reports: Campaign Performance Report, Campaign Group Rollup Report, Channel Effectiveness Report. Recipient-level view from Campaign record. No new open issues. No updates to prior documents. CR-MARKETING sub-domain process definition is now complete.

**Prior structural change (04-09-26):** CR-MARKETING-CONTACTS process document v1.0 complete. First process document in the CR-MARKETING sub-domain. Defines marketing contact management as a continuous activity composed of nine activity areas: web inquiry form handling, marketing list import, single-record manual entry, multi-contact-per-company detection, prospect contact lifecycle management, data hygiene, segmentation, sync preparation, and reporting and pipeline visibility. Client Recruiter (MST-PER-007) sole operator. 60 system requirements (REQ-001 through REQ-060). 52 data items (DAT-001 through DAT-052): 22 read-only references across Contact, Account, and three reference enum value lists; 30 created/updated items across Contact (13 fields), Account (8 items), and the new Segment custom entity (9 items). Segment is a new custom entity owned by CR with two types (Dynamic and Static) per REQ-041; it will be added to the Entity Inventory (v1.3 → v1.4) and will receive a deferred Phase 2b Entity PRD alongside Marketing Campaign, Campaign Group, and Campaign Engagement. 4 open issues: ISS-001 (prospectStatus values, inherited from CR-MARKETING-ISS-003), ISS-002 (clientStatus values, inherited from CR-MARKETING-ISS-004), ISS-003 (geographic segmentation, inherited from CR-MARKETING-ISS-001), ISS-004 (hard-bounce threshold, newly surfaced, depends on marketing platform selection). Two carry-forward updates applied (04-09-26): Entity Inventory v1.3 → v1.4 (Segment added) and CR-MARKETING SDO v1.1 → v1.2 (Segment in deferred Entity PRDs list, Depends On updated). Key design decisions: silent web-inquiry creation (Option D); update-only-if-blank on email-match (Option C); four-stage import wizard; informational-not-blocking multi-contact-per-company detection; relaxed email requirement for manual entry only; manual prospectStatus transitions with no time-based auto-transitions; two first-class segment types (Dynamic and Static); four-step pre-flight sync preparation.

**Prior structural change (04-09-26):** Account precedence ladder simplified from three steps to two across the document set. The exact-company-name-match step has been removed from the ladder everywhere it appears. The new ladder is: (1) website domain match — automatic linking when the normalized website domain matches an existing Account's native website field; (2) manual or new — if no website match, the system creates a new Account with no name-based or fuzzy-match suggestions during creation. The Client Recruiter handles any resulting duplicate Accounts via routine data hygiene using the CRM's native search and list tools. Reasoning: automatically linking a Contact to the wrong company is a confidentiality and data-integrity risk that outweighs the cleanup cost of occasional duplicate Accounts — two unrelated firms can legitimately share a name, and the system cannot distinguish them without the website signal. Three documents bumped: (1) CR-MARKETING Sub-Domain Overview v1.0 → v1.1: Section 4.3 intro and ladder table restructured, Section 4.4 Rule 5 ladder phrase shortened with Mentor example clarified, Section 8 Interview Transcript editor's note appended after the original Decision callout (callout itself preserved verbatim), Depends On list refreshed to current versions (Master PRD v2.5, Entity Inventory v1.3, Contact Entity PRD v1.3, Account Entity PRD v1.3). (2) Master PRD v2.4 → v2.5: Universal Contact-Creation Rules summary Rule 5 bullet ladder phrase shortened with clarifying sentence noting the website is the only signal trusted for automatic linking. (3) Account Entity PRD v1.2 → v1.3: Section 7 Implementation Notes ladder narrative replaced; ACT-DEC-011 decision record rewritten to describe the two-step ladder explicitly; both reference upstream CR-MARKETING Sub-Domain Overview v1.1.

**Prior structural change (04-08-26):** CR-MARKETING Sub-Domain Overview v1.0
complete plus all six carry-forward updates applied. (1) Sub-Domain Overview
establishes the prospect contact lifecycle model (prospects ARE Contact records;
two-field lifecycle: Contact.prospectStatus for marketing-funnel state and
Account.clientStatus for client-relationship state); the Universal Contact-
Creation Rules (5 rules applying CRM-wide to every Contact-creation pathway);
marketing platform integration (strict one-way CRM → platform sync with three
narrow exceptions: opt-outs, per-recipient engagement history, Campaign
aggregate metrics); SMS in scope as a delivery channel alongside email, with
per-channel opt-out flags (emailOptOut, smsOptOut); Campaign tracking model
(Campaign = single send, optional Campaign Group for coordinated efforts,
Pattern D hybrid origination where CRM owns metadata and planning while
marketing platform owns content); 10-value howDidYouHearAboutCbm enum finalized
with sub-domain rollup mapping for channel effectiveness reporting; layered
authority policy for source attribution writes. (2) Master PRD v2.3 → v2.4:
Section 5.4 added referencing the Universal Contact-Creation Rules as a
CRM-wide principle. (3) Contact Entity PRD v1.2 → v1.3: Section 3.5 Marketing
and Source Attribution Fields added with 8 new fields (prospectStatus,
sourceAttributionDetails, emailOptOut, smsOptOut, lastMarketingEngagement,
totalCampaignsSent, totalOpens, totalClicks); howDidYouHearAboutCbm enum
finalized as 10 values; CON-ISS-001 (client lifecycle field) and CON-ISS-008
(howDidYouHearAboutCbm values) closed; 5 new decisions CON-DEC-010 through
CON-DEC-014. (4) Account Entity PRD v1.1 → v1.2: clientStatus field added to
Section 3.2 Client-Specific Fields with TBD value list pending CBM leadership;
native website field documented as primary matching signal in Section 7
Implementation Notes; ACT-ISS-001 closed; ACT-ISS-004 marked as superseded in
scope by CR-MARKETING-ISS-001; 3 new decisions ACT-DEC-009 through ACT-DEC-011.
(5) MN-INTAKE v2.2 → v2.3: four new requirements REQ-010 through REQ-013
specify the prospect-to-applicant handoff (prospect Contact lookup by email,
Account.clientStatus transition, Contact.prospectStatus transition, layered
authority policy for howDidYouHearAboutCbm writes); MN-INTAKE-ISS-002 closed;
Section 10 Updates to Prior Documents gains carry-forward subsection. (6) CR
Domain Overview v1.0 → v1.1: Depends On list updated to reference new upstream
versions; Section 4.7 Open Issues Carried Forward updated with CON-ISS-001,
CON-ISS-008, ACT-ISS-001 closures and ACT-ISS-004 supersession note; Section 5
Updates to Prior Documents expanded with 5 new carry-forward entries. (7)
Entity Inventory v1.2 → v1.3: 3 new entities added (Marketing Campaign,
Campaign Group, Campaign Engagement — all custom Base, CR-owned); Section 4
Custom Entity Summary gains sub-sections 4.9, 4.10, 4.11; Section 5 Cross-
Domain Entity Matrix gains 3 new rows; entity counts updated from 13 (2
native, 8 custom, 3 TBD) to 16 (2 native, 11 custom, 3 TBD); EI-ISS-004 and
EI-ISS-007 closed. 4 new open issues created by the Sub-Domain Overview:
CR-MARKETING-ISS-001 (geographic targeting model, deferred to stakeholder
input); CR-MARKETING-ISS-002 (media and PR tracking model, deferred to
stakeholder input); CR-MARKETING-ISS-003 (prospectStatus value list, TBD
CBM leadership); CR-MARKETING-ISS-004 (clientStatus value list, TBD CBM
leadership). Session prompts committed for both CR-MARKETING process
definitions.

**Prior structural change (04-07-26):** Four pending document updates from CR-PARTNER
work all completed. (1) CR-PARTNER Sub-Domain Overview v1.0 → v1.1: analytics metric
list expanded from 7 to 8 categories adding mentor count (total + new) in Sections 3.3,
4.5, 4.6; transcript Decision callout retains v1.0 wording with editor note flagging
the v1.1 supersession. (2) Account Entity PRD v1.0 → v1.1: partnerStatus description
softened from "should always be accompanied by a note" to "may be accompanied by a
note at the Partner Coordinator's discretion" per CR-PARTNER-MANAGE-REQ-013;
funderStatus has no parallel language and required no change. (3) Contact Entity
PRD v1.1 → v1.2: CON-ISS-002 closed in three locations (Section 3.x Partner contact
type, Section 5.5 Partner dynamic logic note, Section 9 Open Issues table marked
CLOSED in place); partner lifecycle is tracked at Account level via partnerStatus,
no Partner-specific lifecycle field needed on Contact; hedge retained for non-
lifecycle Partner fields that may emerge during remaining CR domain process work.
(4) Engagement Entity PRD v1.0 → v1.1: referringPartner link field added in new
Section 3.7 Referral Attribution functional group; Contributing Domains expanded to
include CR; entity overview prose softened from "single-domain custom entity owned
exclusively by Mentoring (MN)" to "primarily owned"; Section 4 relationships table
gains Referring Partner → Engagement row; Section 6 Layout Guidance gains Referral
Attribution Panel; Section 7 Implementation Note 9 documents the dual write path
(mentor primary, Partner Coordinator exception). Engagement entity now has 20 custom
fields across 7 functional groups (was 19 across 6).

**Prior structural change (04-07-26):** CR-PARTNER-MANAGE process document v1.0
complete. 18 system requirements (REQ-001 through REQ-018). 49 data items across
7 entities: Engagement (8 fields including referringPartner read), Session (4
fields), Contact (4 fields for mentor affiliation reads + 7 fields for partner
contact creates/updates), Event (TBD pending CR-EVENTS), Marketing (TBD pending
CR-MARKETING), Partnership Agreement (6 fields read + 6 fields for renewals),
Account (3 read + 8 update fields including PDF report attachment). Partner
Coordinator is sole operator; three supporting personas (Content and Event
Administrator, Client Recruiter, Mentor Recruiter) coordinate externally only,
not listed as participating personas. Process structured as 10 ongoing activity
areas (4.1–4.10), not a sequential workflow — no fixed cadence, all timing
exercised by Partner Coordinator judgment. All status transitions purely
judgment-based (no system rules, no stale-partner notifications). Notes on
status changes at Partner Coordinator discretion (REQ-013 negative requirement).
Quarterly analytics report production is hybrid (system aggregations + manual
PDF composition); attached to partner Account on delivery. Renewal notifications
email-only at 60 and 30 days before Expiration / Renewal Date. Inactive →
Active direct reactivation supported alongside Inactive → Prospect (latter
owned by CR-PARTNER-PROSPECT). 3 new open issues: ISS-001 NPS scores depend
on Survey Service / ENG-ISS-004; ISS-002 impact metrics depend on ENG-ISS-003;
ISS-003 marketing entity structure pending CR-MARKETING. 2 new updates to
prior documents: CR-PARTNER Sub-Domain Overview metric list expansion to
8 categories adding mentor count (total + new); Account Entity PRD partnerStatus
description softening to make notes-on-transitions explicitly discretionary.

**Prior structural change (04-06-26):** CR-PARTNER-PROSPECT process document v1.0
complete. 9 system requirements (REQ-001 through REQ-009). 23 data items across 3
entities: Account (11 fields), Contact (6 fields), Partnership Agreement (6 fields).
Partner Coordinator is sole operator. No open issues. No new updates to prior
documents. Workflow: 9 steps from prospect identification through activation. Three
end states: Active (normal), Inactive (not pursued), Waiting (remain Prospect).
All Account Partner fields matched Entity PRD exactly. Partnership Agreement fields
matched Sub-Domain Overview anticipated fields.

### CR-PARTNER Process Documents (Phase 5)

| Document | File | Version |
|---|---|---|
| Partner Prospecting and Activation | `PRDs/CR/PARTNER/CR-PARTNER-PROSPECT.docx` | v1.0 |
| Partner Relationship Management | `PRDs/CR/PARTNER/CR-PARTNER-MANAGE.docx` | v1.0 |

**Remaining CR-PARTNER work:** None. Both processes complete. Sub-domain
process definition is finished. Sub-Domain PRD reconciliation deferred until
all CR sub-domains complete process definition.

**Remaining MN work:** Client Satisfaction Tracking (MN-SURVEY) process
document, workflow diagrams for all processes.

### Mentor Recruitment Domain Process Documents (new process)

| Document | File | Version |
|---|---|---|
| Mentor Recruitment | `PRDs/MR/MR-RECRUIT.docx` | v1.0 |
| Mentor Application | `PRDs/MR/MR-APPLY.docx` | v1.1 |
| Mentor Onboarding | `PRDs/MR/MR-ONBOARD.docx` | v1.0 |
| Mentor Management | `PRDs/MR/MR-MANAGE.docx` | v1.0 |
| Mentor Departure | `PRDs/MR/MR-DEPART.docx` | v1.0 |

**Remaining MR work:** None. All MR domain deliverables complete.

### Entity Inventory (Phase 2a)

| Document | File | Version |
|---|---|---|
| Entity Inventory | `PRDs/CBM-Entity-Inventory.docx` | v1.4 |

Maps 28 business entity concepts to 17 CRM entities (2 native, 12 custom, 3 TBD).
Key design decisions: Contact uses multiEnum contactType (Client, Mentor,
Partner, Administrator, Presenter, Donor, Member); Account uses multiEnum
accountType (Client, Partner, Donor/Sponsor); Contribution consolidates
Donation, Sponsorship, Grant, and Pledge with an enum contributionType
discriminator; Dues is a single-domain Custom Base entity for MR. Prospect
is tracked as a lifecycle state on Contact (not as a contactType value) —
client prospects use Contact.prospectStatus (added v1.3 by CR-MARKETING
SDO), mentor prospects use the existing mentorStatus. CR-MARKETING SDO v1.0
added three new custom entities owned by CR: Marketing Campaign, Campaign
Group, and Campaign Engagement (all Custom Base, deferred to Phase 2b
Entity PRDs). 8 open issues documented (6 currently open; EI-ISS-004 and
EI-ISS-007 closed by CR-MARKETING SDO).

### Entity PRDs (Phase 2b)

| Document | File | Version |
|---|---|---|
| Contact Entity PRD | `PRDs/entities/Contact-Entity-PRD.docx` | v1.3 |
| Account Entity PRD | `PRDs/entities/Account-Entity-PRD.docx` | v1.3 |
| Engagement Entity PRD | `PRDs/entities/Engagement-Entity-PRD.docx` | v1.1 |
| Session Entity PRD | `PRDs/entities/Session-Entity-PRD.docx` | v1.0 |
| Dues Entity PRD | `PRDs/entities/Dues-Entity-PRD.docx` | v1.0 |

Contact is the most complex entity — native Person type, spans all four
domains, 7 contactType values (multiEnum). 16 native fields documented,
47 custom fields (6 shared, 1 CBM internal, 32 Mentor-specific, 8
Marketing and Source Attribution fields added by CR-MARKETING SDO v1.0).
10 relationships. Dynamic logic visibility rules by contactType. 6 open
issues (2 donor/FU lifecycle deferrals, 3 TBD value lists, 1 incomplete
domain coverage) — CON-ISS-001 closed by prospectStatus; CON-ISS-008
closed by the 10-value howDidYouHearAboutCbm enum finalization. Key
decisions: Primary Contact moved to Account-Contact relationship;
personalEmail/cbmEmailAddress as separate custom fields;
termsAndConditionsAccepted shared for portal readiness; boardPosition
visible for CBM internal types only; prospectStatus tracks marketing-
funnel state on Contact paired with Account.clientStatus; per-channel
opt-out flags (emailOptOut, smsOptOut); marketing engagement roll-up
fields workflow-updated from Campaign Engagement records.

Account is the second cross-domain shared entity — native Company type,
spans MN, CR, FU domains, 3 accountType values (multiEnum). 19 native
fields documented, 22 custom fields (3 shared, 6 Client-specific
including clientStatus added by CR-MARKETING SDO v1.0, 9 Partner-
specific, 4 Donor/Sponsor-specific). 8 relationships including
Primary Contact bool on Contact-Account middle table. 3 open issues
(incomplete domain coverage, NAICS subsector values TBD, geographic
service area format TBD — the latter superseded in scope by
CR-MARKETING-ISS-001). ACT-ISS-001 closed by the clientStatus field.
Key decisions: assignedLiaison as separate Contact link;
parentOrganization shared across all types; type-specific wysiwyg
notes fields with role-based security; primaryFunderContact dropped
in favor of relationship-level Primary Contact; clientStatus tracks
client-relationship state at the Account level (paired with
Contact.prospectStatus for marketing-funnel state); native website
field is the primary signal for prospect-Contact-to-Account matching
under the Universal Contact-Creation Rules.

Engagement is primarily a Mentoring (MN) domain entity — Custom Base
type — with one field contributed by Client Recruiting (CR). 2 native
fields (name auto-generated, description hidden), 20 custom fields
across 7 functional groups (lifecycle, mentoring context, notes, session
roll-up analytics, closure, outcomes, referral attribution). 7
relationships (4 to Contact, 1 to Account for client organization, 1
to Session, 1 to Account for referring partner). Status-driven dynamic
logic (no discriminator). 4 open issues (Mentoring Focus Areas values
TBD, Close Reason values TBD, additional outcome metrics TBD, survey
response tracking deferred). Key decisions: name auto-generated as
{Client}-{Mentor}-{Year}; session roll-ups are workflow-updated stored
fields; no Client Satisfaction Rating; On-Hold is a status value.
referringPartner field (added v1.1) records partner referral
attribution for partner-level analytics; primary write path is the
assigned mentor after the first session, with an exception write path
for the Partner Coordinator (correction, missed attribution).

Session is a single-domain custom entity — Custom Event type, owned
exclusively by the Mentoring (MN) domain. 10 native fields (name
auto-generated as {Engagement Name} — {Session Date}, dateStart,
dateEnd calculated, duration, status with 7 custom values, parent
link to Engagement, description, createdAt, modifiedAt, assignedUser).
8 custom fields across 3 functional groups (session details, notes
and follow-up, rescheduling). 4 relationships (Engagement via native
parent, 2 manyToMany to Contact for attendees, self-referential
rescheduling link). Value-based dynamic logic (no discriminator). 1
open issue (Topics Covered values TBD). Key decisions: native Event
fields used for dateStart/duration/status; dateEnd calculated;
session summary includes notes when populated with no toggle; two
separate attendee relationships; native parent for Engagement link.

Dues is a single-domain custom entity — Custom Base type, owned
exclusively by the Mentor Recruitment (MR) domain. 4 native fields
(name auto-generated as {Mentor Name} — {Billing Year}, createdAt,
modifiedAt, assignedUser). 7 custom fields across 3 functional
groups (billing, payment, notes). 1 relationship (Contact via
manyToOne). Value-based dynamic logic (paymentStatus drives
paymentDate and paymentMethod visibility). No open issues — all 5
carrying-forward issues from MR-MANAGE resolved. Key decisions:
Custom Base type; anniversary-based billing cycle with
duesRenewalDate on Contact; uniform dues amount; 30-day grace
period; no consequences for non-payment; all Active mentors pay;
paymentMethod "Waived" removed (dynamic logic hides instead).

**Next Entity PRDs:** Remaining entities outside MN and MR domains
(Partnership Agreement, Event, Event Registration, Contribution,
Fundraising Campaign). These depend on CR and FU domain process
documents, which have not yet been completed.

### Mentoring Domain PRD (Phase 5)

| Document | File | Version |
|---|---|---|
| Mentoring Domain PRD | `PRDs/MN/CBM-Domain-PRD-Mentoring.docx` | v1.0 |

### Mentor Recruitment Domain PRD (Phase 5)

| Document | File | Version |
|---|---|---|
| Mentor Recruitment Domain PRD | `PRDs/MR/CBM-Domain-PRD-MentorRecruitment.docx` | v1.0 |

Reconciled from 5 process documents. 2 reconciliation decisions
(Resigned reactivation, 7-value applicationDeclineReason). 31 total
decisions, 13 open issues. ~45 Contact fields, 8 Dues fields, 3
referenced entities from other domains. SME Request entity excluded.

### Cross-Domain Services (Phase 4)

| Document | File | Version |
|---|---|---|
| Notes Service | `PRDs/services/NOTES/NOTES-MANAGE.docx` | v1.0 |

Notes Service defines a general-purpose note stream for all domains.
7 requirements, 6 supported entity types (Contact, Account, Engagement,
Session, Event, Fundraising Campaign). Notes are timestamped, attributed,
editable with edit history, and permanent (no deletion). Access follows
parent record — no per-note visibility restrictions. Internal
administrator notes remain as dedicated fields in domain process
documents. MN-ENGAGE Session Notes and Engagement Notes remain as inline
wysiwyg fields unchanged. Closes MR-MANAGE-ISS-003.

**Remaining services:** Email Service, Calendar Service, Survey Service.

### Client Recruiting Domain Overview (Phase 3)

| Document | File | Version |
|---|---|---|
| CR Domain Overview | `PRDs/CR/CBM-Domain-Overview-ClientRecruiting.docx` | v1.1 |

Defines 7 processes across 4 sub-domains: CR-PARTNER (CR-PARTNER-PROSPECT,
CR-PARTNER-MANAGE), CR-MARKETING (CR-MARKETING-CONTACTS,
CR-MARKETING-CAMPAIGNS), CR-EVENTS (CR-EVENTS-MANAGE, CR-EVENTS-CONVERT),
CR-REACTIVATE (CR-REACTIVATE-OUTREACH). 7 personas including MST-PER-013
(Client) — added to Master PRD v2.3 CR persona list.
Production order: CR-PARTNER first (Core tier), then CR-MARKETING, then
CR-EVENTS, then CR-REACTIVATE last (receives from all other sub-domains).
Cross-sub-domain handoffs mapped. Shared audience strategy defined (channel
effectiveness comparison, outreach coordination, gap targeting). No new
open issues — all relevant issues carried forward from upstream documents
(CON-ISS-001, CON-ISS-002, CON-ISS-004, CON-ISS-008, ACT-ISS-001,
ACT-ISS-002, ACT-ISS-004).

Session prompts committed for all 4 Sub-Domain Overview sessions:
- `PRDs/CR/PARTNER/SESSION-PROMPT-SUBDOMAIN-OVERVIEW-PARTNER.md`
- `PRDs/CR/MARKETING/SESSION-PROMPT-SUBDOMAIN-OVERVIEW-MARKETING.md`
- `PRDs/CR/EVENTS/SESSION-PROMPT-SUBDOMAIN-OVERVIEW-EVENTS.md`
- `PRDs/CR/REACTIVATE/SESSION-PROMPT-SUBDOMAIN-OVERVIEW-REACTIVATE.md`

### CR-PARTNER Sub-Domain Overview (Phase 3)

| Document | File | Version |
|---|---|---|
| CR-PARTNER Sub-Domain Overview | `PRDs/CR/PARTNER/CBM-SubDomain-Overview-Partner.docx` | v1.1 |

Scopes the CR-PARTNER sub-domain for process definition. 2 processes
(CR-PARTNER-PROSPECT, CR-PARTNER-MANAGE) in dependency order. 4 personas
with process participation mapped. 10 Account Partner-specific fields
validated (no changes). No Partner-specific Contact fields needed —
CON-ISS-002 resolved (partner lifecycle tracked at Account level).
Partnership Agreement anticipated fields confirmed (6 fields). New
referringPartner link field identified for Engagement entity (set by
mentor after first session, basis for partner analytics). Quarterly
formal partner analytics reports with 8 metrics (per v1.1 update):
referral count, active clients, new clients in last 30 days, total
sessions, total hours, NPS scores, impact metrics, and mentor count
(total affiliated and new this period). Two referral tracking
mechanisms: client self-reported howDidYouHearAboutCbm on Contact,
mentor-set referringPartner on Engagement.

Updates applied (v1.1, 04-07-26): mentor count metric added per
CR-PARTNER-MANAGE session. Carry-forward updates also complete:
Contact Entity PRD CON-ISS-002 closed (v1.2); Engagement Entity PRD
referringPartner field added (v1.1).

Session prompts committed for both CR-PARTNER process definitions:
- `PRDs/CR/PARTNER/SESSION-PROMPT-CR-PARTNER-PROSPECT.md`
- `PRDs/CR/PARTNER/SESSION-PROMPT-CR-PARTNER-MANAGE.md`

### CR-MARKETING Sub-Domain Overview (Phase 3)

| Document | File | Version |
|---|---|---|
| CR-MARKETING Sub-Domain Overview | `PRDs/CR/MARKETING/CBM-SubDomain-Overview-Marketing.docx` | v1.2 |

Scopes the CR-MARKETING sub-domain for process definition. 2 processes
(CR-MARKETING-CONTACTS, CR-MARKETING-CAMPAIGNS) in dependency order.
3 personas (Client Recruiter primary; Partner Coordinator supporting;
Client as audience). Major architectural decisions locked:

- **Prospect contact lifecycle model.** Prospects ARE Contact records
  in the CRM. Two-field model: Contact.prospectStatus tracks the
  marketing-funnel state of an individual person; Account.clientStatus
  tracks the client-relationship state of a company. The two fields
  answer different questions and cannot drift. Handoff at MN-INTAKE:
  when a prospect applies, Account.clientStatus moves Prospect →
  Applicant and Contact.prospectStatus moves to Converted.
- **Universal Contact-Creation Rules.** Five rules apply CRM-wide
  to every Contact-creation pathway across all domains. Optional
  company fields on every form; hardcoded contactType per form;
  CSV import contactType assignment; type-specific creation logic;
  contactType-agnostic Account matching via website → manual/new
  precedence ladder (exact-name-match step removed in 04-09-26 scope
  change; see latest structural change entry above).
- **Marketing platform integration.** Strict one-way CRM → marketing
  platform sync with three narrow exceptions: opt-out signals, per-
  recipient engagement history, and Campaign aggregate metrics. SMS
  is in scope as a delivery channel (brings TCPA compliance alongside
  CAN-SPAM). Per-channel opt-out flags (emailOptOut, smsOptOut).
  Hybrid sync triggers: scheduled + manual on-demand outbound,
  near-real-time inbound for opt-outs.
- **Campaign tracking model.** A Campaign is a single outbound send;
  optional Campaign Group entity supports coordinated multi-touch
  efforts. Hybrid Pattern D origination: CRM owns metadata and
  planning; marketing platform owns content. Per-Contact-per-Campaign
  Campaign Engagement records + aggregate roll-up fields on Contact.
- **Application source attribution.** 10-value howDidYouHearAboutCbm
  enum finalized (closes CON-ISS-008), mapped to CR sub-domains for
  channel effectiveness rollup. Two-field design: structured enum
  for reporting plus free-text sourceAttributionDetails for
  supplementary detail. Layered authority policy for writes.

4 deferred Phase 2b Entity PRDs: Marketing Campaign, Campaign Group,
Campaign Engagement (all surfaced by SDO v1.0), and Segment (surfaced
by CR-MARKETING-CONTACTS v1.0). All custom Base, owned by CR. Session
prompts committed for both process definitions at
`PRDs/CR/MARKETING/SESSION-PROMPT-CR-MARKETING-CONTACTS.md`
and `PRDs/CR/MARKETING/SESSION-PROMPT-CR-MARKETING-CAMPAIGNS.md`.

4 new open issues: CR-MARKETING-ISS-001 (geographic targeting model,
stakeholder input needed); CR-MARKETING-ISS-002 (media and PR tracking
model, stakeholder input needed); CR-MARKETING-ISS-003 (prospectStatus
value list, CBM leadership input needed); CR-MARKETING-ISS-004
(clientStatus value list, CBM leadership input needed). ACT-ISS-004
(geographic service area format) superseded in scope by
CR-MARKETING-ISS-001.

All six carry-forward updates to upstream documents are complete:
Master PRD v2.4 (Section 5.4 Universal Contact-Creation Rules);
Contact Entity PRD v1.3 (Section 3.5 Marketing and Source Attribution
Fields, finalized howDidYouHearAboutCbm enum, closes CON-ISS-001 and
CON-ISS-008); Account Entity PRD v1.2 (clientStatus field, website
implementation note, closes ACT-ISS-001); MN-INTAKE v2.3 (four new
requirements REQ-010 through REQ-013 for prospect-to-applicant
handoff, closes MN-INTAKE-ISS-002); CR Domain Overview v1.1 (open
issues table updates and carry-forward tracking); Entity Inventory
v1.3 (three new CR-MARKETING entities added, closes EI-ISS-004 and
EI-ISS-007).

### CR-MARKETING Process Documents (Phase 5)

| Document | File | Version |
|---|---|---|
| Marketing Contact Management | `PRDs/CR/MARKETING/CR-MARKETING-CONTACTS.docx` | v1.0 |
| Campaign Execution and Tracking | `PRDs/CR/MARKETING/CR-MARKETING-CAMPAIGNS.docx` | v1.0 |

CR-MARKETING-CONTACTS v1.0 complete. 60 system requirements, 52 data
items across Contact, Account, and Segment entities. Continuous
activity-area structure with nine activity areas. Client Recruiter
sole operator. Segment entity introduced as a new custom entity
(Dynamic and Static types per REQ-041). Carry-forward updates applied
(04-09-26): Entity Inventory v1.4 (Segment added) and CR-MARKETING
SDO v1.2 (Segment in deferred Entity PRDs list, Depends On updated).

CR-MARKETING-CAMPAIGNS v1.0 complete. 21 system requirements, 59 data
items across Campaign, Campaign Group, Campaign Engagement, Contact,
Account, and Segment entities. Three new custom entities fully specified:
Campaign (15 fields), Campaign Group (4 fields), Campaign Engagement
(12 fields). Five-value Campaign status lifecycle with dual-mode
operation. No new open issues. No updates to prior documents.

**Remaining CR-MARKETING work:** None. Both processes complete. Sub-domain
process definition is finished. Sub-Domain PRD reconciliation deferred
until all CR sub-domains complete process definition.

### Existing Documents (produced under old process)

| Document | File | Notes |
|---|---|---|
| Master PRD | `PRDs/CBM-Master-PRD.docx` | Word, v2.5 |
| Mentoring Domain PRD | `PRDs/CBM-Domain-PRD-Mentoring.md` | Markdown, v1.0 — superseded by Word version at PRDs/MN/CBM-Domain-PRD-Mentoring.docx |
| Mentor Recruitment Domain PRD | `PRDs/CBM-Domain-PRD-MentorRecruitment.md` | Markdown, v1.0 — superseded by Word version at PRDs/MR/CBM-Domain-PRD-MentorRecruitment.docx |
| Client Recruiting Domain PRD | `PRDs/CBM-Domain-PRD-ClientRecruiting.md` | Markdown, v1.0 — legacy source material, superseded by CR Domain Overview |
| Fundraising Domain PRD | `PRDs/CBM-Domain-PRD-Fundraising.md` | Markdown, v1.0 — summary-level data, needs enrichment |
| Consolidated Design | `PRDs/CBM-Consolidated-Design.md` | Markdown, v2.0 — eliminated as separate document in new process |

### Legacy Documents

All documents from prior iterations are in `PRDs/Archive/`. These are
source material only — never reference them as current requirements.

### Next Steps

- CR Sub-Domain Overviews (Phase 3) — remaining: CR-EVENTS, CR-REACTIVATE; CR-EVENTS is next
- CR Process Definition (Phase 5) — remaining: CR-EVENTS-MANAGE → CR-EVENTS-CONVERT → CR-REACTIVATE-OUTREACH
- Stakeholder input needed to resolve CR-MARKETING-ISS-001 (geographic targeting model) and CR-MARKETING-ISS-002 (media and PR tracking model) before those aspects of CR-MARKETING-CONTACTS and CR-MARKETING-CAMPAIGNS can be fully specified
- CBM leadership input needed for CR-MARKETING-ISS-003 (prospectStatus value list) and CR-MARKETING-ISS-004 (clientStatus value list)
- Produce Partnership Agreement Entity PRD (Phase 2b) — both CR-PARTNER process documents now complete, dependency satisfied
- Produce Marketing Campaign, Campaign Group, Campaign Engagement, and Segment Entity PRDs (Phase 2b) — all four dependencies now satisfied (Marketing Campaign, Campaign Group, and Campaign Engagement depend on CR-MARKETING-CAMPAIGNS v1.0; Segment depends on CR-MARKETING-CONTACTS v1.0)
- Remaining Cross-Domain Services (Phase 4): Email Service, Calendar Service, Survey Service
- Produce remaining Entity PRDs (Phase 2b) — Event, Event Registration, Contribution depend on further CR/FU process documents
- Define Client Satisfaction Tracking (MN-SURVEY) process document
- Create workflow diagrams for all MN and MR processes
- Begin FU (Fundraising) domain process documents (Phase 5)

---

## Key Business Domains

| Code | Domain |
|---|---|
| MN | Mentoring |
| MR | Mentor Recruitment |
| CR | Client Recruiting |
| CR-PARTNER | Client Recruiting — Partner Relationship Management (sub-domain) |
| CR-MARKETING | Client Recruiting — Outreach and Marketing (sub-domain) |
| CR-EVENTS | Client Recruiting — Workshops and Event Management (sub-domain) |
| CR-REACTIVATE | Client Recruiting — Client Reactivation and Recovery (sub-domain) |
| FU | Fundraising |

---

## Target Repository Structure (new process)

```
PRDs/
├── CBM-Master-PRD.docx            ← Master PRD (Word)
├── CBM-Entity-Inventory.docx      ← Entity Inventory (Phase 2a)
├── entities/                      ← Entity PRDs (Phase 2b, one per CRM entity)
│   └── ...
├── MN/
│   ├── MN-INTAKE.docx             ← Process document
│   ├── MN-MATCH.docx
│   ├── MN-ENGAGE.docx
│   ├── MN-INACTIVE.docx
│   ├── MN-CLOSE.docx
│   ├── MN-SURVEY.docx
│   └── CBM-Domain-PRD-Mentoring.docx  ← Reconciled Domain PRD
├── MR/
│   └── ...
├── CR/
│   ├── CBM-Domain-Overview-ClientRecruiting.docx
│   ├── CBM-Domain-PRD-ClientRecruiting.docx
│   ├── PARTNER/
│   │   ├── CBM-SubDomain-Overview-Partner.docx
│   │   ├── CR-PARTNER-*.docx          ← Process documents
│   │   └── CBM-SubDomain-PRD-Partner.docx
│   ├── MARKETING/
│   │   ├── CBM-SubDomain-Overview-Marketing.docx
│   │   ├── CR-MARKETING-*.docx        ← Process documents
│   │   └── CBM-SubDomain-PRD-Marketing.docx
│   ├── EVENTS/
│   │   ├── CBM-SubDomain-Overview-Events.docx
│   │   ├── CR-EVENTS-*.docx           ← Process documents
│   │   └── CBM-SubDomain-PRD-Events.docx
│   └── REACTIVATE/
│       ├── CBM-SubDomain-Overview-Reactivate.docx
│       ├── CR-REACTIVATE-*.docx       ← Process documents
│       └── CBM-SubDomain-PRD-Reactivate.docx
├── FU/
│   └── ...
├── services/
│   ├── NOTES/
│   │   └── NOTES-MANAGE.docx         ← Notes Service process document
│   ├── EMAIL/                         ← Email Service (future)
│   ├── CALENDAR/                      ← Calendar Service (future)
│   └── SURVEY/                        ← Survey Service (future)
└── Archive/                       ← Legacy documents (do not use)

programs/                          ← YAML program files
Implementation Docs/               ← Verification Spec
```

---

## Personas (defined in Master PRD)

| ID | Persona |
|---|---|
| MST-PER-001 | System Administrator |
| MST-PER-002 | Executive Member |
| MST-PER-003 | Client Administrator |
| MST-PER-004 | Client Assignment Coordinator |
| MST-PER-005 | Mentor Administrator |
| MST-PER-006 | Mentor Recruiter |
| MST-PER-007 | Client Recruiter |
| MST-PER-008 | Partner Coordinator |
| MST-PER-009 | Content and Event Administrator |
| MST-PER-010 | Donor / Sponsor Coordinator |
| MST-PER-011 | Mentor |
| MST-PER-012 | Member |
| MST-PER-013 | Client |

---

## Important Rules for This Implementation

- Never mention specific product names (EspoCRM, WordPress, Moodle,
  Constant Contact, DigitalOcean, etc.) in Master PRDs, Entity PRDs,
  process documents, or Domain PRDs. These are implementation details
  only. Exception: the Entity Inventory is an implementation bridging
  document where product names are permitted.
- All documents are produced as Word (.docx) files. No Markdown
  source files under the new process.
- All legacy documents are in `PRDs/Archive/` — never reference them
  as current requirements. They are source material only.
- Update this CLAUDE.md file to reflect current implementation state
  at the end of every work session.
