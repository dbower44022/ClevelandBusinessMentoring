# Mentor Recruitment Domain — Manual Configuration List

**Implementation:** Cleveland Business Mentors (CBM)
**Domain:** Mentor Recruitment (MR)
**Phase 9 conversation date:** 04-13-26 (initial), refreshed
2026-05-04 (multi-domain Phase 9 unattended run)
**Files covered:** `MR-Dues.yaml`, `MR-Contact.yaml`

This file enumerates every configuration item required by the
Mentor Recruitment Domain Product Requirements Document v1.0
that the CRM Builder YAML schema (now v1.2.x) cannot express.

The 2026-05-04 multi-domain refresh moved many items into YAML
that v1.0 could not express. Migrated items are retained below
with status `RESOLVED-IN-YAML` and a pointer to the v2.0.0 (MR-
Contact.yaml) or v1.1.0 (MR-Dues.yaml) construct that now carries
the requirement. Per the YAML Generation Guide v1.1 "What moved
into YAML in v1.1," these items should not also appear as
MANUAL-CONFIG action items, but the historical entry is kept as
a cross-reference so the original requirement traceability remains
auditable.

---

## Workflows

### MR-MC-WF-001 — Applicant confirmation email

- **Source.** MR-APPLY-REQ-003.
- **Status (2026-05-04).** PARTIALLY RESOLVED-IN-YAML — email
  template registered as `mentor-application-confirmation` in
  MR-Contact.yaml v2.0.0 emailTemplates block; the workflow that
  actually fires the send (onCreate where contactType contains
  Mentor and mentorStatus = "Submitted") was NOT promoted to YAML
  because the workflow's onCreate event does not include the
  field-state filter the v1.1 workflow vocabulary needs to be
  expressive — onCreate fires unconditionally per Section 5.8.
  The workflow remains a MANUAL-CONFIG item until v1.2 schema
  adds onCreate `where:` filtering or the operator wires it as
  an `onFieldChange to: "Submitted"` workflow at the cost of
  changed semantics. Body file
  `programs/MR/templates/mentor-application-confirmation.html`
  must be authored before deploy (see EXCEPTIONS.md MR-Y9-EXC-010).
- **Description.** On creation of a new Contact record with
  `contactType` containing "Mentor" and `mentorStatus = Submitted`,
  the system must send a confirmation email to the applicant's
  `personalEmail` address. The email content is defined in
  MR-MC-ET-001 below.
- **Dependencies.** Contact entity, `contactType`, `mentorStatus`,
  `personalEmail` fields. Email service (not yet defined — see
  PILOT-FINDINGS Finding 1).

### MR-MC-WF-002 — Application decline notification email

- **Source.** MR-APPLY and MR-ONBOARD decline processes.
- **Status (2026-05-04).** PARTIALLY RESOLVED-IN-YAML — template
  registered as `mentor-application-decline` in YAML; workflow
  itself remains MANUAL-CONFIG because the trigger needs to be
  "onFieldChange mentorStatus to Declined AND
  applicationDeclineReason isNotNull" — the v1.1 workflow
  vocabulary expresses the trigger but not the additional
  isNotNull gate inside the trigger clause. The workaround is a
  `where:` filter on the workflow that does the isNotNull check;
  this is expressible in YAML and could be promoted in a future
  refresh. Body file must be authored.
- **Description.** When a Mentor Administrator changes
  `mentorStatus` to "Declined" and sets `applicationDeclineReason`,
  the system must send a decline notification to the applicant's
  `personalEmail` address.
- **Dependencies.** Contact entity, `mentorStatus`,
  `applicationDeclineReason`, `personalEmail`. Email service.

### MR-MC-WF-003 — Duplicate-email conflict notification

