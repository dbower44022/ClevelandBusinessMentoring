# Session Prompt: CR-EVENTS-CONVERT Process Definition

## Context

I'm working on the CBM CRM implementation. The CR-EVENTS Sub-Domain Overview v1.0 is complete, and the CR-EVENTS-MANAGE process document v1.0 is complete. This session produces the **second and final** CR-EVENTS process document: **CR-EVENTS-CONVERT — Post-Event Follow-Up and Conversion** (Phase 4).

Per the Document Production Process v1.7, each process document follows the 11-section structure defined in the interview-process-definition guide. The Sub-Domain Overview and the preceding CR-EVENTS-MANAGE process document are the primary inputs.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Document Production Process at `PRDs/process/CRM-Builder-Document-Production-Process.docx` in the crmbuilder repo (Phase 4 section)
3. Read the interview guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo
4. Read the generator template at `PRDs/process/templates/generate-process-doc-template.js` in the crmbuilder repo
5. Read all documents uploaded with this prompt

## Process Scope

**CR-EVENTS-CONVERT — Post-Event Follow-Up and Conversion**

Covers what happens after an event ends: triggering post-event follow-up communications to attendees and no-shows, tracking attendee-to-applicant conversion through the Contact record, handing off unconverted attendees to the Reactivation sub-domain as warm leads, and producing event effectiveness analytics.

## Scope Boundaries (set by CR-EVENTS Sub-Domain Overview v1.0)

**In scope:**

- Automated post-event thank-you and we-missed-you communications, sent within approximately 24 hours of event end
- Separate follow-up tracks for attendees and no-shows (different content and call-to-action); no follow-up for cancellations
- Manual conversion-push outreach to targeted unconverted attendees (next-event invites, ready-to-apply messages)
- Attendee-to-applicant conversion detection via the Contact record (Contact with at least one Event Registration at attendanceStatus = Attended, plus an Account at clientStatus = Applicant or further)
- Configurable conversion window (default 180 days)
- Effectiveness reporting across five dimensions: per event, by topic, by format, by partner co-sponsorship, by geography (geography dependent on CR-MARKETING-ISS-001)
- Handoff of unconverted attendees to the Reactivation sub-domain (reference only, not a status change)

**Out of scope:**

- Event creation, registration, delivery, attendance capture → owned by CR-EVENTS-MANAGE
- Event feedback surveys → deferred to future Survey Service (CR-EVENTS-ISS-001)
- Application-handoff mechanics when an attendee applies → owned by MN-INTAKE v2.3
- Cross-sub-domain channel effectiveness comparison → owned by CR Domain Reconciliation (Phase 5)
- Reactivation outreach execution → owned by the CR-REACTIVATE-OUTREACH process once defined

## Key Decisions to Pick Up

From the CR-EVENTS Sub-Domain Overview Section 8 interview transcript, these are settled:

- Hybrid follow-up timing model: automated thank-you and we-missed-you emails, plus manual conversion-push outreach
- Ownership split: Content and Event Administrator owns through the handoff to the Reactivation sub-domain; Client Recruiter owns from there
- No additional attendance fields required on Event Registration; the Attended status plus the Contact linkage is the entire detection substrate
- No new MN-INTAKE fields required for conversion tracking

## Carry-Forward from CR-EVENTS-MANAGE v1.0

The following decisions from the MANAGE process document directly affect questions this session needs to answer and should be treated as authoritative context:

- **All Event status transitions are fully manual.** Event.status = Completed reflects administrative discipline, not a system-enforced reality tied to dateEnd. This has two direct implications for this session: (1) Event.status = Completed is not a reliable trigger for post-event follow-up communications; (2) reports that ask time-window questions use date fields (dateEnd), and reports that ask lifecycle-intent questions use status values.

- **Transactional event communications ignore the Contact emailOptOut flag.** Confirmations and reminders are treated as transactional — a registrant who opted out of marketing still receives them. The session prompt question on post-event follow-up opt-out handling must explicitly address where the thank-you and we-missed-you emails fall on the transactional-versus-marketing line, because the framing may change per message type (a thank-you and a "here's the recording" message read as transactional; a "here's our next event" message drifts into marketing).

- **No self-cancellation mechanism exists.** Registrants cannot cancel through a link; all cancellations are staff-initiated. This does not directly affect this process (cancellations receive no follow-up per the SDO) but informs the expected state space of Event Registrations reaching post-event follow-up.

- **Six new fields were added to Event Registration in MANAGE v1.0.** Of these, three are directly useful to this process: `lastCommunicationBouncedAt` (relevant for follow-up send suppression), `remindersSent` (for pre-event engagement signals), and `confirmationSentAt` (for audit completeness). The cancellation fields (`cancellationDate`, `cancellationReason`) and `specialRequests` are not expected to influence follow-up decisions but are present in the model.

- **Email send-from address is a dedicated CBM operational events address**, configured at implementation time. Post-event follow-up emails should be assumed to send from the same address unless a specific reason exists to separate them.

- **Hard-bounce handling is pass-through** (logged, no automatic state change) pending resolution of CR-MARKETING-ISS-004. Post-event follow-up sends to addresses that hard-bounced during MANAGE should consider this context — a design choice that sends repeatedly to bouncing addresses wastes send budget and risks sender reputation.

## Key Questions to Address

The interview should turn the settled scope into requirements and fill in the operational detail left to process definition:

