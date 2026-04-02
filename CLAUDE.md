# CLAUDE.md — Cleveland Business Mentors CRM Implementation

This file provides guidance for Claude when working on the Cleveland
Business Mentors CRM implementation.

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

**Process status: Entity PRDs (Phase 2b) in progress — Contact and Account complete.**

The Mentoring (MN) domain has five completed process documents and a
reconciled Domain PRD produced under the new document production
process. Entity Discovery has been completed retroactively, producing
the Entity Inventory. Two Entity PRDs (Contact, Account) are complete.
Other domains remain in transition from the old process.

### Mentoring Domain Process Documents (new process)

| Document | File | Version |
|---|---|---|
| Client Intake | `PRDs/MN/MN-INTAKE.docx` | v2.1 |
| Mentor Matching | `PRDs/MN/MN-MATCH.docx` | v2.1 |
| Engagement Management | `PRDs/MN/MN-ENGAGE.docx` | v2.3 |
| Activity Monitoring | `PRDs/MN/MN-INACTIVE.docx` | v1.2 |
| Engagement Closure | `PRDs/MN/MN-CLOSE.docx` | v1.1 |

**Latest structural change (04-02-26):** Account Entity PRD v1.0
completed. Key decisions: assignedLiaison as separate Partner-specific
Contact link (ACT-DEC-002), parentOrganization shared across all account
types (ACT-DEC-003), type-specific wysiwyg notes fields with role-based
security (ACT-DEC-005), Primary Contact implemented as bool on
Contact-Account relationship middle table (ACT-DEC-001).

**Remaining MN work:** Client Satisfaction Tracking (MN-SURVEY) process
document, workflow diagrams for all processes.

### Entity Inventory (Phase 2a)

| Document | File | Version |
|---|---|---|
| Entity Inventory | `PRDs/CBM-Entity-Inventory.docx` | v1.0 |

Maps 21 business entity concepts to 9 CRM entities (2 native, 7 custom).
Key design decisions: Contact uses multiEnum contactType (Client, Mentor,
Partner, Administrator, Presenter, Donor, Member); Account uses multiEnum
accountType (Client, Partner, Donor/Sponsor); Contribution consolidates
Donation, Sponsorship, Grant, and Pledge with an enum contributionType
discriminator. Prospect is a lifecycle state, not a contactType value.
8 open issues documented for downstream resolution.

### Entity PRDs (Phase 2b)

| Document | File | Version |
|---|---|---|
| Contact Entity PRD | `PRDs/entities/Contact-Entity-PRD.docx` | v1.0 |
| Account Entity PRD | `PRDs/entities/Account-Entity-PRD.docx` | v1.0 |

Contact is the most complex entity — native Person type, spans all four
domains, 7 contactType values (multiEnum). 16 native fields documented,
38 custom fields (6 shared, 1 CBM internal, 31 Mentor-specific). 10
relationships. Dynamic logic visibility rules by contactType. 8 open
issues (3 lifecycle fields deferred to CR/FU domains, 4 TBD value lists,
1 incomplete domain coverage). Key decisions: Primary Contact moved to
Account-Contact relationship; personalEmail/cbmEmailAddress as separate
custom fields; termsAndConditionsAccepted shared for portal readiness;
boardPosition visible for CBM internal types only.

Account is the second cross-domain shared entity — native Company type,
spans MN, CR, FU domains, 3 accountType values (multiEnum). 19 native
fields documented, 21 custom fields (3 shared, 5 Client-specific, 9
Partner-specific, 4 Donor/Sponsor-specific). 8 relationships including
Primary Contact bool on Contact-Account middle table. 4 open issues
(client lifecycle field deferred, incomplete domain coverage, NAICS
subsector values TBD, geographic service area format TBD). Key
decisions: assignedLiaison as separate Contact link; parentOrganization
shared across all types; type-specific wysiwyg notes fields with
role-based security; primaryFunderContact dropped in favor of
relationship-level Primary Contact.

**Next Entity PRDs:** Engagement, Session, then remaining entities.

### Mentoring Domain PRD (Phase 4)

| Document | File | Version |
|---|---|---|
| Mentoring Domain PRD | `PRDs/MN/CBM-Domain-PRD-Mentoring.docx` | v1.0 |

### Existing Documents (produced under old process)

| Document | File | Notes |
|---|---|---|
| Master PRD | `PRDs/CBM-Master-PRD.md` | Markdown, v1.0 — needs conversion to Word and review |
| Mentoring Domain PRD | `PRDs/CBM-Domain-PRD-Mentoring.md` | Markdown, v1.0 — superseded by Word version at PRDs/MN/CBM-Domain-PRD-Mentoring.docx |
| Mentor Recruitment Domain PRD | `PRDs/CBM-Domain-PRD-MentorRecruitment.md` | Markdown, v1.0 — summary-level data, needs enrichment |
| Client Recruiting Domain PRD | `PRDs/CBM-Domain-PRD-ClientRecruiting.md` | Markdown, v1.0 — summary-level data, needs enrichment |
| Fundraising Domain PRD | `PRDs/CBM-Domain-PRD-Fundraising.md` | Markdown, v1.0 — summary-level data, needs enrichment |
| Consolidated Design | `PRDs/CBM-Consolidated-Design.md` | Markdown, v2.0 — eliminated as separate document in new process |

### Legacy Documents

All documents from prior iterations are in `PRDs/Archive/`. These are
source material only — never reference them as current requirements.

### Next Steps

- Produce Entity PRDs (Phase 2b) — Contact and Account complete; next: Engagement, Session, then remaining entities
- Define Client Satisfaction Tracking (MN-SURVEY) process document
- Create workflow diagrams for all five MN processes
- Begin Mentor Recruitment (MR) domain process documents
- Convert Master PRD from Markdown to Word

---

## Key Business Domains

| Code | Domain |
|---|---|
| MN | Mentoring |
| MR | Mentor Recruitment |
| CR | Client Recruiting |
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
│   └── ...
├── FU/
│   └── ...
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
