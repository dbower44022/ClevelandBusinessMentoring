# Client Recruiting Domain — Manual Configuration List

**Implementation:** Cleveland Business Mentors (CBM)
**Domain:** Client Recruiting (CR)
**Phase 9 conversation date:** 2026-05-04 (unattended multi-domain run)
**Files covered:** All 9 CR YAML files

---

## Advanced Automation

### CR-MC-AA-001 — Contact.lastMarketingEngagement max-across-three-events refinement

- **Source.** Contact Entity PRD v1.7 Section 3.5; pairs with
  EXCEPTIONS.md CR-Y9-EXC-009.
- **Description.** The YAML formula expresses max of sentAt
  only. To fully implement the PRD's "max of send, open, or
  click" semantics, a post-deployment workflow on
  CampaignEngagement record creation/update must compute the
  max-of-three and write it to Contact.lastMarketingEngagement
  if newer than the current value.
- **Dependencies.** CampaignEngagement entity, Contact entity,
  campaignEngagementContact relationship.

### CR-MC-AA-002 — Contact.lastConversionPushSentAt and lastReactivationSentAt population

- **Source.** Contact Entity PRD v1.7 Section 3.7.
- **Description.** Both timestamps are externallyPopulated:true.
  Post-deployment automation must write them when a
  conversion-push (CR-EVENTS-CONVERT) or reactivation
  (CR-REACTIVATE) campaign targets a Contact.
- **Dependencies.** Contact entity, MarketingCampaign entity,
  CampaignEngagement entity.

### CR-MC-AA-003 — Account.applicantSinceTimestamp first-transition setField

- **Source.** Account Entity PRD v1.8 Section 3.5;
  MN-INTAKE-REQ-011.
- **Description.** When MN-INTAKE creates an Engagement and the
  associated Account.clientStatus transitions to Applicant for
  the first time (the "if currently null" guard), set
  Account.applicantSinceTimestamp to now. The v1.1 workflow
  vocabulary does not express the "if currently null" first-
  transition gate.
- **Dependencies.** Account entity, clientStatus,
  applicantSinceTimestamp.

### CR-MC-AA-004 — PartnershipAgreement.name auto-generation

- **Source.** Partnership Agreement Entity PRD v1.0 Note 1.
- **Description.** Auto-generate name as `{Partner Account Name} — {Agreement Type} — {Creation Date}`.
  Update on field changes. Read-only.
- **Dependencies.** PartnershipAgreement entity, partnerOrganization
  relationship, agreementType, creationDate.

### CR-MC-AA-005 — Partnership Agreement renewal notification scheduler

- **Source.** PA-DEC-004; CR-PARTNER-MANAGE-REQ-010.
- **Description.** Schedule email notifications to the Partner
  Coordinator at 60 days and 30 days before
  expirationRenewalDate. Daily scan, idempotent (don't re-send
  for the same threshold).
- **Dependencies.** PartnershipAgreement entity, scheduler,
  email transport (CR-MC-IN-001).

### CR-MC-AA-006 — Event.registrationUrl population on Draft → Scheduled

- **Source.** EVT-DEC-008; CR-EVENTS-MANAGE-REQ.
- **Description.** When Event.status transitions Draft →
  Scheduled, populate registrationUrl with the public
  registration form URL for this Event. Read-only after.
- **Dependencies.** Event entity, status, registrationUrl.

### CR-MC-AA-007 — Event presenter contactType write-through on first link

- **Source.** EVT-DEC-005; Event Entity PRD v1.0 Note 5.
- **Description.** When a Contact is linked to an Event
  presenters relationship for the first time (across any
  Event), append "Presenter" to that Contact's contactType
  multiEnum. Unlinking does not remove the Presenter value.
  The v1.1 workflow vocabulary does not express cross-entity
  multiEnum value mutation.
- **Dependencies.** Event entity, eventPresenters relationship,
  Contact entity, contactType.

### CR-MC-AA-008 — EventRegistration.name auto-generation

- **Source.** Event Registration Entity PRD v1.0.
- **Description.** Auto-generate name as `{Event Name} — {Contact Name}`.
  Read-only.
- **Dependencies.** EventRegistration entity, eventRegistrationEvent
  and eventRegistrationContact relationships.

### CR-MC-AA-009 — EventRegistration confirmation email dispatch

