# Mentoring Domain — Manual Configuration List

**Implementation:** Cleveland Business Mentors (CBM)
**Domain:** Mentoring (MN)
**Phase 9 conversation date:** 2026-05-04 (unattended multi-domain run)
**Files covered:** `MN-Contact.yaml`, `MN-Engagement.yaml`,
`MN-Session.yaml`, `MN-Account.yaml`

This file enumerates every configuration item required by the MN
Domain PRD that the CRM Builder YAML schema v1.2.3 cannot express.
After YAML deployment (Phase 12), the administrator must complete
each item in EspoCRM's native UI or via supported automation.

Items are grouped by category per the Phase 9 YAML Generation
Guide v1.1 "Manual Configuration List → Required Categories."

---

## Advanced Automation

The v1.1 workflow vocabulary (`onCreate`, `onUpdate`,
`onFieldChange`, `onFieldTransition`, `onDelete`; `setField`,
`clearField`, `sendEmail`, `sendInternalNotification`) cannot
express cross-entity field copy, related-record creation, or
auto-generated formula-based names. The following items require
post-deployment automation outside the YAML schema.

### MN-MC-AA-001 — Engagement.name auto-generation

- **Source.** ENG-DEC-001, Engagement Entity PRD v1.2
  Implementation Note 1.
- **Description.** Auto-generate Engagement.name in the format
  `{Client Organization Business Name}-{Assigned Mentor Last Name}-{Year of Engagement Creation}`
  (e.g., "Acme Corp-Smith-2026"). Update on assignedMentor change.
  Read-only — not user-editable.
- **Dependencies.** Engagement entity, engagementClientOrganization
  and engagementAssignedMentor relationships, Account.name,
  Contact.lastName.

### MN-MC-AA-002 — Engagement.totalSessionsLast30Days workflow refresh

- **Source.** ENG-DEC-003, Engagement Entity PRD v1.2
  Implementation Note 3.
- **Description.** Engagement.totalSessionsLast30Days uses the
  Section 11 relative-date vocabulary in its `formula:` expression
  (`lastNDays:30`). Whether the target CRM re-evaluates the
  relative-date predicate on each read is platform-dependent. If
  not, schedule a nightly recalculation job to refresh the value.
- **Dependencies.** Engagement entity, Session entity, scheduler.

### MN-MC-AA-003 — Engagement.nextSessionDateTime cross-entity copy

- **Source.** SES-DEC-005, Session Entity PRD v1.1 Implementation
  Note 5.
- **Description.** When a Completed Session has its
  nextSessionDateTime set, copy the value to the parent
  Engagement.nextSessionDateTime. The v1.1 workflow vocabulary
  does not express cross-entity setField actions.
- **Dependencies.** Session entity, Engagement entity, parent link.

### MN-MC-AA-004 — Engagement.closeDate auto-population

- **Source.** ENG entity PRD Implementation Note 4, MN-INACTIVE-REQ-005,
  MN-CLOSE-REQ-003.
- **Description.** When engagementStatus transitions to Declined,
  Abandoned, or Completed, set closeDate to today's date. Retain
  on reopening.
- **Dependencies.** Engagement entity, engagementStatus, closeDate.

### MN-MC-AA-005 — Engagement.closeReason auto-population for Abandoned

- **Source.** ENG entity PRD Implementation Note 5,
  MN-INACTIVE-REQ-005.
- **Description.** When MN-INACTIVE transitions an engagement to
  Abandoned, automatically set closeReason to
  "Inactive / No Response."
- **Dependencies.** Engagement entity, engagementStatus,
  closeReason. Pairs with MN-MC-AA-013 (the inactivity scan).

### MN-MC-AA-006 — Primary Engagement Contact auto-assignment at intake

- **Source.** MN-INTAKE-REQ-007.
- **Description.** When an Engagement is created via MN-INTAKE,
  automatically set the engagementPrimaryEngagementContact link
  to the submitting Contact.
- **Dependencies.** Engagement entity, Contact entity, intake form
  integration.

### MN-MC-AA-007 — Session.name auto-generation

- **Source.** SES-DEC-004, Session Entity PRD v1.1 Implementation
  Note 1.
- **Description.** Auto-generate Session.name as
  `{Engagement Name} — {Session Date}`. Update on dateStart change.
  Read-only.
- **Dependencies.** Session entity, Engagement entity, parent link.

