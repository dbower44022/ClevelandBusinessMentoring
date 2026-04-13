# Session Prompt: CR-EVENTS-CONVERT Process Definition

## Context

I'm working on the CBM CRM implementation. The CR-EVENTS Sub-Domain Overview v1.0 is complete, and the CR-EVENTS-MANAGE process document should be complete before this session begins. This session produces the **second and final** CR-EVENTS process document: **CR-EVENTS-CONVERT — Post-Event Follow-Up and Conversion** (Phase 4).

Per the Document Production Process v1.7, each process document follows the 11-section structure defined in the interview-process-definition guide. The Sub-Domain Overview and the preceding CR-EVENTS-MANAGE process document are the primary inputs.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Document Production Process at `PRDs/process/CRM-Builder-Document-Production-Process.docx` in the crmbuilder repo (Phase 4 section)
3. Read the interview guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo
4. Read the generator template at `PRDs/process/templates/generate-process-doc-template.js` in the crmbuilder repo
5. Read all documents uploaded with this prompt

## Process Scope

**CR-EVENTS-CONVERT — Post-Event Follow-Up and Conversion**

Covers what happens after an event ends: triggering post-event follow-up communications to attendees and no-shows, tracking attendee-to-applicant conversion through the Contact record, handing off unconverted attendees to CR-REACTIVATE as warm leads, and producing event effectiveness analytics.

## Scope Boundaries (set by CR-EVENTS Sub-Domain Overview v1.0)

**In scope:**

- Automated post-event thank-you and we-missed-you communications, sent within approximately 24 hours of event end
- Separate follow-up tracks for attendees and no-shows (different content and call-to-action); no follow-up for cancellations
- Manual conversion-push outreach to targeted unconverted attendees (next-event invites, ready-to-apply messages)
- Attendee-to-applicant conversion detection via the Contact record (Contact with attendanceStatus = Attended Event Registration + Account at clientStatus = Applicant or further)
- Configurable conversion window (default 180 days)
- Effectiveness reporting across five dimensions: per event, by topic, by format, by partner co-sponsorship, by geography (geography dependent on CR-MARKETING-ISS-001)
- Handoff of unconverted attendees to CR-REACTIVATE-OUTREACH (reference only, not a status change)

**Out of scope:**

- Event creation, registration, delivery, attendance capture → owned by CR-EVENTS-MANAGE
- Event feedback surveys → deferred to future Survey Service (CR-EVENTS-ISS-001)
- Application-handoff mechanics when an attendee applies → owned by MN-INTAKE v2.3
- Cross-sub-domain channel effectiveness comparison → owned by CR Domain Reconciliation (Phase 5)
- Reactivation outreach execution → owned by CR-REACTIVATE-OUTREACH

## Key Decisions to Pick Up

From the CR-EVENTS Sub-Domain Overview Section 8 interview transcript, these are settled and should be reflected directly in requirements:

- Hybrid follow-up timing (auto thank-you/we-missed-you + manual conversion pushes)
- Ownership split: Content and Event Administrator owns through the CR-REACTIVATE handoff; Client Recruiter owns from there
- No additional attendance fields required on Event Registration; the Attended status + Contact linkage is the entire detection substrate
- No new MN-INTAKE fields required for conversion tracking

## Key Questions to Address

The interview should turn the settled scope into requirements and fill in the operational detail the SDO left to process definition:

1. **Automated follow-up triggers.** Exact trigger event (Event status = Completed? dateEnd + N hours? attendance recording flag?). How does the system distinguish attendees from no-shows when sending? What happens if attendance is recorded late?

2. **Follow-up template structure.** Fields needed on the Event to parameterize the follow-up communications (custom next-event CTA link, custom survey link once Survey Service exists, recordingUrl inclusion logic).

3. **Manual conversion-push outreach.** How does the Content and Event Administrator select the target list? A list view filtered by attendee status, unconverted status, and recency? Do they author messages ad hoc, or use templates? Do these sends count as Campaigns (CR-MARKETING entity) or something else?

4. **Conversion detection implementation.** How is the Contact-to-application linkage queried? Is there a computed field on Contact (e.g., `hasEverAttendedEvent` boolean)? Are conversion reports refreshed on demand or on a schedule?

5. **Conversion window mechanics.** How is the window applied in reports — from Event.dateEnd, or from Event Registration creation date, or from attendance recording date? What's the default view in the UI?

6. **CR-REACTIVATE handoff mechanism.** How is an unconverted attendee "handed off"? A saved list or segment populated by a scheduled query? A flag on Event Registration or Contact? A report the Client Recruiter subscribes to? This is the single most important interface decision in this process.

7. **Effectiveness report definitions.** Lock in the five reporting dimensions (per event, by topic, by format, by partner co-sponsorship, by geography). What are the specific metrics per dimension? How are they surfaced — a dashboard section, standalone reports, exportable summaries?

8. **Geography reporting with free-text location.** Until CR-MARKETING-ISS-001 is resolved, the geography dimension uses free-text Event.location. How does the report group free-text values — simple exact match, substring match on city/state, or is grouping not attempted?

9. **Event comparison views.** Does the Content and Event Administrator need head-to-head comparison (two or more events side-by-side) beyond roll-ups, or are roll-ups sufficient?

10. **Contribution to CR domain channel reports.** What data does CR-EVENTS-CONVERT need to expose to the cross-sub-domain channel effectiveness reports owned by CR Domain Reconciliation? Pre-aggregated metrics, raw attribution data, or both?

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-SubDomain-Overview-Events.docx** — this sub-domain's Overview (from `PRDs/CR/EVENTS/`) — primary input
2. **CR-EVENTS-MANAGE.docx** — the preceding process document (from `PRDs/CR/EVENTS/`) — primary input
3. **CBM-SubDomain-Overview-Marketing.docx** — for layered authority policy context and howDidYouHearAboutCbm rules (from `PRDs/CR/MARKETING/`)
4. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/`)
5. **MN-INTAKE.docx** — for the application-handoff reference (from `PRDs/MN/`)

## Output

Produce the CR-EVENTS-CONVERT process document as a Word document and commit to:
`PRDs/CR/EVENTS/CR-EVENTS-CONVERT.docx`

## After This Session

- CR-EVENTS sub-domain process definition is complete after this session
- CR-REACTIVATE sub-domain work begins next (starting with the CR-REACTIVATE Sub-Domain Overview, then the single CR-REACTIVATE-OUTREACH process document)
- Four Phase 2b Entity PRDs become eligible for work once CR-EVENTS is complete: Event, Event Registration, plus the previously deferred Campaign, Campaign Group, Campaign Engagement, Segment
- CR Domain Reconciliation (Phase 5) follows after all four CR sub-domains have completed process definition
