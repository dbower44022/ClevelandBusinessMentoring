# Session Prompt: Bundled End-of-FU-Phase-4b Carry-Forward to Contact Entity PRD and Account Entity PRD

## Context

The Fundraising domain Phase 4b process definition work is complete. All four FU process documents are committed in the `dbower44022/ClevelandBusinessMentoring` repository:

- FU-PROSPECT v1.0 at `PRDs/FU/FU-PROSPECT.docx` (committed 04-22-26)
- FU-RECORD v1.2 at `PRDs/FU/FU-RECORD.docx` (committed 04-30-26 after the geographicServiceArea-restructure carry-forward)
- FU-STEWARD v1.0 at `PRDs/FU/FU-STEWARD.docx` (committed 04-29-26)
- FU-REPORT v1.0 at `PRDs/FU/FU-REPORT.docx` (committed 04-30-26)

Each of these process documents introduced custom fields on Contact and Account that, by FU-domain convention, are recorded as Section 8 (Data Collected) entries in the source process document and held for a single bundled propagation to the cross-domain Entity PRDs at the end of Phase 4b. That moment is now.

This session executes the bundled carry-forward, propagating six new fields into the Contact Entity PRD and the Account Entity PRD as one coordinated update per `crmbuilder/PRDs/process/interviews/guide-carry-forward-updates.md` v1.1.

The geographicServiceArea-restructure carry-forward executed during the FU-REPORT session (separate carry-forward request file at `PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-account-territory-zipcode-list.md`) already advanced Account Entity PRD from v1.6 to v1.7 and is out of scope for this session. The bundled carry-forward in this session takes Account Entity PRD from v1.7 to v1.8.

## Before Doing Any Work

1. Clone the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos using the standard sparse-checkout pattern (targeting `PRDs` and `CLAUDE.md`).
2. Read the CLAUDE.md in both repos. Confirm with the administrator which CLAUDE.md to read first per the standard working-style preference.
3. Read the carry-forward updates guide at `PRDs/process/interviews/guide-carry-forward-updates.md` in the crmbuilder repo. Confirm the two-gate approval pattern is understood: Gate 1 (decision approval, before any edits) and Gate 2 (execution and Change Summary, after all five edits applied).
4. Read the four FU process documents to confirm field source definitions:
   * `PRDs/FU/FU-PROSPECT.docx` v1.0 — defines donorStatus (FU-PROSPECT-DAT-020), donorNotes (FU-PROSPECT-DAT-021), assignedSponsorCoordinator (FU-PROSPECT-DAT-027).
   * `PRDs/FU/FU-RECORD.docx` v1.2 — defines donorLifetimeGiving (FU-RECORD-DAT-018).
   * `PRDs/FU/FU-STEWARD.docx` v1.0 — defines Contact.lastContactDate (FU-STEWARD-DAT-017) and Account.lastContactDate (FU-STEWARD-DAT-020).
   * `PRDs/FU/FU-REPORT.docx` v1.0 — confirms no additional Contact or Account field additions surfaced beyond those already staged from the three prior FU process documents.
5. Read the current Contact Entity PRD at `PRDs/entities/Contact-Entity-PRD.docx` (v1.6 — note this is the version on disk; the bundled carry-forward advances it to v1.7).
6. Read the current Account Entity PRD at `PRDs/entities/Account-Entity-PRD.docx` (v1.7 — already advanced from v1.6 by the geographicServiceArea-restructure carry-forward; the bundled carry-forward advances it to v1.8).

## Carry-Forward Decision

Six new fields propagate from the FU process documents into the cross-domain Entity PRDs as one coordinated update.

### Contact Entity PRD: v1.6 → v1.7

Four new Donor-specific fields added to Section 3.5 (Donor) of the Contact Entity PRD. The Section 3.5 sub-section currently states "No Donor-specific custom fields are defined yet" and references CON-ISS-003 as an open issue; the carry-forward closes that issue and replaces the placeholder with four field row definitions. Section 5.6 (Donor dynamic logic) updated to show the four fields when contactType has Donor. Section 6 layout guidance gains a Donor Profile Panel grouping the four fields.

