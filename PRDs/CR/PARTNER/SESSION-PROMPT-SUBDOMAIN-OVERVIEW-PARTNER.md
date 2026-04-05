# Session Prompt: CR-PARTNER Sub-Domain Overview

## Context

I'm working on the CBM CRM implementation. The CR Domain Overview v1.0 is complete, establishing the Client Recruiting domain's sub-domain structure, 7-process inventory, dependency ordering, cross-sub-domain handoffs, and shared audience strategy.

This session produces the CR-PARTNER Sub-Domain Overview — the first of four Sub-Domain Overview documents for the CR domain. Per the Document Production Process, Sub-Domain Overviews follow the standard Domain Overview structure (purpose, personas, process inventory with dependency ordering, and data reference) scoped to the sub-domain. The Sub-Domain Overview is the primary input for process definition conversations within the sub-domain, replacing the parent Domain Overview for that purpose.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Document Production Process at `PRDs/process/CRM-Builder-Document-Production-Process.docx` in the crmbuilder repo (Phase 3 section)
3. Read the interview guide for process definition at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo (for general interview approach)
4. Read all documents uploaded with this prompt

## Sub-Domain Scope

**CR-PARTNER — Partner Relationship Management (Core tier)**

The full lifecycle of referral partnerships — identifying potential partners, qualifying them, establishing formal agreements, onboarding partners, managing ongoing relationships, and measuring referral performance. Covers community organizations, nonprofits, government agencies, institutional channels (SBA, economic development offices, libraries, workforce development boards), and any organization that extends CBM's reach and refers clients into the program.

## Processes in This Sub-Domain

| # | Code | Process Name | Description |
|---|---|---|---|
| 1 | CR-PARTNER-PROSPECT | Partner Prospecting and Activation | Identifying prospective partner organizations, initiating outreach, qualifying the partnership opportunity, establishing formal agreements, and converting from Prospect to Active status. |
| 2 | CR-PARTNER-MANAGE | Partner Relationship Management | Ongoing management of active partner relationships — liaison activities, communication tracking, referral tracking, co-sponsored event coordination, mentor affiliation tracking, analytics reporting, and status changes. |

**Dependency:** CR-PARTNER-PROSPECT must be defined before CR-PARTNER-MANAGE.

## Personas

From the CR Domain Overview, the following personas participate in the CR-PARTNER sub-domain:

| ID | Persona | CR-PARTNER Role |
|---|---|---|
| MST-PER-008 | Partner Coordinator | Owns the process end to end. Primary operator for both processes. |
| MST-PER-009 | Content and Event Administrator | Coordinates on co-sponsored events (CR-PARTNER-MANAGE). |
| MST-PER-007 | Client Recruiter | Coordinates on joint marketing initiatives (CR-PARTNER-MANAGE). |
| MST-PER-006 | Mentor Recruiter | Coordinates on partner-channel mentor recruitment (CR-PARTNER-MANAGE). |

## Entities

From the CR Domain Overview and Entity Inventory, the following entities participate in the CR-PARTNER sub-domain:

| CRM Entity | Type | Entity PRD | CR-PARTNER Role |
|---|---|---|---|
| Account | Native Company | v1.0 | Partner organization profiles. Partner-specific fields defined at summary level in Account Entity PRD Section 3.3 (partnerOrganizationType, partnerType, partnerStatus, partnershipStartDate, assignedLiaison, publicAnnouncementAllowed, geographicServiceArea, targetPopulation, linkedInProfile, partnerNotes). |
| Contact | Native Person | v1.1 | Partner contacts at partner organizations. Partner contactType. No Partner-specific Contact fields defined yet (CON-ISS-002, CON-ISS-004). |
| Partnership Agreement | Custom Base | Deferred | Formal agreements with partner organizations. Entity PRD depends on CR-PARTNER process documents. Legacy CR Domain PRD describes anticipated fields. |

## Cross-Sub-Domain Touchpoints

From the CR Domain Overview:

- **CR-PARTNER → CR-EVENTS:** Partners co-sponsor events. Event records link to partner organization records.
- **CR-PARTNER → CR-MARKETING:** Partners support joint marketing initiatives. Coordination activity, not formal data linkage.
- **CR-PARTNER → MR domain:** Partners contribute mentors. Mentor Contact records linked to partner organizations via Account relationship.
- **CR-PARTNER → MN domain (via CR):** Partner referrals drive clients to apply. Application source attribution records the partner as the referral source.

## Key Questions to Address

1. **CR-PARTNER-PROSPECT workflow detail.** What does the partner prospecting lifecycle look like step by step? How does CBM identify prospective partners? What qualifies a partner for activation? What are the agreement types and when are they required?

2. **CR-PARTNER-MANAGE workflow detail.** What does ongoing partner management look like? Liaison cadence, communication tracking, referral tracking mechanisms, analytics delivery schedule, and partner status change criteria (Active → Lapsed → Inactive, reactivation).

3. **Partner Contact fields.** The Contact Entity PRD has no Partner-specific custom fields yet (CON-ISS-002, CON-ISS-004). What fields does the Partner Coordinator need on partner contact records? Role, primary contact designation by function, etc.

4. **Partnership Agreement fields.** The legacy CR Domain PRD describes anticipated fields. Validate and formalize: agreement type values, required vs optional fields, document access restrictions.

5. **Account Partner-specific field validation.** The Account Entity PRD has Partner-specific fields sourced from the legacy CR Domain PRD. Validate these against current requirements — any additions, changes, or removals?

6. **Partner analytics requirements.** What analytics does the Partner Coordinator deliver to partners? What metrics, what frequency, what format?

7. **Referral tracking mechanism.** How are client referrals attributed to partners? Is this an Account-to-Account link, a field on the Contact or Engagement, or something else?

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Domain-Overview-ClientRecruiting.docx** — the parent CR Domain Overview (from `PRDs/CR/` in CBM repo)
2. **CBM-Master-PRD.docx** — the Master PRD (from `PRDs/` root in CBM repo)
3. **CBM-Entity-Inventory.docx** — the Entity Inventory (from `PRDs/` root in CBM repo)
4. **Account-Entity-PRD.docx** — the Account Entity PRD (from `PRDs/entities/` in CBM repo)
5. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/` in CBM repo)

## Output

Produce the CR-PARTNER Sub-Domain Overview as a Word document and commit to:
`PRDs/CR/PARTNER/CBM-SubDomain-Overview-Partner.docx`

Also produce a session prompt for each of the two CR-PARTNER process definition sessions (CR-PARTNER-PROSPECT, CR-PARTNER-MANAGE) and commit to `PRDs/CR/PARTNER/`.

## After This Session

With the CR-PARTNER Sub-Domain Overview complete:

- The two CR-PARTNER process definitions follow (CR-PARTNER-PROSPECT first, then CR-PARTNER-MANAGE)
- Each process session receives the Sub-Domain Overview as its primary input (not the parent Domain Overview)
- The parent Domain Overview is not uploaded into individual process conversations — its content relevant to this sub-domain has been incorporated into the Sub-Domain Overview
