# Update Prompt: MN-INTAKE v2.4 → v2.5 — Field Name Correction (applicantSince → applicantSinceTimestamp)

## Context

I'm working on the CBM CRM implementation. A verification pass against the Mentoring (MN) Domain PRD on 05-05-26 surfaced a field name mismatch: MN-INTAKE v2.4 refers to the field as `applicantSince`, but the canonical name in the Account Entity PRD v1.8, in CR-Account.yaml (the deployed YAML), and in CR-MANUAL-CONFIG.md is `applicantSinceTimestamp`. Field naming authority lives in the Entity PRD; MN-INTAKE used a shorthand that drifted from canonical.

This is Session 3 of a four-session remediation workpacket. It addresses **Finding #6** of the verification pass.

This is a documentation-only patch with no requirement or behavior changes.

Before doing any work, please:
1. Read the CLAUDE.md in the `dbower44022/crmbuilder` repo
2. Read the CLAUDE.md in this repo (`dbower44022/ClevelandBusinessMentoring`)

## The Change

Rename every reference to `applicantSince` in MN-INTAKE.docx to `applicantSinceTimestamp` to align with the canonical field name. Three locations in MN-INTAKE v2.4 need the correction:

1. **Section 6 (System Requirements)** — MN-INTAKE-REQ-011 body text. The requirement text currently reads "system-populate Account.applicantSince with the current datetime if applicantSince is currently null" and includes a reference "applicantSince clause added per CR-EVENTS-CONVERT v1.0." Both mentions of `applicantSince` should become `applicantSinceTimestamp`.

2. **Section 8 (Data Collected) — Client Organization table** — the row identified as MN-INTAKE-DAT-027. Field Name column: `applicantSince` → `applicantSinceTimestamp`. Description text mentions "Set to the current datetime when Account.clientStatus is set to Applicant, but only if applicantSince is currently null" — that mention should also become `applicantSinceTimestamp`.

3. Search the entire document for any other appearance of `applicantSince` that is not already followed by `Timestamp` and update each occurrence. (The reconciliation note at end of document, change log entries, etc.)

## Specific Edits Required

### MN-INTAKE.docx v2.4 → v2.5

File: `PRDs/MN/MN-INTAKE.docx`

1. **Header / Revision Control section:**
   - Version: `2.4` → `2.5`
   - Last Updated: current session timestamp in `MM-DD-YY HH:MM` format
   - Source / Author / other metadata: unchanged

2. **Section 6 — MN-INTAKE-REQ-011:** every appearance of `applicantSince` becomes `applicantSinceTimestamp`. The intent and meaning of the requirement do not change.

3. **Section 8 — Client Organization entity table — DAT-027 row:**
   - Field Name column: `applicantSince` → `applicantSinceTimestamp`
   - Description text: every appearance of `applicantSince` becomes `applicantSinceTimestamp`
   - All other columns (Type, Required, Values, Default, ID): unchanged

4. **Change log section:** append a v2.5 entry:
   "v2.5: Field name correction. Every reference to `applicantSince` in this document has been renamed to `applicantSinceTimestamp` to align with the canonical field name in the Account Entity PRD v1.8 and the deployed CR-Account.yaml. No requirement or behavior changes. Surfaced by the MN PRD vs YAML verification pass on 05-05-26."

### What NOT to Change

- Do not modify any other section, field, requirement, persona, workflow step, decision, or open issue.
- Do not modify any other process document (MN-MATCH, MN-ENGAGE, MN-INACTIVE, MN-CLOSE) or the Domain PRD — those don't reference this field name.
- Do not modify CR-Account.yaml, CR-MANUAL-CONFIG.md, or the Account Entity PRD — those are already correct.
- Do not change the field's ID (`MN-INTAKE-DAT-027`) — only the field's name.
- Do not modify the field's behavior, type, requiredness, default, or any other attribute.

## Documents to Upload

Upload the following with this prompt:
1. `PRDs/MN/MN-INTAKE.docx` (current v2.4)

## Output

Produce an updated MN-INTAKE.docx v2.5 and commit it to `PRDs/MN/` in the CBM repo, replacing the existing v2.4 file. Use a single commit titled `docs(MN-INTAKE): v2.5 — rename applicantSince to applicantSinceTimestamp` and write a brief commit body noting that this is a documentation-only correction with no requirement or behavior changes.

After the work is committed, state the next required step (Session 4 of the workpacket: CBM-Domain-PRD-Mentoring v1.1 reconciliation) and provide a brief summary of what changed for review.
