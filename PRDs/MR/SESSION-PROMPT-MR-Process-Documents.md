# Session Prompt: CBM Mentor Recruitment Domain — Process Documents (Phase 3)

## Context

I'm working on the CBM CRM implementation. The Mentoring (MN) domain is substantially complete — five process documents (MN-INTAKE, MN-MATCH, MN-ENGAGE, MN-INACTIVE, MN-CLOSE), one reconciled Domain PRD, and four Entity PRDs (Contact, Account, Engagement, Session) are all at v1.0.

This session produces the Mentor Recruitment (MR) domain process documents — one Word document per business process, following the 11-section standard defined in the Process Definition Interview Guide.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Process Definition Interview Guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo
3. Read all documents uploaded with this prompt

## What This Is

The MR domain has five business processes that need proper process documents:

| Process Code | Process Name | Description |
|---|---|---|
| MR-RECRUIT | Mentor Recruitment | Ongoing outreach to attract qualified mentor candidates |
| MR-APPLY | Mentor Application | Application submission, review, and approval/decline |
| MR-ONBOARD | Mentor Onboarding | Post-approval onboarding steps through activation |
| MR-MANAGE | Mentor Management | Ongoing profile maintenance, capacity tracking, dues |
| MR-DEPART | Mentor Departure | Departure, pause, and reactivation workflows |

Each process document must contain all 11 required sections per the Process Definition Interview Guide (purpose, triggers, personas, workflow, completion, system requirements, process data, data collected, open issues, updates to prior documents, interview transcript).

## Why This Session Is Different

The MR domain already has a comprehensive legacy Domain PRD (`PRDs/CBM-Domain-PRD-MentorRecruitment.md`) that defines all five processes with detailed workflows, system requirements, and field-level data. This is NOT a blank-slate discovery interview — it is an enrichment and conversion session that restructures existing, validated content into the 11-section process document standard.

This means we can work more efficiently than typical process definition sessions:

* The legacy document is the primary source of truth for process workflows, requirements, and field definitions
* The Contact Entity PRD already captures all Mentor-specific field definitions with implementation names, types, and visibility rules — cross-reference it to ensure process documents align
* The focus is on identifying gaps in the legacy document (missing sections, underspecified fields, missing conditional logic) and filling them, not on discovering processes from scratch

**However, the process documents must still be produced one at a time in dependency order.** Each document gets a full review before moving to the next. The dependency order is: MR-RECRUIT → MR-APPLY → MR-ONBOARD → MR-MANAGE → MR-DEPART.

## Current State

### Existing Documents (all available in the CBM repo)

* **Legacy MR Domain PRD** (`PRDs/CBM-Domain-PRD-MentorRecruitment.md`) — Markdown, v1.0. Comprehensive process and field definitions. Source material for this session. Never produced under the new document production process.
* **Contact Entity PRD** (`PRDs/entities/Contact-Entity-PRD.docx`) — v1.0. Contains all Mentor-specific fields (Section 3.3) with implementation names, types, enum values, and visibility rules. 31 Mentor-specific custom fields are already fully defined.
* **Entity Inventory** (`PRDs/CBM-Entity-Inventory.docx`) — v1.0. Maps 21 business concepts to 9 CRM entities. Note: Dues and SME Request entities from the MR domain are NOT in the Entity Inventory (see Key Issues below).
* **MN Domain PRD** (`PRDs/MN/CBM-Domain-PRD-Mentoring.docx`) — v1.0. Referenced for cross-domain touchpoints (mentor matching, engagement assignment).
* **Engagement Entity PRD** (`PRDs/entities/Engagement-Entity-PRD.docx`) — v1.0. Referenced for Engagement fields that MR processes read (status, assigned mentor).

### Key Cross-Domain Touchpoints

The MR domain hands off to and receives data from the MN domain at these points:

* **MR → MN (Mentor Matching):** MR-MANAGE maintains mentor profile fields (industrySectors, mentoringFocusAreas, skillsExpertiseTags, fluentLanguages, acceptingNewClients, maximumClientCapacity) that MN-MATCH reads during mentor nomination.
* **MN → MR (Activity Monitoring):** MN-INACTIVE monitors per-engagement inactivity. MR-MANAGE monitors mentor-level inactivity (no sessions across ALL engagements). These are distinct processes (MR-DEC-005 in the legacy document).
* **MR → MN (Departure):** MR-DEPART triggers Engagement reassignment when the departing mentor is a Primary Mentor on active engagements.

## Key Issues to Resolve

