# Session Prompt: CR-EVENTS-MANAGE Process Definition

## Context

I'm working on the CBM CRM implementation. The CR-EVENTS Sub-Domain Overview v1.0 is complete and committed. This session produces the **first** of the two CR-EVENTS process documents: **CR-EVENTS-MANAGE — Event Lifecycle Management** (Phase 4).

Per the Document Production Process v1.7, each process document follows the 11-section structure defined in the interview-process-definition guide. The Sub-Domain Overview is the primary input — the parent Domain Overview is not re-uploaded into process conversations.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the Document Production Process at `PRDs/process/CRM-Builder-Document-Production-Process.docx` in the crmbuilder repo (Phase 4 section)
3. Read the interview guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo
4. Read the generator template at `PRDs/process/templates/generate-process-doc-template.js` in the crmbuilder repo
5. Read all documents uploaded with this prompt

## Process Scope

**CR-EVENTS-MANAGE — Event Lifecycle Management**

Covers the full operational lifecycle of an event from initial planning through the recording of final attendance: creating the Event record, publishing registration, managing registrations (including walk-ins), sending confirmations and reminders, coordinating with partners on co-sponsored events, tracking presenters, delivering the event, and recording attendance.

This process owns the operational rules for event registration as a Contact-creation pathway, the attendance capture mechanism, and presenter/partner coordination touchpoints.

## Scope Boundaries (set by CR-EVENTS Sub-Domain Overview v1.0)

**In scope:**

- Event record creation and full status lifecycle (six values: Draft / Scheduled / In Progress / Completed / Cancelled / Postponed)
- Three event formats (In-Person, Virtual, Hybrid) through a single unified record model; Hybrid is aspirational in v1.0
- CRM-hosted event registration form following the Universal Contact-Creation Rules
- Walk-in registration path (in-person events)
- No capacity enforcement, no waitlist (venueCapacity is informational only)
- Transactional event communications (confirmations on registration create, format-specific reminders) authored and sent from the CRM
- Registrant self-cancellation via link in confirmation email
- Attendance capture per Event Registration (binary: Attended / No-Show); specific UX mechanism is this process's decision
- Presenter coordination via Contact records with contactType including Presenter; new fields presenterBio and presenterTopics
- Partner co-sponsorship via Event.coSponsoringPartners link-multiple (link only; no co-sponsorship-specific fields; no automated notification)
- Optional recordingUrl link on Event (recording/publishing itself is out of scope)

**Out of scope:**

- Post-event follow-up communications and conversion tracking → owned by CR-EVENTS-CONVERT
- Event feedback surveys → deferred to future Survey Service (CR-EVENTS-ISS-001)
- Recording and publishing to an LMS or library → downstream activity outside the CRM
- Application-handoff when registrant later applies → owned by MN-INTAKE v2.3
- Partner-level co-sponsorship reports → definition owned by CR-PARTNER-MANAGE

## Key Decisions to Pick Up

From the CR-EVENTS Sub-Domain Overview Section 8 interview transcript, the following are already settled and should be reflected directly in requirements rather than re-opened:

- 6-value Event.status lifecycle
- 10-value Event.topic enum
- Event fields: name, dateStart, dateEnd, status, description, format, topic, venueCapacity, location, virtualMeetingUrl, registrationUrl, recordingUrl, presenters, coSponsoringPartners, documents
- Event Registration fields: event, contact, registrationDate, registrationSource (Online / Walk-In), attendanceStatus (Registered / Attended / No-Show / Cancelled)
- Contact new fields: presenterBio (wysiwyg), presenterTopics (multiEnum aligned with Event.topic)
- Hardcoded contactType = Client on the registration form for new Contacts
- Update-only-if-blank on email match
- Point 1 source attribution (Workshop or Event + event name in sourceAttributionDetails) at new-Contact creation
- No automated notification to Partner Coordinator on co-sponsorship linkage