### MN-MC-AA-008 — First-completed-Session activates Engagement

- **Source.** MN-ENGAGE-REQ-001, Session Entity PRD v1.1
  Implementation Note 4.
- **Description.** When the first Session on an Engagement reaches
  Completed status, transition the parent Engagement from Assigned
  to Active. One-time transition. The v1.1 workflow vocabulary
  cannot express `onFirstTransition` (deferred to v1.2 in the
  schema).
- **Dependencies.** Session entity, Engagement entity, parent link,
  engagementStatus.

### MN-MC-AA-009 — Session attendee minimum-of-one validation at Completed

- **Source.** Session Entity PRD v1.1 Implementation Note 8.
- **Description.** When Session.status transitions to Completed,
  validate that at least one record exists in
  sessionMentorAttendees and at least one in sessionClientAttendees.
  Block the transition with a user-facing message if either is
  empty.
- **Dependencies.** Session entity, sessionMentorAttendees and
  sessionClientAttendees relationships.

### MN-MC-AA-010 — Next Session creation, calendar event, meeting request

- **Source.** MN-ENGAGE-REQ-002, Session Entity PRD v1.1
  Implementation Note 5.
- **Description.** When nextSessionDateTime is set on a Completed
  Session, perform three actions: (a) create a new Session record
  with status = Scheduled and dateStart = nextSessionDateTime,
  (b) create a calendar event and send meeting requests with a
  video conferencing link to TO: Primary Engagement Contact, CC:
  other Engagement Contacts, plus all assigned mentors as
  attendees, (c) the Engagement.nextSessionDateTime copy
  (already covered in MN-MC-AA-003). The v1.1 workflow
  vocabulary cannot express `createRelatedRecord` (deferred to
  v1.2).
- **Dependencies.** Session entity, Engagement entity, Contact
  entity, video-conferencing integration (see MN-MC-IN-001).

### MN-MC-AA-011 — Rescheduling workflow

- **Source.** MN-ENGAGE-REQ-008, Session Entity PRD v1.1
  Implementation Note 6.
- **Description.** When Session.status changes to "Rescheduled by
  Client" or "Rescheduled by Mentor," create a new Session record
  whose sessionRescheduledFrom link points back to the original.
  The original retains its rescheduled status — never deleted.
- **Dependencies.** Session entity, sessionRescheduledFrom
  self-referential relationship.

### MN-MC-AA-012 — Acceptance window for nominated mentors

- **Source.** MN-MATCH-REQ-005.
- **Description.** Configurable acceptance window (default 48 hours)
  starts when an Engagement transitions to Pending Acceptance.
  Alert the Client Assignment Coordinator when the window expires
  without a mentor accept/decline response.
- **Dependencies.** Engagement entity, engagementStatus, scheduler,
  notification service.

### MN-MC-AA-013 — Daily inactivity scan with three-stage escalation

- **Source.** MN-INACTIVE-REQ-001 through -006.
- **Description.** Daily scan of all Engagements at Active or
  On-Hold status. Compute elapsed time using meetingCadence
  (Weekly = 7 days, Bi-Weekly = 14 days, Monthly = 30 days,
  As Needed = configurable system default per MN-INACTIVE-REQ-009).
  Configurable escalation multiplier (default 2x per
  MN-INACTIVE-REQ-010): elapsed > 1x cadence × multiplier →
  Dormant + notification; elapsed > 2x → Inactive + notification;
  elapsed > 3x → Abandoned (no notification, populate closeDate
  and closeReason via MN-MC-AA-004 / -005). Active reset on
  qualifying activity per MN-INACTIVE-REQ-007.
- **Dependencies.** Engagement entity, scheduler, notification
  service, two configurable email templates per
  MN-INACTIVE-REQ-011 (see MN-MC-ET-002 / -003).

### MN-MC-AA-014 — Mentor nomination workflow

- **Source.** MN-MATCH-REQ-003 / -004 / -006.
- **Description.** Single user action — Coordinator nominates a
  primary mentor — must (a) set the engagementAssignedMentor link,
  (b) transition engagementStatus to Pending Acceptance, (c) send
  the mentor a notification with the client intake summary and
  accept/decline options. Mentor decline reverts engagementStatus
  to Submitted automatically.
- **Dependencies.** Engagement entity, Contact entity (Mentor),
  notification service.

### MN-MC-AA-015 — Closed Engagement Survey send

