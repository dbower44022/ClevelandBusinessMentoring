# Mentor Recruitment Domain — Phase 9 Exception List

**Implementation:** Cleveland Business Mentors (CBM)
**Domain:** Mentor Recruitment (MR)
**Phase 9 conversation date:** 04-13-26 (initial), refreshed
2026-05-04 (multi-domain Phase 9 unattended run)
**Files covered:** `MR-Dues.yaml`, `MR-Contact.yaml`

This file records every Phase 9 situation that triggered a
Stop-and-Ask per the Phase 9 YAML Generation Guide v1.1 Section
"When to Stop and Ask." Original 04-13-26 entries (MR-Y9-EXC-001
through MR-Y9-EXC-005) are retained verbatim because their
resolutions remain authoritative. New entries appended for the
2026-05-04 refresh.

---

## MR-Y9-EXC-001 — `industrySectors` option list source

**Trigger.** Required field property missing from the source
documents. The Mentor Recruitment Domain Product Requirements
Document v1.0 Section 4.3 defines `industrySectors` as a required
multiEnum field with values described as "20 NAICS sectors (aligned
with Client Organization)" — but the 20 values are not enumerated in
the Mentor Recruitment Domain PRD, the Contact Entity Product
Requirements Document v1.3, or the Account Entity Product
Requirements Document v1.3.

**Context.** The Account Entity PRD v1.3 Section 3 describes
`industrySector` as "20 top-level NAICS sectors" with the same
shorthand but no enumeration. The only place the explicit 20-value
list exists in the repository is the archived pre-methodology YAML
file `programs/Archive/cbm_account_fields_merged.yaml`.

**Question.** Where should the option list come from — user-supplied,
the archived legacy YAML, or paused pending upstream PRD
reconciliation?

**Resolution.** Adopt the 20 standard United States Census Bureau
NAICS two-digit sector titles as they appear in the archived legacy
YAML. The list is verbatim in `MR-Contact.yaml` on the
`industrySectors` field. The same 20 values are now also used in
`MN-Account.yaml` for `industrySector` (single-select) per the
2026-05-04 multi-domain run, completing the cross-entity alignment.

**Required follow-up.** The Account Entity Product Requirements
Document v1.8 Section 3.3 explicitly references this same MR-Y9-EXC
record and adopts the 20-value list for Account.industrySector,
closing the original cross-entity alignment gap.

---

## MR-Y9-EXC-002 — `mentoringFocusAreas` option list source

**Trigger.** Required field property missing from the source
documents. The Mentor Recruitment Domain PRD Section 4.3 defines
`mentoringFocusAreas` as a required multiEnum field with values
marked "TBD — see CON-ISS-005."

**Question.** Where should the option list come from?

**Resolution.** User-supplied during the Phase 9 conversation.
42 values recorded verbatim in `MR-Contact.yaml` on the
`mentoringFocusAreas` field. The same 42 values are now also used
in `MN-Engagement.yaml` for `Engagement.mentoringFocusAreas` per
the 2026-05-04 multi-domain run, completing the cross-entity
alignment requirement (mentor and engagement value sets must match
for matching to work).

**Required follow-up.** Open issue CON-ISS-005 on the Contact Entity
Product Requirements Document should be closed and the 42 values
recorded in the Contact Entity PRD v1.7 Section 3.3 so the Mentor
Recruitment Domain PRD's TBD marker can be removed in a future
version.

---

## MR-Y9-EXC-003 — `skillsExpertiseTags` option list source and name reconciliation

