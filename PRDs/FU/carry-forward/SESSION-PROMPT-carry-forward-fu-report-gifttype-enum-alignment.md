# Carry-Forward Request: FU-REPORT giftType Enum Value List Alignment

**Source artifact:** Contribution Entity PRD v1.0 issue CONTR-ISS-001 (logged 04-30-26)
**Drafted by:** AI assistant, per `crmbuilder/PRDs/process/interviews/guide-carry-forward-updates.md` v1.1
**Output location:** `PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-fu-report-gifttype-enum-alignment.md`

---

## Gate 1 — Decision Approval

**Carry-forward request:** Update FU-REPORT v1.0 to align the giftType enum value list with the FU-RECORD v1.2 authoritative list (Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other), replacing the divergent FU-REPORT v1.0 list (Cash, Check, Credit Card, Wire Transfer, Stock, In-Kind, Other), and correct the source-field cross-reference on FU-REPORT-DAT-027 from FU-RECORD-DAT-032 to FU-RECORD-DAT-035.

**What's changing:**

*Before* (FU-REPORT v1.0 Section 7.3 Contribution — Supporting Fields, FU-REPORT-DAT-027 row):

> **FU-REPORT-DAT-027** — giftType — Enum (Cash, Check, Credit Card, Wire Transfer, Stock, In-Kind, Other). Read as a display field on Annual Donor Giving Summary line items. In-Kind value drives whether in-kind-specific fields apply. Source: FU-RECORD-DAT-032.

*After* (FU-REPORT v1.1 Section 7.3 Contribution — Supporting Fields, FU-REPORT-DAT-027 row):

> **FU-REPORT-DAT-027** — giftType — Enum (Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other). Read as a display field on Annual Donor Giving Summary line items. In-Kind value drives whether in-kind-specific fields apply. Source: FU-RECORD-DAT-035.

---

**Source:** Contribution Entity PRD v1.0 issue CONTR-ISS-001, logged 04-30-26 during the Contribution Entity PRD authoring session. The Contribution Entity PRD adopted the FU-RECORD v1.2 Section 8.3 (FU-RECORD-DAT-035) authoritative seven-value list (Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other) per CONTR-DEC-007, citing the source-document hierarchy in which FU-RECORD owns Contribution field definitions. FU-REPORT v1.0 was authored before the Contribution Entity PRD and listed a different seven-value variant (Cash, Check, Credit Card, Wire Transfer, Stock, In-Kind, Other) that does not match the FU-RECORD v1.2 source authority. The divergence is documentation-accuracy in nature: FU-REPORT only reads giftType as a display field on Annual Donor Giving Summary line items and does not drive any defined-report logic, so no functional behavior changes. The source-field cross-reference on FU-REPORT-DAT-027 also pointed to FU-RECORD-DAT-032 (which is the acknowledgmentSent field) rather than the correct FU-RECORD-DAT-035 (the giftType field); correcting this is a mechanical cross-reference fix that follows from updating the same row.

---

**Propagation across dependent documents:**

| Document | Version | What changes in this document |
|---|---|---|
| FU-REPORT.docx | v1.0 → v1.1 | Section 7.3 row FU-REPORT-DAT-027 enum value list rewritten from "Cash, Check, Credit Card, Wire Transfer, Stock, In-Kind, Other" to "Cash, Check, Credit Card, ACH, Online Payment, In-Kind, Other" to align with FU-RECORD v1.2 authoritative definition. Source-field cross-reference on the same row corrected from "FU-RECORD-DAT-032" to "FU-RECORD-DAT-035". No other content changes. |

No other documents are affected by this change. The Contribution Entity PRD v1.0 already carries the correct enum values per CONTR-DEC-007 and CONTR-ISS-001. FU-RECORD v1.2 is the source of truth and does not change. The Fundraising Domain Overview v1.0 does not enumerate giftType values at the inventory level. The Contact Entity PRD v1.7 and Account Entity PRD v1.8 do not carry giftType. The Fundraising Campaign Entity PRD v1.0 does not carry giftType. The Master PRD v2.5 does not enumerate giftType values.

---

**Mechanical edits (applied automatically, no approval required):**

- Version bump on FU-REPORT.docx from v1.0 to v1.1
- Last Updated timestamp on FU-REPORT.docx updated to the date the carry-forward session is executed (MM-DD-YY HH:MM format)
- Change Log entry added to FU-REPORT.docx describing the giftType enum alignment and citing CONTR-ISS-001 / Contribution Entity PRD v1.0 as the source
- Section 7.3 row FU-REPORT-DAT-027 source-field cross-reference corrected from FU-RECORD-DAT-032 to FU-RECORD-DAT-035 (cross-document ID reference kept consistent — derivative of the same row edit)
- Closure note for CONTR-ISS-001 added to the Contribution Entity PRD v1.0 in the next maintenance touch (or recorded in the Phase 7 FU Domain Reconciliation session if executed before this carry-forward); no immediate edit to Contribution Entity PRD as part of this session

---

**Approve propagation?**

---

## Notes for the Executing Session

The executing session is brief — one document edit, one row, two textual changes. The Word document edit pattern uses the standard docx skill flow (unpack with `python3 /mnt/skills/public/docx/scripts/office/unpack.py`, edit `word/document.xml` via `str_replace`, repack with the `--original` flag, validate, and verify with `pandoc | grep`).

Two execution options are available:

**Option A — Execute before Phase 7 FU Domain Reconciliation.** Updates FU-REPORT v1.0 → v1.1 in advance so the Phase 7 reconciliation session sees a clean source document with no Contribution-Entity-flagged divergence. The Phase 7 session then carries CONTR-ISS-001 forward as a closed issue at the Domain PRD level rather than an open one.

**Option B — Execute after Phase 7 FU Domain Reconciliation.** Lets the Phase 7 reconciliation session record CONTR-ISS-001 as an open issue resolved by reconciliation decision (likely FU-RECON-DEC-001), and the carry-forward executes the agreed enum list as a post-reconciliation cleanup pass. The Phase 7 session would then close CONTR-ISS-001 in the FU Domain PRD's Open Issues section with a forward reference to this carry-forward.

Either ordering is workable per the carry-forward guide. The session prompt for the Phase 7 FU Domain Reconciliation mentions both options and defers the choice to the administrator. If executed before Phase 7, the Phase 7 reconciliation session benefits from a consistent source corpus; if executed after Phase 7, the reconciliation decision provides explicit Domain-PRD-level authority for the change. The carry-forward's content is unchanged either way.
