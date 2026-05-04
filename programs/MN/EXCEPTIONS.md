# Mentoring Domain — Phase 9 Exception List

**Implementation:** Cleveland Business Mentors (CBM)
**Domain:** Mentoring (MN)
**Phase 9 conversation date:** 2026-05-04 (unattended multi-domain run)
**Files covered:** `MN-Contact.yaml`, `MN-Engagement.yaml`,
`MN-Session.yaml`, `MN-Account.yaml`

This file records every Phase 9 situation that triggered a
Stop-and-Ask per the Phase 9 YAML Generation Guide v1.1 Section
"When to Stop and Ask." Because this Phase 9 was an unattended
multi-domain run, the standard Stop-and-Ask was deferred to
EXCEPTIONS recording with a best-effort decision per the
multi-domain run prompt's operating principle 4.1.

---

## MN-Y9-EXC-001 — Empty MN-Contact.yaml (no MN-only Contact custom fields)

**Trigger.** The multi-domain run prompt explicitly listed
`MN-Contact.yaml` as an expected output ("MN's mentee-specific
custom field additions to native Contact"), but the MN Domain PRD
and Contact Entity PRD v1.7 between them produce no MN-only
Contact custom field additions:
- All Client Contact intake fields named in the MN PRD Section 4
  (firstName, lastName, middleName, emailAddress, phoneNumber,
  addressPostalCode for Zip Code) are native Person-type fields.
- preferredName and linkedInProfile are shared custom fields
  already declared in MR-Contact.yaml per Contact PRD Section 3.1.
- The "Primary Contact" designation (MN-INTAKE-DAT-016) is
  implemented as a bool on the Contact-to-Account relationship,
  not as a Contact field, per Contact PRD CON-DEC-001.

**Best-effort decision.** Generate MN-Contact.yaml as a
documentation-only file: it declares the Contact entity with a
description block explaining MN's Engagement / Session
relationship-only stance, and includes no `fields:` list. This
keeps parity with the prompt's expected-outputs list and gives
the deploy engine an explicit "MN touched Contact only via
relationships" record.

**Rationale.** The conservative interpretation is to honor what
the PRDs actually say rather than invent fields the prompt's
"e.g." text loosely implies. The Contact PRD is the authoritative
source for what fields live on Contact and which domain owns each.

**Reversal cost.** Low — adding a field later is a content_version
PATCH or MINOR bump.

**Open question for user.** Is there a Client-specific Contact
field set that the Contact PRD has not yet captured (e.g., a
"clientStatus" or "menteeStatus" analogous to mentorStatus on
the Mentor side) that should live on Contact rather than on
Account? CON-ISS-001 was closed in Contact PRD v1.3 in favor of
a two-field model (Contact.prospectStatus + Account.clientStatus)
but Account.clientStatus is CR-domain-owned, not MN-owned.

---

## MN-Y9-EXC-002 — Engagement.mentoringFocusAreas value list source

**Trigger.** Required field property missing from the source
documents. The MN Domain PRD Section 4 marks
mentoringFocusAreas (on Engagement) as "TBD — see
MN-INTAKE-ISS-001," and the Engagement Entity PRD v1.2 marks the
same field as "TBD — see ENG-ISS-001."

**Context.** The MN PRD Section 3.2 explicitly states the value
list "must align with the corresponding field on the Mentor
profile." The Mentor Contact's mentoringFocusAreas field has a
finalized 42-value list in MR-Contact.yaml per MR-Y9-EXC-002.

**Best-effort decision.** Adopt the same 42-value list verbatim
on Engagement.mentoringFocusAreas. Recorded in MN-Engagement.yaml.

**Rationale.** The cross-entity alignment requirement is
unambiguous; the only deferred decision is which list to align
to, and only one finalized list exists.

**Reversal cost.** Low — option list edits are a content_version
PATCH bump.

**Open question for user.** Confirm that the 42 MR-Contact values
are correct for the client side as well. Close ENG-ISS-001 and
MN-INTAKE-ISS-001 once confirmed.

---

## MN-Y9-EXC-003 — Engagement.closeReason value list completeness

**Trigger.** ENG-ISS-002 (open): "Close Reason: complete list of
allowed values needs finalization. Current values are Goals
Achieved, Client Withdrew, Inactive / No Response, and Other.
Additional values may be needed per organizational requirements."

**Best-effort decision.** Use the four documented values verbatim:
Goals Achieved, Client Withdrew, Inactive / No Response, Other.

**Rationale.** Adding values to an enum later is the lowest-cost
change shape; locking in the four documented values is the
conservative choice.

**Reversal cost.** Low — option list edits are a content_version
PATCH bump.

**Open question for user.** What additional close reason values
does CBM program leadership require? Close ENG-ISS-002 and
MN-CLOSE-ISS-001 once confirmed.

---

## MN-Y9-EXC-004 — Session.topicsCovered value list deferred

**Trigger.** SES-ISS-001 / MN-ENGAGE-ISS-002 (open): topicsCovered
multiEnum value list "to be defined by CBM leadership."

**Best-effort decision.** Declare the field with an empty options
list (`options: []`). Pair with MANUAL-CONFIG.md MN-MC-OL-001 so
the deferral is visible to the operator.

**Rationale.** Mirrors the pattern used by FU-FundraisingCampaign's
geographicServiceArea (MN-Y9-EXC-001-equivalent in the FU domain).
The deploy engine should accept the empty list; the field is not
required, so absence of options does not block creation.

**Reversal cost.** Low — adding values is a content_version PATCH
bump. No data migration required because the field is not yet
populated.

**Open question for user.** What topic taxonomy does CBM want for
session-summary inclusion? Close SES-ISS-001 and
MN-ENGAGE-ISS-002 once confirmed.

---

## MN-Y9-EXC-005 — Account.industrySubsector value list deferred

**Trigger.** Required field property missing from the source
documents. MN Domain PRD Section 4 specifies industrySubsector as
"~100 subsectors filtered by Industry Sector" but enumerates none
of them, and the Account Entity PRD v1.8 carries the same
shorthand without enumeration.

**Best-effort decision.** Declare the field with an empty options
list (`options: []`) and surface the dependent-filter requirement
in MANUAL-CONFIG.md MN-MC-DD-002. The schema does not express
dependent / cascading enums (selecting an industrySector value
constrains the industrySubsector option list); that behavior is
post-deployment configuration regardless of the value list state.

**Rationale.** Same shape as FU-FundraisingCampaign's
geographicServiceArea pattern. Empty option list keeps the field
declaration valid; dependent-filter behavior is a separate
schema-gap concern.

**Reversal cost.** Low for the value list itself (PATCH bump);
medium for the dependent-filter behavior (post-deployment
configuration once the lists are known).

**Open question for user.** What is the authoritative ~100-value
NAICS subsector list, and what is its filter relationship to the
20-value sector list? Close MN-INTAKE-DEC equivalent (currently
unrecorded as an open issue ID) and update the Account Entity
PRD accordingly.

---

## MN-Y9-EXC-006 — MN-Account.yaml generated despite not being on the prompt's expected-outputs list

**Trigger.** The multi-domain run prompt's Section 5.1 listed three
MN outputs (MN-Contact.yaml, MN-Engagement.yaml, MN-Session.yaml)
without naming an Account output, but the MN Domain PRD Section 4
defines five custom fields on the Client Organization (which is
the native Account entity), and the Account Entity PRD v1.8
Section 3.3 explicitly tags those five fields as MN-domain-owned.

**Best-effort decision.** Generate MN-Account.yaml with the five
required fields (organizationType, businessStage, industrySector,
industrySubsector, clientNotes). All are conditionally visible
(accountType contains Client) per Account Entity PRD dynamic-logic
conventions.

**Rationale.** Per multi-domain run prompt Section 4.2 #4 ("the
most conservative interpretation that the deploy will accept"),
omitting the file would leave the MN Domain PRD's required Client
Organization fields unimplemented. Since MN owns these fields
per the Account PRD, generating them at MN's Phase 9 — rather than
deferring to a hypothetical future Phase 9 — is the conservative
choice.

**Reversal cost.** Low — if the user prefers Account contributions
to come from CR-Account.yaml instead, the five fields can be cut
from MN-Account.yaml (delete the file) and added to CR-Account.yaml
in CR's Phase 9 with a content_version MINOR bump.

**Open question for user.** Should Client-specific Account fields
live in MN-Account.yaml (this run's choice) or in CR-Account.yaml
(consolidated with CR's accountType discriminator and Partner /
Donor-Sponsor fields)?

---

## Summary

Six exceptions raised. Three of them (MN-Y9-EXC-002, -003, -004,
and partially -005) are TBD value list deferrals carried forward
from Open Issues in the source PRDs. Two (MN-Y9-EXC-001, -006)
record scope-and-shape decisions made during this unattended run
that the user should review on return.

**Last Updated:** 2026-05-04
