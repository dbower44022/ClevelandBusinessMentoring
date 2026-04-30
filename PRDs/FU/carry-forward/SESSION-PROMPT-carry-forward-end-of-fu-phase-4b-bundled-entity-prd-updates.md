# SESSION PROMPT — Bundled End-of-FU-Phase-4b Carry-Forward to Contact Entity PRD and Account Entity PRD

**Carry-forward type:** Bundled multi-source carry-forward at the close of FU domain Phase 4b process definition.
**Governed by:** `crmbuilder/PRDs/process/interviews/guide-carry-forward-updates.md` v1.1, two-gate pattern (Decision Approval + Execute-and-Report).
**Executed:** 04-30-26.
**Source-of-record file:** This document, retained per `guide-carry-forward-updates.md` v1.1.

---

## Decision Summary

Six new fields surfaced by the four FU domain Phase 4b process documents (FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT) propagate into the cross-domain Contact and Account Entity PRDs as one coordinated update at the close of Phase 4b. Per FU-domain convention, these field additions were recorded in each process document's Section 8 (Data Collected) and held for a single bundled propagation rather than four separate carry-forwards.

This bundled execution is an explicit deviation from the standard "one decision per session" rule in the carry-forward guide, made deliberately for end-of-phase batching. The session prompt under which this carry-forward was executed directs that the decision be discussed once at Gate 1 and executed through all edits without incremental check-ins.

---

## Source Citations

| Source | Field | Source ID |
|---|---|---|
| FU-PROSPECT v1.0 Section 8.1 | `donorStatus` (Contact) | FU-PROSPECT-DAT-020 |
| FU-PROSPECT v1.0 Section 8.1 | `donorNotes` (Contact) | FU-PROSPECT-DAT-021 |
| FU-PROSPECT v1.0 Section 8.2 | `assignedSponsorCoordinator` (Account) | FU-PROSPECT-DAT-027 |
| FU-RECORD v1.2 Section 8.1 | `donorLifetimeGiving` (Contact) | FU-RECORD-DAT-018 |
| FU-STEWARD v1.0 Section 8.1 | `lastContactDate` (Contact) | FU-STEWARD-DAT-017 |
| FU-STEWARD v1.0 Section 8.2 | `lastContactDate` (Account) | FU-STEWARD-DAT-020 |
| FU-REPORT v1.0 Section 8 | (none — Section 8 is empty per the read-only nature of FU-REPORT) | — |

---

## Field Details

### Contact Entity PRD — Four New Donor-Specific Fields

| Field | Type | Required | Visibility | Behavior |
|---|---|---|---|---|
| `donorStatus` | enum (Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed) | No | contactType has Donor | Defaults to Prospect when Donor is appended to contactType. Advanced through the pipeline by Coordinator judgment. Set to Active automatically when the first Contribution record linked to this Contact is created. Audited — status transitions carry an audit trail matching the funderStatus pattern. |
| `donorNotes` | wysiwyg | No | contactType has Donor | Rich text notes accumulating sensitive prospecting and stewardship context. Distinct from the Notes Service (which provides general timestamped activity notes). Field-level security: restricted to Donor / Sponsor Coordinator, Executive Member, and System Administrator. Hidden from Mentors and general staff. |
| `donorLifetimeGiving` | currency | No | contactType has Donor | System-calculated, read-only — sum of `amount` across all linked Contributions where `status = Received`. Contributions in any other status (Applied, Pledged, Committed, Cancelled) do not contribute to the rollup. |
| `lastContactDate` | date | No | contactType has Donor | Manually set by the Donor / Sponsor Coordinator during the FU-STEWARD sweep after each stewardship outreach. The system does not auto-populate or auto-update this field from any source — including FU-RECORD Contribution creation, acknowledgment events, or any other system activity. Read by the Active Donors and Funders Sweep List as the primary sort field (null values first). |

### Account Entity PRD — Two New Donor/Sponsor-Specific Fields

| Field | Type | Required | Visibility | Behavior |
|---|---|---|---|---|
| `assignedSponsorCoordinator` | link to Contact | Conditional (required when funderStatus = Active) | accountType has Donor/Sponsor | Points to the Contact (Member or Mentor) leading the relationship with this Funder Organization. Analogous to assignedLiaison on Partner Accounts. Optional in general; required by the time funderStatus reaches Active. Set, changed, and cleared by the Donor / Sponsor Coordinator at any time. Only the current value is stored; assignment history lives in the activity stream. |
| `lastContactDate` | date | No | accountType has Donor/Sponsor | Manually set by the Donor / Sponsor Coordinator during the FU-STEWARD sweep after each stewardship outreach to a Funder Organization. The system does not auto-populate or auto-update this field. Read by the Active Donors and Funders Sweep List as the primary sort field (null values first). |

