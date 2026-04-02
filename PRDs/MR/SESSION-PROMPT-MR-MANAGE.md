# Session Prompt: MR-MANAGE — Mentor Management Process Document

## Context

I'm working on the CBM CRM implementation. The Mentor Recruitment (MR) domain is in Phase 3 (Process Definition). Five process documents are being produced in dependency order: MR-RECRUIT → MR-APPLY → MR-ONBOARD → MR-MANAGE → MR-DEPART.

MR-RECRUIT v1.0, MR-APPLY v1.0, and MR-ONBOARD v1.0 are complete and committed to the repo. This session produces the fourth process document: **MR-MANAGE (Mentor Management)**.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Process Definition Interview Guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo
3. Read all documents uploaded with this prompt

## What This Process Covers

MR-MANAGE covers the ongoing management of active mentors throughout their tenure with CBM:

| Process Code | Process Name | Description |
|---|---|---|
| MR-MANAGE | Mentor Management | Ongoing mentor lifecycle management: profile maintenance, capacity management, role eligibility, dues billing, activity monitoring, and administrative oversight |

The process document must contain all 11 required sections per the Process Definition Interview Guide.

## Source Material

The legacy MR Domain PRD (`PRDs/CBM-Domain-PRD-MentorRecruitment.md`) defines MR-MANAGE with a 9-step workflow, 9 system requirements, and field-level data. This is enrichment and conversion into the 11-section standard, not blank-slate discovery.

## Decisions Already Made (from prior MR sessions)

The following decisions were made during prior sessions and must be carried forward:

### 1. MR-ONBOARD → MR-MANAGE Handoff

MR-ONBOARD ends when the Mentor Administrator changes Mentor Status from Provisional to Active. The Active status is the entry point for MR-MANAGE. At activation, isPrimaryMentor is set to Yes automatically, maximumClientCapacity and acceptingNewClients are set by the Mentor Administrator, and the mentor has a CBM email address.

### 2. Identifier Alignment

Preserve legacy identifiers (MR-MANAGE-REQ-001 through REQ-009, MR-MANAGE-DAT-001 through DAT-005) where requirements carry forward unchanged. Assign new sequence numbers only for new or significantly modified requirements.

### 3. Entity Inventory Gap — Dues Entity

The Dues entity is not in the Entity Inventory. Per the decision made in MR-RECRUIT (Option B), it is being defined inline in the process document where it emerges — which is MR-MANAGE. The Dues entity will be added to the Entity Inventory after all MR process documents are complete, and a Dues Entity PRD will be produced at that time.

### 4. Role Eligibility Fields

isPrimaryMentor defaults to Yes at activation (set by MR-ONBOARD). isCoMentor and isSubjectMatterExpert are not set during onboarding — they are configured by the Mentor Administrator in MR-MANAGE. MR-MANAGE owns ongoing role eligibility management for all three fields.

### 5. applicationDeclineReason Field Update

Two new values were added during MR-ONBOARD: Unresponsive and Candidate Withdrew. The full enum is now: Insufficient Experience, Incomplete Application, Failed Background Check, Conflict of Interest, Unresponsive, Candidate Withdrew, Other. This field is not directly relevant to MR-MANAGE but is noted for completeness.

### 6. trainingCompleted Manual Override

MR-ONBOARD established that trainingCompleted can be set either automatically via LMS integration or manually by the Mentor Administrator. The Contact Entity PRD needs updating from "system-populated, readOnly" to allow admin override. This is flagged for update but not yet applied.

## Key Items for MR-MANAGE

### Process Shape

MR-MANAGE is fundamentally different from the prior three MR processes — it is an ongoing, continuous process with no defined end state (similar in shape to MR-RECRUIT). It covers multiple concurrent activities rather than a single linear workflow. The challenge is organizing these activities into a coherent process document.

### Contact Entity PRD Fields Tagged to MR-MANAGE

The following fields in the Contact Entity PRD are sourced to MR-MANAGE:

**Role Eligibility:**
- isPrimaryMentor (bool, default Yes, set at activation by MR-ONBOARD, managed by MR-MANAGE)
- isCoMentor (bool, set by Mentor Administrator)
- isSubjectMatterExpert (bool, set by Mentor Administrator)

**Lifecycle and Status:**
- currentActiveClients (int, system-calculated from active engagements, readOnly)

**Dues and Financial:**
- duesStatus (enum: Unpaid, Paid, Waived, admin-only)
- duesPaymentDate (date, admin-only)

**Other:**
- boardPosition (varchar, visible for CBM organizational member types only)
- yearsOfBusinessExperience (int)
- title (varchar — professional title)

### The Dues Entity

The legacy document defines dues billing as a core MR-MANAGE responsibility: creating annual dues records, tracking payment status, alerting on overdue payments, and supporting waivers. The Dues entity is not yet defined — MR-MANAGE must define it inline with full field-level detail.

Questions to explore:
- What fields belong on the Dues entity? (billing year, amount, status, payment date, waiver reason, etc.)
- What is the billing cycle? Annual — but when does it start?
- How is the dues amount determined? Is it the same for all mentors?
- What is the grace period for overdue dues?
- What happens to a mentor who doesn't pay? Is there a status consequence?
- How does the Dues entity relate to the Contact (one-to-many: one mentor has many annual dues records)?

