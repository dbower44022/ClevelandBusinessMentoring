# Fundraising Domain — Phase 9 Exception List

**Implementation:** Cleveland Business Mentors CRM Implementation
**Domain:** Fundraising (FU)
**Phase 9 conversation date:** 05-01-26
**Files covered:** `FU-Contact.yaml`, `FU-Account.yaml`, `FU-Contribution.yaml`, `FU-FundraisingCampaign.yaml`

This file records every Phase 9 situation that triggered a
Stop-and-Ask per the Phase 9 YAML Generation Guide v1.1 Section
"When to Stop and Ask." Each entry gives the trigger, the question
posed, the resolution, and where the resolution appears in the
produced YAML.

---

## FU-Y9-EXC-001 — `geographicServiceArea` option list deferred

**Trigger.** Required field property missing from the source
documents. The Fundraising Domain Product Requirements Document
v1.0 Section 4.2 and Section 4.4 describe `geographicServiceArea`
on Account and on FundraisingCampaign as a `multiEnum` field whose
values are the Northeast Ohio zip code master list — but the master
list itself is explicitly deferred to Phase 9 implementation per
FU-RECON-ISS-003.

**Context.** The deferral is consolidated and cross-references three
prior open issues: FU-REPORT-ISS-001, FC-ISS-001, and
FU-REPORT-REQ-027. The field is functional only when paired with
the master list, but the master list cannot be authored without
external Northeast Ohio geographic input that has not yet been
collected.

**Question.** Should the field be omitted from YAML pending the
master list, or generated with a placeholder option list and the
list populated separately?

**Resolution.** Generate the field in YAML with an empty `options:
[]` list and document the master-list dependency in
MANUAL-CONFIG.md entry FU-MC-OL-001. The field schema, label,
description, visibility rules, and panel placement are settled and
do not depend on the option-list contents — populating the options
later is a single edit to two YAML files. The field is generated
on both Account (`FU-Account.yaml`) and FundraisingCampaign
(`FU-FundraisingCampaign.yaml`) with identical empty option lists.

**Required follow-up.** When the Northeast Ohio zip code master
list is established (anticipated during Phase 9 implementation),
populate the `options:` list on both fields and bump
`content_version` to `1.0.1` (PATCH per Section 4 of the schema —
adding option values is a MINOR bump but adding options to a
previously-empty list could be argued as either; PATCH treats it
as a documentation completion).

---

## FU-Y9-EXC-002 — Auto-Active transition not expressible as a workflow

**Trigger.** Workflow trigger or action outside the v1.1 vocabulary.
FU-PROSPECT-REQ-006 and FU-RECORD-REQ-010 specify that the
creation of any Contribution record automatically transitions the
linked donor's lifecycle field — `donorStatus` on Contact when
linked via `donorContact`, or `funderStatus` on Account when
linked via `donorAccount` — to "Active." This is a cross-entity
automation: the trigger is on Contribution creation, but the
target field is on a different entity (Contact or Account)
reachable only through a relationship link.

**Context.** The v1.1 workflow `setField` action operates on the
entity firing the trigger. There is no documented mechanism in
schema v1.1 for setting a field on a related record via a link.
The closest mechanism — `createRelatedRecord` — is explicitly
deferred to v1.2 per the schema, and even that wouldn't apply
here (the related record already exists; the requirement is to
update it).

**Question.** How should the auto-Active transition be expressed?

**Resolution.** Record as Manual Configuration item FU-MC-AA-001
under Advanced Automation. The transition is functionally required
by the Domain PRD but not expressible in v1.1 YAML; the target CRM
must implement the cross-entity setField via native automation
(workflow rule, formula, or scripted handler). The Contribution
entity description in `FU-Contribution.yaml` notes this dependency.

**Required follow-up.** Schema v1.2 should consider a
cross-entity `setField` action whose target is a field on the
record reached via a named link. This would also be useful for
several other patterns identified during MR Phase 9 (the
acceptance-timestamp population on a related record, for example).

---

## FU-Y9-EXC-003 — `donorContact` / `donorAccount` mutual exclusivity not expressible

**Trigger.** Required field property missing from the v1.1 vocabulary.
FU-RECORD-REQ-002 specifies that exactly one of `donorContact` or
`donorAccount` must be populated on every Contribution — not both,
not neither. This is a record-level cross-field constraint that
goes beyond what `requiredWhen:` and `visibleWhen:` can express
individually.

**Context.** The v1.1 schema offers `requiredWhen:` for conditional
requirement of a single field based on conditions on other fields.
A naive translation would set `requiredWhen:` on `donorContact` to
fire when `donorAccount` is null and vice versa, but that alone
would not prevent both being populated simultaneously, only ensure
that at least one is. There is no v1.1 construct for "exactly one
of these two fields must be populated, and not both."

**Question.** How should mutual exclusivity be enforced?

**Resolution.** Both fields are generated with `required: false` so
neither blocks creation when the other is the donor link. The
mutual-exclusivity constraint is recorded as Manual Configuration
item FU-MC-AA-002 under Advanced Automation; the target CRM must
enforce the constraint via native validation (a save handler or
business rule). The Contribution Entity description in
`FU-Contribution.yaml` and the field-level descriptions on both
`donorContact` and `donorAccount` note this dependency.

**Required follow-up.** Schema v1.2 should consider a field-set
constraint construct of the form `mutuallyExclusiveWith:` (declared
on a field, naming one or more sibling fields) or
`exactlyOneOf:` (declared at the entity level, naming a list of
fields exactly one of which must be populated). The pattern is
likely to recur — entity discriminator scenarios where the
identity comes from one of multiple link types are common.

---

## FU-Y9-EXC-004 — Active Donors and Funders Sweep List spans two entities

**Trigger.** Saved view scope outside v1.1 vocabulary.
FU-STEWARD-REQ-006 specifies a saved list — the Active Donors and
Funders Sweep List — that surfaces all Contact records with
`donorStatus = Active` and all Account records with
`funderStatus = Active` together, sorted by `lastContactDate`
ascending with null values first. This is a single working list
that spans two different entities.

**Context.** The v1.1 `savedViews:` block is declared per-entity
and filters records of that one entity. There is no construct for
a multi-entity union view in v1.1.

**Question.** How should the cross-entity sweep list be
implemented?

**Resolution.** Two single-entity saved views are generated — one
on Contact (filtering `donorStatus = Active` plus
`contactType contains Donor`) and one on Account (filtering
`funderStatus = Active` plus `accountType contains Donor/Sponsor`)
— and the union of the two is recorded as Manual Configuration
item FU-MC-UV-001 under "Anything else." The Coordinator opens
both saved views together during the sweep, working from one and
then the other.

**Update during generation.** On reflection, two single-entity
saved views were not added to `FU-Contact.yaml` and `FU-Account.yaml`
because the field-level visibility rules for `donorStatus` and
`funderStatus` already filter the working population — a Contact
record with `donorStatus = Active` is a Donor by definition, and
the saved view filter would duplicate the visibility rule. The
Coordinator can use the standard list view filtered on
`donorStatus = Active` (and the parallel on Account) without a
named saved view. The cross-entity union itself remains a
Manual Configuration item.

**Required follow-up.** Schema v1.2 should consider a cross-entity
saved-view construct of the form `entityUnion:` listing two or
more entities and a per-entity filter for each. The pattern is
likely to recur — sweep lists that span multiple entity types are
a common stewardship and compliance pattern.

---

End of Phase 9 Exception List.