- **Source.** MR-APPLY conflict flow.
- **Status (2026-05-04).** RESOLVED-IN-YAML — handled by the
  Contact `duplicateChecks` rule `contact-personal-email` in
  MR-Contact.yaml v2.0.0 (onMatch: block, alertTemplate:
  mentor-duplicate-email-alert, alertTo:
  role:mentor-administrator). The notification is no longer a
  separate workflow per the schema spec Section 5.8 cross-
  references note ("Duplicate-detection notifications are not
  expressed as separate workflows. They are handled by the
  alertTemplate / alertTo clauses on a duplicate-check rule").
  Body file
  `programs/MR/templates/mentor-duplicate-email-alert.html`
  must be authored.

### MR-MC-WF-004 — Acceptance timestamp population on terms and conditions

- **Source.** MR-APPLY-DAT-021 and MR-APPLY-DAT-022.
- **Status (2026-05-04).** RESOLVED-IN-YAML — the
  `terms-acceptance-timestamp` workflow in MR-Contact.yaml
  v2.0.0 fires `onFieldChange termsAndConditionsAccepted to: true`
  and runs `setField termsAndConditionsAcceptanceDateTime: now`.
  Per crmbuilder/CLAUDE.md "YAML Schema Rules," workflows
  currently short-circuit to NOT_SUPPORTED in the deploy pipeline
  pending the REST-capable Workflow CRUD reimplementation —
  declaring it in YAML surfaces the requirement in the deploy
  run's MANUAL CONFIGURATION REQUIRED block automatically.

### MR-MC-WF-005 — Acceptance timestamp population on ethics agreement

- **Source.** MR-ONBOARD-DAT-004 and MR-ONBOARD-DAT-005.
- **Status (2026-05-04).** RESOLVED-IN-YAML — same shape as
  MR-MC-WF-004; workflow `ethics-acceptance-timestamp`.

### MR-MC-WF-006 — `acceptingNewClients` automatic Off on pause or inactive

- **Source.** MR-ONBOARD-DAT-010 field definition.
- **Status (2026-05-04).** RESOLVED-IN-YAML — workflow
  `pause-stops-new-clients` in MR-Contact.yaml v2.0.0 fires
  `onFieldTransition mentorStatus to: ["Paused", "Inactive"]`
  and runs `setField acceptingNewClients: false`.

### MR-MC-WF-007 — `isPrimaryMentor` initialization on activation

- **Source.** MR-ONBOARD-DAT-013 field definition.
- **Status (2026-05-04).** REMAINING (deferred to schema v1.2).
  The trigger requires `onFirstTransition mentorStatus to: Active`
  — the "first transition" qualifier is essential because the
  Mentor Administrator may later set isPrimaryMentor = false and
  reactivation must not undo that override. The v1.1 workflow
  vocabulary lacks `onFirstTransition` (deferred to v1.2 per
  app-yaml-schema.md Section 5.8 trigger-events table). A naive
  `onFieldTransition` trigger would re-apply isPrimaryMentor =
  true on every Active transition.

### MR-MC-WF-008 — Departure-field clear on reactivation

- **Source.** MR-DEPART-DAT-002 and MR-DEPART-DAT-003 field
  definitions.
- **Status (2026-05-04).** RESOLVED-IN-YAML — workflow
  `clear-departure-on-reactivation` in MR-Contact.yaml v2.0.0
  fires `onFieldTransition mentorStatus from: ["Resigned",
  "Departed"] to: ["Active", "Provisional"]` and runs
  `clearField departureReason` plus
  `clearField departureDate`.

### MR-MC-WF-009 — Dues renewal date tracking

- **Source.** Dues Entity PRD Section 1 ("billing cycle based on
  the mentor's activation anniversary") and Contact Entity PRD
  field `duesRenewalDate` (DUES-DEC-005).
- **Status (2026-05-04).** PARTIALLY RESOLVED — the
  duesRenewalDate field is now declared on Contact in
  MR-Contact.yaml v2.0.0 (Dues Summary panel) per EXCEPTIONS.md
  MR-Y9-EXC-011. The maintenance algorithm (initial set at first
  Active activation, annual roll-forward each year as Dues
  records are created) remains MANUAL-CONFIG because it requires
  workflow logic outside the v1.1 vocabulary (date arithmetic
  on field values is not a `setField.value:` shape).
- **Description.** The mentor's `duesRenewalDate` on the Contact
  record must be maintained such that it reflects the anniversary
  of the mentor's first activation. Dues records' `dueDate` must
  be derivable from this value. Exact algorithm not specified in
  the Product Requirements Documents.
- **Dependencies.** Contact entity, Dues entity.

---

## Email Templates

### MR-MC-ET-001 — Application confirmation email template

- **Source.** MR-MC-WF-001.
- **Status (2026-05-04).** REMAINING — registered in YAML; body
  file `programs/MR/templates/mentor-application-confirmation.html`
  must be authored by the Mentor Administrator or content owner
  before deploy.
- **Description.** Template content for the applicant
  confirmation email. Content is not defined in any Product
  Requirements Document.

### MR-MC-ET-002 — Application decline email template

- **Source.** MR-MC-WF-002.
- **Status (2026-05-04).** REMAINING — registered in YAML; body
  file `programs/MR/templates/mentor-application-decline.html`
  must be authored. Content varies by `applicationDeclineReason`
  value; may be a single template with conditional merge-field
  content, or seven separate templates keyed to the seven reason
  values. Administrator to decide.

### MR-MC-ET-003 — Duplicate-email conflict notification template

- **Source.** MR-MC-WF-003.
- **Status (2026-05-04).** REMAINING — registered in YAML; body
  file `programs/MR/templates/mentor-duplicate-email-alert.html`
  must be authored. Plain internal alert format.

---

## Field-Level Access Control

The YAML schema v1.2.x does not express field-level role-based
visibility (Category 6 of the gap analysis, deferred to schema
v1.2).

### MR-MC-AC-001 — Admin-only fields on Contact

- **Source.** Multiple Contact fields marked Admin-only in the
  Mentor Recruitment Domain PRD Section 4 and the Contact Entity
  PRD v1.7 Implementation Notes.
- **Status (2026-05-04).** REMAINING (deferred to schema v1.2).
- **Description.** The following fields must be hidden from
  mentors (readable and editable only by the Mentor
  Administrator persona MST-PER-005):
  - `termsAndConditionsAccepted`,
    `termsAndConditionsAcceptanceDateTime`
  - `ethicsAgreementAccepted`, `ethicsAgreementAcceptanceDateTime`
  - `backgroundCheckCompleted`, `backgroundCheckDate`
  - `felonyConvictionDisclosure`
  - `applicationDeclineReason`
  - `duesStatus`, `duesPaymentDate`, `duesRenewalDate`
- **Dependencies.** Mentor Administrator role definition.

### MR-MC-AC-002 — Mentor-editable versus read-only distinction

- **Source.** Multiple Contact fields described in the Mentor
  Recruitment Domain PRD as "mentor-editable after activation."
- **Status (2026-05-04).** REMAINING (deferred to schema v1.2).
- **Description.** The following fields should be editable by
  the mentor when `mentorStatus = Active`, but read-only to the
  mentor otherwise:
  - `currentEmployer`, `yearsOfBusinessExperience`,
    `professionalBio`, `industrySectors`, `mentoringFocusAreas`,
    `skillsExpertiseTags`, `fluentLanguages`,
    `whyInterestedInMentoring`, `maximumClientCapacity`,
    `acceptingNewClients`
- **Dependencies.** Mentor role definition, plus a state-dependent
  edit rule keyed to `mentorStatus`. Neither is expressible in
  YAML v1.2.

---

## Field-Level Dynamic Logic

### MR-MC-DL-001 — Dues entity paymentDate field visibility

- **Source.** Dues Entity PRD Section 5.1.
- **Status (2026-05-04).** RESOLVED-IN-YAML — `visibleWhen` on
  `paymentDate` in MR-Dues.yaml v1.1.0:
  `paymentStatus op: equals value: "Paid"`.

### MR-MC-DL-002 — Dues entity paymentMethod field visibility

- **Source.** Dues Entity PRD Section 5.2 and 5.3.
- **Status (2026-05-04).** RESOLVED-IN-YAML — `visibleWhen` on
  `paymentMethod` in MR-Dues.yaml v1.1.0:
  `paymentStatus op: in value: ["Unpaid", "Paid"]` (excludes
  Waived per PRD).

### MR-MC-DL-003 — Contact applicationDeclineReason field visibility

- **Source.** MR-APPLY-DAT-024.
- **Status (2026-05-04).** RESOLVED-IN-YAML — `visibleWhen` on
  `applicationDeclineReason` in MR-Contact.yaml v2.0.0:
  `mentorStatus op: equals value: "Declined"`.

### MR-MC-DL-004 — Contact departureReason and departureDate visibility

- **Source.** MR-DEPART-DAT-002 and MR-DEPART-DAT-003.
- **Status (2026-05-04).** RESOLVED-IN-YAML — `visibleWhen` on
  both fields in MR-Contact.yaml v2.0.0:
  `mentorStatus op: in value: ["Resigned", "Departed"]`.

---

## Conditional-Required Logic

### MR-MC-CR-001 — Dues paymentDate required when Paid

- **Source.** Dues Entity PRD Section 3.2.
- **Status (2026-05-04).** RESOLVED-IN-YAML — `requiredWhen` on
  `paymentDate` in MR-Dues.yaml v1.1.0.

### MR-MC-CR-002 — Dues paymentMethod required when Paid

- **Source.** Dues Entity PRD Section 3.2.
- **Status (2026-05-04).** RESOLVED-IN-YAML — `requiredWhen` on
  `paymentMethod` in MR-Dues.yaml v1.1.0.

### MR-MC-CR-003 — Contact applicationDeclineReason required when Declined

- **Source.** MR-APPLY-DAT-024.
- **Status (2026-05-04).** RESOLVED-IN-YAML — `requiredWhen` on
  `applicationDeclineReason` in MR-Contact.yaml v2.0.0.

### MR-MC-CR-004 — Background check fields conditional on administrator decision

- **Source.** MR-ONBOARD-DAT-006 and MR-ONBOARD-DAT-007.
- **Status (2026-05-04).** REMAINING — operational discipline
  rather than a record-state condition that requiredWhen can
  express. The trigger ("a background check is required for this
  mentor") is an out-of-band administrator decision with no
  on-record marker.

---

## Calculated Field Formulas

### MR-MC-CF-001 — Contact.currentActiveClients

- **Source.** MR-MANAGE-DAT-019.
- **Status (2026-05-04).** RESOLVED-IN-YAML — formula:aggregate
  count on Engagement via assignedMentor where engagementStatus
  in ["Active", "Assigned"]. See MR-Contact.yaml v2.0.0 and
  EXCEPTIONS.md MR-Y9-EXC-008.

### MR-MC-CF-002 — Contact.availableCapacity

- **Source.** MR-MANAGE-DAT-020.
- **Status (2026-05-04).** RESOLVED-IN-YAML — formula:arithmetic
  `"maximumClientCapacity - currentActiveClients"` in
  MR-Contact.yaml v2.0.0.

### MR-MC-CF-003 — Contact.totalLifetimeSessions

- **Source.** MR-MANAGE-DAT-021.
- **Status (2026-05-04).** RESOLVED-IN-YAML — formula:aggregate
  multi-hop count via Session → Engagement (assignedMentor) where
  status = Completed.

### MR-MC-CF-004 — Contact.totalMentoringHours

- **Source.** MR-MANAGE-DAT-022.
- **Status (2026-05-04).** RESOLVED-IN-YAML — formula:aggregate
  multi-hop sum of duration via Session → Engagement
  (assignedMentor) where status = Completed.

### MR-MC-CF-005 — Contact.totalSessionsLast30Days

- **Source.** MR-MANAGE-DAT-023.
- **Status (2026-05-04).** RESOLVED-IN-YAML — formula:aggregate
  multi-hop count using Section 11 relative-date `lastNDays:30`.

### MR-MC-CF-006 — Dues.name auto-generation

- **Source.** Dues Entity PRD Section 2 (Native Fields note).
- **Status (2026-05-04).** RESOLVED-IN-YAML — formula:concat
  `["{lookup mentor.name}", " — ", "{billingYear}"]` in
  MR-Dues.yaml v1.1.0. Field declared with `readOnly: true` and
  the entity's `settings.autoPlaceName` set to false.

---

## Duplicate Detection Rules

### MR-MC-DD-001 — Contact duplicate detection on `personalEmail`

- **Source.** MR-APPLY duplicate-email conflict flow.
- **Status (2026-05-04).** RESOLVED-IN-YAML —
  `duplicateChecks: contact-personal-email` rule in
  MR-Contact.yaml v2.0.0 (onMatch: block, message provided,
  alertTemplate: mentor-duplicate-email-alert).

---

## Stream and Audit Logging

### MR-MC-AU-001 — Contact entity stream

- **Source.** Contact Entity PRD v1.7 Section 1 ("Activity Stream:
  Yes").
- **Status (2026-05-04).** REMAINING — Contact is a native entity
  and v1.1+ schema lets us declare `settings.stream: true` to
  override the CRM default, but doing so on a native entity
  requires the deploy engine to apply it as a metadata override
  rather than a creation property. MR-Contact.yaml does not
  declare a settings.stream override; the operator should
  confirm Contact's stream is enabled in EspoCRM admin if not
  already on by default.

### MR-MC-AU-002 — Audited fields

- **Source.** Contact Entity PRD v1.7 Implementation Note.
- **Status (2026-05-04).** RESOLVED-IN-YAML — `audited: true`
  on `contactType`, `mentorStatus` (Contact) and `paymentStatus`
  (Dues). No additional configuration required beyond YAML
  deployment. Verify audit log populates after deployment.

---

## Saved Views and List Filters

### MR-MC-SV-001 — Mentor — Active

- **Source.** MR-MANAGE.
- **Status (2026-05-04).** RESOLVED-IN-YAML — `mentor-active`
  saved view in MR-Contact.yaml v2.0.0.

### MR-MC-SV-002 — Mentor — Prospects

- **Source.** MR-RECRUIT.
- **Status (2026-05-04).** RESOLVED-IN-YAML — `mentor-prospects`.

### MR-MC-SV-003 — Mentor — Submitted Applications

- **Source.** MR-APPLY.
- **Status (2026-05-04).** RESOLVED-IN-YAML —
  `mentor-submitted-applications`.

### MR-MC-SV-004 — Dues — Outstanding

- **Source.** MR-MANAGE dues tracking.
- **Status (2026-05-04).** RESOLVED-IN-YAML — `dues-outstanding`
  saved view in MR-Dues.yaml v1.1.0.

### MR-MC-SV-005 — Mentor — Inactivity Alert

- **Source.** MR-MANAGE inactivity monitoring.
- **Status (2026-05-04).** RESOLVED-IN-YAML —
  `mentor-inactivity-alert` saved view in MR-Contact.yaml v2.0.0
  (filter: contactType contains "Mentor", mentorStatus = Active,
  totalSessionsLast30Days = 0). Depends on the
  totalSessionsLast30Days formula being deployed.

---

## Integrations

### MR-MC-IN-001 — Learning management system integration for training completion

- **Source.** MR-ONBOARD-DAT-002 and MR-ONBOARD-DAT-003 field
  descriptions.
- **Status (2026-05-04).** REMAINING — integration is outside the
  YAML schema scope. The two LMS-fed fields
  (trainingCompleted, trainingCompletionDate) are now flagged
  `externallyPopulated: true` in MR-Contact.yaml v2.0.0 so the
  Verification Spec generator and seed-data import expectations
  skip them. The integration itself must be configured
  post-deployment.

### MR-MC-IN-002 — External email service for outbound mail

- **Source.** MR-MC-WF-001, -002 (and -003 now superseded by the
  duplicate-check alertTemplate).
- **Status (2026-05-04).** REMAINING — outbound email transport
  configuration is outside the YAML schema scope. The
  emailTemplates registered in MR-Contact.yaml v2.0.0 will not
  send without a configured transport.

---

## Summary

Item counts by category, with status breakdown after the
2026-05-04 refresh:

| Category | Total | Resolved-in-YAML | Remaining |
|---|---|---|---|
| Workflows | 9 | 4 | 5 |
| Email Templates | 3 | 0 (registered, body files pending) | 3 |
| Field-Level Access Control | 2 | 0 | 2 |
| Field-Level Dynamic Logic | 4 | 4 | 0 |
| Conditional-Required Logic | 4 | 3 | 1 |
| Calculated Field Formulas | 6 | 6 | 0 |
| Duplicate Detection Rules | 1 | 1 | 0 |
| Stream and Audit Logging | 2 | 1 | 1 |
| Saved Views and List Filters | 5 | 5 | 0 |
| Integrations | 2 | 0 | 2 |
| **Total** | **38** | **24** | **14** |

The 24 resolved items now live in MR-Contact.yaml v2.0.0 or
MR-Dues.yaml v1.1.0 as YAML constructs; the deploy pipeline
will surface those in its MANUAL CONFIGURATION REQUIRED block at
the end of the run (because workflows, savedViews, and
duplicateChecks currently short-circuit to NOT_SUPPORTED per
crmbuilder/CLAUDE.md "YAML Schema Rules"). The 14 remaining items
require post-deployment configuration outside the schema scope.

**Last Updated:** 2026-05-04