- **Source.** CR-EVENTS-MANAGE-REQ.
- **Description.** When an Online EventRegistration is created,
  send a confirmation email and populate confirmationSentAt.
  Walk-In registrations are excluded (no confirmation per Event
  Registration Entity PRD Section 3.3).
- **Dependencies.** EventRegistration entity, registrationSource,
  confirmationSentAt, email transport.

### CR-MC-AA-010 — EventRegistration reminder dispatcher

- **Source.** CR-EVENTS-MANAGE-REQ; Event Entity PRD v1.0 Note 8.
- **Description.** Daily scan: for each EventRegistration whose
  Event has not yet started, evaluate which reminder types
  (7-day, 1-day, 1-hour) are due based on Event.format and
  current time, and dispatch any not yet sent (idempotency via
  remindersSent multiEnum). Format-specific timing: In-Person
  sends 7-day and 1-day; Virtual sends 1-day and 1-hour;
  Hybrid sends all three.
- **Dependencies.** Event entity, EventRegistration entity,
  remindersSent, scheduler, email transport.

### CR-MC-AA-011 — MarketingCampaign status transition validation

- **Source.** CR-MARKETING-CAMPAIGNS-DAT-029; Marketing Campaign
  Entity PRD v1.0.
- **Description.** Enforce the unified five-value lifecycle
  transition matrix: Draft → Scheduled, Scheduled → Sent, Sent
  → Complete, Draft → Cancelled, Scheduled → Cancelled. Block
  any other transition (including all backward transitions).
  No clean v1.1 schema mechanism for transition gating beyond
  workflow validation.
- **Dependencies.** MarketingCampaign entity, status field.

### CR-MC-AA-012 — CampaignEngagement.name auto-generation

- **Source.** Campaign Engagement Entity PRD v1.0 Note 1.
- **Description.** Auto-generate name as `{Contact Name} — {Campaign Name}`.
  Read-only.
- **Dependencies.** CampaignEngagement entity,
  campaignEngagementContact and campaignEngagementCampaign
  relationships.

### CR-MC-AA-013 — Segment.segmentType immutability enforcement

- **Source.** SEG-DEC-001; Segment Entity PRD v1.0 Note 1.
- **Description.** Enforce that segmentType is set at creation
  and cannot be changed thereafter. EspoCRM has no field-level
  immutable-after-create flag exposed in YAML; implement as a
  before-save workflow that reverts changes.
- **Dependencies.** Segment entity, segmentType field.

### CR-MC-AA-014 — Engagement Source Attribution from Marketing Campaign click

- **Source.** CR-MARKETING-CAMPAIGNS Section 4.10; layered
  authority policy.
- **Description.** When a prospect clicks a campaign link,
  lands on the CRM-hosted web inquiry form, and submits, capture
  the tracking parameter from the URL. Write
  Contact.howDidYouHearAboutCbm = CBM Email at Point 1
  (Contact creation) and append the specific campaign reference
  to Contact.sourceAttributionDetails.
- **Dependencies.** Web inquiry form, tracking parameter
  parsing, Contact entity.

### CR-MC-AA-015 — Web inquiry form Account precedence ladder

- **Source.** CR-MARKETING-CONTACTS-REQ-004; PRD Section 3.2.1.
- **Description.** On accepted web inquiry submission, run the
  two-step Account precedence ladder: (1) website domain match
  against existing Account.website (normalized); if match, link;
  if not, (2) create new Account with accountType including
  Client and clientStatus = Prospect.
- **Dependencies.** Account entity, web inquiry form integration.

### CR-MC-AA-016 — CR-PARTNER-MANAGE quarterly partner analytics aggregation

- **Source.** CR-PARTNER-MANAGE-REQ-008.
- **Description.** Aggregate eight metric categories per partner
  Account over a selected date range: referral count, active
  client count, new client count, total session count, total
  session hours, NPS scores, impact metrics, total/new
  affiliated mentor counts. Surface in a filterable view; the
  Partner Coordinator composes the formal PDF report outside
  the system.
- **Dependencies.** Engagement entity, Session entity, Contact
  entity, Account entity, Partner Coordinator role.

---

## Email Templates

### CR-MC-ET-001 — Event confirmation email template

- **Source.** CR-EVENTS-MANAGE-REQ; pairs with CR-MC-AA-009.
- **Description.** Confirmation email sent on Online
  EventRegistration creation. Body file path TBD; not committed
  in this Phase 9.

