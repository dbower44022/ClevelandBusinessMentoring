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

**Process status: Transitioning to new document production process.**

The previous round of document production used an older process that
has been replaced. The documents below were produced under that process.
They contain substantial requirements content that serves as source
material, but they need to be reworked under the new process to ensure
consistent field-level detail across all domains.

### Existing Documents (produced under old process)

| Document | File | Notes |
|---|---|---|
| Master PRD | `PRDs/CBM-Master-PRD.md` | Markdown, v1.0 — needs conversion to Word and review |
| Mentoring Domain PRD | `PRDs/CBM-Domain-PRD-Mentoring.md` | Markdown, v1.0 — has field-level detail |
| Mentor Recruitment Domain PRD | `PRDs/CBM-Domain-PRD-MentorRecruitment.md` | Markdown, v1.0 — summary-level data, needs enrichment |
| Client Recruiting Domain PRD | `PRDs/CBM-Domain-PRD-ClientRecruiting.md` | Markdown, v1.0 — summary-level data, needs enrichment |
| Fundraising Domain PRD | `PRDs/CBM-Domain-PRD-Fundraising.md` | Markdown, v1.0 — summary-level data, needs enrichment |
| Consolidated Design | `PRDs/CBM-Consolidated-Design.md` | Markdown, v2.0 — eliminated as separate document in new process |

### Legacy Documents

All documents from prior iterations are in `PRDs/Archive/`. These are
source material only — never reference them as current requirements.

### Next Step

Decide how to transition the existing CBM documents into the new
process. Options include:
- Reworking existing content through the new process phases
- Using existing documents as source material for fresh process
  conversations
- A hybrid approach depending on domain completeness

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
├── MN/
│   ├── MN-INTAKE.docx             ← Process document
│   ├── MN-MATCH.docx
│   ├── MN-ENGAGE.docx
│   ├── MN-CLOSE.docx
│   ├── MN-INACTIVE.docx
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
  Constant Contact, DigitalOcean, etc.) in Master PRDs, process
  documents, or Domain PRDs. These are implementation details only.
- All documents are produced as Word (.docx) files. No Markdown
  source files under the new process.
- All legacy documents are in `PRDs/Archive/` — never reference them
  as current requirements. They are source material only.
- Update this CLAUDE.md file to reflect current implementation state
  at the end of every work session.
