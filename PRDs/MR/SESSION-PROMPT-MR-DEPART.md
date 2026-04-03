# Session Prompt: MR-DEPART — Mentor Departure and Reactivation Process Document

## Context

I'm working on the CBM CRM implementation. The Mentor Recruitment (MR) domain is in Phase 3 (Process Definition). Five process documents are being produced in dependency order: MR-RECRUIT → MR-APPLY → MR-ONBOARD → MR-MANAGE → MR-DEPART.

MR-RECRUIT v1.0, MR-APPLY v1.0, MR-ONBOARD v1.0, and MR-MANAGE v1.0 are complete and committed to the repo. This session produces the fifth and final MR process document: **MR-DEPART (Mentor Departure and Reactivation)**.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Process Definition Interview Guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo
3. Read all documents uploaded with this prompt

## What This Process Covers

MR-DEPART covers the permanent exit of mentors from CBM and the reactivation of departed mentors:

| Process Code | Process Name | Description |
|---|---|---|
| MR-DEPART | Mentor Departure and Reactivation | Voluntary resignation, administrative departure, engagement reassignment, email deprovisioning, permanent record retention, and reactivation from Departed status |

The process document must contain all 11 required sections per the Process Definition Interview Guide.

## Source Material

The legacy MR Domain PRD (`PRDs/CBM-Domain-PRD-MentorRecruitment.md`) defines MR-DEPART with a departure workflow, pausing workflow, reactivation workflow, 4 system requirements, and field-level data. This is enrichment and conversion into the 11-section standard, not blank-slate discovery.

## Decisions Already Made (from prior MR sessions)

The following decisions were made during prior sessions and must be carried forward:

### 1. MR-MANAGE → MR-DEPART Boundary

MR-MANAGE owns temporary and recoverable status changes:
- Active → Paused (temporary break)
- Paused → Active (return from break)
- Active → Inactive (admin judgment after pattern of inactivity)
- Inactive → Active (direct reactivation within MR-MANAGE)

MR-DEPART owns permanent exits only:
- Any status → Resigned (voluntary departure)
- Any status → Departed (administrative departure)
- Departed → Active (reactivation from departed status)

The Paused workflow from the legacy MR-DEPART section has been moved to MR-MANAGE. Do not include it in MR-DEPART.

### 2. Resigned vs. Departed Distinction

These are distinct statuses with different meanings:
- **Resigned** = conscious voluntary departure; the mentor chose to leave
- **Departed** = no longer with CBM without formal resignation (e.g., unresponsive, removed administratively)

### 3. Reactivation Scope

MR-MANAGE handles Inactive → Active reactivation directly. MR-DEPART handles reactivation only from Departed status. The legacy document mentions reactivation from both Inactive and Departed, but the Inactive path now belongs to MR-MANAGE.

### 4. Contact Entity PRD Visibility Rules

The Contact Entity PRD currently shows departureReason and departureDate as visible only when mentorStatus = Departed. This may need updating if these fields should also apply to Resigned mentors — explore this during the interview.

### 5. Identifier Alignment

Preserve legacy identifiers (MR-DEPART-REQ-001 through REQ-004, MR-DEPART-DAT-001 through DAT-004) where requirements carry forward unchanged. Assign new sequence numbers only for new or significantly modified requirements.

### 6. Mentor Status Enum (complete)

The full Mentor Status enum is: Prospect, Submitted, In Review, Provisional, Active, Paused, Inactive, Resigned, Departed, Declined. Ten values total (CON-DEC-008).

### 7. Permanent Record Retention

All mentor records are retained permanently after departure — no deletion or anonymization (MR-DEC-002). This preserves historical engagement and session records for funder reporting and allows departed mentors to return without losing their history.

## Key Items for MR-DEPART

### Voluntary Resignation Flow

The legacy document says the Mentor Administrator changes status to Departed, but with our Resigned/Departed distinction, voluntary resignation should use the Resigned status. Questions:
- Who initiates a resignation — the mentor or the admin?
- How does the mentor communicate their intent to resign?
- Is there a resignation reason field, or is departureReason shared between Resigned and Departed?
- What happens to the mentor's active engagements?
- Is there a notice period or immediate effect?

### Administrative Departure Flow

When the Mentor Administrator decides to remove a mentor from the program:
- What triggers this decision? Is it the end of an escalation from Inactive, or can it happen directly?
- What engagement handling is required before departure is finalized?
- Is there a different reason set for administrative departures vs. resignations?

### Engagement Reassignment