### CR-MC-ET-002 — Event reminder email templates (7-day, 1-day, 1-hour)

- **Source.** CR-EVENTS-MANAGE-REQ; pairs with CR-MC-AA-010.
- **Description.** Three reminder templates corresponding to
  the three reminder windows. Body files TBD.

### CR-MC-ET-003 — Post-event Thank-You template

- **Source.** CR-EVENTS-CONVERT.
- **Description.** Sent to Attended registrants. Body file TBD.

### CR-MC-ET-004 — Post-event We-Missed-You template

- **Source.** CR-EVENTS-CONVERT.
- **Description.** Sent to No-Show registrants. Body file TBD.

### CR-MC-ET-005 — Conversion-push templates (multiple)

- **Source.** CR-EVENTS-CONVERT.
- **Description.** Conversion-push email content used for
  unconverted attendees. Multiple variants likely. Body files
  TBD.

### CR-MC-ET-006 — Reactivation campaign templates (multiple per population)

- **Source.** CR-REACTIVATE-OUTREACH.
- **Description.** Reactivation content varies by population
  (Former Client, Event Attendee, Inactive Prospect). Body
  files TBD.

### CR-MC-ET-007 — Partnership Agreement renewal reminder templates

- **Source.** PA-DEC-004; pairs with CR-MC-AA-005.
- **Description.** 60-day and 30-day renewal reminder templates
  sent to the Partner Coordinator. Body files TBD.

---

## Field-Level Access Control (Role-Based)

Schema v1.2.x does not express role-based field-level visibility
(deferred to v1.2 of the schema).

### CR-MC-AC-001 — Account.partnerNotes restricted to Partner Coordinator+

- **Source.** CR-PARTNER-PROSPECT-REQ-008.
- **Description.** partnerNotes restricted to Partner
  Coordinator and above (Executive Member, System Administrator).
  Hidden from Mentors and other staff.

### CR-MC-AC-002 — PartnershipAgreement.agreementDocument restricted

- **Source.** PA-DEC-002.
- **Description.** Agreement document file restricted to Partner
  Coordinator and Executive Member only. Other roles can see
  the PartnershipAgreement metadata (type, dates, notes) but
  cannot view or download the file.

### CR-MC-AC-003 — Event.documents staff-only

- **Source.** EVT-DEC-007.
- **Description.** Event documents storage restricted to staff
  roles. Not exposed to clients/external personas.

### CR-MC-AC-004 — Contact opt-out fields admin-editable, contact-readable

- **Source.** CR-MARKETING-CONTACTS Section 4.5.
- **Description.** emailOptOut and smsOptOut writable by Client
  Recruiter; readable by the Contact via portal (when portal
  exists). Not user-editable from the contact side without an
  out-of-band request.

### CR-MC-AC-005 — Contact.sourceAttributionDetails admin-only

- **Source.** Contact Entity PRD v1.7 Section 3.5.
- **Description.** Internal operational field; not visible to
  the Contact even via portal.

---

## Conditional-Required (Workflow-Validated)

### CR-MC-CR-001 — Event Draft → Scheduled transition validation

- **Source.** Event Entity PRD v1.0 Note 3.
- **Description.** Transition from Draft to Scheduled requires:
  topic, dateEnd, description, presenters (≥1), location (when
  format = In-Person or Hybrid), virtualMeetingUrl (when format
  = Virtual or Hybrid). Block transition with an explanatory
  message listing missing fields.

### CR-MC-CR-002 — Segment.memberContactIds required when segmentType = Static

- **Source.** Segment Entity PRD v1.0 Section 3.1.
- **Description.** Static segments require at least one Contact
  in memberContactIds. Cardinality minimums on relationships
  are not expressible in YAML.

### CR-MC-CR-003 — EventRegistration.cancellationReason required when Cancelled (optional)

- **Source.** CR-EVENTS-MANAGE-DAT-044 (Optional).
- **Description.** Marked optional in the PRD; this entry
  documents that no requiredWhen is configured even though
  CBM may want to require it operationally in the future.

---

## Native Field Customization (Schema Gap)

### CR-MC-SC-001 — file / attachment-multiple field type

