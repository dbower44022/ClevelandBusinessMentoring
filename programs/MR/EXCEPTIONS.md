# Mentor Recruitment Domain — Phase 9 Exception List

**Pilot:** Cleveland Business Mentors Process Validation Pilot
**Domain:** Mentor Recruitment (MR)
**Phase 9 conversation date:** 04-13-26
**Files covered:** `MR-Dues.yaml`, `MR-Contact.yaml`

This file records every Phase 9 situation that triggered a
Stop-and-Ask per the Phase 9 YAML Generation Guide Section "When to
Stop and Ask." Each entry gives the trigger, the question posed, the
resolution, and where the resolution appears in the produced YAML.

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
`industrySectors` field.

**Required follow-up.** The Account Entity Product Requirements
Document v1.3 Section 3 should be updated to explicitly enumerate
the 20 NAICS sectors rather than referencing them by count only.
The same enumeration should appear on both the mentor's
`industrySectors` field and the Account's `industrySector` field
for matching to work.

---

## MR-Y9-EXC-002 — `mentoringFocusAreas` option list source

**Trigger.** Required field property missing from the source
documents. The Mentor Recruitment Domain PRD Section 4.3 defines
`mentoringFocusAreas` as a required multiEnum field with values
marked "TBD — see CON-ISS-005."

**Question.** Where should the option list come from?

**Resolution.** User-supplied during the Phase 9 conversation.
42 values recorded verbatim in `MR-Contact.yaml` on the
`mentoringFocusAreas` field.

**Required follow-up.** Open issue CON-ISS-005 on the Contact Entity
Product Requirements Document should be closed and the 42 values
recorded in the Contact Entity PRD v1.3 Section 3.3 so the Mentor
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
the 33 values recorded in the Contact Entity PRD v1.3. The Mentor
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
the 36 values recorded in the Contact Entity PRD v1.3 Section 3.3.

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

## Summary

Five exceptions raised. All are related to the Contact entity's
enum and multiEnum option lists and to two field-name
reconciliations between the Mentor Recruitment Domain PRD and the
Contact Entity PRD v1.3. No exceptions were raised on the Dues
entity, on relationships, or on any field type other than enum and
multiEnum.

**Last Updated:** 04-19-26 14:45
