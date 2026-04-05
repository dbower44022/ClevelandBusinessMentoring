# Session Prompt: CR-EVENTS Sub-Domain Overview

## Context

I'm working on the CBM CRM implementation. The CR Domain Overview v1.0 is complete, establishing the Client Recruiting domain's sub-domain structure, 7-process inventory, dependency ordering, cross-sub-domain handoffs, and shared audience strategy. The CR-PARTNER and CR-MARKETING Sub-Domain Overviews should also be complete before this session begins.

This session produces the CR-EVENTS Sub-Domain Overview — the third of four Sub-Domain Overview documents for the CR domain. Per the Document Production Process, Sub-Domain Overviews follow the standard Domain Overview structure (purpose, personas, process inventory with dependency ordering, and data reference) scoped to the sub-domain. The Sub-Domain Overview is the primary input for process definition conversations within the sub-domain, replacing the parent Domain Overview for that purpose.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Document Production Process at `PRDs/process/CRM-Builder-Document-Production-Process.docx` in the crmbuilder repo (Phase 3 section)
3. Read the interview guide for process definition at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo (for general interview approach)
4. Read all documents uploaded with this prompt

## Sub-Domain Scope

**CR-EVENTS — Workshops and Event Management (Important tier)**

The planning, delivery, and follow-up of all client-facing events in both in-person and virtual formats. In-person events include workshops, seminars, open houses, speaking engagements, pop-up presence at community events, business expos, and community college and trade school visits. Virtual events include webinars and online workshops. Covers event logistics, registration, attendance tracking, post-event follow-up, and conversion tracking from attendee to applicant.

## Processes in This Sub-Domain

| # | Code | Process Name | Description |
|---|---|---|---|
| 1 | CR-EVENTS-MANAGE | Event Lifecycle Management | Creating event records, publishing registration, managing registrations and waitlists, sending confirmations and reminders, coordinating with partners on co-sponsored events, tracking presenters, delivering the event, and recording final attendance. |
| 2 | CR-EVENTS-CONVERT | Post-Event Follow-Up and Conversion | Triggering follow-up communications to attendees, tracking attendee-to-applicant conversion, feeding unconverted attendees into CR-REACTIVATE, and producing event effectiveness analytics. |

**Dependency:** CR-EVENTS-MANAGE must be defined before CR-EVENTS-CONVERT.

## Personas

From the CR Domain Overview, the following personas participate in the CR-EVENTS sub-domain:

| ID | Persona | CR-EVENTS Role |
|---|---|---|
| MST-PER-009 | Content and Event Administrator | Primary operator for both processes. Plans, manages, and reports on events. |
| MST-PER-008 | Partner Coordinator | Coordinates co-sponsored events. Links partner organizations to event records. |
| MST-PER-003 | Client Administrator | Processes client applications generated through event attendance. Handoff to MN domain. |
| MST-PER-013 | Client | Registers for and attends events. Target of post-event follow-up and conversion. |

## Entities

From the CR Domain Overview and Entity Inventory, the following entities participate in the CR-EVENTS sub-domain:

| CRM Entity | Type | Entity PRD | CR-EVENTS Role |
|---|---|---|---|
| Event | Custom Event | Deferred | Workshops, seminars, webinars, and events. Entity PRD depends on CR-EVENTS process documents. Legacy CR Domain PRD describes anticipated fields (title, date/time, format, topic, presenter, capacity, status, co-sponsoring partners, documents). |
| Event Registration | Custom Base | Deferred | Individual registrations linking contacts to events with attendance tracking. Entity PRD depends on CR-EVENTS process documents. Legacy CR Domain PRD describes anticipated fields (event link, contact link, registration date, attendance status, source). |
| Contact | Native Person | v1.1 | Event registrants and attendees. Presenter contactType. New contact records created for registrants not already in the CRM. |
| Account | Native Company | v1.0 | Partner organizations linked as co-sponsors to events. |

## Cross-Sub-Domain Touchpoints

From the CR Domain Overview:

- **CR-PARTNER → CR-EVENTS:** Partners co-sponsor events. Event records link to partner organization Account records.
- **CR-MARKETING → CR-EVENTS:** Marketing campaigns promote events. Registrants may come from marketing contact lists.
- **CR-EVENTS-CONVERT → CR-REACTIVATE:** Unconverted event attendees (attended but did not apply) become warm leads for reactivation outreach.
- **CR-EVENTS → MN-INTAKE:** Application submission is the handoff boundary. Application source attribution records which event produced the applicant.

## Key Questions to Address

1. **Event record detail.** What fields does an event record need? Validate the legacy list (title, date/time, format, topic, presenter, capacity, status) and identify any additions. What are the event type and topic/category values?

2. **Event formats and workflow differences.** The Master PRD distinguishes in-person and virtual events. How do workflows differ between formats — registration, delivery, attendance tracking, recording/LMS publishing?

3. **Registration workflow.** How does registration work? Website form → CRM record creation? What about walk-ins for in-person events? Waitlist management when capacity is reached? Confirmation and reminder communications?

4. **Contact creation at registration.** When a registrant is not already in the CRM, a new Contact record is created. What contactType is assigned? What happens if the registrant later applies — does the contact record transition, or is it already correctly typed?

5. **Presenter tracking.** How are presenters managed? Are they always Contact records in the CRM, or can external presenters be tracked without a Contact record? What Presenter-specific fields are needed?

6. **Attendance tracking.** How is attendance recorded? Different approaches for in-person (check-in list) vs. virtual (platform attendance data)? What are the attendance status values?

7. **Post-event follow-up.** What communications are triggered after an event? Different follow-up for attendees vs. no-shows? What is the timeline and who manages it?

8. **Conversion tracking.** How does CBM determine that an event attendee has converted to an applicant? Is it a direct linkage (event registration → application), a time-based correlation, or self-reported?

9. **Event analytics.** What metrics does the Content and Event Administrator track? Registrations, attendance, no-show rates, conversion rates — anything else? By what dimensions (event type, geography, partner co-sponsorship)?

10. **Co-sponsored event specifics.** When a partner co-sponsors an event, what data is captured about the co-sponsorship? Is it just a link, or are there co-sponsorship-specific fields (partner contribution, role)?

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Domain-Overview-ClientRecruiting.docx** — the parent CR Domain Overview (from `PRDs/CR/` in CBM repo)
2. **CBM-Master-PRD.docx** — the Master PRD (from `PRDs/` root in CBM repo)
3. **CBM-Entity-Inventory.docx** — the Entity Inventory (from `PRDs/` root in CBM repo)
4. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/` in CBM repo)
5. **Account-Entity-PRD.docx** — the Account Entity PRD (from `PRDs/entities/` in CBM repo)

## Output

Produce the CR-EVENTS Sub-Domain Overview as a Word document and commit to:
`PRDs/CR/EVENTS/CBM-SubDomain-Overview-Events.docx`

Also produce a session prompt for each of the two CR-EVENTS process definition sessions (CR-EVENTS-MANAGE, CR-EVENTS-CONVERT) and commit to `PRDs/CR/EVENTS/`.

## After This Session

With the CR-EVENTS Sub-Domain Overview complete:

- The two CR-EVENTS process definitions follow (CR-EVENTS-MANAGE first, then CR-EVENTS-CONVERT)
- Each process session receives the Sub-Domain Overview as its primary input
- The parent Domain Overview is not uploaded into individual process conversations
