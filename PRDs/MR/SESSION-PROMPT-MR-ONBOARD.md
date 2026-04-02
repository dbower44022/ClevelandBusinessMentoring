# Session Prompt: MR-ONBOARD — Mentor Onboarding Process Document

## Context

I'm working on the CBM CRM implementation. The Mentor Recruitment (MR) domain is in Phase 3 (Process Definition). Five process documents are being produced in dependency order: MR-RECRUIT → MR-APPLY → MR-ONBOARD → MR-MANAGE → MR-DEPART.

MR-RECRUIT v1.0 and MR-APPLY v1.0 are complete and committed to the repo. This session produces the third process document: **MR-ONBOARD (Mentor Onboarding)**.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Process Definition Interview Guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo
3. Read all documents uploaded with this prompt

## What This Process Covers

MR-ONBOARD covers the end-to-end onboarding process for approved mentor applicants:

| Process Code | Process Name | Description |
|---|---|---|
| MR-ONBOARD | Mentor Onboarding | Post-approval onboarding from Provisional status through training completion, ethics agreement, background check, email provisioning, capacity setting, and activation to Active status |

The process document must contain all 11 required sections per the Process Definition Interview Guide.

## Source Material

The legacy MR Domain PRD (`PRDs/CBM-Domain-PRD-MentorRecruitment.md`) defines MR-ONBOARD with a 7-step workflow, 6 system requirements, and field-level data. This is enrichment and conversion into the 11-section standard, not blank-slate discovery.

## Decisions Already Made (from MR-RECRUIT and MR-APPLY sessions)

The following decisions were made during prior sessions and must be carried forward:

### 1. MR-APPLY → MR-ONBOARD Handoff

MR-APPLY ends when the Mentor Administrator changes Mentor Status from In Review to Provisional. This status change is the trigger for MR-ONBOARD. No automated notification is sent at approval — the handoff is purely the Provisional status.

### 2. Identifier Alignment

Preserve legacy identifiers (MR-ONBOARD-REQ-001 through REQ-006, MR-ONBOARD-DAT-001 through DAT-006) where requirements carry forward unchanged. Assign new sequence numbers only for new or significantly modified requirements.

### 3. Entity Inventory Gap — Deferred

Dues and SME Request entities are not in the Entity Inventory. They are being defined inline in process documents (Option B) and will be added to the Entity Inventory after all MR process documents are complete. MR-ONBOARD does not reference either entity.

### 4. applicationDeclineReason Field

A new applicationDeclineReason field was confirmed in MR-APPLY and flagged as a Contact Entity PRD update. This field is not relevant to MR-ONBOARD but is noted for completeness.

### 5. Contact Entity PRD Field Alignment

The Contact Entity PRD v1.0 defines all onboarding-related fields in Section 3.3 under "Onboarding and Compliance":
- ethicsAgreementAccepted (bool, admin-only, readOnly for mentors)
- ethicsAgreementAcceptanceDateTime (datetime, admin-only)
- backgroundCheckCompleted (bool, admin-only, hidden from mentor)
- backgroundCheckDate (date, admin-only, hidden from mentor)
- trainingCompleted (bool, system-populated, readOnly)
- trainingCompletionDate (date, system-populated, readOnly)

And under "Lifecycle and Status":
- cbmEmailAddress (email, admin-populated)
- acceptingNewClients (bool, mentor-editable)
- maximumClientCapacity (int, mentor-editable)

MR-ONBOARD's Data Collected section must cross-reference these fields exactly.

## Key Items for MR-ONBOARD

### Onboarding Steps

The legacy document defines 7 steps, all managed by the Mentor Administrator:

1. Communicate onboarding requirements to the provisional mentor
2. Mentor completes required training via LMS (auto-recorded on Contact)
3. Mentor accepts ethics agreement (admin records acceptance)
4. Background check if required (admin records completion)
5. Assign CBM email address (admin populates field, provisions account externally)
6. Set Maximum Client Capacity and Accepting New Clients = Yes
7. Change Mentor Status from Provisional to Active

All seven steps must be completed before activation. The Mentor Administrator verifies completion.

### Questions to Explore

