# Session Prompt — Carry-Forward Updates from CR-EVENTS and CR-REACTIVATE

**Repo:** `dbower44022/ClevelandBusinessMentoring`
**Date:** 04-15-26
**Prerequisite:** Read `CLAUDE.md` in both `crmbuilder` and `ClevelandBusinessMentoring` repos.

---

## Context

Three CR sub-domain documents surfaced carry-forward updates to
upstream documents:

- **CR-EVENTS Sub-Domain Overview v1.0** (Section 5, Table 7)
- **CR-EVENTS-CONVERT v1.0** (Section 10, Table 13)
- **CR-REACTIVATE Sub-Domain Overview v1.0** (Section 6, Table 5)

These carry-forwards have been pending since 04-13-26 (EVENTS) and
04-15-26 (REACTIVATE). They must be applied before CR Domain
Reconciliation can proceed, and before the CR-REACTIVATE-OUTREACH
process document session (which references fields introduced here).

**Version collision note:** The carry-forward specs reference Contact
Entity PRD v1.3 → v1.4 and Account Entity PRD v1.3 → v1.4. However,
both documents were already bumped to **v1.4** on 04-12-26 as part of
the Entity PRD Primary Domain backfill (adding `Primary Domain` rows
to Entity Overview tables). The carry-forwards therefore target
**v1.4 → v1.5** for both Entity PRDs.

---

## Update 1: Contact Entity PRD v1.4 → v1.5

**File:** `PRDs/entities/Contact-Entity-PRD.docx`

Five changes from three sources, consolidated into one version bump:

### From CR-EVENTS Sub-Domain Overview v1.0:

**(a)** Add `presenterBio` field (wysiwyg type) to the appropriate
custom fields subsection (Section 3 — likely 3.4 Incomplete Domain
Fields or a new subsection for CR-domain fields). Use the standard
two-row-per-field format:
- Field Name: `presenterBio`
- Type: `wysiwyg`
- Required: No
- Values: —
- Default: —
- ID: assign next available `CON-` identifier
- Description: per the CR-EVENTS SDO rationale

**(b)** Add `presenterTopics` field (multiEnum type) to the same
subsection:
- Field Name: `presenterTopics`
- Type: `multiEnum`
- Required: No
- Values: TBD (to be defined during CR-EVENTS process work or Entity
  PRD revision)
- Default: —
- ID: assign next available `CON-` identifier
- Description: per the CR-EVENTS SDO rationale

**(c)** Update Section 5.7 narrative. The CR-EVENTS SDO notes that
Section 5.7 of Contact Entity PRD v1.3 states Presenter contacts have
no additional data requirements. This is now false — presenterBio and
presenterTopics are presenter-specific fields. Revise the narrative to
reflect that Presenter contacts now have two dedicated fields.

### From CR-EVENTS-CONVERT v1.0:

**(d)** Add `lastConversionPushSentAt` field (datetime type):
- Field Name: `lastConversionPushSentAt`
- Type: `datetime`
- Required: No
- Values: —
- Default: — (system-populated)
- ID: assign next available `CON-` identifier
- Description: Timestamp of the most recent conversion push sent to
  this contact. System-populated when a conversion-push campaign
  targets this contact. Supports conversion-push effectiveness
  comparison in CR-EVENTS-CONVERT.

### From CR-REACTIVATE Sub-Domain Overview v1.0:

**(e)** Add `lastReactivationSentAt` field (datetime type):
- Field Name: `lastReactivationSentAt`
- Type: `datetime`
- Required: No
- Values: —
- Default: — (system-populated)
- ID: assign next available `CON-` identifier
- Description: Timestamp of the most recent reactivation outreach sent
  to this contact. System-populated when a reactivation campaign
  targets this contact.

### Housekeeping:
- Bump header table Version: 1.4 → 1.5
- Update Last Updated to current date/time (MM-DD-YY HH:MM format)
- If any open issues or decisions need updating, note them

---

## Update 2: Account Entity PRD v1.4 → v1.5

**File:** `PRDs/entities/Account-Entity-PRD.docx`

One change from CR-EVENTS-CONVERT v1.0:

**(a)** Add `applicantSince` field (datetime type) to the appropriate
custom fields subsection:
- Field Name: `applicantSince`
- Type: `datetime`
- Required: No
- Values: —
- Default: — (system-populated by MN-INTAKE)
- ID: assign next available `ACT-` identifier
- Description: Timestamp recording when this Account's clientStatus
  first transitioned to Applicant. System-populated by MN-INTAKE
  (REQ-011, pending update). Used by CR-EVENTS-CONVERT as the
  application-side anchor for conversion window calculation.

### Housekeeping:
- Bump header table Version: 1.4 → 1.5
- Update Last Updated

---

## Update 3: MN-INTAKE v2.3 → v2.4

**File:** `PRDs/MN/MN-INTAKE.docx`

One change from CR-EVENTS-CONVERT v1.0:

**(a)** Extend MN-INTAKE-REQ-011 to include system-population of
`Account.applicantSince` with the current datetime when the intake
process transitions clientStatus to Applicant.

The current REQ-011 text (in v2.3) handles the Account.clientStatus
transition. The update adds an additional clause: "…and system-populate
Account.applicantSince with the current datetime if applicantSince is
currently null."

The "if currently null" guard ensures the timestamp records the
*first* time the account reached Applicant status, not subsequent
re-applications.

### Housekeeping:
- Bump header table Version: 2.3 → 2.4
- Update Last Updated
- If this changes the Data Collected section (Section 8), add
  applicantSince to the Account entity's field table if not already
  present as a read-only reference

---

## Update 4: CR Domain Overview v1.1 → v1.2

**File:** `PRDs/CR/CBM-Domain-Overview-ClientRecruiting.docx`

One change from CR-EVENTS Sub-Domain Overview v1.0:

**(a)** Add CR-EVENTS-ISS-001 to the Section 4.7 Open Issues Carried
Forward table. This issue concerns event feedback surveys deferred to
the future Survey Service definition.

### Housekeeping:
- Bump header table Version: 1.1 → 1.2
- Update Last Updated
- Update the Depends On / Source Documents list if it references
  specific upstream document versions that have changed

---

## Update 5: Campaign Entity PRD — Future Note (No Action Now)

The CR-REACTIVATE Sub-Domain Overview notes that when the Campaign
Entity PRD is eventually written (Phase 2b, deferred), it must include
a three-value `channel` enum: `{Email, SMS, Reactivation}`.

**No document update is needed now.** This is recorded here for
traceability and should be noted in the CR-REACTIVATE SDO's Updates
to Prior Documents section (which it already is). When the Campaign
Entity PRD session is started, the session prompt should reference this
requirement.

---

## Execution Order

Apply updates 1 through 4 sequentially, confirming each before moving
to the next. Update 5 is informational only.

After all four updates are applied:

1. Update `CLAUDE.md` to reflect the new document versions and mark
   these carry-forwards as complete.
2. Note which carry-forwards (if any) remain pending — there should be
   none after this session, except the Campaign Entity PRD future note.

---

## CBM File Locations

Doug's local clone: `~/Dropbox/Projects/ClevelandBusinessMentors/`
(short name). GitHub repo: `dbower44022/ClevelandBusinessMentoring`
(long name).
