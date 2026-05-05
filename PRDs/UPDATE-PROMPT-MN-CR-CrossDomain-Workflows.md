# Update Prompt: MN-INTAKE Cross-Domain Workflow Items in MANUAL-CONFIG (MN + CR)

## Context

I'm working on the CBM CRM implementation. A verification pass against the Mentoring (MN) Domain PRD on 05-05-26 surfaced four cross-domain workflow items added to MN-INTAKE in v2.3 and v2.4 that are not captured in either MN-MANUAL-CONFIG.md or CR-MANUAL-CONFIG.md. These workflows integrate MN-INTAKE with CR-MARKETING data (Account.clientStatus, Contact.prospectStatus, Contact.howDidYouHearAboutCbm, Contact.sourceAttributionDetails) and require post-deployment automation since the v1.1 workflow vocabulary cannot express them.

This is Session 2 of a four-session remediation workpacket. It addresses **Finding #4** of the verification pass (excluding the MN-MC-CR-006 entry, which was handled in Session 1).

Before doing any work, please:
1. Read the CLAUDE.md in the `dbower44022/crmbuilder` repo
2. Read the CLAUDE.md in this repo (`dbower44022/ClevelandBusinessMentoring`)
3. Read MN-INTAKE.docx (v2.4) Section 6 requirements REQ-010 through REQ-013 for full text

## The Four Workflow Items

| # | MN-INTAKE Req | What it does | Belongs in |
|---|---|---|---|
| 4a | REQ-010 | Email-based Contact deduplication at intake — check existing Contact by email; update rather than create duplicate | MN-MANUAL-CONFIG (intake-side trigger) |
| 4b | REQ-011 | Account.clientStatus → Applicant transition at intake (paired with existing CR-MC-AA-003 which covers the applicantSinceTimestamp side-effect but not the status transition itself) | MN-MANUAL-CONFIG (intake-side trigger) + CR-MC-AA-003 cross-reference update |
| 4c | REQ-012 | Contact.prospectStatus → Converted at intake (only the submitting Contact; other prospects at the same Account are not auto-converted) | MN-MANUAL-CONFIG (intake-side trigger) |
| 4d | REQ-013 | howDidYouHearAboutCbm layered authority: write self-reported value only when blank; sourceAttributionDetails always captures self-report; admin override appends to sourceAttributionDetails as audit-trail | Split: MN-MANUAL-CONFIG (intake-time write) + CR-MANUAL-CONFIG (perpetual override audit-trail) |

## Specific Edits Required

### MN-MANUAL-CONFIG.md additions

File: `programs/MN/MANUAL-CONFIG.md`

Add four new entries to the **Advanced Automation** section, sequenced after the existing MN-MC-AA-016:

#### MN-MC-AA-017 — Intake Contact deduplication by email

- **Source.** MN-INTAKE-REQ-010, CR-MARKETING Sub-Domain Overview v1.0.
- **Description.** When the intake form is submitted, check whether a Contact already exists with a matching email address (case-insensitive) before creating a new Contact record. If a matching Contact is found — typically because the individual was created earlier as a prospect via a CR-MARKETING pathway — update the existing Contact with intake form data rather than creating a duplicate. Email match is the only automatic deduplication criterion. If a prospect Contact exists with the same name but a different email, manual deduplication by the Client Administrator is required as a fallback.
- **Dependencies.** Contact entity, intake form integration, Contact.emailAddress index for lookup.

#### MN-MC-AA-018 — Account.clientStatus → Applicant transition at intake

- **Source.** MN-INTAKE-REQ-011, Account Entity PRD v1.8 Section 3.5, CR-MARKETING Sub-Domain Overview v1.0. Pairs with CR-MC-AA-003 (the applicantSinceTimestamp first-transition side-effect).
- **Description.** When MN-INTAKE creates or links an Engagement to an Account, set Account.clientStatus to "Applicant". If the Account already existed with clientStatus = "Prospect" (because it was created earlier via a CR-MARKETING pathway with company information), the value transitions Prospect → Applicant. If a new Account is created at intake, clientStatus is set to "Applicant" at creation time. CR-MC-AA-003 handles the paired applicantSinceTimestamp first-transition write that fires off this status transition.
- **Dependencies.** Account entity, clientStatus, MN-INTAKE form-processing pipeline.

#### MN-MC-AA-019 — Contact.prospectStatus → Converted at intake

- **Source.** MN-INTAKE-REQ-012, CR-MARKETING Sub-Domain Overview v1.0.
- **Description.** When the intake form is submitted, transition the submitting Contact's prospectStatus to "Converted" (the terminal state of the marketing-funnel lifecycle). Only the Contact who actually submitted the application is transitioned — other prospect Contacts at the same Account retain their own marketing-funnel state independently. Each individual person tracks their own prospectStatus.
- **Dependencies.** Contact entity, prospectStatus, MN-INTAKE form-processing pipeline. Pairs with MN-MC-AA-017 (which determines whether the submitting Contact is a new or existing record).

#### MN-MC-AA-020 — Intake howDidYouHearAboutCbm layered write