- **Source.** MN-CLOSE-REQ-005.
- **Description.** When engagementStatus transitions to Completed,
  automatically send a Closed Engagement Survey to the Primary
  Engagement Contact. Survey content and capture mechanism deferred
  to MN-CLOSE-ISS-003.
- **Dependencies.** Engagement entity, engagementPrimaryEngagementContact
  relationship, survey integration (see MN-MC-IN-002).

### MN-MC-AA-016 — Engagement Health dashboard

- **Source.** MN-INACTIVE-REQ-012.
- **Description.** Dashboard with engagement pipeline status counts,
  accessible to Client Administrator, Mentor Administrator, and
  Executive Member. Dashboards are EspoCRM admin-side
  configuration, not YAML-expressible.
- **Dependencies.** Engagement entity, role/permission configuration.

### MN-MC-AA-017 — Intake Contact deduplication by email

- **Source.** MN-INTAKE-REQ-010, CR-MARKETING Sub-Domain Overview
  v1.0.
- **Description.** When the intake form is submitted, check whether
  a Contact already exists with a matching email address
  (case-insensitive) before creating a new Contact record. If a
  matching Contact is found — typically because the individual was
  created earlier as a prospect via a CR-MARKETING pathway — update
  the existing Contact with intake form data rather than creating a
  duplicate. Email match is the only automatic deduplication
  criterion. If a prospect Contact exists with the same name but a
  different email, manual deduplication by the Client Administrator
  is required as a fallback.
- **Dependencies.** Contact entity, intake form integration,
  Contact.emailAddress index for lookup.

### MN-MC-AA-018 — Account.clientStatus → Applicant transition at intake

- **Source.** MN-INTAKE-REQ-011, Account Entity PRD v1.8 Section
  3.5, CR-MARKETING Sub-Domain Overview v1.0. Pairs with
  CR-MC-AA-003 (the applicantSinceTimestamp first-transition
  side-effect).
- **Description.** When MN-INTAKE creates or links an Engagement to
  an Account, set Account.clientStatus to "Applicant". If the
  Account already existed with clientStatus = "Prospect" (because
  it was created earlier via a CR-MARKETING pathway with company
  information), the value transitions Prospect → Applicant. If a
  new Account is created at intake, clientStatus is set to
  "Applicant" at creation time. CR-MC-AA-003 handles the paired
  applicantSinceTimestamp first-transition write that fires off
  this status transition.
- **Dependencies.** Account entity, clientStatus, MN-INTAKE
  form-processing pipeline.

### MN-MC-AA-019 — Contact.prospectStatus → Converted at intake

- **Source.** MN-INTAKE-REQ-012, CR-MARKETING Sub-Domain Overview
  v1.0.
- **Description.** When the intake form is submitted, transition
  the submitting Contact's prospectStatus to "Converted" (the
  terminal state of the marketing-funnel lifecycle). Only the
  Contact who actually submitted the application is transitioned —
  other prospect Contacts at the same Account retain their own
  marketing-funnel state independently. Each individual person
  tracks their own prospectStatus.
- **Dependencies.** Contact entity, prospectStatus, MN-INTAKE
  form-processing pipeline. Pairs with MN-MC-AA-017 (which
  determines whether the submitting Contact is a new or existing
  record).

### MN-MC-AA-020 — Intake howDidYouHearAboutCbm layered write

- **Source.** MN-INTAKE-REQ-013, CR-MARKETING Sub-Domain Overview
  v1.0 Section 4.7. Pairs with CR-MC-AA-017 (sourceAttributionDetails
  override audit trail — see CR-MANUAL-CONFIG).
- **Description.** When the applicant fills out the intake form
  and selects a value for howDidYouHearAboutCbm, write the
  self-reported value to Contact.howDidYouHearAboutCbm ONLY if the
  field is currently blank. If the field already contains a value
  (typically because it was set at Contact creation by a
  CR-MARKETING pathway with known source attribution), do NOT
  overwrite it. Always write the applicant's self-reported value
  to Contact.sourceAttributionDetails (timestamped, with source =
  "intake-self-report") regardless of whether the structured field
  was preserved or written, so the self-report is never lost. The
  Client Administrator may override the structured field at any
  time during application review; that override behavior is
  captured in CR-MC-AA-017 as a perpetual audit-trail rule, not
  just an intake rule.
