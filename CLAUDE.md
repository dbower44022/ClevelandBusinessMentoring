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

**Process status: All MR domain work complete. CR-PARTNER Sub-Domain Overview v1.0 complete (Phase 3). 10 Account Partner fields validated, no Partner-specific Contact fields needed, CON-ISS-002 resolved, referringPartner link on Engagement identified. Session prompts committed for CR-PARTNER-PROSPECT and CR-PARTNER-MANAGE. Next: CR-PARTNER-PROSPECT process definition, then CR-PARTNER-MANAGE, then CR-MARKETING Sub-Domain Overview.**

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
| Client Intake | `PRDs/MN/MN-INTAKE.docx` | v2.2 |
| Mentor Matching | `PRDs/MN/MN-MATCH.docx` | v2.2 |
| Engagement Management | `PRDs/MN/MN-ENGAGE.docx` | v2.3 |
| Activity Monitoring | `PRDs/MN/MN-INACTIVE.docx` | v1.2 |
| Engagement Closure | `PRDs/MN/MN-CLOSE.docx` | v1.1 |

**Latest structural change (04-05-26):** CR-PARTNER Sub-Domain Overview v1.0
complete. 10 Account Partner fields validated (no changes). No Partner-specific
Contact fields needed. CON-ISS-002 resolved — partner lifecycle tracked at
Account level. Partnership Agreement anticipated fields confirmed (6 fields).
New referringPartner link field identified for Engagement Entity PRD. Quarterly
partner analytics reports established (7 metrics). Session prompts committed
for CR-PARTNER-PROSPECT and CR-PARTNER-MANAGE process definitions.

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

**Remaining MR work:** None. All MR domain deliverables complete.

### Entity Inventory (Phase 2a)

| Document | File | Version |
|---|---|---|
| Entity Inventory | `PRDs/CBM-Entity-Inventory.docx` | v1.2 |

Maps 25 business entity concepts to 13 CRM entities (2 native, 8 custom, 3 TBD).
Key design decisions: Contact uses multiEnum contactType (Client, Mentor,
Partner, Administrator, Presenter, Donor, Member); Account uses multiEnum
accountType (Client, Partner, Donor/Sponsor); Contribution consolidates
Donation, Sponsorship, Grant, and Pledge with an enum contributionType
discriminator; Dues is a single-domain Custom Base entity for MR.
Prospect is a lifecycle state, not a contactType value.
8 open issues documented for downstream resolution.

### Entity PRDs (Phase 2b)

| Document | File | Version |
|---|---|---|
| Contact Entity PRD | `PRDs/entities/Contact-Entity-PRD.docx` | v1.1 |
| Account Entity PRD | `PRDs/entities/Account-Entity-PRD.docx` | v1.0 |
| Engagement Entity PRD | `PRDs/entities/Engagement-Entity-PRD.docx` | v1.0 |
| Session Entity PRD | `PRDs/entities/Session-Entity-PRD.docx` | v1.0 |
| Dues Entity PRD | `PRDs/entities/Dues-Entity-PRD.docx` | v1.0 |

Contact is the most complex entity — native Person type, spans all four
domains, 7 contactType values (multiEnum). 16 native fields documented,
39 custom fields (6 shared, 1 CBM internal, 32 Mentor-specific). 10
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
| CR Domain Overview | `PRDs/CR/CBM-Domain-Overview-ClientRecruiting.docx` | v1.0 |

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
| CR-PARTNER Sub-Domain Overview | `PRDs/CR/PARTNER/CBM-SubDomain-Overview-Partner.docx` | v1.0 |

Scopes the CR-PARTNER sub-domain for process definition. 2 processes
(CR-PARTNER-PROSPECT, CR-PARTNER-MANAGE) in dependency order. 4 personas
with process participation mapped. 10 Account Partner-specific fields
validated (no changes). No Partner-specific Contact fields needed —
CON-ISS-002 resolved (partner lifecycle tracked at Account level).
Partnership Agreement anticipated fields confirmed (6 fields). New
referringPartner link field identified for Engagement entity (set by
mentor after first session, basis for partner analytics). Quarterly
formal partner analytics reports with 7 metrics: referral count, active
clients, new clients in last 30 days, total sessions, total hours, NPS
scores, impact metrics. Two referral tracking mechanisms: client
self-reported howDidYouHearAboutCbm on Contact, mentor-set
referringPartner on Engagement.

Updates needed: Contact Entity PRD (close CON-ISS-002), Engagement
Entity PRD (add referringPartner field).

Session prompts committed for both CR-PARTNER process definitions:
- `PRDs/CR/PARTNER/SESSION-PROMPT-CR-PARTNER-PROSPECT.md`
- `PRDs/CR/PARTNER/SESSION-PROMPT-CR-PARTNER-MANAGE.md`

### Existing Documents (produced under old process)

| Document | File | Notes |
|---|---|---|
| Master PRD | `PRDs/CBM-Master-PRD.docx` | Word, v2.3 |
| Mentoring Domain PRD | `PRDs/CBM-Domain-PRD-Mentoring.md` | Markdown, v1.0 — superseded by Word version at PRDs/MN/CBM-Domain-PRD-Mentoring.docx |
| Mentor Recruitment Domain PRD | `PRDs/CBM-Domain-PRD-MentorRecruitment.md` | Markdown, v1.0 — superseded by Word version at PRDs/MR/CBM-Domain-PRD-MentorRecruitment.docx |
| Client Recruiting Domain PRD | `PRDs/CBM-Domain-PRD-ClientRecruiting.md` | Markdown, v1.0 — legacy source material, superseded by CR Domain Overview |
| Fundraising Domain PRD | `PRDs/CBM-Domain-PRD-Fundraising.md` | Markdown, v1.0 — summary-level data, needs enrichment |
| Consolidated Design | `PRDs/CBM-Consolidated-Design.md` | Markdown, v2.0 — eliminated as separate document in new process |

### Legacy Documents

All documents from prior iterations are in `PRDs/Archive/`. These are
source material only — never reference them as current requirements.

### Next Steps

- CR-PARTNER Process Definition (Phase 5) — CR-PARTNER-PROSPECT first, then CR-PARTNER-MANAGE
- CR Sub-Domain Overviews (Phase 3) — remaining: CR-MARKETING, CR-EVENTS, CR-REACTIVATE
- CR Process Definition (Phase 5) — remaining after CR-PARTNER: CR-MARKETING-CONTACTS → CR-MARKETING-CAMPAIGNS → CR-EVENTS-MANAGE → CR-EVENTS-CONVERT → CR-REACTIVATE-OUTREACH
- Update Contact Entity PRD: close CON-ISS-002 (partner lifecycle at Account level)
- Update Engagement Entity PRD: add referringPartner link field
- Remaining Cross-Domain Services (Phase 4): Email Service, Calendar Service, Survey Service
- Produce remaining Entity PRDs (Phase 2b) — Partnership Agreement can proceed after CR-PARTNER processes; Event, Event Registration, Contribution depend on further CR/FU process documents
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