The legacy document says the Mentor Administrator reviews all Active and Assigned engagements where the departing mentor is the Primary Mentor, and each must be reassigned or closed. Questions:
- Does the system alert the admin about active engagements, or do they discover them manually?
- What about Co-Mentor and SME assignments — are those handled differently?
- Can the departure be finalized while engagements are still active, or must all be resolved first?
- Who receives the reassigned engagements — does MN-MATCH get involved?

### Email Deprovisioning

The legacy document says the CBM Email Address field is cleared and the email account is deprovisioned outside the CRM. Questions:
- Is clearing the field in the CRM sufficient, or is there more to track?
- Does deprovisioning happen for both Resigned and Departed mentors?
- Is there a timing consideration — immediate or after a grace period?

### Reactivation from Departed

The legacy document says the Mentor Administrator changes status to Active and verifies that training, ethics, and background check records are current. Questions:
- Is this a common occurrence or rare?
- What "current" means for each — are there expiration periods for training, ethics agreement, or background check?
- Does the reactivated mentor get a new CBM email, or is the old one restored?
- Does reactivation from Departed differ from reactivation from Resigned?
- Does the reactivated mentor go directly to Active, or back through Provisional/onboarding?

### Departure Reason Field

The Contact Entity PRD defines departureReason with values: Relocated, Career Change, Time Constraints, Personal, Other. Questions:
- Are these values sufficient for both Resigned and Departed scenarios?
- Should there be separate reason fields or values for administrative departures (e.g., Non-compliance, Conduct Issue, Prolonged Inactivity)?
- Is departureReason required when status is changed to Resigned or Departed?

### Notifications

The legacy document doesn't define notifications around departure. Questions:
- Is anyone notified when a mentor departs (clients, other admins)?
- Are mentors notified when their status is changed to Departed administratively?

### Cross-Domain Touchpoints

- **MR-MANAGE → MR-DEPART:** Mentor enters MR-DEPART when the admin determines a permanent exit is warranted. May come from Active, Paused, or Inactive status.
- **MR-DEPART → MN-MATCH:** If engagements need reassignment, the matching process may be invoked.
- **MR-DEPART → MR-ONBOARD:** Reactivation may require repeating some onboarding steps if records have expired.
- **MN-ENGAGE / MN-INACTIVE:** Active engagements must be resolved before departure is complete.

## Documents to Upload

Upload the following documents with this prompt:

1. **MR-RECRUIT.docx** — from `PRDs/MR/`. Cross-reference for established data fields.
2. **MR-APPLY.docx** — from `PRDs/MR/`. Cross-reference for application data.
3. **MR-ONBOARD.docx** — from `PRDs/MR/`. Cross-reference for onboarding fields and reactivation considerations.
4. **MR-MANAGE.docx** — from `PRDs/MR/`. Cross-reference for the MR-MANAGE → MR-DEPART boundary, status transitions, and capacity fields.
5. **CBM-Domain-PRD-MentorRecruitment.md** — from `PRDs/` root. Primary source material for MR-DEPART content.
6. **Contact-Entity-PRD.docx** — from `PRDs/entities/`. Cross-reference for departure fields, status values, and visibility rules.
7. **CBM-Entity-Inventory.docx** — from `PRDs/` root. For entity reference.
8. **Engagement-Entity-PRD.docx** — from `PRDs/entities/`. Cross-reference for engagement status values and reassignment considerations.

## Output

Produce one Word document committed to `PRDs/MR/MR-DEPART.docx` in the CBM repo.

## After This Session

With MR-DEPART complete, all five MR domain process documents will be finished. The next step is **MR Domain Reconciliation (Phase 4)** — synthesizing all five process documents into the MR Domain PRD. For that conversation, upload the Master PRD plus all five MR process documents.

Additional follow-up items from the MR process document series:
- Produce Entity PRDs for Dues and SME Request entities (defined inline during MR process documents)
- Update Entity Inventory to include Dues and SME Request entities
- Update Contact Entity PRD to add mentor-level analytics fields (totalLifetimeSessions, totalMentoringHours, totalSessionsLast30Days) — from MR-MANAGE
- Update Contact Entity PRD trainingCompleted editability (allow manual admin override) — from MR-ONBOARD
- Update Contact Entity PRD applicationDeclineReason enum (add Unresponsive, Candidate Withdrew) — from MR-ONBOARD
- Update MR-APPLY applicationDeclineReason enum for consistency — from MR-ONBOARD
- Add cross-domain platform services section to Master PRD (Notes, Email, Calendaring, Discussion Threads) — from MR-MANAGE
