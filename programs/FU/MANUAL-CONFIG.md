# Fundraising Domain — Manual Configuration List

**Implementation:** Cleveland Business Mentors CRM Implementation
**Domain:** Fundraising (FU)
**Phase 9 conversation date:** 05-01-26
**Files covered:** `FU-Contact.yaml`, `FU-Account.yaml`, `FU-Contribution.yaml`, `FU-FundraisingCampaign.yaml`

This file enumerates every configuration item required by the
Fundraising Domain Product Requirements Document v1.0 (Phase 8
Approved) that the CRM Builder YAML schema v1.1 cannot express.
After YAML deployment (Phase 12), the administrator must complete
each item in the target CRM's native user interface.

Items are grouped by category. Each item records the source
requirement, what the administrator must configure, and which YAML
elements the configuration depends on.

---

## Role-Based Field Visibility

Schema v1.1 defers role-based field-level permissions to v1.2
(Category 6 of the gap analysis). Until then, the items below must
be configured manually in the target CRM's native role and
permission system.

### FU-MC-RV-001 — Restrict `donorNotes` to Donor / Sponsor Coordinator and above

- **Source.** FU-PROSPECT-REQ-013, FU Domain PRD v1.0 Section 4.1.
- **Description.** The `donorNotes` field on the Contact entity
  must be visible (read and write) only to the Donor / Sponsor
  Coordinator, the Executive Member, and the System Administrator.
  All other personas (Mentor Administrator, Client Recruiter,
  Partner Coordinator, Content and Event Administrator, Mentor,
  Member, Client) must have no access to this field — neither
  read nor write — even when the underlying Contact record is
  otherwise visible to them. Configure as field-level access
  control in the target CRM's role system after YAML deployment.
- **Dependencies.** Contact entity, `donorNotes` field, role
  definitions for the four restricted-access personas.

### FU-MC-RV-002 — Restrict `funderNotes` to Donor / Sponsor Coordinator and above

- **Source.** FU-PROSPECT-REQ-013, FU Domain PRD v1.0 Section 4.2.
- **Description.** Parallel to FU-MC-RV-001, applied to the
  `funderNotes` field on the Account entity. Same access rule:
  visible only to Donor / Sponsor Coordinator, Executive Member,
  System Administrator.
- **Dependencies.** Account entity, `funderNotes` field, role
  definitions.

### FU-MC-RV-003 — Restrict Contribution record-level visibility

- **Source.** FU-RECORD-REQ-021, FU Domain PRD v1.0 Section 3.2.
- **Description.** All Contribution records — and all fields on
  Contribution records, including the in-record `notes` field —
  must be visible only to the Donor / Sponsor Coordinator, the
  Executive Member, and the System Administrator. Other personas
  must have no record-level visibility to Contribution records,
  even when the linked donor Contact or donor Account is otherwise
  visible to them. Configure as record-level visibility (also
  called row-level security or scope) in the target CRM's role
  system.
- **Dependencies.** Contribution entity, role definitions.

### FU-MC-RV-004 — Restrict FundraisingCampaign record-level visibility

- **Source.** FU-RECORD-REQ-022, FU Domain PRD v1.0 Section 3.2.
- **Description.** Parallel to FU-MC-RV-003, applied to the
  FundraisingCampaign entity. Same access rule: visible only to
  Donor / Sponsor Coordinator, Executive Member, System
  Administrator.
- **Dependencies.** FundraisingCampaign entity, role definitions.

### FU-MC-RV-005 — Restrict `lastContactDate` visibility to FU-domain personas

- **Source.** FU-STEWARD-REQ-012, FU Domain PRD v1.0 Section 3.3.
- **Description.** The `lastContactDate` field on Contact and on
  Account is part of the FU-STEWARD field set whose visibility is
  restricted to the Donor / Sponsor Coordinator, the Executive
  Member, and the System Administrator. Same restriction as the
  `donorNotes` and `funderNotes` fields.
- **Dependencies.** Contact and Account entities, `lastContactDate`
  fields, role definitions.

### FU-MC-RV-006 — FU-REPORT visibility carry-through

- **Source.** FU-REPORT-REQ-021, FU Domain PRD v1.0 Section 3.4.
- **Description.** Field-level and record-level visibility rules
  established by FU-MC-RV-001 through FU-MC-RV-005 must carry
  through to FU-REPORT outputs (the ten defined reports, packets,
  ad-hoc reports, Annual Donor Giving Summaries). A user who
  cannot see a field or record in the source entities must not
  see it in any FU-REPORT output. Verify carry-through after each
  role configuration is applied; the target CRM's reporting layer
  typically inherits source-entity visibility automatically, but
  this should be confirmed.
- **Dependencies.** All FU entities, all FU role configurations
  in FU-MC-RV-001 through FU-MC-RV-005.

---

## Advanced Automation

