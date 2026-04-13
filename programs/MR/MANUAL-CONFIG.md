# Mentor Recruitment Domain — Manual Configuration List

**Pilot:** Cleveland Business Mentors Process Validation Pilot
**Domain:** Mentor Recruitment (MR)
**Phase 9 conversation date:** 04-13-26
**Files covered:** `MR-Dues.yaml`, `MR-Contact.yaml`

This file enumerates every configuration item required by the Mentor
Recruitment Domain Product Requirements Document v1.0 that the
CRM Builder YAML schema v1.0 cannot express. After YAML deployment
(Phase 12), the administrator must complete each item in the target
CRM's native user interface.

Items are grouped by category. Each item records the source
requirement, what the administrator must configure, and which YAML
elements the configuration depends on.

---

## Workflows

### MR-MC-WF-001 — Applicant confirmation email

- **Source.** MR-APPLY-REQ-003.
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
- **Description.** When a Mentor Administrator changes
  `mentorStatus` to "Declined" and sets `applicationDeclineReason`,
  the system must send a decline notification to the applicant's
  `personalEmail` address. Email content is defined in MR-MC-ET-002.
- **Dependencies.** Contact entity, `mentorStatus`,
  `applicationDeclineReason`, `personalEmail`. Email service.

### MR-MC-WF-003 — Duplicate-email conflict notification

- **Source.** MR-APPLY conflict flow.
- **Description.** When an application submission attempts to
  create a Contact with a `personalEmail` matching an existing
  Contact record, the system must emit a notification (email or
  internal alert) to the Mentor Administrator rather than creating
  a duplicate. The YAML schema has no support for duplicate-detection
  rules — see MR-MC-DD-001.
- **Dependencies.** Contact entity, `personalEmail`. Email or
  notification service.

### MR-MC-WF-004 — Acceptance timestamp population on terms and conditions

- **Source.** MR-APPLY-DAT-021 and MR-APPLY-DAT-022.
- **Description.** When `termsAndConditionsAccepted` transitions to
  Yes, the system must populate
  `termsAndConditionsAcceptanceDateTime` with the current
  server-side timestamp. Both fields are read-only in the YAML.
- **Dependencies.** Contact entity, `termsAndConditionsAccepted`,
  `termsAndConditionsAcceptanceDateTime`.

### MR-MC-WF-005 — Acceptance timestamp population on ethics agreement

- **Source.** MR-ONBOARD-DAT-004 and MR-ONBOARD-DAT-005.
- **Description.** When `ethicsAgreementAccepted` transitions to Yes
  (set by the Mentor Administrator), the system must populate
  `ethicsAgreementAcceptanceDateTime` with the current timestamp.
- **Dependencies.** Contact entity, `ethicsAgreementAccepted`,
  `ethicsAgreementAcceptanceDateTime`.

### MR-MC-WF-006 — `acceptingNewClients` automatic Off on pause or inactive

- **Source.** MR-ONBOARD-DAT-010 field definition.
- **Description.** When `mentorStatus` changes to "Paused" or
  "Inactive," the system must set `acceptingNewClients = No`
  automatically. The reverse is not automatic — setting status back
  to Active does not automatically re-enable `acceptingNewClients`.
- **Dependencies.** Contact entity, `mentorStatus`,
  `acceptingNewClients`.

### MR-MC-WF-007 — `isPrimaryMentor` initialization on activation

- **Source.** MR-ONBOARD-DAT-013 field definition.
- **Description.** When `mentorStatus` changes to "Active" (for the
  first time via MR-ONBOARD), the system must set
  `isPrimaryMentor = Yes` automatically. The Mentor Administrator
  may later override.
- **Dependencies.** Contact entity, `mentorStatus`, `isPrimaryMentor`.

### MR-MC-WF-008 — Departure-field clear on reactivation

- **Source.** MR-DEPART-DAT-002 and MR-DEPART-DAT-003 field
  definitions.
- **Description.** When `mentorStatus` transitions out of "Resigned"
  or "Departed" back to "Active" or "Provisional" (reactivation per
  MR-RECON-DEC-001), the system must clear `departureReason` and
  `departureDate`.
- **Dependencies.** Contact entity, `mentorStatus`, `departureReason`,
  `departureDate`.

### MR-MC-WF-009 — Dues renewal date tracking