### Mentor Profile Maintenance

The legacy document says mentors maintain their own profile directly in the CRM. Questions:
- Which fields can mentors edit themselves vs. which are admin-only?
- The Contact Entity PRD already defines editability for most fields. Does MR-MANAGE need to add anything beyond what's already established?
- Is there a profile review or approval process when mentors update their own data?

### Capacity Management

maximumClientCapacity and acceptingNewClients are mentor-editable after activation (per MR-ONBOARD). currentActiveClients and availableCapacity are system-calculated. Questions:
- Does the Mentor Administrator actively monitor capacity, or is this passive (only referenced during MN-MATCH)?
- Can the Mentor Administrator override a mentor's capacity settings?

### Mentor Activity Monitoring

The legacy document says the Mentor Administrator receives an alert when an active mentor has no session activity and no active engagements for a configurable period. Questions:
- What is the configurable period? Who configures it?
- What happens after the alert? Is this just a follow-up prompt, or does it trigger a status change?
- How does this relate to MN-INACTIVE (engagement-level inactivity monitoring)? MN-INACTIVE monitors individual engagements; MR-MANAGE monitors the mentor across all engagements. Confirm this boundary.
- The legacy document says "no automated status change occurs" — the Mentor Administrator decides what action to take. Confirm.

### Mentor Directory

MR-MANAGE-REQ-004 says the system must provide a searchable mentor directory accessible to all active mentors. Questions:
- What fields are visible in the directory? (name, expertise, industry, availability, etc.)
- Who can see it? All active mentors, or administrators too?
- Is this a directory within the CRM, or something else?

### Board Membership

MR-MANAGE-REQ-005 references tracking board membership status. The Contact Entity PRD defines boardPosition (varchar, visible for CBM organizational member types). Questions:
- Is this just a text field the admin populates, or is there more to it?
- What does "CBM organizational member types" mean in practice?

### Mentor Analytics

MR-MANAGE-REQ-008 says the system must track mentor analytics — session counts, hours, outcomes, and trends. Questions:
- Are these analytics views/reports, or stored fields on the Contact record?
- The Engagement Entity PRD already defines session roll-up fields at the engagement level. How do these aggregate to the mentor level?
- Is this a v1.0 requirement, or is it aspirational?

### Administrator Notes

MR-MANAGE-REQ-009 says the system must support administrator notes on individual mentor records. Questions:
- Is this just the native CRM notes capability, or something more structured?
- Are notes visible to mentors or admin-only?

### Status Transitions in MR-MANAGE

The legacy document doesn't explicitly define status transitions, but MR-MANAGE likely owns:
- Active → Paused (temporary break — defined in legacy MR-DEPART but may belong here)
- Active → Inactive (triggered by activity monitoring — or does this belong to MR-DEPART?)

The boundary between MR-MANAGE and MR-DEPART for Paused and Inactive statuses needs to be explored. Pausing and inactivity feel like management activities, while Resigned and Departed feel like departure activities.

### Cross-Domain Touchpoints

- **MR-ONBOARD → MR-MANAGE:** Active status is the entry point. isPrimaryMentor = Yes, capacity set, email provisioned.
- **MR-MANAGE → MR-DEPART:** When a mentor resigns, departs, or needs formal offboarding.
- **MR-MANAGE → MN-MATCH:** Active mentors with acceptingNewClients = Yes and availableCapacity > 0 are eligible for matching. MN-MATCH reads mentor profile fields (industry sectors, mentoring focus areas, languages, skills) maintained by MR-MANAGE.
- **MN-INACTIVE → MR-MANAGE:** Engagement-level inactivity (MN-INACTIVE) may surface mentor-level concerns that the Mentor Administrator addresses in MR-MANAGE.
- **MN-ENGAGE → MR-MANAGE:** Session data from active engagements feeds mentor-level analytics and currentActiveClients calculation.

## Documents to Upload

Upload the following documents with this prompt:

1. **MR-RECRUIT.docx** — from `PRDs/MR/`. Cross-reference for established data fields.
2. **MR-APPLY.docx** — from `PRDs/MR/`. Cross-reference for application data and decline reason values.
3. **MR-ONBOARD.docx** — from `PRDs/MR/`. Cross-reference for the MR-ONBOARD → MR-MANAGE handoff and onboarding fields.
4. **CBM-Domain-PRD-MentorRecruitment.md** — from `PRDs/` root. Primary source material for MR-MANAGE content.
5. **Contact-Entity-PRD.docx** — from `PRDs/entities/`. Cross-reference for all mentor-specific fields, especially those tagged to MR-MANAGE.
6. **CBM-Entity-Inventory.docx** — from `PRDs/` root. For entity reference (note: Dues entity not yet included).
7. **Engagement-Entity-PRD.docx** — from `PRDs/entities/`. Cross-reference for session roll-up fields and engagement status values referenced by capacity calculations.

## Output

Produce one Word document committed to `PRDs/MR/MR-MANAGE.docx` in the CBM repo.

## After This Session

With MR-MANAGE complete, the next and final MR process document is **MR-DEPART (Mentor Departure and Reactivation)**. MR-DEPART covers voluntary resignation, administrative departure, pausing (if not assigned to MR-MANAGE), reactivation from inactive/departed status, engagement reassignment, email deprovisioning, and permanent record retention.