- **Dependencies.** Contact entity, howDidYouHearAboutCbm,
  sourceAttributionDetails, MN-INTAKE form-processing pipeline.

---

## Email Templates

### MN-MC-ET-001 — Mentor introduction templates

- **Source.** MN-MATCH-REQ-008.
- **Description.** Email templates for mentor introduction
  communications, sent by the mentor after accepting an
  assignment.

### MN-MC-ET-002 — Engagement Dormant notification

- **Source.** MN-INACTIVE-REQ-003 / -011.
- **Description.** Notification template sent to Assigned Mentor
  and Client Administrator when an Engagement transitions to
  Dormant. Must include engagement stage name, Business Name,
  Primary Engagement Contact name, and a direct link to the
  Engagement record. Configurable per MN-INACTIVE-REQ-011.

### MN-MC-ET-003 — Engagement Inactive notification

- **Source.** MN-INACTIVE-REQ-004 / -011.
- **Description.** Same recipients and content as Dormant
  notification but distinguishable in subject/body. Configurable.

### MN-MC-ET-004 — New submission notification to Client Administrator

- **Source.** MN-INTAKE-REQ-003.
- **Description.** Notification to the Client Administrator on
  receipt of a new MN-INTAKE submission.

### MN-MC-ET-005 — Mentor nomination email

- **Source.** MN-MATCH-REQ-004.
- **Description.** Email to the nominated mentor with the client
  intake summary and accept/decline options. Pairs with
  MN-MC-AA-014.

### MN-MC-ET-006 — Mentor acceptance window expiry alert

- **Source.** MN-MATCH-REQ-005.
- **Description.** Notification to the Client Assignment
  Coordinator when the configurable acceptance window expires
  without a mentor response. Pairs with MN-MC-AA-012.

### MN-MC-ET-007 — Session summary email template

- **Source.** MN-ENGAGE-REQ-003, SES-DEC-006.
- **Description.** Draft session summary template generated when
  a Session is marked Completed. Includes session date, duration,
  type, attendees, and — when populated — Topics Covered, Session
  Notes, and Next Steps. TO: Primary Engagement Contact, CC:
  other Engagement Contacts.

### MN-MC-ET-008 — Engagement closure thank-you email template

- **Source.** MN-CLOSE-REQ-006.
- **Description.** Configurable thank-you email template sent at
  closure. Default TO: Primary Engagement Contact, CC: other
  Engagement Contacts. Mentor adds personal comments and may
  modify recipients before sending.

---

## Field-Level Access Control (Role-Based)

The YAML schema v1.2.3 does not express role-based field-level
visibility (Category 6 of the gap analysis, deferred to v1.2 of
the schema).

### MN-MC-AC-001 — Engagement.engagementNotes access restriction

- **Source.** MN-ENGAGE-REQ-011, Engagement Entity PRD v1.2
  Implementation Note 6.
- **Description.** engagementNotes must be readable and editable
  only by Client Administrator, Mentor Administrator, and
  assignedMentor / additionalMentors. Never visible to clients.
  If a client-portal feature is implemented in the future, this
  field must be excluded from client-facing views.
- **Dependencies.** Role definitions for the four personas.

### MN-MC-AC-002 — Account.clientNotes access restriction

- **Source.** Account Entity PRD v1.8 Section 3.3 Implementation
  note for clientNotes.
- **Description.** Account.clientNotes must be restricted to Client
  Administrator and above; hidden from mentors.
- **Dependencies.** Role definitions for Client Administrator,
  Executive Member, System Administrator personas.

### MN-MC-AC-003 — Engagement referringPartner write paths

- **Source.** Engagement Entity PRD v1.2 Implementation Note 9.
- **Description.** referringPartner has two write paths: assigned
  mentor (primary) and Partner Coordinator (exception, for
  correction / missed attribution / disputes). Field-level access
  control must permit both personas to write.
- **Dependencies.** Role definitions for Mentor and Partner
  Coordinator personas.

---

## Conditional-Required (Workflow-Validated)

The YAML schema v1.1+ supports `requiredWhen:`. The items below
are conditional-required rules that are validated at workflow time
because the trigger involves a non-field condition (e.g., status
transition rather than current status value), or because the
workflow has additional side effects beyond requirement
validation.

### MN-MC-CR-001 — Session.sessionType required when status = Completed

- **Source.** Session Entity PRD v1.1 Section 5.3, Implementation
  Note 8.