| Field | Type | Source | Source ID |
| --- | --- | --- | --- |
| `donorStatus` | enum (Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed) | FU-PROSPECT v1.0 Section 8.1 | FU-PROSPECT-DAT-020 |
| `donorNotes` | wysiwyg (restricted-visibility — Donor / Sponsor Coordinator + Executive Member + System Administrator) | FU-PROSPECT v1.0 Section 8.1 | FU-PROSPECT-DAT-021 |
| `donorLifetimeGiving` | currency (system-calculated, read-only — sum of amount across Received Contributions linked via donorContact) | FU-RECORD v1.2 Section 8.1 | FU-RECORD-DAT-018 |
| `lastContactDate` | date (manually-set only, no auto-population) | FU-STEWARD v1.0 Section 8.1 | FU-STEWARD-DAT-017 |

Visibility rule for all four fields: visible only when `contactType` has Donor. Field-level security on `donorNotes` restricts read access to Donor / Sponsor Coordinator, Executive Member, and System Administrator; the other three fields follow standard Donor-section visibility.

CON-ISS-003 (Donor lifecycle field not yet defined) closes by adopting `donorStatus` per FU-PROSPECT-DAT-020.

### Account Entity PRD: v1.7 → v1.8

Two new Donor/Sponsor fields added to Section 3.4 (Donor/Sponsor) of the Account Entity PRD, alongside the existing four Donor/Sponsor fields (funderType, funderStatus, funderLifetimeGiving, funderNotes). Section 5.3 (Donor/Sponsor dynamic logic) updated to include the two new fields. Section 6 Donor/Sponsor Profile Panel layout updated.

| Field | Type | Source | Source ID |
| --- | --- | --- | --- |
| `assignedSponsorCoordinator` | link to Contact (conditional — required when funderStatus = Active) | FU-PROSPECT v1.0 Section 8.2 | FU-PROSPECT-DAT-027 |
| `lastContactDate` | date (manually-set only, no auto-population) | FU-STEWARD v1.0 Section 8.2 | FU-STEWARD-DAT-020 |

Visibility rule for both fields: visible only when `accountType` has Donor/Sponsor.

ACT-ISS-002 (Account fields contributed by FU not yet integrated) closes by adopting both fields per the FU process documents.

### Open Issues to Close

* **CON-ISS-003** — Donor lifecycle field not yet defined. Closes by adopting `donorStatus` from FU-PROSPECT-DAT-020.
* **ACT-ISS-002** — Account fields contributed by FU not yet integrated. Closes by adopting `assignedSponsorCoordinator` from FU-PROSPECT-DAT-027 and `lastContactDate` from FU-STEWARD-DAT-020.

### What Is NOT in This Carry-Forward

Several items are explicitly out of scope for this session, captured here so they are not surfaced as gaps during execution.

* **No structural changes to existing fields.** The six new fields are added; no existing field on Contact or Account is renamed, retyped, or rescoped.
* **No new fields on entities other than Contact and Account.** The Contribution and Fundraising Campaign entities receive no Entity PRD updates here; their own Entity PRDs are pending Phase 5.
* **No re-execution of the geographicServiceArea-restructure carry-forward.** That carry-forward already executed during the FU-REPORT session and advanced Account Entity PRD from v1.6 to v1.7. The bundled carry-forward in this session starts from v1.7 and advances to v1.8.
* **No Domain Overview or Master PRD changes.** The FU Domain Overview v1.0 and Master PRD v2.5 already reflect the FU-domain entity inventory at the level of detail those documents carry. No carry-forward is needed.
* **No Entity Inventory changes.** The CBM Entity Inventory v1.5 already lists Contact and Account at the entity level; new field additions on existing entities do not warrant an Entity Inventory update.