**Trigger.** Two simultaneous issues on a single field:
(a) required field property missing from the source documents
(the Mentor Recruitment Domain PRD Section 4.3 defines
`skillsAndExpertiseTags` as a multiEnum with values marked "TBD — see
CON-ISS-006"); and (b) field-name conflict between the Mentor
Recruitment Domain PRD (`skillsAndExpertiseTags`) and the Contact
Entity Product Requirements Document v1.3 (`skillsExpertiseTags`).

**Question.** Where should the option list come from, and which
field name wins?

**Resolution.** User-supplied during the Phase 9 conversation — 33
values recorded verbatim in `MR-Contact.yaml`. Field name reconciled
to the Contact Entity PRD v1.3 convention (`skillsExpertiseTags`,
without "And").

**Required follow-up.** Open issue CON-ISS-006 should be closed and
the 33 values recorded in the Contact Entity PRD v1.7. The Mentor
Recruitment Domain PRD should be updated to rename
`skillsAndExpertiseTags` to `skillsExpertiseTags` in Section 4.3 and
wherever else it appears.

---

## MR-Y9-EXC-004 — `fluentLanguages` option list source

**Trigger.** Required field property missing from the source
documents. The Mentor Recruitment Domain PRD Section 4.3 defines
`fluentLanguages` as a multiEnum with values marked "TBD — see
CON-ISS-007."

**Question.** Where should the option list come from?

**Resolution.** User-supplied during the Phase 9 conversation.
36 values recorded verbatim in `MR-Contact.yaml`. The original input
had "Other" in alphabetical position between "Norwegian" and
"Pashto"; it was moved to the end of the list to follow the
convention that "Other" is always the last option in an enum.

**Required follow-up.** Open issue CON-ISS-007 should be closed and
the 36 values recorded in the Contact Entity PRD v1.7 Section 3.3.

---

## MR-Y9-EXC-005 — `howDidYouHearAboutCbm` option list source, value reconciliation, and name reconciliation

**Trigger.** Three simultaneous issues on a single field:
(a) required field property missing from the source documents (the
Mentor Recruitment Domain PRD Section 4.4 marks values as "TBD — see
CON-ISS-008"); (b) an already-finalized 10-value list in the Contact
Entity Product Requirements Document v1.3 Section 3.1 that the user
explicitly superseded during this session; and (c) field-name
conflict between the Mentor Recruitment Domain PRD
(`howDidYouHearAboutCBM`, uppercase BM) and the Contact Entity PRD
v1.3 (`howDidYouHearAboutCbm`, lowercase bm).

**Question.** Which value list wins (the user's, or the Contact
Entity PRD v1.3's), and which field name wins?

**Resolution.** User-supplied 8-value list wins:
Partner Referral, Social Media, CBM Email, Workshop or Event,
Search Engine, News or Media, Personal Referral, Other. This
supersedes the 10-value list in the Contact Entity PRD v1.3. Field
name reconciled to the Contact Entity PRD v1.3 convention
(`howDidYouHearAboutCbm`, lowercase bm).

**Required follow-up.** Contact Entity Product Requirements
Document v1.3 Section 3.1 must be updated to the 8-value list. The
Client Recruiting Marketing Sub-Domain Overview v1.2 must be updated
accordingly — its CR-MARKETING SDO was the original source of the
superseded 10-value list. Both updates should reference this
exception record. The Mentor Recruitment Domain PRD should be
updated to rename `howDidYouHearAboutCBM` to
`howDidYouHearAboutCbm`.

**Downstream impact note.** The 10-value list in the Contact Entity
PRD v1.3 was designed with specific channel-rollup logic documented
in the CR-MARKETING SDO (Partner Referral → CR-PARTNER; Workshop or
Event → CR-EVENTS; Email Marketing / Social Media / Search Engine /
CBM Website / News or Media → CR-MARKETING; Returning Client →
CR-REACTIVATE; Personal Referral and Other → organic). The new
8-value list removes "CBM Website" and "Returning Client" entirely,
renames "Email Marketing" to "CBM Email," and collapses other
channel distinctions. The CR-MARKETING channel-effectiveness
reporting design will need to be revised to match.

---

## MR-Y9-EXC-006 — Contact PRD v1.7 conditional field properties moved into YAML (refresh, 2026-05-04)

**Trigger.** Drift between MR-Contact.yaml v1.0.0 and Contact
Entity PRD v1.7 on conditional field properties. The PRD declares:

- applicationDeclineReason: required when mentorStatus = Declined,
  visible only when mentorStatus = Declined
- departureReason / departureDate: visible when mentorStatus in
  [Resigned, Departed]

v1.0.0 expressed these as MANUAL-CONFIG.md entries
(MR-MC-DL-003 / -004 and MR-MC-CR-003) because the v1.0 schema
did not support requiredWhen / visibleWhen.

**Best-effort decision.** With v1.1+ schema constructs available,
move these conditional rules into the YAML using requiredWhen and
visibleWhen. Updated the corresponding MANUAL-CONFIG.md entries
to reflect the migration (entries retained as cross-references
with status RESOLVED-IN-YAML rather than deleted).

**Rationale.** The PRD has not changed; the schema's expressive
power has. The conservative migration moves rule shape from
MANUAL-CONFIG to YAML where the schema supports it.

**Reversal cost.** Low — revert the requiredWhen / visibleWhen
clauses if any unexpected behavior surfaces at deploy time.

**Open question for user.** None — this is a strict capability
upgrade.

---

## MR-Y9-EXC-007 — Several previously-required:true fields corrected to required:false (refresh, 2026-05-04)

**Trigger.** Drift between MR-Contact.yaml v1.0.0 and Contact
Entity PRD v1.7 on the required column. The v1.0.0 file marked
several Application/Compliance bool and datetime fields as
required:true, but the Contact PRD v1.7 marks them all as Required:
"No":

- termsAndConditionsAccepted (PRD: No, was: Yes)
- termsAndConditionsAcceptanceDateTime (PRD: No, was: Yes)
- felonyConvictionDisclosure (PRD: No, was: Yes)
- trainingCompleted (PRD: No, was: Yes)
- trainingCompletionDate (PRD: No, was: Yes)
- ethicsAgreementAccepted (PRD: No, was: Yes)
- ethicsAgreementAcceptanceDateTime (PRD: No, was: Yes)

**Best-effort decision.** Set required:false on all seven fields
to align with Contact PRD v1.7. Several of these fields have
workflow-driven population (terms timestamp, ethics timestamp via
the new workflows added in v2.0.0), and several are externally
populated (training fields via LMS integration). required:true
on a system-populated field is incorrect — it forces the user to
provide a value before the system populates it.

**Rationale.** PRD is the source of truth. The original v1.0.0
required:true was an over-tightening relative to PRD intent.

**Reversal cost.** Low — bump required back to true if any
workflow regression surfaces at deploy time.

**Open question for user.** Confirm that workflow timing is
correct: the user-action that "submits" the application form
should result in termsAndConditionsAccepted = true on the new
record at creation time, even though the field is not "required"
at YAML level. The form submission integration needs to set the
value; the YAML required:false simply removes the user-facing
must-fill-in constraint, since the user never edits the field.

---

## MR-Y9-EXC-008 — currentActiveClients / availableCapacity / total*Sessions* expressed as v1.1 formulas (refresh, 2026-05-04)

**Trigger.** v1.0.0 declared four read-only roll-up fields with no
formula declaration (formula was a MANUAL-CONFIG.md item:
MR-MC-CF-001 through -005). The v1.1+ schema supports
formula:aggregate (with multi-hop join for cross-entity rolls)
and formula:arithmetic.

**Best-effort decision.** Expressed all five formulas in YAML:
- currentActiveClients: aggregate count, single-hop via
  Engagement.assignedMentor relationship
- availableCapacity: arithmetic
  ("maximumClientCapacity - currentActiveClients")
- totalLifetimeSessions: aggregate count, multi-hop
  Session → Engagement → Contact (assignedMentor) with
  status = Completed
- totalMentoringHours: aggregate sum of duration, same multi-hop
- totalSessionsLast30Days: aggregate count, same multi-hop, with
  Section 11 relative-date `lastNDays:30`

**Rationale.** The PRD intent is unchanged; v1.1 schema now
expresses what was previously deferred. Expressing in YAML
reduces post-deployment configuration burden.

**Reversal cost.** Low — formulas can be removed and the
read-only fields fall back to the legacy MANUAL-CONFIG path.

**Open question for user.** Confirm that
`via: assignedMentor` (the link name on the Engagement side of
the engagementAssignedMentor relationship as declared in
MN-Engagement.yaml) resolves correctly in the deploy engine. If
the deploy engine expects a different `via:` value for the
multi-hop Session → Engagement formulas, the join clause may
need adjustment.

---

## MR-Y9-EXC-009 — duplicateChecks, savedViews, emailTemplates, and workflows promoted from MANUAL-CONFIG to YAML (refresh, 2026-05-04)

**Trigger.** v1.0.0 had nine MR-MC-WF entries, three MR-MC-ET
entries, one MR-MC-DD entry, and five MR-MC-SV entries — all
recorded as MANUAL-CONFIG because v1.0 schema did not express
them. v1.1+ schema adds first-class support for duplicateChecks,
savedViews, emailTemplates, and workflows (within v1.1 trigger
and action vocabulary).

**Best-effort decision.** Promoted to YAML:
- 1 duplicateChecks rule (personalEmail, onMatch: block)
- 5 savedViews (Active, Prospects, Submitted Applications,
  Inactivity Alert, Needs Attention)
- 3 emailTemplates (mentor-application-confirmation,
  mentor-application-decline, mentor-duplicate-email-alert)
- 4 workflows (terms-acceptance-timestamp,
  ethics-acceptance-timestamp, pause-stops-new-clients,
  clear-departure-on-reactivation)

The remaining five MR-MC-WF entries either depend on
`onFirstTransition` / `createRelatedRecord` / cross-entity
setField (deferred to schema v1.2) or describe send-email
workflows pointing at templates whose body content is not yet
authored. These remain in MANUAL-CONFIG with revised statuses.

**Rationale.** Per the YAML Generation Guide v1.1 "What moved
into YAML in v1.1," constructs that the schema now expresses
should not also be in MANUAL-CONFIG. crmbuilder/CLAUDE.md notes
that saved views, duplicate checks, and workflows currently
short-circuit to NOT_SUPPORTED in the deploy pipeline — they
will be applied via REST when those reimplementations land.
Declaring them in YAML now means the deploy pipeline will
surface them in its MANUAL CONFIGURATION REQUIRED block at the
end of the run (rather than hiding them in markdown), giving
the operator a single integrated checklist.

**Reversal cost.** Low — remove the new YAML constructs; the
MANUAL-CONFIG cross-references still document the underlying
requirement.

**Open question for user.** None — this is a strict capability
upgrade.

**Body files to author.** Three HTML body files referenced by
emailTemplates do not yet exist:
- programs/MR/templates/mentor-application-confirmation.html
- programs/MR/templates/mentor-application-decline.html
- programs/MR/templates/mentor-duplicate-email-alert.html

The schema validator requires these to exist at deploy time. They
are not committed in the v1.1.0 / v2.0.0 refresh — see
MR-Y9-EXC-010.

---

## MR-Y9-EXC-010 — Email template body files deferred (refresh, 2026-05-04)

**Trigger.** Schema v1.2.x requires that every emailTemplates
entry's bodyFile resolves to an existing HTML file. The three
template body files referenced by MR-Contact.yaml v2.0.0 do not
yet exist:
- programs/MR/templates/mentor-application-confirmation.html
- programs/MR/templates/mentor-application-decline.html
- programs/MR/templates/mentor-duplicate-email-alert.html

Authoring the body content was outside the unattended Phase 9
multi-domain run's scope (per multi-domain run prompt Section
2 "Refresh existing YAML" — the prompt does not mandate template
body authoring).

**Best-effort decision.** Declare the templates in YAML so the
required schema construct is present, but defer body-file
authoring to the Mentor Administrator. Pair with revised
MANUAL-CONFIG.md entries MR-MC-ET-001 through -003 that name
the missing files explicitly so the operator can author them
before deployment.

**Rationale.** The decision shape "declare-and-defer" matches
the FU domain's pattern for similar deferred content. Unlike
MR-Y9-EXC-005's value list, body-file content cannot be derived
from PRD content — it requires CBM-voice authorship.

**Reversal cost.** Medium — at deploy time, missing body files
will fail validation hard-reject (per app-yaml-schema.md
Section 10 Email-template-level: "bodyFile path must resolve to
an existing HTML file"). The operator must either author the
files or remove the emailTemplates declarations from
MR-Contact.yaml before deploying.

**Open question for user.** Should the emailTemplates declarations
be removed from MR-Contact v2.0.0 to keep the file deploy-ready
without authored body content? Pros: deploys immediately. Cons:
loses the cross-reference linkage between the
duplicateCheck.alertTemplate and the missing template, hiding
the work.

---

## MR-Y9-EXC-011 — duesRenewalDate added to MR-Contact (refresh, 2026-05-04)

**Trigger.** Drift between MR-Contact.yaml v1.0.0 and Contact
Entity PRD v1.7. The PRD adds duesRenewalDate (per DUES-DEC-005)
to the Dues subsection of Section 3.3, owned by MR domain. v1.0.0
omitted the field and surfaced it as MANUAL-CONFIG.md MR-MC-WF-009
("Dues renewal date tracking … the field itself is not defined
in the Mentor Recruitment Domain PRD Section 4 and is therefore
not in MR-Contact.yaml — it is documented in the Contact Entity
PRD v1.3 but appears to be cross-domain and will come with a
later domain's YAML").

**Best-effort decision.** Add duesRenewalDate as a date field on
Contact in MR-Contact.yaml v2.0.0. Place it in the Dues Summary
panel alongside duesStatus and duesPaymentDate.

**Rationale.** Contact PRD v1.7 unambiguously assigns the field
to MR domain. The v1.0.0 deferral was correct at the time but
no longer applies once the PRD assignment is made.

**Reversal cost.** Low — content_version MINOR bump.

**Open question for user.** None.

---

## Summary

Eleven exceptions in total: five from the original 04-13-26
Phase 9 (retained verbatim) and six new from the 2026-05-04
multi-domain refresh. The five originals are all enum value list
sourcing decisions; the six new entries are schema-upgrade
migrations (v1.0 → v1.1+) plus drift corrections against
Contact Entity PRD v1.7.

**Last Updated:** 2026-05-04
