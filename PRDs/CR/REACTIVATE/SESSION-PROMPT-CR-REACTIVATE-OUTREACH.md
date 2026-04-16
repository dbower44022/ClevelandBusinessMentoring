# Session Prompt: CR-REACTIVATE-OUTREACH Process Document

## Context

I'm working on the CBM CRM implementation. All four CR sub-domains now have completed Sub-Domain Overviews. CR-REACTIVATE-OUTREACH is the seventh and final CR process document, covering reactivation outreach across three populations: former clients, unconverted event attendees, and inactive marketing prospects.

This is a Phase 4 Process Definition session. The process document follows the nine required sections defined in the Document Production Process v1.7 Section 3.4 (Process Definition Activity) and the interview guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the process definition interview guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo
3. Read all documents uploaded with this prompt

## Key Decisions Already Made (from the Sub-Domain Overview)

The CR-REACTIVATE Sub-Domain Overview v1.0 resolved all major architectural decisions through its interview. The process document should implement these decisions, not re-litigate them:

1. **Populations in scope (v1.0):** Former clients (Completed or Abandoned Engagements), unconverted event attendees (inherited from CR-EVENTS-CONVERT), inactive marketing prospects (lapsed marketing engagement). Two populations explicitly deferred: incomplete applications and referral requests to former clients.

2. **Personas:** Client Recruiter (MST-PER-007) primary operator, Client Administrator (MST-PER-003) supporting (configuration and oversight), Client (MST-PER-013) subject.

3. **Segmentation model:** Hybrid — saved-list queries computed on read for candidate identification, ad-hoc Contact selection at send time. Three saved-list queries defined in the SDO Section 4.2.

4. **Outreach execution mechanism:** Campaign records with channel = Reactivation. Campaign.channel enum expanded from {Email, SMS} to {Email, SMS, Reactivation}. Campaign entity shared with CR-MARKETING-CAMPAIGNS.

5. **Cadence:** 90-day minimum gap between reactivation sends to the same Contact (informational warning, not blocking). No maximum attempt count. No cross-sub-domain cooling-off enforcement; best-practice recommendation for 30-day cross-channel gap.

6. **Response tracking:** Campaign Engagement for passive engagement (opens/clicks/bounces). Organic exit through saved-list query criteria for active re-engagement (application submission, event re-registration). Manual opt-out by Client Recruiter (sets emailOptOut/smsOptOut). No reactivationOutcome field.

7. **Terminal states:** None explicit in v1.0. Organic exit conditions sufficient.

8. **Data model:** One new Contact field (lastReactivationSentAt). Campaign.channel enum expansion. No new entities. Seven existing entities consumed.

9. **Reporting:** Three owned reports (Campaign Performance, Population Summary, Conversion Attribution). Data contributions to two externally-owned reports.

## Key Questions Remaining for Process Definition

The SDO resolved the "what" and "why." The process document resolves the "how" — the operational workflow detail. Key areas to address:

1. **Workflow steps for each activity stream.** The SDO describes three activity streams (candidate identification, outreach execution, response tracking and reporting). The process document specifies the numbered workflow steps within each stream — what the Client Recruiter does, in what order, and what system actions fire at each step.

2. **Campaign composition mechanics.** How does the Client Recruiter create a reactivation Campaign? Is it a standard Campaign creation flow with channel pre-set to Reactivation, or a dedicated "Reactivation Campaign" action? What fields does the Campaign record include beyond those already defined by CR-MARKETING-CAMPAIGNS?

3. **Template library.** Population-specific templates are mentioned in the SDO. How many starter templates are needed per population? What variable substitution is available? Who creates and maintains templates?

4. **Batch selection workflow.** The Client Recruiter opens a saved list, reviews members, and selects a subset. What does this UX look like? Can the Recruiter apply additional filters within the saved list (by geography, by recency, by industry)? How does the 90-day informational warning present?

5. **Send mechanics.** When the Client Recruiter sends a reactivation Campaign, what system actions fire? Create Campaign record, create Campaign Engagement per recipient, send emails, write lastReactivationSentAt on each Contact. What is the send-from address? Same as CR-MARKETING-CAMPAIGNS or a dedicated reactivation address?

6. **Transactional vs. marketing classification.** Reactivation Campaigns honor emailOptOut (they are marketing, not transactional). Confirm this is correct and consistent with the SDO.

7. **Opt-out and compliance handling.** emailOptOut Contacts are excluded from saved-list query defaults but the Client Recruiter can override. What happens if the Recruiter deliberately includes an opted-out Contact? Warning only, or hard block?

8. **Reporting detail.** The three reports are described at summary level in the SDO. The process document specifies the exact fields and groupings per report.

9. **System requirements.** Formal REQ-NNN requirements for saved-list queries, Campaign creation, Campaign send, lastReactivationSentAt population, informational warning, reports.

10. **Data items.** Process Data (existing fields consumed) and Data Collected (new fields created/updated) at the field-level detail standard.

11. **Edge cases.** What happens when a Contact appears on multiple saved lists? What happens when a Contact converts mid-batch (between batch composition and send)? What happens when a Campaign has zero eligible recipients after opt-out filtering?

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-SubDomain-Overview-Reactivate.docx** — the CR-REACTIVATE Sub-Domain Overview (from `PRDs/CR/REACTIVATE/`)
2. **CR-EVENTS-CONVERT.docx** — for the Reactivation Candidates handoff contract and conversion-push pattern as reference architecture (from `PRDs/CR/EVENTS/`)
3. **CR-MARKETING-CAMPAIGNS.docx** — for the Campaign / Campaign Engagement model as the reference for Campaign creation and send mechanics (from `PRDs/CR/MARKETING/`)
4. **CR-MARKETING-CONTACTS.docx** — for the Contact marketing roll-up fields and segmentation patterns (from `PRDs/CR/MARKETING/`)
5. **CBM-Master-PRD.docx** — for Universal Contact-Creation Rules and persona definitions (from `PRDs/`)
6. **Contact-Entity-PRD.docx** — for Contact fields (from `PRDs/entities/`)
7. **Account-Entity-PRD.docx** — for Account fields (from `PRDs/entities/`)
8. **Engagement-Entity-PRD.docx** — for Engagement closure statuses (from `PRDs/entities/`)
9. **MN-INTAKE.docx** — for the prospect-to-applicant handoff mechanics (from `PRDs/MN/`)

## Output

Produce the CR-REACTIVATE-OUTREACH process document as a Word document and commit to:
`PRDs/CR/REACTIVATE/CR-REACTIVATE-OUTREACH.docx`

## After This Session

* CR-REACTIVATE-OUTREACH v1.0 will complete all four CR sub-domains' Phase 4 process definition.
* CR Domain Reconciliation (Phase 5) becomes eligible.
* Six Phase 2b Entity PRDs remain eligible: Marketing Campaign, Campaign Group, Campaign Engagement, Segment, Event, Event Registration.
* Carry-forward updates pending: Contact Entity PRD v1.3 → v1.4 (presenterBio, presenterTopics, lastConversionPushSentAt, lastReactivationSentAt), Account Entity PRD v1.3 → v1.4 (applicantSince), MN-INTAKE v2.3 → v2.4 (REQ-011 sets Account.applicantSince), CR Domain Overview v1.1 → v1.2 (CR-EVENTS-ISS-001). CR-REACTIVATE-OUTREACH may surface additional carry-forward updates.