## Output

1. **Primary artifacts.** Two updated Word documents committed to the repository:
   * `PRDs/entities/Contact-Entity-PRD.docx` — v1.6 → v1.7
   * `PRDs/entities/Account-Entity-PRD.docx` — v1.7 → v1.8

2. **Carry-forward request file.** A SESSION-PROMPT carry-forward request file committed at `PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-end-of-fu-phase-4b-bundled-entity-prd-updates.md`, retained as the source-of-record for the decision per `guide-carry-forward-updates.md` v1.1.

3. **CBM CLAUDE.md update.** The "Current Implementation State" line at the top of the CBM CLAUDE.md updated to reflect Contact Entity PRD v1.7, Account Entity PRD v1.8, CON-ISS-003 closed, ACT-ISS-002 closed, and the FU domain Phase 4b cross-domain carry-forwards executed. A new "Latest structural change (DATE)" paragraph added describing the bundled carry-forward, with the prior FU-REPORT v1.0 paragraph demoted to "Prior structural change."

4. **Single git commit.** All edits committed as one commit on `main` and pushed to `origin/main`. Commit message describes the bundled carry-forward and the six new fields.

## Output Standards Reminder

* Both Entity PRDs must have a metadata table at the top with Version, Status, Last Updated in `MM-DD-YY HH:MM` format, plus all standard metadata rows. Both metadata tables and any Change Log or Decisions Made entries get refreshed Last Updated timestamps and version-specific entries documenting what changed.
* Both Entity PRDs are business-language documents. **No product names** anywhere in the documents.
* Per the established Account Entity PRD pattern, version-specific changes are recorded as new entries in Section 9 (Decisions Made) starting with "Version 1.8:". Per the established Contact Entity PRD pattern, the same Decisions Made entry pattern is used (with "Version 1.7:") if Contact Entity PRD uses Decisions Made for version tracking; otherwise use a Change Log table if one exists.
* **Discuss the carry-forward decision once, at Gate 1, and execute through all edits without incremental check-ins until execution completes.** Per the standard working-style preference: "Once a plan or PRD is completed, execute the script without asking for confirmation of every change planned. Execution of the plan should be done as quickly as possible with a full review at the end."
* After document production, state the next required step (Phase 5 Entity PRDs for Contribution and Fundraising Campaign) and ask for explicit confirmation before proceeding.

## After This Session

With the bundled end-of-FU-Phase-4b carry-forward complete, the next steps in the FU domain trajectory are:

1. **Phase 5 Entity PRDs** for the FU-owned entities, drafted from the field specifications established by the four FU process documents:
   * **Contribution Entity PRD** — sourced from FU-RECORD v1.2 Section 8.3 (Contribution Fields Created), 18 fields. Includes the acknowledgment-shared-ownership model jointly written by FU-RECORD and FU-STEWARD.
   * **Fundraising Campaign Entity PRD** — sourced from FU-RECORD v1.2 Section 8.4 (Fundraising Campaign Fields Created), 9 fields including the FU-REPORT-surfaced `geographicServiceArea` (FU-RECORD-DAT-047).

2. **Phase 7 Domain Reconciliation** for FU, producing the FU Domain PRD by reconciling FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT, the FU Domain Overview, and the four FU-touched Entity PRDs (Contact v1.7, Account v1.8, Contribution, Fundraising Campaign).

3. **Phase 8 Stakeholder Review** of the FU Domain PRD, paralleling the CR Domain PRD's pending stakeholder review.

## Documents to Upload

The administrator does not need to upload any documents for this session. All required source documents are already in the repository and the AI will read them after cloning.

If the administrator chooses to upload anything for convenience, the most useful uploads would be:

1. The four FU process documents (FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT) — the source of the six new fields.
2. The current Contact Entity PRD v1.6 and Account Entity PRD v1.7 — the targets of the propagation.

These are not required because all six are accessible from the repo clone.