- **Source.** Dues Entity PRD Section 1 ("billing cycle based on
  the mentor's activation anniversary") and Contact Entity PRD field
  `duesRenewalDate` (DUES-DEC-005).
- **Description.** The mentor's `duesRenewalDate` on the Contact
  record must be maintained such that it reflects the anniversary
  of the mentor's first activation. Dues records' `dueDate` must be
  derivable from this value. Exact algorithm not specified in the
  Product Requirements Documents.
- **Dependencies.** Contact entity, Dues entity. Note: the
  `duesRenewalDate` field itself is not defined in the Mentor
  Recruitment Domain PRD Section 4 and is therefore not in
  `MR-Contact.yaml` — it is documented in the Contact Entity PRD
  v1.3 but appears to be cross-domain and will come with a later
  domain's YAML.

---

## Email Templates

### MR-MC-ET-001 — Application confirmation email template

- **Source.** MR-MC-WF-001.
- **Description.** Template content for the applicant confirmation
  email. Content is not defined in any Product Requirements Document
  as of the Phase 9 conversation. The Mentor Administrator or a
  content owner must author the template body, subject line, and
  merge fields.

### MR-MC-ET-002 — Application decline email template

- **Source.** MR-MC-WF-002.
- **Description.** Template content for decline notifications.
  Content varies by `applicationDeclineReason` value; may be a
  single template with conditional merge-field content, or seven
  separate templates keyed to the seven reason values. Administrator
  to decide and author.

### MR-MC-ET-003 — Duplicate-email conflict notification template

- **Source.** MR-MC-WF-003.
- **Description.** Template content for the duplicate-email
  administrator alert.

---

## Field-Level Access Control

The YAML schema expresses field types, labels, defaults, required
status, read-only status, and audit status, but does not express
role-based or type-based field-level visibility. The following
Contact fields require post-deployment field-level access control
configuration in addition to (or in place of) the static
`readOnly` flag set in YAML.

### MR-MC-AC-001 — Admin-only fields on Contact

- **Source.** Multiple Contact fields marked Admin-only in the
  Mentor Recruitment Domain PRD Section 4 and the Contact Entity
  PRD v1.3 Section 7 Implementation Notes.
- **Description.** The following fields must be hidden from mentors
  (readable and editable only by the Mentor Administrator persona
  MST-PER-005):
  - `termsAndConditionsAccepted`, `termsAndConditionsAcceptanceDateTime`
  - `ethicsAgreementAccepted`, `ethicsAgreementAcceptanceDateTime`
  - `backgroundCheckCompleted`, `backgroundCheckDate`
  - `felonyConvictionDisclosure`
  - `applicationDeclineReason`
  - `duesStatus`, `duesPaymentDate`
- **Dependencies.** Mentor Administrator role definition. The YAML
  schema v1.0 does not express Roles; these are Manual Configuration.

### MR-MC-AC-002 — Mentor-editable versus read-only distinction

- **Source.** Multiple Contact fields described in the Mentor
  Recruitment Domain PRD as "mentor-editable after activation."
- **Description.** The following fields should be editable by the
  mentor when `mentorStatus = Active`, but read-only to the mentor
  otherwise:
  - `currentEmployer`, `yearsOfBusinessExperience`,
    `professionalBio`, `industrySectors`, `mentoringFocusAreas`,
    `skillsExpertiseTags`, `fluentLanguages`,
    `whyInterestedInMentoring`, `maximumClientCapacity`,
    `acceptingNewClients`
- **Dependencies.** Mentor role definition, plus a state-dependent
  edit rule keyed to `mentorStatus`. Neither is expressible in
  YAML v1.0.

---

## Field-Level Dynamic Logic

The YAML schema supports panel-level `dynamicLogicVisible` but does
not support field-level dynamic logic. The following field-level
visibility rules must be configured post-deployment.

### MR-MC-DL-001 — Dues entity paymentDate field visibility

- **Source.** Dues Entity PRD Section 5.1.
- **Description.** Show `paymentDate` only when
  `paymentStatus = "Paid"`.

### MR-MC-DL-002 — Dues entity paymentMethod field visibility

- **Source.** Dues Entity PRD Section 5.2 and 5.3.
- **Description.** Hide `paymentMethod` when
  `paymentStatus = "Waived"`. Also effectively hidden when
  `paymentStatus = "Unpaid"` (no method to display before payment).

### MR-MC-DL-003 — Contact applicationDeclineReason field visibility

- **Source.** MR-APPLY-DAT-024.
- **Description.** Show `applicationDeclineReason` only when
  `mentorStatus = "Declined"`.

### MR-MC-DL-004 — Contact departureReason and departureDate visibility

- **Source.** MR-DEPART-DAT-002 and MR-DEPART-DAT-003.
- **Description.** Show `departureReason` and `departureDate` only
  when `mentorStatus` is "Resigned" or "Departed."

---

## Conditional-Required Logic

The YAML schema supports only static `required: true` or `false`,
not conditional-required. The following fields need conditional
requiring configured post-deployment.

### MR-MC-CR-001 — Dues paymentDate required when Paid

- **Source.** Dues Entity PRD Section 3.2.
- **Description.** `paymentDate` must be required when
  `paymentStatus = "Paid"` and optional otherwise. YAML currently
  sets `required: false`.

### MR-MC-CR-002 — Dues paymentMethod required when Paid

- **Source.** Dues Entity PRD Section 3.2.
- **Description.** `paymentMethod` must be required when
  `paymentStatus = "Paid"` and optional otherwise. YAML currently
  sets `required: false`.

### MR-MC-CR-003 — Contact applicationDeclineReason required when Declined

- **Source.** MR-APPLY-DAT-024 ("Required when mentorStatus =
  Declined").
- **Description.** `applicationDeclineReason` must be required when
  `mentorStatus = "Declined"` and optional otherwise. YAML currently
  sets `required: false`.

### MR-MC-CR-004 — Background check fields conditional on administrator decision

- **Source.** MR-ONBOARD-DAT-006 and MR-ONBOARD-DAT-007.
- **Description.** `backgroundCheckCompleted` and
  `backgroundCheckDate` are conditionally required when a background
  check is required for a given mentor. The trigger is an external
  administrative decision rather than another field value. This may
  be operational discipline rather than system-enforced conditional
  requiring.

---

## Calculated Field Formulas

The YAML schema allows `readOnly: true` on a field but does not
define the formula that populates it. The following fields require
formulas configured post-deployment.

### MR-MC-CF-001 — Contact.currentActiveClients

- **Source.** MR-MANAGE-DAT-019.
- **Description.** Count of Engagement records where
  `assignedMentor` equals this Contact and `engagementStatus` is
  "Active" or "Assigned."
- **Dependencies.** Engagement entity (defined in the Mentoring
  domain — not yet through Phase 9).

### MR-MC-CF-002 — Contact.availableCapacity

- **Source.** MR-MANAGE-DAT-020.
- **Description.** `maximumClientCapacity` minus
  `currentActiveClients`. Integer arithmetic, straightforward
  formula.

### MR-MC-CF-003 — Contact.totalLifetimeSessions

- **Source.** MR-MANAGE-DAT-021.
- **Description.** Count of Session records (type = Completed) where
  the mentor on the linked Engagement is this Contact.
- **Dependencies.** Session entity, Engagement entity.

### MR-MC-CF-004 — Contact.totalMentoringHours

- **Source.** MR-MANAGE-DAT-022.
- **Description.** Sum of session hours across all Session records
  (type = Completed) where the mentor on the linked Engagement is
  this Contact.
- **Dependencies.** Session entity, Engagement entity.

### MR-MC-CF-005 — Contact.totalSessionsLast30Days

- **Source.** MR-MANAGE-DAT-023.
- **Description.** Count of Completed Session records in the last
  30 days where the mentor on the linked Engagement is this
  Contact. Used by the inactivity alert (see MR-MC-WF next section).
- **Dependencies.** Session entity, Engagement entity.

### MR-MC-CF-006 — Dues.name auto-generation

- **Source.** Dues Entity PRD Section 2 (Native Fields note).
- **Description.** Auto-generate the Dues entity's `name` field as
  `{Mentor Name} — {Billing Year}` (e.g., "John Smith — 2026").
- **Dependencies.** Dues entity, Contact entity (for Mentor Name
  lookup through the `duesToMentor` relationship), `billingYear`
  field.

---

## Duplicate Detection Rules

### MR-MC-DD-001 — Contact duplicate detection on `personalEmail`

- **Source.** MR-APPLY duplicate-email conflict flow.
- **Description.** When an application submission attempts to
  create a Contact whose `personalEmail` matches an existing
  Contact's `personalEmail`, the system must flag (and block) the
  duplicate rather than creating a new record. The YAML schema
  does not express duplicate-detection rules.
- **Dependencies.** Contact entity, `personalEmail`. Pairs with
  MR-MC-WF-003.

---

## Stream and Audit Logging

### MR-MC-AU-001 — Contact entity stream

- **Source.** Contact Entity PRD v1.3 Section 1 ("Activity Stream:
  Yes").
- **Description.** Enable the activity stream on the Contact entity.
  The Contact YAML in this file does not set `stream: true` because
  this file defines field additions only, not entity creation
  (Contact is a native entity). The stream setting is a
  native-entity configuration rather than a YAML-createable
  property. Confirm the stream is enabled in the target CRM's
  administrative settings.

### MR-MC-AU-002 — Audited fields

- **Source.** Contact Entity PRD v1.3 Section 7 Implementation
  Note 4.
- **Description.** The following fields are already flagged
  `audited: true` in YAML and should be audited:
  - `contactType` (via this file)
  - `mentorStatus` (via this file)
  - `paymentStatus` on Dues (via `MR-Dues.yaml`)
  No additional audit configuration is required beyond YAML
  deployment. This entry exists so the administrator can verify that
  audit logs populate as expected after deployment.

---

## Saved Views and List Filters

### MR-MC-SV-001 — Mentor — Active

- **Source.** Mentor Recruitment Domain PRD process documents
  (general operational need implied across MR-MANAGE and related
  processes).
- **Description.** A saved Contact list view filtered to
  `contactType` contains "Mentor" and `mentorStatus = "Active"`.

### MR-MC-SV-002 — Mentor — Prospects

- **Source.** MR-RECRUIT process document.
- **Description.** A saved Contact list view filtered to
  `contactType` contains "Mentor" and `mentorStatus = "Prospect"`.

### MR-MC-SV-003 — Mentor — Submitted Applications

- **Source.** MR-APPLY process document.
- **Description.** A saved Contact list view filtered to
  `contactType` contains "Mentor" and `mentorStatus` is "Submitted"
  or "In Review."

### MR-MC-SV-004 — Dues — Outstanding

- **Source.** MR-MANAGE dues tracking.
- **Description.** A saved Dues list view filtered to
  `paymentStatus = "Unpaid"` and `dueDate` in the past or within
  the configurable grace window (see MR-MC-WF-010 below if
  created).

### MR-MC-SV-005 — Mentor — Inactivity Alert

- **Source.** MR-MANAGE inactivity monitoring.
- **Description.** A saved Contact list view filtered to
  `contactType` contains "Mentor", `mentorStatus = "Active"`, and
  `totalSessionsLast30Days = 0`.

---

## Integrations

### MR-MC-IN-001 — Learning management system integration for training completion

- **Source.** MR-ONBOARD-DAT-002 and MR-ONBOARD-DAT-003 field
  descriptions.
- **Description.** Both `trainingCompleted` and
  `trainingCompletionDate` are described as "system-populated via
  learning management system integration, or manually set as
  fallback." The integration itself must be configured
  post-deployment. If no integration is in place at deployment
  time, the Mentor Administrator populates both fields manually.

### MR-MC-IN-002 — External email service for outbound mail

- **Source.** MR-MC-WF-001, MR-MC-WF-002, MR-MC-WF-003.
- **Description.** The target CRM must be configured to send
  outbound email. Whether via the CRM's built-in mail transport or
  an external email service, this is a Manual Configuration item —
  the YAML schema does not express mail transport configuration.
- **Dependencies.** All email-generating workflows above.

---

## Summary

Item counts by category:

| Category | Count |
|---|---|
| Workflows | 9 |
| Email Templates | 3 |
| Field-Level Access Control | 2 |
| Field-Level Dynamic Logic | 4 |
| Conditional-Required Logic | 4 |
| Calculated Field Formulas | 6 |
| Duplicate Detection Rules | 1 |
| Stream and Audit Logging | 2 |
| Saved Views and List Filters | 5 |
| Integrations | 2 |
| **Total** | **38** |

**Last Updated:** 04-13-26 15:45
