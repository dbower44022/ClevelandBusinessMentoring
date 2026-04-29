# Carry-Forward Request: FU-RECORD Acknowledgment Shared Ownership

**Source session:** FU-STEWARD process definition interview, 04-29-26
**Drafted by:** AI interviewer, per `crmbuilder/PRDs/process/interviews/guide-carry-forward-updates.md` v1.1
**Output location:** `PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-fu-record-acknowledgment-shared-ownership.md`

---

## Gate 1 — Decision Approval

**Carry-forward request:** Update FU-RECORD v1.0 to reflect the hybrid acknowledgment ownership model — FU-RECORD owns primary acknowledgment writes at Contribution creation; FU-STEWARD owns catch-up acknowledgment writes during the sweep. The two processes share the acknowledgmentSent and acknowledgmentDate fields.

**What's changing:**

*Before* (FU-RECORD v1.0 Section 1, last paragraph):

> FU-RECORD also resolves the acknowledgment / tax-receipt model question that EI-ISS-001 carried forward from the Entity Inventory and the Fundraising Domain Overview. The resolution is field-level capability on Contribution rather than a separate Acknowledgment entity — two optional fields (acknowledgmentSent, acknowledgmentDate) shared across all contribution types, with specifics of any given acknowledgment recorded in notes. The model is leaner than the Domain Overview's working position (which proposed three Donation-only fields including taxReceiptRequired) and reflects the recording-only operational scope of this process.

*After* (FU-RECORD v1.1 Section 1, last paragraph):

> FU-RECORD also resolves the acknowledgment / tax-receipt model question that EI-ISS-001 carried forward from the Entity Inventory and the Fundraising Domain Overview. The resolution is field-level capability on Contribution rather than a separate Acknowledgment entity — two optional fields (acknowledgmentSent, acknowledgmentDate) shared across all contribution types, with specifics of any given acknowledgment recorded in notes. The model is leaner than the Domain Overview's working position (which proposed three Donation-only fields including taxReceiptRequired). The two acknowledgment fields are jointly owned by FU-RECORD and FU-STEWARD under a hybrid ownership model. FU-RECORD is the primary write path: when a Contribution is recorded, the Coordinator typically sends the acknowledgment communication in the same operational moment and writes acknowledgmentSent and acknowledgmentDate at Contribution creation. FU-STEWARD is the catch-up write path: any Received Contribution where acknowledgmentSent = false is surfaced on the FU-STEWARD Acknowledgment-Pending Contributions sweep list, and the Coordinator sends the missed acknowledgment and writes the fields during the next sweep.

---

*Before* (FU-RECORD v1.0 Section 9 EI-ISS-001 disposition, final sentences):

> Specifics of what was sent in any given case are recorded in notes. The deviation from the Domain Overview's working position (which proposed three Donation-only fields including taxReceiptRequired) is intentional and reflects the recording-only operational model — generation, sending, and tax-receipt content are out of FU-RECORD scope and will be addressed by FU-STEWARD where relevant.

*After* (FU-RECORD v1.1 Section 9 EI-ISS-001 disposition, final sentences):

> Specifics of what was sent in any given case are recorded in notes. The deviation from the Domain Overview's working position (which proposed three Donation-only fields including taxReceiptRequired) is intentional. Acknowledgment generation and sending follow a hybrid ownership model surfaced during the FU-STEWARD interview: FU-RECORD is the primary write path — when a Contribution is recorded, the Coordinator typically sends the acknowledgment in the same operational moment and writes the fields immediately; FU-STEWARD is the catch-up write path — any Received Contribution where acknowledgmentSent = false is surfaced on the FU-STEWARD Acknowledgment-Pending Contributions sweep list and the missed acknowledgment is sent during the next sweep. See FU-STEWARD-REQ-004 for the FU-STEWARD-side write authorization.

---

*Before* (FU-RECORD v1.0 Section 6, FU-RECORD-REQ-015):

> The system must provide acknowledgmentSent (boolean) and acknowledgmentDate (date) fields on every Contribution record, regardless of contributionType. Both fields are optional and Coordinator-set. Specifics of what was sent in any given case are recorded in notes. This resolves EI-ISS-001 with field-level capability rather than a separate Acknowledgment entity.

*After* (FU-RECORD v1.1 Section 6, FU-RECORD-REQ-015):