- **Source.** MN-INTAKE-REQ-013, CR-MARKETING Sub-Domain Overview v1.0 Section 4.7. Pairs with CR-MC-AA-NN (sourceAttributionDetails override audit trail — see CR-MANUAL-CONFIG).
- **Description.** When the applicant fills out the intake form and selects a value for howDidYouHearAboutCbm, write the self-reported value to Contact.howDidYouHearAboutCbm ONLY if the field is currently blank. If the field already contains a value (typically because it was set at Contact creation by a CR-MARKETING pathway with known source attribution), do NOT overwrite it. Always write the applicant's self-reported value to Contact.sourceAttributionDetails (timestamped, with source = "intake-self-report") regardless of whether the structured field was preserved or written, so the self-report is never lost. The Client Administrator may override the structured field at any time during application review; that override behavior is captured in CR-MC-AA-NN as a perpetual audit-trail rule, not just an intake rule.
- **Dependencies.** Contact entity, howDidYouHearAboutCbm, sourceAttributionDetails, MN-INTAKE form-processing pipeline.

**Update the Summary table:** Advanced Automation count: 16 → 20 (assuming Session 1 has not yet altered the count). Total count: 45 → 49.

**Note on count:** If Session 1 of this workpacket has already been executed and committed, MN-MANUAL-CONFIG already shows Conditional-Required = 6 and total = 46. In that case, this session's edits change Advanced Automation 16 → 20 and total 46 → 50. Use whichever counts are correct given the current state of the file when this session is run.

**Header:** Last Updated to current session timestamp.

### CR-MANUAL-CONFIG.md additions

File: `programs/CR/MANUAL-CONFIG.md`

#### Add new entry: CR-MC-AA-NN — Contact.sourceAttributionDetails override audit trail

Insert as the next available CR-MC-AA-NN sequence number (check the file for the highest existing CR-MC-AA-* number and use the next one).

- **Source.** MN-INTAKE-REQ-013, CR-MARKETING Sub-Domain Overview v1.0 Section 4.7. Paired upstream-trigger entry: MN-MC-AA-020.
- **Description.** Whenever Contact.howDidYouHearAboutCbm is overridden by an administrator (after its initial write by intake or by a CR-MARKETING pathway), append an audit-trail entry to Contact.sourceAttributionDetails capturing: the prior structured-field value, the new structured-field value, the timestamp of the override, and the user who performed the override. This implements the layered authority policy from the CR-MARKETING Sub-Domain Overview v1.0 Section 4.7 — the structured field carries the current authoritative value while sourceAttributionDetails carries the full provenance history (including original self-report and any subsequent overrides). This is a perpetual rule, not a one-time intake-time behavior — every override at any point in the Contact's lifecycle must append to sourceAttributionDetails.
- **Dependencies.** Contact entity, howDidYouHearAboutCbm, sourceAttributionDetails, audit-trail formatting convention.

#### Update existing CR-MC-AA-003 entry

Find the existing CR-MC-AA-003 entry (Account.applicantSinceTimestamp first-transition setField).

In the **Source** line, append a cross-reference to the new MN-side companion:
"Pairs with MN-MC-AA-018 — the upstream Account.clientStatus transition that triggers this side-effect."

Or fold the cross-reference naturally into the Description if the Source line is awkward — the goal is bidirectional traceability between MN-MC-AA-018 (upstream cause) and CR-MC-AA-003 (downstream effect).

**Update the Summary table:** Advanced Automation count: increment by 1. Total count: increment by 1.

**Header:** Last Updated to current session timestamp.

## What NOT to Change

- Do not add fields to any YAML file — these are pure MANUAL-CONFIG.md additions describing post-deployment workflow obligations.
- Do not modify any process documents (MN-INTAKE, MN-MATCH, MN-ENGAGE, etc.) — those describe what the system must do; MANUAL-CONFIG describes how the operator implements it.
- Do not add CR-MC-AA-018 in CR-MANUAL-CONFIG (that ID is reserved for the MN-side trigger entry that lives in MN-MANUAL-CONFIG). Use the next available CR-MC-AA-NN slot in CR-MANUAL-CONFIG for the sourceAttributionDetails entry.
- Do not modify CR-MC-AA-003's substantive description — only append the cross-reference.

## Documents to Upload

Upload the following with this prompt:
1. `programs/MN/MANUAL-CONFIG.md`
2. `programs/CR/MANUAL-CONFIG.md`
3. `PRDs/MN/MN-INTAKE.docx` (for REQ-010 through REQ-013 reference text)

## Output

Produce updated versions of both MANUAL-CONFIG.md files and commit them to the CBM repo. Use a single commit titled `docs(MN+CR): add MN-INTAKE cross-domain workflow MANUAL-CONFIG entries` and write a descriptive commit body listing the new MN-MC-AA-017 through MN-MC-AA-020 entries (MN side), the new CR-MC-AA-NN entry (CR side), and the CR-MC-AA-003 cross-reference update.

After the work is committed, state the next required step (Session 3 of the workpacket: MN-INTAKE v2.5 minor documentation patch) and provide a brief summary of what changed for review.