Schema v1.1 supports five trigger events and four actions in
`workflows:` blocks. Automations that require trigger or action
types beyond the v1.1 vocabulary, or that operate across entity
boundaries, must be configured manually in the target CRM's
native automation system.

### FU-MC-AA-001 — Auto-Active transition on first Contribution

- **Source.** FU-PROSPECT-REQ-006, FU-RECORD-REQ-010, FU Domain
  PRD v1.0 Section 3.1 Process Workflow step 7.
- **Description.** When a Contribution record is created, the
  system must automatically transition the linked donor's
  lifecycle field to "Active": `donorStatus` on the Contact when
  the Contribution is linked via `donorContact`, or `funderStatus`
  on the Account when linked via `donorAccount`. The transition
  applies regardless of `contributionType` and regardless of the
  donor's prior lifecycle state — any Contribution against a
  pre-Active donor or funder marks the relationship as live.
  This is a cross-entity setField action that the v1.1 workflow
  vocabulary cannot express. Configure as a native automation in
  the target CRM. See EXCEPTIONS.md FU-Y9-EXC-002.
- **Dependencies.** Contribution entity (trigger source), Contact
  entity with `donorStatus` field, Account entity with
  `funderStatus` field, the `contributionDonorContact` and
  `contributionDonorAccount` relationships.

### FU-MC-AA-002 — `donorContact` / `donorAccount` mutual exclusivity

- **Source.** FU-RECORD-REQ-002, FU Domain PRD v1.0 Section 3.2.
- **Description.** Exactly one of `donorContact` or `donorAccount`
  must be populated on every Contribution record — not both, not
  neither. The constraint must be enforced at save time
  (creation and edit). The target CRM must validate the
  Contribution before save and reject any save where both fields
  are populated or both are null. Configure as a native validation
  rule. See EXCEPTIONS.md FU-Y9-EXC-003.
- **Dependencies.** Contribution entity, `donorContact` field,
  `donorAccount` field.

### FU-MC-AA-003 — `acceptingNewClients` parallel for Coordinator-only fields

- **Source.** FU-STEWARD-REQ-009 (no system-fired alerts in the
  Fundraising domain).
- **Description.** No automated notifications, alerts, reminders,
  or scheduled prompts are configured in support of FU-STEWARD.
  This is a deliberate behavioral choice, not a missing capability.
  Recorded here as a Manual Configuration boundary statement: the
  administrator should explicitly *not* configure scheduled
  notifications for FU-STEWARD's three saved views even if the
  target CRM offers such capability. The Coordinator's discipline
  drives the sweep cadence.
- **Dependencies.** None — this item documents a non-action.

---

## Saved Views — Cross-Entity

### FU-MC-UV-001 — Active Donors and Funders Sweep List (cross-entity union)

- **Source.** FU-STEWARD-REQ-006, FU Domain PRD v1.0 Section 3.3
  Process Workflow saved-list 1.
- **Description.** The Active Donors and Funders Sweep List is a
  single working list that spans two entities — Contact records
  with `donorStatus = Active` and Account records with
  `funderStatus = Active` — sorted together by `lastContactDate`
  ascending, with null values first. v1.1 saved views are
  per-entity, so a single saved view cannot express this union.
  The Coordinator opens two single-entity views during the
  sweep — a filtered Contact list for Active donors and a
  filtered Account list for Active funders — and works from
  both. If the target CRM offers a multi-entity dashboard or
  union-view feature, configure both source filters and a union
  display. See EXCEPTIONS.md FU-Y9-EXC-004.
- **Dependencies.** Contact entity with `donorStatus` and
  `lastContactDate` fields, Account entity with `funderStatus`
  and `lastContactDate` fields. The two filtered list views the
  Coordinator uses are not added to YAML — they are produced
  with the target CRM's standard list-filter feature using the
  `donorStatus = Active` and `funderStatus = Active` filters
  respectively.

---

## Option Lists — Deferred Master Lists

### FU-MC-OL-001 — Northeast Ohio zip code master list

- **Source.** FU-RECON-ISS-003, FU Domain PRD v1.0 Section 6
  Open Issues; cross-references FU-REPORT-ISS-001, FC-ISS-001,
  FU-REPORT-REQ-027.
- **Description.** The `geographicServiceArea` field on Account
  and on FundraisingCampaign is declared as a `multiEnum` whose
  option list is the Northeast Ohio zip code master list. The
  master list itself is deferred to Phase 9 implementation. The
  YAML files generate the field with an empty `options: []` list
  (see EXCEPTIONS.md FU-Y9-EXC-001). When the master list is
  established, populate the `options:` list on both fields and
  bump `content_version` accordingly. Until then, the field is
  available to set on records but no values are available to
  select.
- **Dependencies.** Account entity, FundraisingCampaign entity,
  the `geographicServiceArea` field on each. External
  dependency: a Northeast Ohio geographic source (USPS zip code
  list, U.S. Census Bureau, Ohio state geographic data, or a
  CBM-curated working list).

---

End of Manual Configuration List.
