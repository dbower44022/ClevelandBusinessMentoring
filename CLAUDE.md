# CLAUDE.md — Cleveland Business Mentors CRM Implementation

This file provides guidance for Claude when working on the Cleveland
Business Mentors CRM implementation.

## First — Read the Process Guide

Before doing any work in this repository, read the Document Production
Process section in the CRM Builder CLAUDE.md:

```
https://github.com/dbower44022/crmbuilder/blob/main/CLAUDE.md
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

**Document Production Step: Step 3 — Consolidated Design update**

The following documents have been completed:

| Document | File | Status |
|---|---|---|
| Master PRD | `PRDs/CBM-Master-PRD.md` | Complete v1.0 |
| Mentoring Domain PRD | `PRDs/CBM-Domain-PRD-Mentoring.md` | Complete v1.0 |
| Mentor Recruitment Domain PRD | Not started | — |
| Client Recruiting Domain PRD | Not started | — |
| Fundraising Domain PRD | Not started | — |
| Consolidated Design | Not started | — |
| YAML program files | Not started | — |
| Verification Spec | Not started | — |

**The next required step is:** Update the Consolidated Design from the
Mentoring Domain PRD before starting the Mentor Recruitment Domain PRD.

---

## Key Business Domains

| Code | Domain |
|---|---|
| MN | Mentoring |
| MR | Mentor Recruitment |
| CR | Client Recruiting |
| FU | Fundraising |

---

## Repository Structure

```
PRDs/
├── CBM-Master-PRD.md           ← Level 1 Master PRD
├── CBM-Domain-PRD-Mentoring.md ← Level 2 Domain PRD (MN)
├── CBM-Consolidated-Design.md  ← Level 3 (not yet created)
└── Archive/                    ← All legacy documents (do not use)

programs/                       ← YAML program files (not yet created)

Implementation Docs/            ← Verification Spec (not yet created)
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
  Constant Contact, DigitalOcean, etc.) in Level 1 or Level 2 PRD
  documents. These are implementation details only.
- All legacy documents are in `PRDs/Archive/` — never reference them
  as current requirements. They are source material only.
- The Consolidated Design must be updated after each Domain PRD before
  the next Domain PRD is started.
- Update this CLAUDE.md file to reflect current implementation state
  at the end of every work session.
