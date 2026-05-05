# Update Prompt: Account Entity PRD v1.8 → v1.9 — Rename applicantSince to applicantSinceTimestamp

## Context

I'm working on the CBM CRM implementation. The 05-05-26 verification-pass remediation workpacket (four sessions, all completed) brought the Mentoring Domain PRD, MN-INTAKE process document, MN-Engagement YAML, and the MN/CR MANUAL-CONFIG entries into alignment with each other. One naming inconsistency was identified during that work and explicitly deferred as documented technical debt in Domain PRD v1.1's Change Log:

| Artifact | Field name used |
| --- | --- |
| MN-INTAKE v2.5 | `applicantSinceTimestamp` |
| MN-Engagement.yaml content_version 1.0.1 | `applicantSinceTimestamp` |
| programs/MN/MANUAL-CONFIG.md | `applicantSinceTimestamp` |
| programs/CR/MANUAL-CONFIG.md | `applicantSinceTimestamp` |
| programs/CR/CR-Account.yaml | `applicantSinceTimestamp` |
| Domain PRD v1.1 | `applicantSinceTimestamp` |
| **Account Entity PRD v1.8** | **`applicantSince`** ← inconsistent |
| CR-EVENTS-CONVERT v1.0 | `applicantSince` ← deferred (see "What NOT to Change" below) |

Account Entity PRD v1.8 is the only deliverable PRD still using the historical short name `applicantSince`. The original source for the short name is CR-EVENTS-CONVERT v1.0, where the field was first introduced as `CR-EVENTS-CONVERT-DAT-025`. When MN-INTAKE evolved to v2.4/v2.5, the field was renamed to `applicantSinceTimestamp` to reflect that the field is a `datetime` (the `Timestamp` suffix carries information). Every artifact downstream of MN-INTAKE adopted the longer name. Account Entity PRD was missed because it copied the field definition from CR-EVENTS-CONVERT before the rename.

This session resolves the inconsistency by adopting `applicantSinceTimestamp` in Account Entity PRD v1.8 → v1.9.

Before doing any work, please:

1. Read the CLAUDE.md in the `dbower44022/crmbuilder` repo
2. Read the CLAUDE.md in this repo (`dbower44022/ClevelandBusinessMentoring`)

## The Change

Rename the field cell from `applicantSince` to `applicantSinceTimestamp` in Account Entity PRD v1.8, bump the version to v1.9, and add a new `ACT-DEC-015` entry to Section 9 Decisions Made describing the rename.

The field's type, ID (`CR-EVENTS-CONVERT-DAT-025`), required-status, default, semantics, source documents, and domain attribution are all unchanged. Only the field-name spelling changes.

## Specific Edits Required

### Account-Entity-PRD.docx v1.8 → v1.9

File: `PRDs/entities/Account-Entity-PRD.docx`

1. **Section 3.3 Mentoring-Domain Client Fields** — locate the single `applicantSince` field-name cell and rename it to `applicantSinceTimestamp`.

2. **Section 3.3 description text for the same field** — the description currently says "Timestamp recording when this Account's clientStatus first transitioned to Applicant. System-populated by MN-INTAKE (REQ-011, updated in v2.4)…" Update the version reference from "(REQ-011, updated in v2.4)" to "(REQ-011, current in MN-INTAKE v2.5)" and ensure no remaining `applicantSince` short-form references appear in the description body. The description does not currently repeat the bare field name, but verify after editing.

3. **Header:** Version 1.8 → 1.9, Last Updated to current session timestamp in the project-standard `MM-DD-YY HH:MM` format.

4. **Section 9 Decisions Made:** append a new `ACT-DEC-015` entry titled "Version 1.9: …" describing the rename. Suggested text:

   > "Version 1.9: The Mentoring-Domain Client field previously named `applicantSince` is renamed to `applicantSinceTimestamp` to reflect that the field is a `datetime` and to align with all downstream artifacts that already use the longer name (MN-INTAKE v2.5, MN-Engagement YAML 1.0.1, MN/CR MANUAL-CONFIG entries, CR-Account YAML, Mentoring Domain PRD v1.1). Field type, ID (`CR-EVENTS-CONVERT-DAT-025`), required-status, default, semantics, source documents, and domain attribution are unchanged. Source: documented technical debt flagged in Mentoring Domain PRD v1.1 Change Log entry 05-05-26."

   Match the existing `ACT-DEC-013` and `ACT-DEC-014` entries' style (which begin "Version 1.7:" and "Version 1.8:" respectively).

## What NOT to Change

* Do not modify CR-EVENTS-CONVERT v1.0. CR-EVENTS-CONVERT has 21 occurrences of `applicantSince` across its workflow descriptions, requirements, and data tables. Renaming that document is substantively distinct work and is **deferred to a future dedicated session**. It is acceptable for CR-EVENTS-CONVERT v1.0 to remain at the short name temporarily; the document's status is Draft (last updated 04-13-26) and the rename can be folded into its next revision.

* Do not modify any session-prompt files in the repo (the five files under `PRDs/` that reference `applicantSince` are session prompts for past or future sessions, not deliverable PRDs, and represent historical artifacts of how prompts were worded at the time).

* Do not modify any process document, YAML file, or MANUAL-CONFIG file — they all already use the longer name.

* Do not modify any other Entity PRD.

* Do not change the field's `CR-EVENTS-CONVERT-DAT-025` ID. The append-only convention adopted in MN-RECON-DEC-006 keeps existing IDs stable across renames.

* Do not mention specific product names (EspoCRM, etc.) anywhere in this Level 2 Entity PRD.

## Documents to Upload

Upload the following with this prompt:

1. `PRDs/entities/Account-Entity-PRD.docx` (current v1.8)

## Output

Produce an updated `PRDs/entities/Account-Entity-PRD.docx` v1.9 and commit it to the CBM repo, replacing the existing v1.8 file. Use a single commit titled `docs(entities): Account Entity PRD v1.9 — rename applicantSince to applicantSinceTimestamp` and write a descriptive commit body covering the one field-name cell change, the version bump, the description text update from "v2.4" to "v2.5", and the new `ACT-DEC-015` entry. Reference the 05-05-26 verification-pass workpacket Domain PRD v1.1 Change Log technical-debt note as the source of the carry-forward.

After the work is committed, confirm that the Account Entity PRD is now consistent with all downstream artifacts on the field name, and note that CR-EVENTS-CONVERT v1.0 remains as a known deferred rename for a future session. State the next required step (likely none — this is a self-contained one-document edit) and stand by for further instruction.