- **Source.** EXCEPTIONS.md CR-Y9-EXC-004.
- **Description.** PartnershipAgreement.agreementDocument and
  Event.documents are declared as varchar at YAML level. Both
  must be reconfigured post-deployment via EspoCRM admin
  (Entity Manager → Entity → field → change type). This is a
  v1.3 schema candidate.

### CR-MC-SC-002 — Event.status custom value list overrides Event-type defaults

- **Source.** EXCEPTIONS.md CR-Y9-EXC-007.
- **Description.** Event uses type Event; the native Event
  status field has platform-default values that must be
  replaced with the 6 CBM-specific values: Draft, Scheduled,
  In Progress, Completed, Cancelled, Postponed. Default: Draft.
  Same shape as MN-MC-SC-001 for Session.status.

### CR-MC-SC-003 — Event entity name potential conflict

- **Source.** EXCEPTIONS.md CR-Y9-EXC-006 / EVT-ISS-001.
- **Description.** The "Event" entity name matches the entity
  type name. Verify at deploy time. If conflict, rename to
  "CBMEvent" and update all references.

### CR-MC-SC-004 — MarketingCampaign and CampaignGroup native description field

- **Source.** Marketing Campaign Entity PRD v1.0 Note 1.
- **Description.** Both entities use the native name field via
  concat formula. The native description field on Base entities
  is text, not wysiwyg; the campaignNotes field on
  MarketingCampaign and the description field on CampaignGroup
  are wysiwyg / text respectively. No native-field reconfiguration
  needed at this time.

---

## Dependent / Cascading Enums (Schema Gap)

### CR-MC-DD-001 — Event presenters picker secondary filter on presenterTopics

- **Source.** Event Entity PRD v1.0 Section 4 (Note on
  Presenters).
- **Description.** Picker for the eventPresenters relationship
  should filter by contactType includes Presenter (primary
  filter) and provide a secondary filter on Contact.presenterTopics
  matched against Event.topic. The YAML schema does not express
  relationship-picker filters.

### CR-MC-DD-002 — Account precedence ladder website match

- **Source.** CR-MARKETING-CONTACTS-REQ-004; pairs with
  CR-MC-AA-015.
- **Description.** Two-step ladder: (1) website domain match
  (normalized: lowercase, protocol stripped, leading www
  stripped) against existing Account.website; (2) on no match,
  create new Account. Web inquiry form integration must
  implement this logic.

---

## Saved Views and List Filters

The CR domain expects many saved views per the PRD's reporting
requirements. Per crmbuilder/CLAUDE.md, savedViews are
recognized at parse time but currently short-circuit to
NOT_SUPPORTED in the deploy pipeline. The views below are not
declared in YAML this cycle (declaring them would create
NOT_SUPPORTED noise without delivering value); they remain
MANUAL-CONFIG until the savedView REST capability lands.

### CR-MC-SV-001 — Recently Created Prospect Contacts

- **Source.** CR-MARKETING-CONTACTS-REQ-030.
- **Description.** Contacts with non-terminal prospectStatus
  created in the last N days (default 7).

### CR-MC-SV-002 — Accounts with Multiple Prospect Contacts

- **Source.** CR-MARKETING-CONTACTS-REQ-027.
- **Description.** Accounts with two or more prospect Contact
  links.

### CR-MC-SV-003 — Prospect Contacts at Active or Inactive Client Accounts

- **Source.** CR-MARKETING-CONTACTS-REQ-028.

### CR-MC-SV-004 — Account-less Prospect Contacts

- **Source.** CR-MARKETING-CONTACTS-REQ-029.

### CR-MC-SV-005 — Pipeline Counts by Status

- **Source.** CR-MARKETING-CONTACTS-REQ-055. Reporting view.

### CR-MC-SV-006 — Source Attribution Rollup

- **Source.** CR-MARKETING-CONTACTS-REQ-056. Reporting view.

### CR-MC-SV-007 — Conversion Funnel

- **Source.** CR-MARKETING-CONTACTS-REQ-057. Reporting view.

### CR-MC-SV-008 — Geographic Distribution

- **Source.** CR-MARKETING-CONTACTS-REQ-058. Reporting view.

### CR-MC-SV-009 — Marketing Engagement Health

- **Source.** CR-MARKETING-CONTACTS-REQ-059. Reporting view.

### CR-MC-SV-010 — Reactivation Campaign Performance

- **Source.** CR-REACTIVATE-OUTREACH.

### CR-MC-SV-011 — Partner list with status filter

