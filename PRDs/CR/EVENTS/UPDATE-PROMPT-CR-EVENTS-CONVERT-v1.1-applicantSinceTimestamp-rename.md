# Update Prompt: CR-EVENTS-CONVERT v1.0 → v1.1 — Rename applicantSince to applicantSinceTimestamp

## Context

I'm working on the CBM CRM implementation. The 05-05-26 verification-pass remediation workpacket (four sessions, all completed) brought the Mentoring Domain PRD, MN-INTAKE process document, MN-Engagement YAML, and the MN/CR MANUAL-CONFIG entries into alignment with each other on the longer field name `applicantSinceTimestamp`. A separate rename session is producing Account Entity PRD v1.9 with the same rename. CR-EVENTS-CONVERT v1.0 is the last remaining deliverable PRD that still uses the historical short name `applicantSince` and needs to be brought into alignment.

| Artifact | Field name used |
| --- | --- |
| MN-INTAKE v2.5 | `applicantSinceTimestamp` |
| MN-Engagement.yaml content_version 1.0.1 | `applicantSinceTimestamp` |
| programs/MN/MANUAL-CONFIG.md | `applicantSinceTimestamp` |
| programs/CR/MANUAL-CONFIG.md | `applicantSinceTimestamp` |
| programs/CR/CR-Account.yaml | `applicantSinceTimestamp` |
| Mentoring Domain PRD v1.1 | `applicantSinceTimestamp` |
| Account Entity PRD v1.9 (after the parallel rename session) | `applicantSinceTimestamp` |
| **CR-EVENTS-CONVERT v1.0** | **`applicantSince`** ← inconsistent (this session) |

CR-EVENTS-CONVERT is the original source where the field was first defined under the short name. When MN-INTAKE evolved to v2.4/v2.5, the field was renamed to `applicantSinceTimestamp` to reflect that the field is a `datetime` (the `Timestamp` suffix carries information). Every artifact downstream of MN-INTAKE adopted the longer name. CR-EVENTS-CONVERT's rename was deferred from the 05-05-26 verification-pass workpacket as documented technical debt because it was substantively distinct work — 21 field-name occurrences across seven sections of the document.

This session resolves the inconsistency by adopting `applicantSinceTimestamp` in CR-EVENTS-CONVERT v1.0 → v1.1.

Before doing any work, please:

1. Read the CLAUDE.md in the `dbower44022/crmbuilder` repo
2. Read the CLAUDE.md in this repo (`dbower44022/ClevelandBusinessMentoring`)

## The Change

Rename every occurrence of `applicantSince` to `applicantSinceTimestamp` throughout CR-EVENTS-CONVERT v1.0, bump the version to v1.1, update the Depends On line's `Account-Entity-PRD.docx` reference to v1.9, and add a Change Log entry (or its equivalent in this document's structure) describing the rename.

The field's type, ID (`CR-EVENTS-CONVERT-DAT-025`), required-status, default, semantics, source documents, and domain attribution are all unchanged. Only the field-name spelling changes.

## Specific Edits Required

### CR-EVENTS-CONVERT.docx v1.0 → v1.1

File: `PRDs/CR/EVENTS/CR-EVENTS-CONVERT.docx`

**Twenty-one field-name occurrences to rename.** They fall into seven sections of the document:

1. **Section 1 (Process Purpose):** one occurrence in the bullet list explaining what the process needs from upstream Account data.

2. **Section 4 (Process Workflow):** four occurrences across workflow steps describing how `Account.applicantSince` is used as the application-side anchor for conversion-window calculations and median-time-to-application reporting.

3. **Section 5 (Process Completion):** one occurrence in the post-completion handoff prose noting that `Account.clientStatus` and `Account.applicantSince` are written by MN-INTAKE.

4. **Section 6 (System Requirements):** seven occurrences across requirements `CR-EVENTS-CONVERT-REQ-023` through approximately `REQ-027`, describing how the field is used as the conversion-window anchor and the rule that it must be system-populated by MN-INTAKE.

5. **Section 7 (Process Data):** one occurrence in the read-references prose for the Account entity.

6. **Section 8 (Data Collected):** two occurrences. One is the canonical field-name declaration cell at the row defining `CR-EVENTS-CONVERT-DAT-025` (this is the authoritative declaration of the field within this document). The other is a description-text reference within the same section.

7. **Section 10 (Updates to Prior Documents):** four occurrences in the rows directing other documents (Account Entity PRD, MN-INTAKE) to add or extend references to the field.

8. **Section 11 (Interview Transcript):** two occurrences in the historical Q/A capturing the original decision to add the field.

For each occurrence, replace the bare `applicantSince` with `applicantSinceTimestamp`. Where the surrounding text says things like "a new Account field that …" the prose can stay as written — only the field-name token changes. Where the text references "Account.applicantSince" with the dotted-namespace prefix, replace with "Account.applicantSinceTimestamp".

**Header edits:**