- **Description.** When Session.status transitions to Completed,
  validate that sessionType is populated.

### MN-MC-CR-002 — Session.meetingLocationType required when sessionType = In-Person AND status = Completed

- **Source.** Session Entity PRD v1.1 Section 5.3, Implementation
  Note 8.
- **Description.** Compound conditional-required: meetingLocationType
  is required when sessionType = In-Person and status = Completed.
  YAML expresses sessionType-only via requiredWhen; status
  validation occurs in workflow.

### MN-MC-CR-003 — Session mentorAttendees minimum-of-one when status = Completed

- **Source.** Session Entity PRD v1.1 Section 5.3, Implementation
  Note 8. Pairs with MN-MC-AA-009.
- **Description.** At least one record required in
  sessionMentorAttendees when Session.status = Completed.
  Cardinality minimums on relationships are not expressible in YAML.

### MN-MC-CR-004 — Session clientAttendees minimum-of-one when status = Completed

- **Source.** Session Entity PRD v1.1 Section 5.3, Implementation
  Note 8. Pairs with MN-MC-AA-009.
- **Description.** At least one record required in
  sessionClientAttendees when Session.status = Completed.

### MN-MC-CR-005 — Engagement.engagementNotes required when status = On-Hold

- **Source.** MN-ENGAGE-REQ-005.
- **Description.** Engagement Notes required when placing the
  engagement on hold (paired with the existing requiredWhen on
  holdEndDate). The "On-Hold note" is operationally an addition
  to engagementNotes — workflow-validated rather than
  requiredWhen because Notes is wysiwyg and "newly added content"
  is not a YAML-expressible condition.

---

## Native Field Customization (Schema Gap)

### MN-MC-SC-001 — Session.status custom value list overrides Event-type defaults

- **Source.** SES-DEC-003, Session Entity PRD v1.1 Section 2 (Note
  on status values).
- **Description.** Session is type Event; the native Event status
  field has platform-default values that must be replaced with
  the seven CBM-specific values: Scheduled, Completed, Canceled
  by Client, Canceled by Mentor, Missed by Client, Rescheduled by
  Client, Rescheduled by Mentor. Default: Scheduled. The YAML
  schema does not expose a way to override option values on a
  native field. Configure manually in EspoCRM admin (Entity
  Manager → Session → status field → edit options).
- **Dependencies.** Session entity created by MN-Session.yaml.

---

## Dependent / Cascading Enums (Schema Gap)

### MN-MC-DD-001 — Contact-to-Account "Primary Contact" relationship-level bool

- **Source.** MN-INTAKE-DAT-016, Contact Entity PRD v1.7
  CON-DEC-001.
- **Description.** "Primary Contact" is implemented as a bool on
  the Contact-to-Account relationship, not as a field on the
  Contact entity. EspoCRM supports relationship-level fields, but
  the YAML schema does not express them. Configure manually in
  EspoCRM admin (Entity Manager → Account → contacts relationship
  → add isPrimary bool field, or use the existing
  accountIsInactive pattern as a template).
- **Dependencies.** Contact entity, Account entity, native
  contacts manyToMany relationship.

### MN-MC-DD-002 — Account.industrySubsector dependent-filter behavior

- **Source.** MN-INTAKE-DAT-007.
- **Description.** Selecting an industrySector value should
  constrain the industrySubsector option list. The YAML schema
  does not express dependent / cascading enums. Configure in
  EspoCRM admin via field formula or a layout-level dynamic-logic
  options-filter rule (the exact mechanism depends on whether
  EspoCRM exposes a per-field options-filter in the version
  CBM is running).
- **Dependencies.** Account entity, industrySector and
  industrySubsector fields. Pairs with EXCEPTIONS.md
  MN-Y9-EXC-005 (the value list itself is also deferred).

---

## Saved Views and List Filters

The Engagement saved views are declared in MN-Engagement.yaml's
`savedViews:` block (six views: Submitted, Pending Acceptance,
Active, Dormant/Inactive, On-Hold, Completed). Per
crmbuilder/CLAUDE.md "YAML Schema Rules" section, saved views are
recognized at parse time but not applied via REST in the current
deploy pipeline — they surface as `NOT_SUPPORTED` in the
deployment run log and require manual configuration in EspoCRM
admin. The list below names the views the operator must create
manually if the NOT_SUPPORTED short-circuit remains in place.