- **Source.** CR-PARTNER-MANAGE-REQ-018.

### CR-MC-SV-012 — Reactivation Candidates — Event Attendees

- **Source.** CR-EVENTS-CONVERT → CR-REACTIVATE handoff.

---

## Integrations

### CR-MC-IN-001 — External email transport

- **Source.** Many CR processes.
- **Description.** Outbound email transport configuration.
  Required for confirmation emails, reminders, post-event
  follow-ups, partner agreement reminders, and all marketing
  sends (which actually leave the marketing platform, not the
  CRM, but the CRM also needs to send transactional event
  emails).

### CR-MC-IN-002 — External marketing platform two-way sync

- **Source.** CR-MARKETING-CAMPAIGNS, CR-MARKETING-CONTACTS
  Section 4.8.
- **Description.** Outbound sync (CRM → platform) of contact
  lists, opt-out flags, and source attribution. Inbound sync
  (platform → CRM) of engagement events (sent, opened, clicked,
  bounced, unsubscribed). Connector, OAuth, audience-mapping
  configuration.

### CR-MC-IN-003 — Web inquiry form

- **Source.** CR-MARKETING-CONTACTS Section 4.1.
- **Description.** CRM-hosted public web inquiry form per
  CR-MARKETING-CONTACTS-REQ-001. Requires form rendering, CAPTCHA
  or similar abuse mitigation, and the Account precedence ladder
  logic per CR-MC-AA-015.

### CR-MC-IN-004 — Public Event registration form

- **Source.** CR-EVENTS-MANAGE.
- **Description.** Public-facing registration form for each
  Scheduled Event. Form URL is system-populated into
  Event.registrationUrl per CR-MC-AA-006.

### CR-MC-IN-005 — Virtual meeting platform

- **Source.** Event Entity PRD v1.0 Section 3.2; CR-EVENTS-MANAGE.
- **Description.** Virtual meeting platform integration for
  Virtual and Hybrid events. Platform choice deferred per
  CR-EVENTS-MANAGE-ISS-001 (virtual attendance import tooling
  also deferred until the platform is standardized).

---

## Stream and Audit Logging

### CR-MC-AU-001 — accountType, partnerStatus, clientStatus auditing

- **Source.** Account Entity PRD v1.8.
- **Description.** All three fields flagged audited:true in
  CR-Account.yaml. No additional configuration required.

### CR-MC-AU-002 — MarketingCampaign.status auditing

- **Source.** Marketing Campaign Entity PRD v1.0.
- **Description.** Flagged audited:true in CR-MarketingCampaign.yaml.

### CR-MC-AU-003 — EventRegistration.attendanceStatus auditing

- **Source.** Event Registration Entity PRD v1.0.
- **Description.** Flagged audited:true in CR-EventRegistration.yaml.

---

## Deferred Master Lists

### CR-MC-OL-001 — Contact.prospectStatus value list (CR-MARKETING-ISS-003)

- **Source.** EXCEPTIONS.md CR-Y9-EXC-001.

### CR-MC-OL-002 — Account.partnerOrganizationType, partnerType value lists

- **Source.** EXCEPTIONS.md CR-Y9-EXC-003.

### CR-MC-OL-003 — Account.clientStatus value list

- **Source.** EXCEPTIONS.md CR-Y9-EXC-002.

### CR-MC-OL-004 — Event.status native field 6-value override

- **Source.** EXCEPTIONS.md CR-Y9-EXC-007 + MANUAL-CONFIG
  CR-MC-SC-002.

---

## Summary

Item counts by category:

| Category | Count |
|---|---|
| Advanced Automation | 16 |
| Email Templates | 7 |
| Field-Level Access Control (Role-Based) | 5 |
| Conditional-Required (Workflow-Validated) | 3 |
| Native Field Customization (Schema Gap) | 4 |
| Dependent / Cascading Enums (Schema Gap) | 2 |
| Saved Views and List Filters | 12 |
| Integrations | 5 |
| Stream and Audit Logging | 3 |
| Deferred Master Lists | 4 |
| **Total** | **61** |

CR is the heaviest CBM domain by every measure (entity count,
field count, MANUAL-CONFIG count). Heavy MANUAL-CONFIG load
reflects the marketing/events functional footprint — not a
deficiency in the YAML or Phase 9 work.

**Last Updated:** 2026-05-04