- **Version:** 1.0 → 1.1
- **Status:** keep at `Draft` (unchanged — CR-EVENTS-CONVERT remains pre-stakeholder-review)
- **Last Updated:** current session timestamp in the project-standard `MM-DD-YY HH:MM` format
- **Depends On:** update the `Account-Entity-PRD.docx v1.3` entry to `Account-Entity-PRD.docx v1.9`. Leave all other Depends On entries (CBM-SubDomain-Overview-Events.docx, CR-EVENTS-MANAGE.docx, CBM-SubDomain-Overview-Marketing.docx, CR-MARKETING-CAMPAIGNS.docx, CBM-Master-PRD.docx, Contact-Entity-PRD.docx, MN-INTAKE.docx) at their currently-cited versions. The broader Depends On freshness review is deferred to a future session and is not part of this rename.

**Change Log / Decisions:**

If CR-EVENTS-CONVERT v1.0 has a Decisions Made section or Change Log, append a new entry titled "Version 1.1: …" describing the rename. Match the style of any existing version-history entries in the document. If no Change Log section exists, append a new entry to whichever section the document uses for cross-version provenance (Decisions Made is the project convention for Entity PRDs; Process Documents like CR-EVENTS-CONVERT may follow a slightly different convention — check the existing v1.0 structure and follow it).

Suggested entry text:

> "Version 1.1: All references to the Account-side field `applicantSince` are renamed to `applicantSinceTimestamp` to align with all other artifacts in the artifact set: MN-INTAKE v2.5, MN-Engagement YAML 1.0.1, MN/CR MANUAL-CONFIG entries, CR-Account YAML, Mentoring Domain PRD v1.1, and Account Entity PRD v1.9. The field's type (datetime), ID (`CR-EVENTS-CONVERT-DAT-025`), required-status, default, semantics, source documents, and domain attribution are unchanged. The Depends On line's Account Entity PRD reference is updated from v1.3 to v1.9 to reflect the rename's parallel adoption in that document; other Depends On entries are unchanged. Source: documented technical debt deferred from the 05-05-26 verification-pass remediation workpacket and resolved in this session."

## What NOT to Change

* Do not modify any other Depends On entry. Only `Account-Entity-PRD.docx v1.3` → `v1.9` is in scope for this session. The Master PRD, Contact Entity PRD, MN-INTAKE, and sub-domain overview entries on the Depends On line are likely also stale (the line was last touched 04-13-26), but the broader Depends On freshness review is **deferred to a future dedicated session**.

* Do not modify any other CR-domain process document, Entity PRD, YAML file, or MANUAL-CONFIG file. They all already use the longer name (or are scoped out of this rename, like the historical session-prompt files that reference the short form for past prompt wording).

* Do not change the field's `CR-EVENTS-CONVERT-DAT-025` ID. The append-only convention adopted in MN-RECON-DEC-006 keeps existing IDs stable across renames.

* Do not modify the `CR-EVENTS-CONVERT-REQ-*` requirement numbering or content beyond the field-name token replacement. The text describing how the field is used (as the application-side anchor for conversion-window calculations, median-time-to-application reporting, etc.) is unchanged in semantics — only the field-name token within those descriptions changes.

* Do not advance CR-EVENTS-CONVERT's Status from Draft to Final or any other state. The document remains pre-stakeholder-review and is not being formally accepted by this rename — it is being brought into naming consistency with the rest of the artifact set.

* Do not mention specific product names (EspoCRM, etc.) anywhere in this Level 2 process document.

## Documents to Upload

Upload the following with this prompt:

1. `PRDs/CR/EVENTS/CR-EVENTS-CONVERT.docx` (current v1.0)

## Output

Produce an updated `PRDs/CR/EVENTS/CR-EVENTS-CONVERT.docx` v1.1 and commit it to the CBM repo, replacing the existing v1.0 file. Use a single commit titled `docs(CR-EVENTS): CR-EVENTS-CONVERT v1.1 — rename applicantSince to applicantSinceTimestamp` and write a descriptive commit body covering the 21 field-name occurrences renamed, the Depends On entry updated for Account Entity PRD (v1.3 → v1.9), the version bump (1.0 → 1.1), and the new Change Log / Decisions entry. Reference the 05-05-26 verification-pass workpacket Domain PRD v1.1 Change Log technical-debt note and the parallel Account Entity PRD v1.9 rename session as the chain-of-source for the carry-forward.

After the work is committed, confirm that CR-EVENTS-CONVERT is now consistent with all other artifacts on the field name, and note that the broader Depends On freshness review (Master PRD, Contact Entity PRD, MN-INTAKE references on the Depends On line) remains as a known deferred item for a future session. With CR-EVENTS-CONVERT v1.1 landed, the `applicantSince` → `applicantSinceTimestamp` rename project is fully complete across the deliverable PRD set; only historical session-prompt files retain the short form, which is acceptable and intentional. State the next required step (likely none — this is a self-contained one-document edit) and stand by for further instruction.