---

## Open Issues Closed

* **CON-ISS-003** — Donor lifecycle field not yet defined. CLOSED (v1.7): Resolved by the donorStatus field added to Section 3.8 by FU-PROSPECT v1.0 (FU-PROSPECT-DAT-020). The seven values exactly match the Master PRD pipeline stages: Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed. Status transitions are audited per the funderStatus pattern.

* **ACT-ISS-002** — Incomplete domain coverage for Account entity (CR and FU summary-level only). CLOSED (v1.8): The CR domain process definition is complete and CR Domain PRD v1.2 awaits Stakeholder Review. The FU domain Phase 4b process definition is complete; the two FU-contributed Account fields (assignedSponsorCoordinator from FU-PROSPECT, lastContactDate from FU-STEWARD) are now integrated into Section 3.4 by this v1.8 update, alongside the geographicServiceArea restructure already applied at v1.7.

---

## Propagation Table

| Document | Version | What changes in this document |
|---|---|---|
| `PRDs/entities/Contact-Entity-PRD.docx` | v1.6 → v1.7 | Donor bullet in Section 3.4 (Incomplete Domain Fields) replaced with a forward reference. New Section 3.8 "Donor-Specific Fields" added at the end of Section 3 with four field rows for donorStatus, donorNotes, donorLifetimeGiving, lastContactDate. Section 5.6 Donor body rewritten as Condition + Show-all-fields paragraphs matching the formatting pattern of Section 5.2 Mentor. Section 6 Layout Guidance gains a new Donor Profile Panel grouping inserted before the Marketing and Source Attribution Panel. CON-ISS-003 closed in Section 8 Open Issues. New CON-DEC-017 entry appended to Section 9 Decisions Made documenting the v1.7 changes. No existing section numbers renumbered. |
| `PRDs/entities/Account-Entity-PRD.docx` | v1.7 → v1.8 | Two new field rows (assignedSponsorCoordinator, lastContactDate) appended to Section 3.4 Donor/Sponsor-Specific Fields table after funderNotes. Existing four field rows (funderType, funderStatus, funderLifetimeGiving, funderNotes) preserved unchanged. Section 5.3 show-all-fields list extended to include the two new fields. Section 6 Donor/Sponsor Profile Panel field list extended. ACT-ISS-002 closed in Section 8 Open Issues. New ACT-DEC-014 entry appended to Section 9 Decisions Made documenting the v1.8 changes. |

---

## Mechanical Edits Applied

* Version bump and Last Updated timestamp on Contact Entity PRD (1.6 → 1.7, 04-30-26 14:00).
* Version bump and Last Updated timestamp on Account Entity PRD (1.7 → 1.8, 04-30-26 14:15).
* No requirement IDs renumbered.
* No existing field IDs changed.
* No workflow content changed.
* No structural changes to existing fields on either entity.

---

## What Was Explicitly NOT in This Carry-Forward

* No structural changes to existing fields.
* No new fields on entities other than Contact and Account.
* No re-execution of the geographicServiceArea-restructure carry-forward (executed earlier on 04-30-26 during the FU-REPORT session, advanced Account from v1.6 to v1.7).
* No FU Domain Overview or Master PRD changes.
* No CBM Entity Inventory changes.
* CON-ISS-004 (Contact-side equivalent of ACT-ISS-002) not closed in this carry-forward — out of scope per the originating session prompt.

---

## After This Session

The bundled end-of-FU-Phase-4b carry-forward is complete. The next steps in the FU domain trajectory are:

1. **Phase 5 Entity PRDs** for the FU-owned entities:
   - **Contribution Entity PRD** — sourced from FU-RECORD v1.2 Section 8.3 (18 fields). Includes the acknowledgment-shared-ownership model jointly written by FU-RECORD and FU-STEWARD.
   - **Fundraising Campaign Entity PRD** — sourced from FU-RECORD v1.2 Section 8.4 (9 fields including the FU-REPORT-surfaced `geographicServiceArea`).

2. **Phase 7 Domain Reconciliation** for FU, producing the FU Domain PRD by reconciling FU-PROSPECT, FU-RECORD, FU-STEWARD, FU-REPORT, the FU Domain Overview, and the four FU-touched Entity PRDs (Contact v1.7, Account v1.8, Contribution, Fundraising Campaign).

3. **Phase 8 Stakeholder Review** of the FU Domain PRD, paralleling the CR Domain PRD's pending stakeholder review.
