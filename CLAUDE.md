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

**Process status: MR Domain Reconciliation (Phase 5) complete. MR Domain PRD v1.0 produced. CR domain restructured with sub-domains (Master PRD v2.2). Notes Service process document (NOTES-MANAGE v1.0) complete (Phase 4). All pending updates to prior documents applied 04-05-26. Next: Dues Entity PRD, Entity Inventory update, then CR Domain Overview and Sub-Domain Overviews.**

The Mentoring (MN) domain has five completed process documents and a
reconciled Domain PRD produced under the new document production
process. Entity Discovery has been completed retroactively, producing
the Entity Inventory. Four Entity PRDs (Contact, Account, Engagement,
Session) are complete — all MN-domain entities are now fully defined.

The Mentor Recruitment (MR) domain has completed Phase 5 domain
reconciliation. All five process documents and the reconciled MR Domain
PRD are finished. Two reconciliation decisions were made: reactivation
is available from both Resigned and Departed status (MR-RECON-DEC-001),
and applicationDeclineReason uses a reconciled 7-value enum
(MR-RECON-DEC-002). SME Request entity was removed from process scope.

### Mentoring Domain Process Documents (new process)

| Document | File | Version |
|---|---|---|
| Client Intake | `PRDs/MN/MN-INTAKE.docx` | v2.1 |
| Mentor Matching | `PRDs/MN/MN-MATCH.docx` | v2.1 |
| Engagement Management | `PRDs/MN/MN-ENGAGE.docx` | v2.3 |
| Activity Monitoring | `PRDs/MN/MN-INACTIVE.docx` | v1.2 |
| Engagement Closure | `PRDs/MN/MN-CLOSE.docx` | v1.1 |

**Latest structural change (04-04-26):** Master PRD v2.2 — CR domain
restructured from 3 flat processes (CR-OUTREACH, CR-PARTNER, CR-EVENTS)
to 4 sub-domains (CR-PARTNER, CR-MARKETING, CR-EVENTS, CR-REACTIVATE).
Sub-domains are an optional framework tier defined in Document Production
Process v1.7. Decision rule: sub-domains are appropriate when autonomous
process areas share a common purpose and benefit from unified oversight.
CR-EVENTS expanded to include virtual events and webinars. CR-REACTIVATE
is new (alumni re-engagement, incomplete applications, warm lead recovery).
Process Tier Summary table updated; individual process inventories deferred
to Domain/Sub-Domain Overview phases.

**Remaining MN work:** Client Satisfaction Tracking (MN-SURVEY) process
document, workflow diagrams for all processes.

### Mentor Recruitment Domain Process Documents (new process)

| Document | File | Version |
|---|---|---|
| Mentor Recruitment | `PRDs/MR/MR-RECRUIT.docx` | v1.0 |
| Mentor Application | `PRDs/MR/MR-APPLY.docx` | v1.0 |
| Mentor Onboarding | `PRDs/MR/MR-ONBOARD.docx` | v1.0 |
| Mentor Management | `PRDs/MR/MR-MANAGE.docx` | v1.0 |
| Mentor Departure | `PRDs/MR/MR-DEPART.docx` | v1.0 |

**Remaining MR work:** Dues Entity PRD, Entity Inventory update (add
Dues entity), then apply pending updates to prior documents (Contact
Entity PRD, MR-APPLY, MN-MATCH, Master PRD).

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
| Engagement Entity PRD | `PRDs/entities/Engagement-Entity-PRD.docx` | v1.0 |
| Session Entity PRD | `PRDs/entities/Session-Entity-PRD.docx` | v1.0 |

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

