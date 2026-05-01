# Carry-Forward Request: Entity Inventory contributionType Three-Value Alignment

**Source artifact:** FU Domain PRD v1.0 reconciliation decision FU-RECON-DEC-002 (approved 05-01-26)
**Drafted by:** AI assistant, per `crmbuilder/PRDs/process/interviews/guide-carry-forward-updates.md` v1.1
**Output location:** `PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-entity-inventory-contributiontype-three-value-alignment.md`

---

## Gate 1 — Decision Approval

**Carry-forward request:** Update Entity Inventory v1.5 to align Contribution.contributionType with the three-value enum (Donation, Sponsorship, Grant) adopted at the Domain PRD level by FU-RECON-DEC-002, removing Pledge as a contributionType value. The Pledge concept is preserved in the data model — modeled as a Pledged value of Contribution.status (one of six status values: Applied, Pledged, Committed, Received, Unsuccessful, Cancelled) rather than as a contributionType discriminator value.

**What's changing:**

*Before* (Entity Inventory v1.5 Section 3, Contribution discriminator detail):

> **Discriminator Field:** contributionType (enum)
>
> **Discriminator Values:** Donation, Sponsorship, Grant, Pledge
>
> **Single-Select Rationale:** A contribution record is exactly one type. Unlike Contact and Account where an entity can hold multiple roles, a single funding transaction is a Donation, Sponsorship, Grant, or Pledge — not a combination.
>
> **Business Concepts Mapped:**
> - Donation — individual donation records with donor, amount, date, payment method, and designation
> - Sponsorship — sponsorship commitments with terms and associated program or event
> - Grant — grant records with application status, award amount, reporting requirements, and renewal dates
> - Pledge — pledge records with fulfillment tracking
>
> **Type-Specific Fields:** Grant has fields not shared by other types (application status, reporting requirements, renewal dates). Pledge has fulfillment tracking fields. Sponsorship has associated program/event fields. These will be controlled by dynamic logic visibility rules based on contributionType. Full field definitions deferred to Entity PRD and FU domain process documents.

*After* (Entity Inventory v1.6 Section 3, Contribution discriminator detail):

> **Discriminator Field:** contributionType (enum)
>
> **Discriminator Values:** Donation, Sponsorship, Grant
>
> **Single-Select Rationale:** A contribution record is exactly one type. Unlike Contact and Account where an entity can hold multiple roles, a single funding transaction is a Donation, Sponsorship, or Grant — not a combination.
>
> **Business Concepts Mapped:**
> - Donation — individual donation records with donor, amount, date, payment method, and designation
> - Sponsorship — sponsorship commitments with terms and associated program or event
> - Grant — grant records with application status, award amount, reporting requirements, and renewal dates
>
> **Type-Specific Fields:** Grant has fields not shared by other types (application status, reporting requirements, renewal dates). Sponsorship has associated program/event fields. These will be controlled by dynamic logic visibility rules based on contributionType. Full field definitions deferred to Entity PRD and FU domain process documents.
>
> **Note on Pledged Contributions:** A Pledged commitment is a Contribution whose status field equals Pledged. The Contribution.status enum includes six values (Applied, Pledged, Committed, Received, Unsuccessful, Cancelled) per FU-RECORD v1.2 Section 8.3 (FU-RECORD-DAT-022). Pledge is therefore a stage in the contribution lifecycle, not a separate type alongside Donation, Sponsorship, and Grant.

The Section 3 Domain-to-Entity Mapping table also drops the standalone Pledge row (row mapping the legacy "Pledge" business concept to Contribution / contributionType = Pledge), and Section 4.7 narrative drops the "and pledges" / "and pledges have" references in the consolidated funding record description and the Type Rationale.

---

**Source:** FU Domain PRD v1.0 reconciliation decision FU-RECON-DEC-002, approved 05-01-26 during the Phase 7 FU Domain Reconciliation session. The reconciliation established that Pledge is a status, not a type, with FU-RECORD v1.2 Section 8.3 as the authoritative definition of the six-value Contribution.status enum (Applied, Pledged, Committed, Received, Unsuccessful, Cancelled) and the three-value Contribution.contributionType enum (Donation, Sponsorship, Grant). The Contribution Entity PRD v1.0 already adopted the three-value enum per CONTR-DEC-001. The new FU Domain PRD v1.0 uses the three-value enum throughout. Entity Inventory v1.5 is the only remaining document that still lists Pledge as a contributionType discriminator value.

---

**Propagation across dependent documents:**

| Document | Version | What changes in this document |
|---|---|---|
| CBM-Entity-Inventory.docx | v1.5 → v1.6 | Section 3 Domain-to-Entity Mapping table loses the Pledge row (Pledge concept folded into the existing Contribution/contributionType discriminator detail). Section 3 Contribution discriminator detail rewrites the value list from four values to three values, drops the Pledge bullet from Business Concepts Mapped, drops the Pledge sentence from Type-Specific Fields, and adds a clarifying note explaining that Pledged is a Contribution.status value rather than a contributionType discriminator value. Section 4.7 Contribution narrative drops "and pledges" from the consolidated funding record description and "and pledges have" from the Type Rationale. |

No other documents are affected by this change. FU-RECORD v1.2 is the source of truth and does not change. The Contribution Entity PRD v1.0 already carries the three-value enum per CONTR-DEC-001. The FU Domain PRD v1.0 already carries FU-RECON-DEC-002. The Master PRD v2.5 does not enumerate contributionType. The Contact Entity PRD v1.7, Account Entity PRD v1.8, and Fundraising Campaign Entity PRD v1.0 do not enumerate contributionType.

---

**Mechanical edits (applied automatically, no approval required):**

- Version bump on CBM-Entity-Inventory.docx from v1.5 to v1.6
- Last Updated timestamp on CBM-Entity-Inventory.docx updated to the date the carry-forward session is executed (MM-DD-YY HH:MM format)
- Change Log section added at the end of the document (the Entity Inventory v1.5 currently lacks a Change Log section — addition follows the precedent set by CR-PARTNER-MANAGE v1.0 → v1.1, where the carry-forward added a Change Log section to a document that previously lacked one). Initial rows: v1.5 baseline plus v1.6 carry-forward row citing FU-RECON-DEC-002 / FU Domain PRD v1.0 as the source.
- Cross-document ID references kept consistent (no IDs change)

---

**Approve propagation?**

---

## Notes for the Executing Session

The executing session is brief — one document edit, eight content changes (drop one table row, edit one enum list, edit one narrative sentence, drop one bullet, edit one Type-Specific Fields paragraph, edit two narrative sentences in Section 4.7, add one clarifying note), plus the addition of a Change Log section.

The Word document edit pattern uses the standard docx skill flow (unpack with `python3 /mnt/skills/public/docx/scripts/office/unpack.py`, edit `word/document.xml` via `str_replace`, repack with the `--original` flag, validate, and verify with `pandoc | grep`).

Closure: This carry-forward closes FU-RECON-ISS-002. The FU Domain PRD v1.0 Open Issues entry for FU-RECON-ISS-002 will be addressed in a subsequent maintenance touch (or noted as closed in a future Domain PRD revision); no immediate edit to the Domain PRD is part of this session.
