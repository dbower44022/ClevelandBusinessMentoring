# Session Prompt: CR-MARKETING Sub-Domain Overview

## Context

I'm working on the CBM CRM implementation. The CR Domain Overview v1.0 is complete, establishing the Client Recruiting domain's sub-domain structure, 7-process inventory, dependency ordering, cross-sub-domain handoffs, and shared audience strategy. The CR-PARTNER Sub-Domain Overview should also be complete before this session begins.

This session produces the CR-MARKETING Sub-Domain Overview — the second of four Sub-Domain Overview documents for the CR domain. Per the Document Production Process, Sub-Domain Overviews follow the standard Domain Overview structure (purpose, personas, process inventory with dependency ordering, and data reference) scoped to the sub-domain. The Sub-Domain Overview is the primary input for process definition conversations within the sub-domain, replacing the parent Domain Overview for that purpose.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Document Production Process at `PRDs/process/CRM-Builder-Document-Production-Process.docx` in the crmbuilder repo (Phase 3 section)
3. Read the interview guide for process definition at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo (for general interview approach)
4. Read all documents uploaded with this prompt

## Sub-Domain Scope

**CR-MARKETING — Outreach and Marketing (Important tier)**

All activities that generate awareness and inbound interest through communications channels. Includes digital presence (search engine optimization, website, search advertising grants), content marketing, social media, email marketing, media and public relations (news stories, podcasts, radio, op-eds, press releases), paid advertising, and direct grassroots outreach (canvassing, flyers, direct mail to newly registered businesses, strategic signage). Also covers marketing contact list management and campaign performance tracking.

## Processes in This Sub-Domain

| # | Code | Process Name | Description |
|---|---|---|---|
| 1 | CR-MARKETING-CONTACTS | Marketing Contact Management | Creating and maintaining prospect and marketing contact records, segmenting contact lists, synchronizing lists to the external marketing platform, and tracking prospect-to-applicant pipeline progression. |
| 2 | CR-MARKETING-CAMPAIGNS | Campaign Execution and Tracking | Planning, executing, and measuring outreach campaigns. Campaign engagement history, application source attribution, channel effectiveness analysis, and geographic targeting. |

**Dependency:** CR-MARKETING-CONTACTS must be defined before CR-MARKETING-CAMPAIGNS.

## Personas

From the CR Domain Overview, the following personas participate in the CR-MARKETING sub-domain:

| ID | Persona | CR-MARKETING Role |
|---|---|---|
| MST-PER-007 | Client Recruiter | Primary operator for both processes. Leads campaign design, manages prospect contact lists, tracks effectiveness. |
| MST-PER-008 | Partner Coordinator | Supports through partner channels. Coordinates on joint marketing initiatives. |
| MST-PER-013 | Client | Target of outreach. Receives marketing communications and submits applications. |

## Entities

From the CR Domain Overview and Entity Inventory, the following entities participate in the CR-MARKETING sub-domain:

| CRM Entity | Type | Entity PRD | CR-MARKETING Role |
|---|---|---|---|
| Contact | Native Person | v1.1 | Prospect contacts for marketing outreach. Client contactType for applicants. Campaign engagement history recorded against contact records. howDidYouHearAboutCbm field for attribution. |
| Account | Native Company | v1.0 | Client organizations. Partner organizations referenced for joint marketing coordination. |

No custom entities are exclusive to CR-MARKETING. The sub-domain primarily operates on Contact records (prospects and applicants) and references Account records (partner organizations for joint initiatives).

## Cross-Sub-Domain Touchpoints

From the CR Domain Overview:

- **CR-PARTNER → CR-MARKETING:** Partners support joint marketing initiatives through their networks and channels.
- **CR-MARKETING → CR-EVENTS:** Marketing campaigns promote events. Event registrants may come from marketing contact lists.
- **CR-MARKETING-CONTACTS → CR-REACTIVATE:** Unconverted prospects may be recycled into reactivation segments over time.
- **CR-MARKETING → MN-INTAKE:** Application submission is the handoff boundary. Application source attribution records which marketing channel produced the applicant.

## Key Questions to Address

1. **Prospect contact lifecycle.** What statuses does a prospect contact move through? How is a prospect different from a client contact in the CRM? When does a prospect become a client? What happens to the prospect record after application?

2. **Marketing platform integration.** The CRM serves as the single source of truth for contact data, with lists synchronized to an external marketing platform. What data flows in each direction? What triggers synchronization? How is campaign engagement history (opens, clicks) recorded back into the CRM?

3. **Contact list segmentation.** How does the Client Recruiter segment prospect lists? What fields drive segmentation — geography, industry, business stage, source, engagement history?

4. **Application source attribution.** How is the "How Did You Hear About CBM" field populated? Is it self-reported on the application form, system-tracked based on the referral path, or both? What values should this field support for marketing channels?

5. **Campaign tracking.** What constitutes a "campaign" in the CRM? Is it a formal entity/record, or is campaign tracking handled entirely in the external marketing platform with only engagement history flowing back to the CRM?

6. **Geographic targeting.** How does geographic targeting work operationally? What data supports targeting — service area mapping, population data, existing client distribution?

7. **Media and PR tracking.** The Master PRD mentions media coverage and public relations activity. Is this tracked in the CRM, or is it outside CRM scope? If tracked, what does a media/PR record look like?

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Domain-Overview-ClientRecruiting.docx** — the parent CR Domain Overview (from `PRDs/CR/` in CBM repo)
2. **CBM-Master-PRD.docx** — the Master PRD (from `PRDs/` root in CBM repo)
3. **CBM-Entity-Inventory.docx** — the Entity Inventory (from `PRDs/` root in CBM repo)
4. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/` in CBM repo)
5. **Account-Entity-PRD.docx** — the Account Entity PRD (from `PRDs/entities/` in CBM repo)

## Output

Produce the CR-MARKETING Sub-Domain Overview as a Word document and commit to:
`PRDs/CR/MARKETING/CBM-SubDomain-Overview-Marketing.docx`

Also produce a session prompt for each of the two CR-MARKETING process definition sessions (CR-MARKETING-CONTACTS, CR-MARKETING-CAMPAIGNS) and commit to `PRDs/CR/MARKETING/`.

## After This Session

With the CR-MARKETING Sub-Domain Overview complete:

- The two CR-MARKETING process definitions follow (CR-MARKETING-CONTACTS first, then CR-MARKETING-CAMPAIGNS)
- Each process session receives the Sub-Domain Overview as its primary input
- The parent Domain Overview is not uploaded into individual process conversations
