# Session Prompt: CBM Client Recruiting Domain Overview (Phase 3)

## Context

I'm working on the CBM CRM implementation. The Mentoring (MN) and Mentor Recruitment (MR) domains are fully complete through Phase 5, including all process documents, reconciled Domain PRDs, and Entity PRDs. The Client Recruiting (CR) domain is next.

CR was restructured in Master PRD v2.2 from 3 flat processes (CR-OUTREACH, CR-PARTNER, CR-EVENTS) to 4 sub-domains (CR-PARTNER, CR-MARKETING, CR-EVENTS, CR-REACTIVATE). Sub-domains are an optional framework tier defined in the Document Production Process — appropriate when autonomous process areas share a common purpose and benefit from unified oversight.

This session produces the CR Domain Overview — the parent overview document that covers the domain's overall purpose, sub-domain structure, shared personas, cross-sub-domain relationships, and consolidated oversight requirements. Per the Document Production Process, domains with sub-domains produce multiple Phase 3 documents: 1 parent Domain Overview + 1 Sub-Domain Overview per sub-domain. This session covers the parent Domain Overview only. Sub-Domain Overviews will follow in subsequent sessions.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Document Production Process at `PRDs/process/CRM-Builder-Document-Production-Process.docx` in the crmbuilder repo (Phase 3 section in particular)
3. Read the interview guide for process definition at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo (for general interview approach)
4. Read all documents uploaded with this prompt

## What This Document Is

The CR Domain Overview assembles upstream context into a single domain-scoped reference document. It replaces the need to upload the Master PRD, Entity Inventory, and Entity PRDs into each subsequent CR process session.

Per the Document Production Process, the Domain Overview must contain four sections:

1. **Domain Purpose** — expanded business context, drawn from and elaborating on the Master PRD's domain description
2. **Personas** — personas participating in this domain, scoped to their domain-specific roles
3. **Business Processes** — the complete process inventory with lifecycle narrative, process relationships, and dependency ordering (organized by sub-domain for CR)
4. **Data Reference** — entities and fields relevant to this domain, assembled by reference to completed Entity PRDs

Because CR has sub-domains, this parent overview also covers:

* The sub-domain structure and rationale
* Cross-sub-domain relationships and handoffs
* Shared audience strategy
* Consolidated oversight and analytics requirements

## Current State

**Upstream documents complete:**

* Master PRD v2.2 — defines the CR domain with 4 sub-domains, key capabilities, and personas
* Entity Inventory v1.2 — maps CR entities to CRM platform (Contact, Account, Partnership Agreement, Event, Event Registration)
* Contact Entity PRD v1.1 — shared entity spanning all 4 domains; CR types include Client, Partner, Presenter, Member
* Account Entity PRD v1.0 — shared entity; CR types include Client and Partner

**Legacy document available:**

* CBM-Domain-PRD-ClientRecruiting.md — legacy markdown Domain PRD from before the current document production process. Contains summary-level CR domain content (3 flat processes: CR-OUTREACH, CR-PARTNER, CR-EVENTS). Useful as source material but predates the sub-domain restructuring and does not follow current document standards.

**What is NOT yet available:**

* No CR process documents exist — those will be produced in Phase 4 after the Domain Overview and Sub-Domain Overviews are complete
* No Entity PRDs exist for Partnership Agreement, Event, or Event Registration — these depend on CR process documents
* Survey and Survey Response entities are TBD pending service process definition

## Sub-Domain Structure (from Master PRD v2.2)

| Sub-Domain | Description | Priority |
|---|---|---|
| CR-PARTNER | Partner Relationship Management — full lifecycle of referral partnerships | Core |
| CR-MARKETING | Outreach and Marketing — awareness generation through communications channels | Important |
| CR-EVENTS | Workshops and Event Management — planning, delivery, and follow-up of client-facing events (in-person and virtual) | Important |
| CR-REACTIVATE | Client Reactivation and Recovery — re-engaging former clients, incomplete applications, unconverted attendees | Important |

Individual processes within each sub-domain are NOT enumerated in the Master PRD — that is the work of this Domain Overview and the subsequent Sub-Domain Overviews.

