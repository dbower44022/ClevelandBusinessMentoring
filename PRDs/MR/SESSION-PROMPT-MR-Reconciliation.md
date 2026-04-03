# Session Prompt: Mentor Recruitment Domain Reconciliation

## Context

I'm continuing work on the CBM CRM implementation — specifically, performing Domain Reconciliation for the Mentor Recruitment (MR) domain. All five MR domain processes have been defined. This is a reconciliation/synthesis task, not an interview.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the domain reconciliation guide at `PRDs/process/interviews/guide-domain-reconciliation.md` in the crmbuilder repo — this defines the Domain PRD structure, reconciliation approach, and all formatting standards
3. Read the generator template at `PRDs/process/templates/generate-process-doc-template.js` in the crmbuilder repo — this defines the Word document formatting
4. Read all five MR domain process documents uploaded with this prompt

## What This Is

Domain Reconciliation (Phase 5) synthesizes all process documents for a single domain into a consolidated Domain PRD. The AI reads all five process documents, assembles them into the Domain PRD structure, and surfaces any conflicts or inconsistencies for the administrator to resolve.

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Master-PRD.md** — from `PRDs/` root
2. **MR-RECRUIT.docx** — from `PRDs/MR/` (Mentor Recruitment, v1.0)
3. **MR-APPLY.docx** — from `PRDs/MR/` (Mentor Application, v1.0)
4. **MR-ONBOARD.docx** — from `PRDs/MR/` (Mentor Onboarding, v1.0)
5. **MR-MANAGE.docx** — from `PRDs/MR/` (Mentor Management, v1.0)
6. **MR-DEPART.docx** — from `PRDs/MR/` (Mentor Departure and Reactivation, v1.0)

Also recommended for cross-referencing:

7. **Contact-Entity-PRD.docx** — from `PRDs/entities/`
8. **CBM-Entity-Inventory.docx** — from `PRDs/` root
9. **CBM-Domain-PRD-MentorRecruitment.md** — from `PRDs/` root (legacy domain PRD, source material only)

## Personas in the MR Domain

| ID | Persona | Participating Processes |
|---|---|---|
| MST-PER-005 | Mentor Administrator | MR-APPLY, MR-ONBOARD, MR-MANAGE, MR-DEPART |
| MST-PER-006 | Mentor Recruiter | MR-RECRUIT |
| MST-PER-008 | Partner Coordinator | MR-RECRUIT |
| MST-PER-011 | Mentor | MR-APPLY, MR-ONBOARD, MR-MANAGE, MR-DEPART |
| MST-PER-001 | System Administrator | MR-MANAGE (configures inactivity threshold only) |

## Known Items Requiring Attention

### Open Issues (Unresolved) — Carried Forward from Process Documents

**From MR-RECRUIT:**
- **MR-RECRUIT-ISS-001:** How Did You Hear About CBM dropdown values not yet defined. Carried forward from MR-ISS-003 / CON-ISS-008.
- **MR-RECRUIT-ISS-002:** Automated bidirectional sync between CRM and outbound marketing system is a planned future enhancement. v1.0 uses manual export/import.
- **MR-RECRUIT-ISS-003:** Geographic distribution data for roster gap analysis — confirm whether zip code is sufficient or a separate region field is needed.

**From MR-APPLY (references Contact Entity PRD issues):**
- **CON-ISS-005:** Mentoring Focus Areas complete list of values not defined.
- **CON-ISS-006:** Skills and Expertise Tags values not yet defined.
- **CON-ISS-007:** Fluent Languages values not yet defined.
- **CON-ISS-008:** How Did You Hear About CBM dropdown values not yet defined (same as MR-RECRUIT-ISS-001).

**From MR-ONBOARD:**
- No new open issues. Prior issue MR-ISS-005 (background check criteria) was resolved — at Mentor Administrator's discretion.

**From MR-MANAGE:**
- **MR-MANAGE-ISS-001:** Dues billing cycle not defined (calendar year, fiscal year, or activation anniversary).
- **MR-MANAGE-ISS-002:** Dues amount not determined (uniform or variable, how set each year). Carries forward from MR-ISS-004.
- **MR-MANAGE-ISS-003:** Master PRD needs cross-domain platform services section (Notes, Email, Calendaring, Discussion Threads).
- **MR-MANAGE-ISS-004:** Dues grace period not defined.
- **MR-MANAGE-ISS-005:** Consequences of non-payment of dues not defined.
- **MR-MANAGE-ISS-006:** Dues billing eligibility not confirmed (all Active mentors, or exemptions?).

**From MR-DEPART:**
- No open issues.

### Updates to Prior Documents — Not Yet Applied

These were identified during the five process interviews. They should be noted during reconciliation but are not applied to the target documents in this session — they are tracked for a separate update pass.

**From MR-ONBOARD:**
1. Contact Entity PRD — Add two values to applicationDeclineReason enum: Unresponsive, Candidate Withdrew.
2. Contact Entity PRD — Change trainingCompleted editability from "system-populated, readOnly" to allow manual admin override.
3. MR-APPLY — Update applicationDeclineReason enum to include Unresponsive and Candidate Withdrew for consistency.