> The system must provide acknowledgmentSent (boolean) and acknowledgmentDate (date) fields on every Contribution record, regardless of contributionType. Both fields are optional and Coordinator-set. The fields are jointly owned by FU-RECORD and FU-STEWARD under a hybrid ownership model: FU-RECORD is the primary write path (acknowledgment sent and recorded at the moment of Contribution creation); FU-STEWARD is the catch-up write path (acknowledgment sent and recorded during the FU-STEWARD sweep when missed at FU-RECORD time). See FU-STEWARD-REQ-004. Specifics of what was sent in any given case are recorded in notes. This resolves EI-ISS-001 with field-level capability rather than a separate Acknowledgment entity.

---

*Before* (FU-RECORD v1.0 Section 4.1, step 6):

> Acknowledgment generation. When the Coordinator sends an acknowledgment communication (a thank-you letter, a tax receipt, an email of thanks), the Coordinator sets acknowledgmentSent to true on the Contribution and records acknowledgmentDate. Specifics of what was sent in any given case are recorded in notes if the Coordinator wants. These two fields are shared across all contribution types and do not require a structured acknowledgmentMethod or taxReceiptRequired field; the Coordinator's judgment governs what is sent and what is captured in notes.

*After* (FU-RECORD v1.1 Section 4.1, step 6):

> Acknowledgment generation (primary write path). When the Coordinator sends an acknowledgment communication (a thank-you letter, a tax receipt, an email of thanks) at the moment of Contribution recording, the Coordinator sets acknowledgmentSent to true on the Contribution and records acknowledgmentDate. This is the typical and preferred path: the operational efficiency of acknowledging at the moment of recording is the reason FU-RECORD is the primary owner of these fields. Specifics of what was sent in any given case are recorded in notes if the Coordinator wants. These two fields are shared across all contribution types and do not require a structured acknowledgmentMethod or taxReceiptRequired field; the Coordinator's judgment governs what is sent and what is captured in notes. If the Coordinator does not send the acknowledgment at FU-RECORD time, the missed acknowledgment is captured on the FU-STEWARD Acknowledgment-Pending Contributions sweep list and sent during the next FU-STEWARD sweep, with FU-STEWARD writing the same two fields.

---

**Source:** FU-STEWARD process definition interview, 04-29-26. The hybrid acknowledgment ownership model was surfaced by the operating reality that the Coordinator typically sends acknowledgments at the moment of receiving a Contribution (FU-RECORD time), with the FU-STEWARD sweep providing safety-net coverage. FU-RECORD v1.0's framing of acknowledgment as "addressed by FU-STEWARD where relevant" understated FU-RECORD's primary role and is corrected by this update. Documented in FU-STEWARD.docx v1.0 Section 10.7 (Interview Transcript) and Section 9 (Open Issues, EI-ISS-001 disposition note).

---

**Propagation across dependent documents:**

| Document | Version | What changes in this document |
|---|---|---|
| FU-RECORD.docx | v1.0 → v1.1 | Section 1 last paragraph rewritten to introduce the hybrid acknowledgment ownership model. Section 4.1 step 6 ("Acknowledgment generation") rewritten to identify it as the primary write path and to reference the FU-STEWARD catch-up write path for missed acknowledgments. Section 6 FU-RECORD-REQ-015 rewritten to describe the joint ownership and to reference FU-STEWARD-REQ-004. Section 9 EI-ISS-001 disposition's final sentences rewritten to describe the hybrid ownership pattern instead of the original "out of scope" framing. |

---

**Mechanical edits (applied automatically, no approval required):**

- Version bump on FU-RECORD.docx from v1.0 to v1.1
- Last Updated timestamp on FU-RECORD.docx updated to the date the carry-forward session is executed
- Change Log entry added to FU-RECORD.docx describing the hybrid acknowledgment ownership update and citing FU-STEWARD v1.0 as the source
- Depends On line on FU-RECORD.docx updated if any upstream-document version references need to refresh

No other dependent documents are affected by this change. The Fundraising Domain Overview v1.0 already places acknowledgment within FU-RECORD scope at the inventory level (Section 4.8 "Note on the Acknowledgment / Tax Receipt Model") and does not require an update. The Contact Entity PRD and Account Entity PRD are not affected (no Contact or Account fields change). The Contribution Entity PRD is pending Phase 5 and will reflect the hybrid ownership model when written.

---

**Approve propagation?**