### MN-MC-SV-001 — Mentor — Inactivity Alert (Contact view)

- **Source.** MN-MANAGE inactivity monitoring, mirroring
  MR-MC-SV-005.
- **Description.** A saved Contact list view filtered to
  contactType contains "Mentor", mentorStatus = "Active", and
  totalSessionsLast30Days = 0. Lives on Contact, not Engagement —
  declared in MR's domain when MR-Contact.yaml is updated.

---

## Integrations

### MN-MC-IN-001 — Video conferencing link generation

- **Source.** MN-ENGAGE-REQ-002, MN-ENGAGE-ISS-001.
- **Description.** When the system creates a meeting request from
  Next Session Date/Time (MN-MC-AA-010), a video conferencing link
  must be generated and included in the meeting request. The
  integration mechanism (Zoom, Google Meet, Teams, etc.) is
  deferred to MN-ENGAGE-ISS-001 — the Technology Administrator
  decides.
- **Dependencies.** Session entity, video-conferencing platform
  selection.

### MN-MC-IN-002 — Closed Engagement Survey delivery and capture

- **Source.** MN-CLOSE-REQ-005, MN-CLOSE-ISS-003.
- **Description.** Survey delivery (via the CRM, an external survey
  tool, or a third-party) and response capture (in-CRM fields vs.
  external tool) are deferred to MN-CLOSE-ISS-003.
- **Dependencies.** Engagement entity, survey integration
  selection.

### MN-MC-IN-003 — External email transport

- **Source.** MN-MC-ET-001 through -008.
- **Description.** Outbound email transport (CRM-built-in vs.
  external service) must be configured for the eight email
  templates above to send.
- **Dependencies.** All email-sending workflows above.

### MN-MC-IN-004 — Calendar event integration

- **Source.** MN-ENGAGE-REQ-002.
- **Description.** Calendar event creation (the "create a calendar
  event" half of the next-session workflow). Whether via the
  CRM's built-in calendar or an external calendar service is a
  configuration decision.
- **Dependencies.** MN-MC-AA-010, calendar platform selection.

---

## Stream and Audit Logging

### MN-MC-AU-001 — Engagement.engagementStatus auditing

- **Source.** Engagement Entity PRD v1.2 Implementation Note 2.
- **Description.** engagementStatus is flagged `audited: true` in
  MN-Engagement.yaml. No additional configuration required beyond
  YAML deployment. Verify audit log populates after deployment.

### MN-MC-AU-002 — Engagement entity activity stream

- **Source.** Engagement Entity PRD v1.2 Section 1 (Activity
  Stream: Yes).
- **Description.** Stream enabled in MN-Engagement.yaml's
  settings.stream. No additional configuration required.

### MN-MC-AU-003 — Session entity activity stream

- **Source.** Session Entity PRD v1.1 Section 1 (Activity Stream:
  Yes).
- **Description.** Stream enabled in MN-Session.yaml's
  settings.stream. No additional configuration required.

---

## Deferred Master Lists

### MN-MC-OL-001 — Session.topicsCovered value list

- **Source.** SES-ISS-001 / MN-ENGAGE-ISS-002 (open).
- **Description.** Authoritative master list of topic taxonomy
  for session-summary inclusion. CBM program leadership decides.
  Pairs with EXCEPTIONS.md MN-Y9-EXC-004.

### MN-MC-OL-002 — Account.industrySubsector value list

- **Source.** MN-INTAKE-DAT-007.
- **Description.** Authoritative ~100-value NAICS subsector list,
  with the filter relationship to the 20-value sector list in
  MN-Account.yaml. Pairs with EXCEPTIONS.md MN-Y9-EXC-005 and
  MANUAL-CONFIG.md MN-MC-DD-002.

---

## Summary

Item counts by category:

| Category | Count |
|---|---|
| Advanced Automation | 20 |
| Email Templates | 8 |
| Field-Level Access Control (Role-Based) | 3 |
| Conditional-Required (Workflow-Validated) | 5 |
| Native Field Customization (Schema Gap) | 1 |
| Dependent / Cascading Enums (Schema Gap) | 2 |
| Saved Views and List Filters | 1 |
| Integrations | 4 |
| Stream and Audit Logging | 3 |
| Deferred Master Lists | 2 |
| **Total** | **49** |

**Last Updated:** 05-05-26 05:23