**From MR-MANAGE:**
4. Master PRD — Add cross-domain platform services section (Notes, Email, Calendaring, Discussion Threads).
5. Contact Entity PRD — Add three mentor-level analytics fields: totalLifetimeSessions, totalMentoringHours, totalSessionsLast30Days.

**From MR-DEPART:**
6. Contact Entity PRD — Update departureReason and departureDate visibility rule from "mentorStatus = Departed" to "mentorStatus in [Resigned, Departed]."
7. MN-MATCH — Add new trigger for departure-driven engagement reassignment.

### Cross-Process Data to Reconcile

- **Mentor Status** is the central lifecycle field spanning all five processes. The full value set (Prospect, Submitted, In Review, Provisional, Active, Paused, Inactive, Resigned, Departed, Declined) and transition rules must be consolidated across processes: MR-APPLY (Submitted → Provisional or Declined), MR-ONBOARD (Provisional → Active or Declined), MR-MANAGE (Active ↔ Paused, Active ↔ Inactive), MR-DEPART (any → Resigned/Departed, Departed → Active/Provisional).
- **applicationDeclineReason** is written by both MR-APPLY and MR-ONBOARD. MR-ONBOARD added two values (Unresponsive, Candidate Withdrew) not yet reflected in MR-APPLY's field definition.
- **departureReason and departureDate** visibility rule currently says "mentorStatus = Departed" but MR-DEPART established these apply to both Resigned and Departed.
- **cbmEmailAddress** — legacy document said to clear on departure; MR-DEPART decided to retain it. Verify consistency across MR-ONBOARD (which provisions it) and MR-DEPART (which retains it).
- **Dues entity** was defined inline in MR-MANAGE. Not yet in the Entity Inventory. Needs a Dues Entity PRD in a subsequent session.
- **SME Request entity** was defined inline in MR-MANAGE. Not yet in the Entity Inventory. Needs an SME Request Entity PRD in a subsequent session.
- **Multiple TBD value lists** are referenced across processes: Mentoring Focus Areas (CON-ISS-005), Skills and Expertise Tags (CON-ISS-006), Fluent Languages (CON-ISS-007), How Did You Hear About CBM (CON-ISS-008). Verify consistent references.

### Entities Involved

The Mentor Recruitment domain spans these entities:

- **Mentor Contact** — the primary entity; Contact record with Contact Type = Mentor. Heaviest field set. Shared with the Mentoring (MN) domain.
- **Dues** — one record per mentor per billing year. Defined inline in MR-MANAGE. Entity PRD not yet produced.
- **SME Request** — tracks subject matter expert involvement requests. Defined inline in MR-MANAGE. Entity PRD not yet produced.
- **Engagement** — referenced by MR-DEPART (for reassignment checks) and MR-MANAGE (for capacity calculations). Owned by the MN domain.
- **Session** — referenced by MR-MANAGE (for activity monitoring and analytics). Owned by the MN domain.

### Key Decisions Made Across Process Documents

The following decisions were made during the five process interviews and should be compiled into the Decisions section of the Domain PRD:

- Mentors are Contact records distinguished by Contact Type = Mentor, not a separate entity (MR-DEC-001)
- Permanent record retention after departure — no deletion or anonymization (MR-DEC-002)
- Dues Status on Contact is a summary field maintained independently of Dues records (MR-DEC-003)
- Felony Conviction Disclosure hidden from mentors after submission (MR-DEC-004)
- Mentor-level inactivity monitoring operates independently of per-engagement monitoring (MR-DEC-005)
- Industry Sectors and Mentoring Focus Areas must use same values as Client Organization (MR-DEC-006)
- Prospect is a lifecycle state managed through the marketing system, not a Mentor Status enum value (from MR-RECRUIT)
- Entity definitions for Dues and SME Request inline rather than requiring Entity Inventory update first (from MR-RECRUIT)
- No approval gate on mentor self-service profile edits (from MR-MANAGE)
- All three role eligibility flags can be Yes simultaneously (from MR-MANAGE)
- MR-MANAGE owns Active ↔ Paused and Active ↔ Inactive; MR-DEPART owns Resigned and Departed only (from MR-MANAGE)
- Departure is immediate — does not wait for engagement reassignment (from MR-DEPART)
- cbmEmailAddress retained on Contact record after departure (from MR-DEPART)
- departureReason and departureDate apply to both Resigned and Departed (from MR-DEPART)
- No reactivation date field (from MR-DEPART)
- Compliance record currency at admin judgment — no defined expiration periods (from MR-DEPART)

## Output

Produce the MR Domain PRD as a Word document and commit to:
`PRDs/MR/CBM-Domain-PRD-MentorRecruitment.docx` in the CBM repo.

## After This Session

With the MR Domain PRD complete, the next steps are:

1. Produce Entity PRDs for Dues and SME Request entities
2. Update Entity Inventory to include Dues and SME Request entities
3. Apply the seven pending updates to prior documents (Contact Entity PRD, MR-APPLY, MN-MATCH, Master PRD)
4. Begin CR (Client Recruiting) domain process documents (Phase 4)
