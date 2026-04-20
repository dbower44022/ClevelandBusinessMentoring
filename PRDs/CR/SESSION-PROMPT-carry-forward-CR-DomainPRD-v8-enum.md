# Session Prompt — Carry-Forward Updates for 8-Value howDidYouHearAboutCbm

**Repo:** `dbower44022/ClevelandBusinessMentoring`
**Date:** 04-19-26
**Prerequisite:** Read `CLAUDE.md` in both `crmbuilder` and `ClevelandBusinessMentoring` repos.

---

## Context

The MR Phase 9 YAML Generation conversation (04-13-26) revised
`howDidYouHearAboutCbm` from a 10-value enum to an 8-value enum
(MR-Y9-EXC-005 in `programs/MR/EXCEPTIONS.md`). The principal
follow-up session on 04-18-26 and the MR Phase 9 follow-up extension
on 04-19-26 updated the four primary target documents:

- Contact Entity PRD v1.5 → v1.6
- Account Entity PRD v1.5 → v1.6
- CR-MARKETING Sub-Domain Overview v1.2 → v1.3
- Mentor Recruitment Domain PRD v1.0 → v1.1

Two CR-domain documents still carry residual references to the old
10-value list and the old channel-rollup mapping. This is the
carry-forward session to apply those residual updates.

These are surgical edits, not new analysis. The authoritative source
of enum values is Contact Entity PRD v1.6 Section 3.1.

---

## Before Starting

1. Read `CLAUDE.md` in both repos.
2. Read `programs/MR/EXCEPTIONS.md` (MR-Y9-EXC-005 in particular) and
   `programs/MR/MR-Contact.yaml` (howDidYouHearAboutCbm field) for
   authoritative value list.
3. Read the two target documents listed below.

---

## Authoritative 8-Value List

Per Contact Entity PRD v1.6 Section 3.1 (resolved by MR-Y9-EXC-005):

1. Partner Referral
2. Social Media
3. CBM Email
4. Workshop or Event
5. Search Engine
6. News or Media
7. Personal Referral
8. Other

**Changes from the prior 10-value list:**

- "Email Marketing" renamed to "CBM Email"
- "CBM Website" removed (absorbed into "Search Engine" or "Other" at
  administrator discretion)
- "Returning Client" removed — reactivation effectiveness is measured
  through Campaign tracking on the Campaign entity
  (`Campaign.channel = Reactivation`), not through
  `howDidYouHearAboutCbm`

**Channel-rollup revision (per CR-MARKETING SDO v1.3 Section 3):**

- Partner Referral → CR-PARTNER
- Workshop or Event → CR-EVENTS
- CBM Email, Social Media, Search Engine, News or Media → CR-MARKETING
- Personal Referral and Other → organic/unattributed

Reactivation-channel outbound is not rolled up through
`howDidYouHearAboutCbm` at all.

---

## Document 1: CR Domain PRD v1.0 → v1.1

**File:** `PRDs/CR/CBM-Domain-PRD-ClientRecruiting.docx`

### Expected Changes

1. **Section 4.1.1 (or equivalent):** Replace the 10-value
   `howDidYouHearAboutCbm` enum list with the 8-value list above.
2. **Channel-rollup mapping:** Update references to reflect the new
   rollup (remove the "Returning Client → CR-REACTIVATE" mapping;
   rename "Email Marketing" references to "CBM Email"; remove "CBM
   Website" references).
3. **Upstream version references:** Bump any Contact Entity PRD or
   Account Entity PRD references to v1.6, CR-MARKETING SDO
   references to v1.3, and MR Domain PRD references to v1.1.
4. **Version:** Bump to v1.1. Update Last Updated to session date
   using the MM-DD-YY HH:MM format.

### Method Note

Follow the supersession pattern established in CR-MARKETING SDO v1.3
where the Decision transcript (if present) retains original wording
and an Editor's note documents the v1.1 supersession, referencing
MR-Y9-EXC-005 and programs/MR/EXCEPTIONS.md.

---

## Document 2: CR Domain Overview v1.2 → v1.3

**File:** `PRDs/CR/CBM-Domain-Overview-ClientRecruiting.docx`

### Expected Changes

1. Verify whether this document references the 10-value
   `howDidYouHearAboutCbm` list. If yes, update to the 8-value list.
2. Update any channel-rollup references as in Document 1.
3. Update upstream version references (Contact Entity PRD v1.6,
   Account Entity PRD v1.6, CR-MARKETING SDO v1.3, MR Domain PRD
   v1.1).
4. **Version:** Bump to v1.3. Update Last Updated to session date.

---

## After This Session

Update `CLAUDE.md` to reflect:

- CR Domain PRD v1.1 (carry-forward from MR-Y9-EXC-005 complete)
- CR Domain Overview v1.3 (carry-forward complete)
- Close out the MR Phase 9 follow-up work: all upstream and
  downstream documents are now aligned with the 8-value
  `howDidYouHearAboutCbm` enum.
