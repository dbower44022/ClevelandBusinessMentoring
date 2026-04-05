# Session Prompt: CR-REACTIVATE Sub-Domain Overview

## Context

I'm working on the CBM CRM implementation. The CR Domain Overview v1.0 is complete, establishing the Client Recruiting domain's sub-domain structure, 7-process inventory, dependency ordering, cross-sub-domain handoffs, and shared audience strategy. The CR-PARTNER, CR-MARKETING, and CR-EVENTS Sub-Domain Overviews should also be complete before this session begins.

This session produces the CR-REACTIVATE Sub-Domain Overview — the fourth and final Sub-Domain Overview document for the CR domain. Per the Document Production Process, Sub-Domain Overviews follow the standard Domain Overview structure (purpose, personas, process inventory with dependency ordering, and data reference) scoped to the sub-domain. The Sub-Domain Overview is the primary input for process definition conversations within the sub-domain, replacing the parent Domain Overview for that purpose.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Document Production Process at `PRDs/process/CRM-Builder-Document-Production-Process.docx` in the crmbuilder repo (Phase 3 section)
3. Read the interview guide for process definition at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo (for general interview approach)
4. Read all documents uploaded with this prompt

## Sub-Domain Scope

**CR-REACTIVATE — Client Reactivation and Recovery (Important tier)**

Re-engaging people who have previously interacted with CBM but are not currently active. Includes former clients who may benefit from another round of mentoring, incomplete applications, workshop and webinar attendees who did not convert to applicants, seasonal and cyclical outreach to past inquiries, and structured referral requests to successful former clients.

## Processes in This Sub-Domain

| # | Code | Process Name | Description |
|---|---|---|---|
| 1 | CR-REACTIVATE-OUTREACH | Reactivation Outreach | Identifying, prioritizing, and re-engaging warm leads across all source categories. Defines reactivation criteria per source category, executes outreach, tracks responses, and routes re-engaged contacts back into the appropriate intake path. |

This sub-domain has a single process. The different reactivation target populations are segments within one operational workflow — the persona, tools, and approach are the same regardless of source category.

## Personas

From the CR Domain Overview, the following personas participate in the CR-REACTIVATE sub-domain:

| ID | Persona | CR-REACTIVATE Role |
|---|---|---|
| MST-PER-007 | Client Recruiter | Primary operator. Identifies reactivation candidates, executes outreach, and tracks responses. |
| MST-PER-003 | Client Administrator | Processes re-engagement applications routed back to MN-INTAKE. |

## Entities

From the CR Domain Overview and Entity Inventory, the following entities participate in the CR-REACTIVATE sub-domain:

| CRM Entity | Type | Entity PRD | CR-REACTIVATE Role |
|---|---|---|---|
| Contact | Native Person | v1.1 | Former clients, incomplete applicants, unconverted event attendees, and past inquiries. All reactivation targets are existing Contact records. |
| Account | Native Company | v1.0 | Former client organizations. Referenced for context during reactivation outreach. |
| Event Registration | Custom Base | Deferred | Attendance records used to identify unconverted event attendees (attendees who did not apply). Defined by CR-EVENTS processes. |
| Engagement | Custom Base | v1.0 | Former client engagement records. Referenced to identify completed or closed engagements for alumni re-engagement. |

No custom entities are exclusive to CR-REACTIVATE. The sub-domain operates entirely on existing records from other domains and sub-domains, identifying and re-engaging contacts who meet reactivation criteria.

## Cross-Sub-Domain Touchpoints

From the CR Domain Overview:

- **CR-EVENTS-CONVERT → CR-REACTIVATE:** Unconverted event attendees (attended but did not apply) become warm leads for reactivation outreach.
- **CR-MARKETING-CONTACTS → CR-REACTIVATE:** Prospects who received marketing outreach but did not convert may be recycled into reactivation segments.
- **MN domain → CR-REACTIVATE:** Former clients with completed or closed engagements are candidates for alumni re-engagement.
- **CR-REACTIVATE → MN-INTAKE:** Re-engaged contacts who submit applications enter MN-INTAKE. Application source attribution records the reactivation channel.

## Key Questions to Address

1. **Reactivation target populations.** The Domain Overview identifies five categories: former clients, incomplete applications, unconverted event attendees, past inquiries, and alumni referral requests. How does the Client Recruiter identify contacts in each category? What criteria determine reactivation eligibility?

2. **Prioritization.** Not all warm leads are equal. How does the Client Recruiter prioritize who to reach out to? Recency of last interaction, reason for disengagement, business stage, geographic alignment with current capacity?

3. **Outreach methods.** What channels are used for reactivation outreach — email, phone, direct mail, through the external marketing platform? Does it vary by target population?

4. **Former client re-engagement.** When a former client returns for another round of mentoring, do they go through the full MN-INTAKE process again? Is there an abbreviated path? What status does their contact/engagement record need to be in?

5. **Incomplete application follow-up.** What constitutes an "incomplete application"? How long after abandonment does follow-up occur? How many follow-up attempts before the contact is classified as non-responsive?

6. **Unconverted event attendee follow-up.** CR-EVENTS-CONVERT handles immediate post-event follow-up. At what point does an unconverted attendee transition from CR-EVENTS responsibility to CR-REACTIVATE responsibility? Is there a time-based trigger or a status change?

7. **Alumni referral program.** The Master PRD mentions "structured referral requests to successful former clients." Is this a formal program with defined touchpoints, or ad-hoc? What does CBM ask former clients to do — refer specific contacts, share testimonials, participate in events?

8. **Reactivation tracking.** How does the CRM track reactivation activity? Is there a reactivation-specific field or status on the Contact record, or is reactivation tracked through activity/communication history?

9. **Seasonal and cyclical outreach.** The Master PRD mentions seasonal outreach. Are there known seasonal patterns in CBM's business? What triggers seasonal campaigns?

10. **Success metrics.** How does CBM measure reactivation effectiveness? Re-engagement rate, application rate, conversion to active client, time from outreach to application?

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Domain-Overview-ClientRecruiting.docx** — the parent CR Domain Overview (from `PRDs/CR/` in CBM repo)
2. **CBM-Master-PRD.docx** — the Master PRD (from `PRDs/` root in CBM repo)
3. **CBM-Entity-Inventory.docx** — the Entity Inventory (from `PRDs/` root in CBM repo)
4. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/` in CBM repo)
5. **Account-Entity-PRD.docx** — the Account Entity PRD (from `PRDs/entities/` in CBM repo)
6. **Engagement-Entity-PRD.docx** — the Engagement Entity PRD (from `PRDs/entities/` in CBM repo) — needed because CR-REACTIVATE references former client engagement records

## Output

Produce the CR-REACTIVATE Sub-Domain Overview as a Word document and commit to:
`PRDs/CR/REACTIVATE/CBM-SubDomain-Overview-Reactivate.docx`

Also produce a session prompt for the CR-REACTIVATE-OUTREACH process definition session and commit to `PRDs/CR/REACTIVATE/`.

## After This Session

With the CR-REACTIVATE Sub-Domain Overview complete:

- All four CR Sub-Domain Overviews are finished
- CR process definition (Phase 4) begins within each sub-domain, following the production order established in the Domain Overview: CR-PARTNER-PROSPECT → CR-PARTNER-MANAGE → CR-MARKETING-CONTACTS → CR-MARKETING-CAMPAIGNS → CR-EVENTS-MANAGE → CR-EVENTS-CONVERT → CR-REACTIVATE-OUTREACH
- Each process session receives its Sub-Domain Overview as the primary input