### 1. Entity Inventory Gap — Dues and SME Request

The legacy MR Domain PRD defines two entities not in the Entity Inventory:

**Dues** — represents individual annual dues records per mentor. Fields: Mentor Contact (link), Billing Year (int), Amount (currency), Due Date (date), Payment Status (enum), Payment Date (date), Payment Method (enum), Notes (text). One record per mentor per year.

**SME Request** — tracks subject matter expert requests within an engagement. Fields: Engagement (link), Requesting Mentor (link), Expertise Needed (wysiwyg), Status (enum), Assigned SME (link), Request Date (date), Completion Date (date), Notes (text).

**Decision needed:** Should these entities be added to the Entity Inventory before or during this session? Options:

* **Option A:** Add them to the Entity Inventory first (brief update), then proceed with process documents. Entity PRDs for Dues and SME Request would be produced after the MR process documents (following the pattern where Session Entity PRD was produced after MN process documents).
* **Option B:** Define them inline in the process documents (as the MN process documents defined Session fields before the Session Entity PRD existed). Update the Entity Inventory at the end.

My recommendation is Option B — define inline, update inventory afterward. This matches how MN handled it.

### 2. Identifier Alignment

The legacy document uses identifiers like MR-RECRUIT-REQ-001 and MR-APPLY-DAT-002. The new process documents should preserve these identifiers where the requirements haven't changed, and assign new identifiers only for new or significantly modified requirements. This maintains traceability to the legacy document.

### 3. Mentor Status Lifecycle — Prospect State

The Contact Entity PRD (CON-DEC-008) added "Prospect" to the Mentor Status values (10 total). The legacy MR Domain PRD lists only 9 values (no Prospect). The MR-RECRUIT process document should address how prospect contacts are created and managed — specifically, whether Prospect is the initial Mentor Status for outreach-generated contacts before they submit an application.

### 4. Marketing System Integration

MR-RECRUIT references synchronizing contact lists to an "outbound marketing system" and recording campaign engagement history. The level of CRM integration detail needs to be defined — is this a native integration, API sync, or manual export/import? This affects MR-RECRUIT-REQ-004.

### 5. Decline Reason Field

MR-APPLY-REQ-006 requires recording a decline reason when an application is rejected. This field is not in the Contact Entity PRD. It needs to be defined in the MR-APPLY process document and flagged as a Contact Entity PRD update.

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Domain-PRD-MentorRecruitment.md** — the legacy MR Domain PRD (from `PRDs/` root in CBM repo). This is the primary source material.
2. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/` in CBM repo). Cross-reference for Mentor field alignment.
3. **CBM-Entity-Inventory.docx** — the Entity Inventory (from `PRDs/` root in CBM repo). For entity gap awareness.
4. **CBM-Domain-PRD-Mentoring.docx** — the MN Domain PRD (from `PRDs/MN/` in CBM repo). For cross-domain touchpoint reference.
5. **Engagement-Entity-PRD.docx** — the Engagement Entity PRD (from `PRDs/entities/` in CBM repo). For engagement field cross-reference.

## Efficiency Approach

Since this is enrichment of existing content, not blank-slate discovery:

1. **For each process**, present the legacy document's content restructured into the 11-section format, highlighting gaps and questions
2. **Flag any fields** in the process document that aren't in the Contact Entity PRD (like Decline Reason) — these become Entity PRD updates
3. **Flag any conflicts** between the legacy document and the Contact Entity PRD (names, types, enum values)
4. **Present each process document** for review before moving to the next
5. **Track cross-process dependencies** — if MR-APPLY defines something that MR-ONBOARD needs, note it

## Output

Produce five Word documents, one per process, committed to `PRDs/MR/` in the CBM repo:

* `PRDs/MR/MR-RECRUIT.docx`
* `PRDs/MR/MR-APPLY.docx`
* `PRDs/MR/MR-ONBOARD.docx`
* `PRDs/MR/MR-MANAGE.docx`
* `PRDs/MR/MR-DEPART.docx`

Also update the Entity Inventory to include Dues and SME Request entities.

## After This Session

With MR process documents complete, the next steps would be:

* **MR Domain Reconciliation (Phase 4)** — synthesize the 5 MR process documents into the MR Domain PRD (replacing the legacy Markdown version)
* **Entity PRDs for Dues and SME Request** — using the field definitions from the MR process documents
* **Entity Inventory update** — if not done during this session
* **Begin CR domain** or **MN-SURVEY process document** — depending on priority