## CR Domain Entities

From the Entity Inventory, the following entities participate in the CR domain:

| CRM Entity | Type | CR Role |
|---|---|---|
| Contact (Native) | Person | Client, Partner, Presenter, Member contact types |
| Account (Native) | Company | Client Organization, Partner Organization account types |
| Partnership Agreement | Custom Base | Formal agreements with partner organizations |
| Event | Custom Event | Workshops, seminars, webinars, and events |
| Event Registration | Custom Base | Individual registrations for events |

Contact and Account Entity PRDs are complete and document their CR-related type values. Partnership Agreement, Event, and Event Registration Entity PRDs are deferred until CR process documents provide field-level requirements.

## Personas

Six personas participate in the CR domain (from Master PRD):

| ID | Persona | CR Role |
|---|---|---|
| MST-PER-003 | Client Administrator | Processes incoming client applications from outreach, referrals, and events |
| MST-PER-006 | Mentor Recruiter | Coordinates partner-channel mentor recruitment |
| MST-PER-007 | Client Recruiter | Leads outreach, marketing campaigns, prospect management |
| MST-PER-008 | Partner Coordinator | Manages partner organization lifecycle and relationships |
| MST-PER-009 | Content and Event Administrator | Plans and manages workshops, events, and related content |
| MST-PER-012 | Member | Supports outreach activities and participates in events |

## Key Questions to Address

1. **Process inventory per sub-domain.** The Master PRD defines sub-domain scope but does not enumerate individual processes. This session must establish the process inventory for each sub-domain and define dependency ordering within and across sub-domains.

2. **Cross-sub-domain handoffs.** How do the sub-domains connect? For example: CR-EVENTS generates attendees → CR-MARKETING may follow up → CR-REACTIVATE tracks unconverted attendees. CR-PARTNER refers clients → intake feeds MN domain. Map these handoffs.

3. **Handoff to Mentoring domain.** The CR domain feeds clients into MN-INTAKE. What is the specific handoff mechanism? At what point does a prospect become the Mentoring domain's responsibility?

4. **Shared audience strategy.** The Master PRD mentions "targeted community segments" and "comparative channel effectiveness analysis." What does consolidated oversight look like across sub-domains?

5. **Partner-to-other-sub-domain touchpoints.** Partners co-sponsor events (CR-EVENTS), contribute mentors (MR crossover), and refer clients (CR-PARTNER → MN handoff). How should these cross-sub-domain partner activities be tracked?

6. **Deferred entity fields.** Contact and Account Entity PRDs note incomplete CR domain coverage (CON-ISS-004, ACT-ISS-002). The Domain Overview should identify which CR-specific fields are anticipated, without defining them at field level — that work belongs in process documents and Entity PRDs.

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Master-PRD.docx** — the Master PRD (from `PRDs/` root in CBM repo)
2. **CBM-Entity-Inventory.docx** — the Entity Inventory (from `PRDs/` root in CBM repo)
3. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/` in CBM repo)
4. **Account-Entity-PRD.docx** — the Account Entity PRD (from `PRDs/entities/` in CBM repo)
5. **CBM-Domain-PRD-ClientRecruiting.md** — the legacy CR Domain PRD (from `PRDs/` root in CBM repo) — source material only

## Output

Produce the CR Domain Overview as a Word document and commit to:
`PRDs/CR/CBM-Domain-Overview-ClientRecruiting.docx`

Also produce a session prompt for each of the four Sub-Domain Overview sessions (CR-PARTNER, CR-MARKETING, CR-EVENTS, CR-REACTIVATE) and commit to `PRDs/CR/{SUB-DOMAIN}/`.

## After This Session

With the CR Domain Overview complete:

* The sub-domain structure, process inventories, and dependency ordering are established
* Four Sub-Domain Overview sessions follow (one per sub-domain), each receiving this Domain Overview as input
* After all Sub-Domain Overviews are complete, CR process definition (Phase 4) begins within each sub-domain
* Entity PRDs for Partnership Agreement, Event, and Event Registration follow CR process documents