## Key Questions to Address

The interview should focus on turning the settled scope into requirements and filling in the operational detail the SDO left to process definition:

1. **Event creation workflow.** Who creates Event records? What fields are required at Draft vs. Scheduled? Dynamic logic rules for format-based field visibility (location for In-Person/Hybrid, virtualMeetingUrl for Virtual/Hybrid).

2. **Status transition rules.** Who can perform which transitions? Is Draft → Scheduled gated on any required-field checks? Does Scheduled → In Progress fire automatically at dateStart, manually, or both? Does In Progress → Completed fire automatically at dateEnd? Is there a separate "attendance recorded" flag or sub-state?

3. **Registration form behavior.** Exact field list on the CRM-hosted form. How does the website-domain Account precedence ladder apply (from CR-MARKETING SDO v1.2 Section 4.3)? What happens when registration is attempted for an event in Draft status, or after dateEnd has passed?

4. **Walk-in registration UX.** How is the walk-in flow actually executed? A dedicated quick-add form, a slightly modified version of the online form, a list-view action from the event detail page? What's required at minimum?

5. **Confirmation and reminder mechanics.** Exact trigger events, timing per format, template structure, variable substitution, opt-out handling (how does CR-MARKETING emailOptOut interact with transactional event communications?).

6. **Self-cancellation flow.** What does the cancellation link do? Does it require authentication? Does it prompt for a reason? Is a confirmation message sent back?

7. **Attendance capture mechanism.** Day-of check-in view vs. post-event bulk update — which is the primary UX? For virtual events, platform-export import vs. manual entry — does this process define both, or just one?

8. **Presenter assignment workflow.** When is a Contact marked with contactType = Presenter — at Event assignment time, or earlier? How does the Content and Event Administrator find an available presenter? Does the presenterTopics multiEnum drive any search or filtering?

9. **Co-sponsorship linkage workflow.** How does the Content and Event Administrator link a partner Account as co-sponsor? Is there any validation (must be accountType = Partner, must be partnerStatus = Active)?

10. **Event documents.** What types of documents are attached? Are there access controls (e.g., some documents only visible to staff, others public-facing)? How do registrants access public documents — through the registration confirmation, a separate portal, or somewhere else?

11. **Operational reports and dashboard.** Finalize the seven operational metrics from the SDO (upcoming events, registration pacing, registration-to-attendance rate, no-show trends, presenter activity, partner co-sponsorship activity, cancellation trends) into specific report definitions.

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-SubDomain-Overview-Events.docx** — this sub-domain's Overview (from `PRDs/CR/EVENTS/` in CBM repo) — primary input
2. **CBM-SubDomain-Overview-Marketing.docx** — for the Universal Contact-Creation Rules and Account precedence ladder (from `PRDs/CR/MARKETING/`)
3. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/`)
4. **Account-Entity-PRD.docx** — the Account Entity PRD (from `PRDs/entities/`)

## Output

Produce the CR-EVENTS-MANAGE process document as a Word document and commit to:
`PRDs/CR/EVENTS/CR-EVENTS-MANAGE.docx`

Also produce a session prompt for the second CR-EVENTS process (CR-EVENTS-CONVERT) if the carry-forward from CR-EVENTS-MANAGE materially changes what the existing CR-EVENTS-CONVERT session prompt should contain. Otherwise the existing CR-EVENTS-CONVERT session prompt at `PRDs/CR/EVENTS/SESSION-PROMPT-CR-EVENTS-CONVERT.md` is used as-is.

## After This Session

- CR-EVENTS-CONVERT process definition follows, consuming the Event and Event Registration field/attendance rules established here
- CR Domain Reconciliation (Phase 5) follows after CR-REACTIVATE is complete
- Four Entity PRDs eligible for Phase 2b: Event, Event Registration, plus the previously deferred Campaign, Campaign Group, Campaign Engagement, Segment from the CR-MARKETING sub-domain