Engagement is a single-domain custom entity — Custom Base type, owned
exclusively by the Mentoring (MN) domain. 2 native fields (name
auto-generated, description hidden), 19 custom fields across 6
functional groups (lifecycle, mentoring context, notes, session
roll-up analytics, closure, outcomes). 6 relationships (4 to Contact,
1 to Account, 1 to Session). Status-driven dynamic logic (no
discriminator). 4 open issues (Mentoring Focus Areas values TBD, Close
Reason values TBD, additional outcome metrics TBD, survey response
tracking deferred). Key decisions: name auto-generated as
{Client}-{Mentor}-{Year}; session roll-ups are workflow-updated stored
fields; no Client Satisfaction Rating; On-Hold is a status value.

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

**Next Entity PRDs:** Remaining entities outside MN domain (Partnership
Agreement, Event, Event Registration, Contribution, Fundraising
Campaign). These depend on CR and FU domain process documents, which
have not yet been completed.

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

### Existing Documents (produced under old process)

| Document | File | Notes |
|---|---|---|
| Master PRD | `PRDs/CBM-Master-PRD.md` | Markdown, v1.0 — needs conversion to Word and review |
| Mentoring Domain PRD | `PRDs/CBM-Domain-PRD-Mentoring.md` | Markdown, v1.0 — superseded by Word version at PRDs/MN/CBM-Domain-PRD-Mentoring.docx |
| Mentor Recruitment Domain PRD | `PRDs/CBM-Domain-PRD-MentorRecruitment.md` | Markdown, v1.0 — superseded by Word version at PRDs/MR/CBM-Domain-PRD-MentorRecruitment.docx |
| Client Recruiting Domain PRD | `PRDs/CBM-Domain-PRD-ClientRecruiting.md` | Markdown, v1.0 — summary-level data, needs enrichment |
| Fundraising Domain PRD | `PRDs/CBM-Domain-PRD-Fundraising.md` | Markdown, v1.0 — summary-level data, needs enrichment |
| Consolidated Design | `PRDs/CBM-Consolidated-Design.md` | Markdown, v2.0 — eliminated as separate document in new process |

### Legacy Documents

All documents from prior iterations are in `PRDs/Archive/`. These are
source material only — never reference them as current requirements.

### Next Steps

- Produce Dues Entity PRD (defined inline during MR-MANAGE)
- Update Entity Inventory to include Dues entity
- Apply pending updates to prior documents:
  - ~~Contact Entity PRD: add applicationDeclineReason field (7 values), update departure field visibility (mentorStatus in [Resigned, Departed]), change trainingCompleted editability to allow manual admin override, add mentor-level analytics fields (totalLifetimeSessions, totalMentoringHours, totalSessionsLast30Days)~~ DONE 04-05-26
  - ~~MR-APPLY: update applicationDeclineReason enum to 7 values~~ DONE 04-05-26
  - ~~MN-MATCH: add departure-driven engagement reassignment trigger~~ DONE 04-05-26
  - ~~Master PRD: add cross-domain platform services section (Notes, Email, Calendaring, Discussion Threads)~~ Already in v2.2
  - ~~MR-MANAGE: close MR-MANAGE-ISS-003 (Notes Service now defined as NOTES-MANAGE v1.0)~~ DONE 04-05-26
- Remaining Cross-Domain Services (Phase 4): Email Service, Calendar Service, Survey Service
- CR Domain Overview (Phase 3) — parent domain overview covering sub-domain structure, shared audience strategy, and cross-sub-domain oversight
- CR Sub-Domain Overviews (Phase 3) — one per sub-domain: CR-PARTNER, CR-MARKETING, CR-EVENTS, CR-REACTIVATE
- CR Process Definition (Phase 5) — processes within each sub-domain (inventories defined during Sub-Domain Overview)
- Produce remaining Entity PRDs (Phase 2b) — depends on CR and FU domain process documents
- Define Client Satisfaction Tracking (MN-SURVEY) process document
- Create workflow diagrams for all MN and MR processes
- Convert Master PRD from Markdown to Word (note: Master PRD is already Word as of v2.1)
- Begin FU (Fundraising) domain process documents (Phase 4)

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