1. **Automated follow-up triggers — revised framing.** Given that Event.status = Completed is manual and unreliable, what is the primary trigger for the thank-you and we-missed-you sends? Candidates: dateEnd + N hours elapsed with at least one Event Registration at Attended or No-Show (an "attendance-has-been-captured" proxy); an explicit "Send Post-Event Emails" action the Administrator invokes manually; or a scheduled evaluation that fires once dateEnd + 24 hours has passed and at least some attendance has been recorded. What happens when attendance is recorded late (days after dateEnd) — does the system still send? Does it suppress sends to registrations still at attendanceStatus = Registered at the time of fire, or treat them as No-Show?

2. **Post-event follow-up opt-out handling — direct question inherited from MANAGE.** Does the thank-you/recording-link email honor Contact.emailOptOut, or treat it as transactional? Does the we-missed-you email honor it? Does the manual conversion-push outreach honor it? The answer may vary by message type. This question does not have an obvious default — it requires deliberate framing.

3. **Follow-up template structure.** Fields needed on the Event to parameterize follow-up communications. Does the Event need a `nextEventSuggestion` link-single pointer to the next recommended event of this topic? Does it need a `postEventRecordingUrl` distinct from the MANAGE-defined `recordingUrl` (which is visible during the event)? Or is the existing `recordingUrl` sufficient?

4. **Manual conversion-push outreach.** How does the Content and Event Administrator select the target list for a manual push? A saved list filtered by attendee status, unconverted status, and recency? Do they author messages ad hoc, or from templates? Do these sends count as Campaign records (the CR-MARKETING entity introduced in CR-MARKETING-CAMPAIGNS v1.0) or as a distinct communication type? The answer affects whether campaign-performance metrics include this outreach.

5. **Conversion detection implementation.** How is the Contact-to-application linkage detected? Is there a computed field on Contact (e.g., `hasApplied` boolean), a report that joins Contact to Account through the clientStatus condition, or a scheduled materialized field updated nightly? Are conversion reports refreshed on demand or on a schedule?

6. **Conversion window mechanics.** How is the window applied in reports — from Event.dateEnd, from Event Registration creation date, or from attendance recording date? What is the default window boundary in the UI? What is the default view — this-event-only, trailing-12-months, year-to-date?

7. **Reactivation handoff mechanism.** How is an unconverted attendee operationally "handed off" to the Reactivation sub-domain? Candidates: a saved list or segment that the Client Recruiter's Reactivation workflow consumes; a flag on Event Registration or Contact (e.g., `eligibleForReactivation` bool); a scheduled query that populates a Reactivation-owned segment. This is the single most important interface decision in this process, and it sets a dependency for CR-REACTIVATE-OUTREACH.

8. **Effectiveness report definitions.** Lock in the five reporting dimensions (per event, by topic, by format, by partner co-sponsorship, by geography). What are the specific metrics per dimension (registrations, attendance, no-show rate, conversion count, conversion rate, median days from event to application)? How are they surfaced — a dashboard section, standalone reports, exportable summaries? Where do these reports live relative to the seven operational reports defined in CR-EVENTS-MANAGE (separate report folder, combined reporting section)?

9. **Geography reporting with free-text location.** Until CR-MARKETING-ISS-001 is resolved, the geography dimension uses free-text Event.location. How does the report group free-text values — simple exact match, substring match on city or state, or is grouping not attempted and values shown as-is with a note in the report description? What reporting utility does the free-text approach realistically provide until the structured taxonomy lands?

10. **Event comparison views.** Does the Content and Event Administrator need head-to-head comparison (two or more events side-by-side) beyond roll-ups, or are roll-ups sufficient?

11. **Contribution to the cross-sub-domain channel effectiveness report.** What data does this process need to expose to the cross-sub-domain channel effectiveness reports owned by CR Domain Reconciliation? Pre-aggregated metrics, raw attribution data, or both? Is there a materialized view or summary table that this process maintains for that downstream consumption?

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-SubDomain-Overview-Events.docx** — this sub-domain's Overview (from `PRDs/CR/EVENTS/`) — primary input
2. **CR-EVENTS-MANAGE.docx** — the preceding process document v1.0 (from `PRDs/CR/EVENTS/`) — primary input
3. **CBM-SubDomain-Overview-Marketing.docx** — for layered authority policy and howDidYouHearAboutCbm rules (from `PRDs/CR/MARKETING/`)
4. **CR-MARKETING-CAMPAIGNS.docx** — for the Campaign, Campaign Group, and Campaign Engagement entity model referenced in Question 4 (from `PRDs/CR/MARKETING/`)
5. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/`)
6. **MN-INTAKE.docx** — for the application-handoff reference (from `PRDs/MN/`)

## Output

Produce the CR-EVENTS-CONVERT process document as a Word document and commit to:
`PRDs/CR/EVENTS/CR-EVENTS-CONVERT.docx`

## After This Session

- CR-EVENTS sub-domain process definition is complete after this session
- CR-REACTIVATE sub-domain work begins next (starting with the CR-REACTIVATE Sub-Domain Overview, then the CR-REACTIVATE process document or documents)
- Six Phase 2b Entity PRDs become eligible for work once CR-EVENTS is complete: Event, Event Registration, plus the previously deferred Marketing Campaign, Campaign Group, Campaign Engagement, Segment
- CR Domain Reconciliation (Phase 5) follows after all four CR sub-domains have completed process definition