- **Step ordering:** Are the 7 steps strictly sequential, or can some happen in parallel? For example, can email provisioning happen while training is still in progress?
- **Training integration:** The legacy document says training completion is auto-recorded via LMS integration. What happens if the LMS integration fails or training is completed outside the LMS? Is there a manual override?
- **Background check:** The legacy document says "if required" — what determines whether a background check is required? Is this for all mentors or only in specific circumstances? (This is existing open issue MR-ISS-005.)
- **Ethics agreement mechanism:** How does the mentor accept the ethics agreement? Is it a form submission, a checkbox in the CRM, a signed document, or something else?
- **Activation notification:** The legacy document says "No automated notification is sent — the Mentor Administrator communicates activation to the mentor directly." Confirm this is still the intent.
- **Onboarding timeline:** Is there a deadline or expected timeframe for completing onboarding? What happens if a provisional mentor takes too long or stops responding?
- **Partial completion tracking:** Does the Mentor Administrator need a view or checklist showing which onboarding steps are complete for each provisional mentor?

### Fields Populated During MR-ONBOARD

Based on the Contact Entity PRD and the legacy document:

**From LMS integration (system-populated):**
- trainingCompleted = Yes
- trainingCompletionDate

**Set by Mentor Administrator:**
- ethicsAgreementAccepted = Yes
- ethicsAgreementAcceptanceDateTime
- backgroundCheckCompleted = Yes (if applicable)
- backgroundCheckDate (if applicable)
- cbmEmailAddress
- maximumClientCapacity
- acceptingNewClients = Yes
- mentorStatus = Active (final activation step)

**NOT populated during MR-ONBOARD (populated by other processes):**
- All application fields (MR-APPLY)
- isPrimaryMentor, isCoMentor, isSubjectMatterExpert (MR-MANAGE — or should these default at activation?)
- duesStatus, duesPaymentDate (MR-MANAGE)
- currentActiveClients, availableCapacity (system-calculated, MR-MANAGE)

### System Requirements to Address

Legacy requirements MR-ONBOARD-REQ-001 through REQ-006:

- REQ-001: Track mentor status through the full lifecycle — this is broader than just MR-ONBOARD; may need to be scoped to MR-ONBOARD's transitions specifically
- REQ-002: LMS integration for training completion
- REQ-003: Ethics agreement recording with timestamp
- REQ-004: Background check recording
- REQ-005: CBM email address assignment
- REQ-006: Capacity and accepting new clients before activation

**Potential new requirements:**
- Onboarding checklist or progress view for the Mentor Administrator
- Validation that all required steps are complete before activation (can the admin change status to Active if training isn't done?)
- Stale onboarding handling (provisional mentors who stop responding)

### Status Transitions in MR-ONBOARD

- Provisional → Active (successful onboarding completion)

The legacy document mentions only one transition. Determine whether there are other outcomes:
- Can a provisional mentor be declined during onboarding (e.g., failed background check)?
- Can a provisional mentor withdraw during onboarding?
- What happens to a provisional mentor who never completes onboarding?

### Cross-Domain Touchpoints

- **MR-APPLY → MR-ONBOARD:** Provisional status is the entry point. MR-ONBOARD reads all application data populated by MR-APPLY.
- **MR-ONBOARD → MR-MANAGE:** Active status is the exit point. Once active, the mentor enters ongoing management (MR-MANAGE).
- **MR-ONBOARD → MN-MATCH:** Active mentors with Accepting New Clients = Yes become eligible for mentor-client matching in the Mentoring domain.

### Role Eligibility Fields

The Contact Entity PRD defines three role eligibility fields: isPrimaryMentor (default Yes), isCoMentor, isSubjectMatterExpert. The legacy MR Domain PRD assigns these to MR-MANAGE. Determine whether these should be set during MR-ONBOARD activation (with defaults) or left for MR-MANAGE.

## Documents to Upload

Upload the following documents with this prompt:

1. **MR-RECRUIT.docx** — from `PRDs/MR/`. Cross-reference for established data fields.
2. **MR-APPLY.docx** — from `PRDs/MR/`. Cross-reference for the MR-APPLY → MR-ONBOARD handoff and application data fields.
3. **CBM-Domain-PRD-MentorRecruitment.md** — from `PRDs/` root. Primary source material for MR-ONBOARD content.
4. **Contact-Entity-PRD.docx** — from `PRDs/entities/`. Cross-reference for onboarding field alignment.
5. **CBM-Entity-Inventory.docx** — from `PRDs/` root. For entity reference.

## Output

Produce one Word document committed to `PRDs/MR/MR-ONBOARD.docx` in the CBM repo.

## After This Session

With MR-ONBOARD complete, the next process document is **MR-MANAGE (Mentor Management)**. MR-MANAGE covers ongoing mentor lifecycle management: profile maintenance, capacity management, role eligibility, dues billing, activity monitoring, and administrative oversight.
