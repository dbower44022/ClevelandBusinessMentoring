# Session Prompt: FU-RECORD Process Definition (Phase 4b)

## Context

I am working on the CBM CRM implementation. The Fundraising (FU) Domain Overview v1.0 was produced on 04-22-26 and is committed to the repository at `PRDs/FU/CBM-Domain-Overview-Fundraising.docx`. The first FU process document, FU-PROSPECT v1.0, was completed on 04-22-26 and is committed at `PRDs/FU/FU-PROSPECT.docx`. This session produces the **second** process document in the Fundraising domain.

Fundraising is a flat domain (no sub-domains) with four processes in confirmed dependency order: FU-PROSPECT → FU-RECORD → FU-STEWARD (sequential lifecycle), plus FU-REPORT (asynchronous). Two personas participate in the domain: MST-PER-010 Donor / Sponsor Coordinator (primary operator) and MST-PER-002 Executive Member (oversight consumer). Four entities are in scope: Contact (cross-domain, Entity PRD v1.6), Account (cross-domain, Entity PRD v1.6), Contribution (FU-owned, Entity PRD pending Phase 5), and Fundraising Campaign (FU-owned, Entity PRD pending Phase 5).

Per the Document Production Process, process documents follow a structured interview producing a Word document committed at `PRDs/FU/FU-RECORD.docx`.

## Before Doing Any Work

1. Clone the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos using the standard sparse-checkout pattern (targeting `PRDs` and `CLAUDE.md`).
2. Read the CLAUDE.md in both repos. Confirm with Doug which CLAUDE.md to read first per his working-style preference.
3. Read the Phase 4b interview guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo (current version v2.6, 04-20-26). This is the authoritative guide for this session.
4. Read `PRDs/process/interviews/guide-carry-forward-updates.md` in the crmbuilder repo. Updates to previously-completed documents discovered during this session are handled as a separate carry-forward-request artifact, not as an "Updates to Prior Documents" section inside the FU-RECORD document itself.
5. Read the FU Domain Overview at `PRDs/FU/CBM-Domain-Overview-Fundraising.docx`.
6. Read the FU-PROSPECT process document at `PRDs/FU/FU-PROSPECT.docx` — this is the upstream process that creates the donor Contact and Funder Organization Account records FU-RECORD operates on. Pay particular attention to the lifecycle model (seven-stage `donorStatus` / `funderStatus`, Committed → Active transition triggered by the first Contribution record in FU-RECORD), the multi-Contact linkage pattern for Funder Organizations, and the three new fields FU-PROSPECT surfaced for bundled carry-forward (Contact.donorStatus, Contact.donorNotes, Account.assignedSponsorCoordinator).
7. Read the Contact Entity PRD v1.6 at `PRDs/entities/Contact-Entity-PRD.docx` and the Account Entity PRD v1.6 at `PRDs/entities/Account-Entity-PRD.docx`, scoped to the fields most relevant to FU-RECORD.
8. Do **not** reference `PRDs/CBM-Domain-PRD-Fundraising.md` (legacy) as authoritative. It is source material only and its four-separate-entities data model has been deprecated by the Entity Inventory v1.5 Contribution consolidation.

## Process Being Defined

**FU-RECORD — Contribution Recording** (Core tier per Master PRD Section 3.6)

From the FU Domain Overview:

> Recording and maintaining accurate records of all incoming funding — donations, sponsorships, grants, and pledges — with acknowledgment generation and campaign linkage.

FU-RECORD is the **only Core-tier** process in the Fundraising domain and is essential for Year 1 go-live. It operates on donor Contact and Funder Organization Account records produced by FU-PROSPECT and creates the actual Contribution records that track money flowing into the organization.

This process creates and maintains:

- Contribution records of all four types, distinguished by the `contributionType` discriminator: Donation, Sponsorship, Grant, Pledge
- Fundraising Campaign records that group Contributions under named efforts for goal tracking and performance analysis
- The lifecycle-field transition on the donor or funder record from Committed to Active — triggered by the creation of the first Contribution record (per FU-PROSPECT-REQ-006)
- Grant-specific lifecycle fields (application status, award tracking, reporting deadlines)
- Pledge-specific lifecycle fields (installment fulfillment tracking, amount remaining)
- Donor acknowledgment records for tax receipt purposes (subject to resolution of EI-ISS-001)

The process hands off to FU-STEWARD once Active donor and funder relationships are established and contributions are flowing — FU-STEWARD then maintains the relationship through acknowledgment communications, impact reporting, periodic outreach, and lapse detection.

## Personas

| ID | Persona | Role in This Process |
| --- | --- | --- |
| MST-PER-010 | Donor / Sponsor Coordinator | Sole operator. Records all contributions, manages the Contribution record lifecycle (particularly for multi-payment Grants and installment Pledges), creates and manages Fundraising Campaign records, generates donor acknowledgment records, and tracks grant reporting deadlines. |

MST-PER-002 Executive Member is a read-only consumer of FU-RECORD output — reviews contribution summaries and campaign performance data in FU-REPORT but does not operate this process.

## Entities Used

| CRM Entity | Type | Entity PRD | Role in This Process |
| --- | --- | --- | --- |
| Contact | Native Person | v1.6 | Read and updated. Individual donor Contact records are the `donorContact` link target for Contributions from individuals. `donorStatus` transitions from Committed to Active on first Contribution (per FU-PROSPECT-REQ-006). |
| Account | Native Company | v1.6 | Read and updated. Funder Organization Account records are the `donorAccount` link target for Contributions from organizations. `funderStatus` transitions from Committed to Active on first Contribution. `funderLifetimeGiving` is system-calculated from the sum of linked Contributions (updated as Contributions are created or amended). |
| Contribution | Custom Base (FU-owned) | Pending Phase 5 | Created and maintained by FU-RECORD. Single consolidated entity with `contributionType` discriminator (Donation, Sponsorship, Grant, Pledge) driving type-specific dynamic logic. This session produces the definitive field list, dynamic-logic specification, and workflow for every contributionType. |
| Fundraising Campaign | Custom Base (FU-owned) | Pending Phase 5 | Created and maintained by FU-RECORD. Named fundraising effort that groups Contributions for goal tracking and performance analysis. Examples: annual fund drive, program appeal, event sponsorship campaign, capital campaign. This session produces the definitive field list and workflow. |

The Fundraising Campaign entity is **Fundraising**-specific and distinct from the CR-MARKETING `Marketing Campaign` entity. Both use the word "campaign" but describe different things — Fundraising Campaign groups Contributions for goal tracking; Marketing Campaign is a single outbound communication send with engagement tracking. No shared fields, no shared workflow.

## Open Issues Deferred from Prior Documents

This session must address or explicitly defer each of the following:

1. **EI-ISS-001 — Acknowledgment / tax-receipt model.** Deferred from the Entity Inventory v1.5 and from the FU Domain Overview. The question: is donor acknowledgment a standalone entity (separate Acknowledgment record per Contribution), or a field-level capability within Contribution (acknowledgmentSent, acknowledgmentDate, taxReceiptRequired fields on Donation-type Contribution records)? The FU Domain Overview adopted the field-level capability interpretation as a working position. **Closing EI-ISS-001 with a confirmed decision is an in-scope outcome of this session.** The decision affects the Contribution entity's field list and the Phase 5 Contribution Entity PRD.

2. **FU-DO-ISS-002 — Contribution consolidation model.** Informational. The Entity Inventory v1.5's single-Contribution-entity-with-discriminator model is adopted. Write all FU-RECORD system requirements and data items against this model — one Contribution entity with a `contributionType` enum (Donation, Sponsorship, Grant, Pledge) driving type-specific dynamic logic, not four separate entities.

3. **ACT-ISS-002 — Incomplete domain coverage for Account entity.** Covered in part by FU-RECORD surfacing the final Account field list for FU. Additional Account field additions surfaced by this session join the bundled Account Entity PRD v1.6 → v1.7 carry-forward that will be drafted at the end of FU Phase 4b (after FU-STEWARD).

4. **CON-ISS-004 — Incomplete domain coverage for Contact entity.** Similar to ACT-ISS-002. Contact field additions surfaced by this session (if any) join the bundled Contact Entity PRD v1.6 → v1.7 carry-forward at the end of FU Phase 4b.

## Carry-Forward Items Already Staged

The following Entity PRD field additions have already been surfaced (by FU-PROSPECT v1.0) and are staged for bundled carry-forward at the end of FU Phase 4b. FU-RECORD does not need to re-surface them, but must write against them as established:

- **Contact.donorStatus** — enum, seven values (Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed), visible when `contactType has Donor`, defaults to Prospect on append. FU-RECORD triggers the automatic Committed → Active transition on first Contribution creation.
- **Contact.donorNotes** — wysiwyg, restricted visibility (Donor / Sponsor Coordinator and above), visible when `contactType has Donor`.
- **Account.assignedSponsorCoordinator** — link to Contact, visible when `accountType has Donor/Sponsor`, optional in general but required when `funderStatus = Active`. FU-RECORD must ensure this requirement is satisfied at the point of activation.

Any additional Contact or Account field additions surfaced during this session are recorded in the FU-RECORD document's Data Collected section and join the bundled carry-forward at the end of FU Phase 4b.

## Key Questions to Address

These scaffold the interview. The interview guide (`interview-process-definition.md`) will drive the overall structure; these are the topics the administrator should expect the AI to probe.

1. **Contribution creation workflow.** How does a Contribution record get created? Does the Coordinator always create them manually (for example, when a check arrives or a grant is awarded)? Are there external sources (online giving platform, bank feed, mail handling) that create Contributions via import or integration? Does every incoming dollar result in a Contribution record, or are there classes of funding that are not tracked at this granularity?

2. **Type-specific workflow divergence.** The four contributionType values — Donation, Sponsorship, Grant, Pledge — have materially different lifecycles. Donations are point-in-time transactions. Sponsorships have agreements and deliverables. Grants have application-award-reporting cycles that span months or years. Pledges have installment schedules that may span years and produce multiple related Donation records. How does the Coordinator's workflow differ for each type, and how should the system reflect those differences?

3. **Grant lifecycle.** Grant applications may exist before any funding is received. Is a grant application a Contribution record at `grantStatus = Prospect` or `Applied`, or is it tracked separately until awarded? What field transitions move a Grant from Prospect through Applied, Awarded, Reporting Due, and Closed? How are reporting deadlines captured and surfaced to the Coordinator? What does "closed" mean for a Grant — final report submitted, final payment received, or both?

4. **Pledge fulfillment.** A Pledge is a commitment to give a total amount over time, fulfilled by individual Donation records. How does the system link installment Donations back to the parent Pledge? How are `amountFulfilled` and `amountRemaining` calculated and kept current? What happens when a pledge is partially fulfilled but the donor stops paying — does the Pledge move to a Cancelled or Abandoned status, or does it remain open indefinitely?

5. **Fundraising Campaign lifecycle.** How and when is a Fundraising Campaign created — before solicitation begins, after Contributions start arriving, or at the start of a fiscal year? What is the Campaign status lifecycle (Planned, Active, Completed, Cancelled — or something else)? What closes a Campaign — reaching the goal, the end date arriving, or Coordinator judgment? Can Contributions be linked to a Campaign retroactively, or only at creation? Can a Contribution be linked to more than one Campaign?

6. **Acknowledgment and tax-receipt workflow (EI-ISS-001 resolution).** When a Donation arrives, the donor typically expects an acknowledgment letter, and for tax-deductible gifts, a tax receipt. Does CBM generate these from the CRM, or from an external system? Is acknowledgment tracked at the Contribution level (acknowledgmentSent boolean, acknowledgmentDate, taxReceiptRequired boolean) or does it require a separate Acknowledgment entity with its own lifecycle and output? What drives a Donation being tax-receipt-required — dollar threshold, donor request, all Donations by default? Does the acknowledgment text vary by Donation type (in-kind versus cash, restricted versus unrestricted)?

7. **Recognition obligations for Sponsorships.** Sponsorship agreements typically carry recognition obligations — logo placement on event materials, program advertisement, website listing, verbal recognition at events. Does the CRM track these obligations structurally (a recognitionObligations text field on Sponsorship-type Contributions) or are they handled as free-form notes? Is fulfillment of obligations something the Coordinator needs to track and report on?

8. **In-kind gifts.** Are non-monetary gifts (professional services, equipment, goods) tracked as Contributions? If so, how is `amount` valued — declared by donor, estimated by Coordinator, market-rate equivalent? Does the system need to distinguish in-kind from cash gifts for reporting purposes, and if so, via a `giftType` field or a separate contributionType value?

9. **Payment methods and payment tracking.** What payment methods are in scope — check, cash, credit card, ACH, online giving, in-kind, other? Does the CRM track the payment method per Contribution, the date funds were received (distinct from the commitment date), and the deposit reference or transaction identifier for reconciliation with the bank?

10. **Contribution amendments and corrections.** Contributions sometimes need to be corrected — the amount was entered wrong, the donor was misidentified, a refund was issued, a check bounced. What is the correction workflow? Is a Contribution record editable indefinitely, locked after some event (acknowledgment sent, tax receipt issued, fiscal year closed), or only amendable by creating offsetting records? Who has authority to amend — only the Coordinator, or also a Finance role?

11. **Designation and restricted gifts.** A Donation may be designated for a specific program, fund, or purpose ("restricted" in accounting terms). Does the CRM track designation at the Contribution level (a `designation` text field, or an enum), and if so, what are the valid designations? Is there a separate workflow for enforcing restricted-gift compliance, or is this handled entirely by the Finance system downstream?

12. **Campaign-linked versus unlinked Contributions.** Can a Contribution exist without a Fundraising Campaign link? (For example, an unsolicited donation that doesn't fit any current campaign.) If so, how common is this, and does the reporting treatment differ?

13. **Contribution visibility and access control.** Who can see a Contribution record? The Coordinator obviously; the Executive Member presumably; what about mentors or other staff? Does Contribution visibility follow the same restricted-to-Coordinator-and-above pattern as `funderNotes` and `donorNotes`, or is the summary visible more broadly with only certain fields restricted?

## Prior Process Documents in This Domain

One prior process document exists in the Fundraising domain:

- **FU-PROSPECT v1.0** (`PRDs/FU/FU-PROSPECT.docx`) — Donor and Sponsor Prospecting. Establishes donor Contacts and Funder Organization Accounts and moves them through the seven-stage lifecycle to Committed. The handoff to FU-RECORD is the Committed → Active transition triggered by the first Contribution record in this process.

FU-RECORD is the second process in the Fundraising lifecycle. The interview guide's "State the Context from Prior Work" step should summarize FU-PROSPECT's contributions (the lifecycle model, the two record types, the multi-Contact linkage pattern on Funder Organization Accounts, the staged field additions) and flag them for conflict checking as FU-RECORD's data model emerges.

## Documents to Upload

Upload the following documents with the session prompt:

1. **CBM-Domain-Overview-Fundraising.docx** — FU Domain Overview v1.0.
2. **FU-PROSPECT.docx** — the completed first-process document v1.0.

The Master PRD, Entity Inventory, Contact Entity PRD v1.6, and Account Entity PRD v1.6 are not uploaded — the AI will read them directly from the repository after cloning, scoped to the fields relevant to FU-RECORD.

## Output

1. **Primary artifact.** The FU-RECORD process document as a Word (.docx) file, committed to `PRDs/FU/FU-RECORD.docx`. The document has all ten required sections per the Phase 4b interview guide: Process Purpose, Process Triggers, Personas Involved, Process Workflow, Process Completion, System Requirements (with `FU-RECORD-REQ-xxx` identifiers), Process Data (with `FU-RECORD-DAT-xxx` identifiers), Data Collected, Open Issues, Interview Transcript.

2. **Secondary artifact (conditional).** If the interview discovers that FU-PROSPECT v1.0, the FU Domain Overview v1.0, the Contact Entity PRD v1.6, or the Account Entity PRD v1.6 needs a change beyond adding a new field — for example, a value-list change, a visibility-rule adjustment, a dynamic-logic change, or a correction to a FU-PROSPECT workflow step — draft a carry-forward request per `guide-carry-forward-updates.md` and save it at `PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-{slug}.md`. If the change is only the addition of new fields on Contact, Account, Contribution, or Fundraising Campaign surfaced during this session, record them in the FU-RECORD document's Data Collected section and defer the consolidated Entity PRD carry-forwards until the end of FU Phase 4b, consistent with the plan established by the Domain Overview and followed by FU-PROSPECT.

## Output Standards Reminder

Per Doug's working-style preferences:

- The document must have a metadata table at the top (Version, Status, Last Updated in `MM-DD-YY HH:MM` format, Domain Code, Process Code, Process Category, Implementation Tier, Depends On) and a Change Log section at the end.
- The document is a business-language PRD. **No product names** anywhere in the document (no EspoCRM, WordPress, Gravity Forms, Moodle, LimeSurvey, Constant Contact, DigitalOcean, or similar). Product names may be discussed during the interview, but they must not appear in the output.
- **One topic at a time during the interview.** Doug responds to one question before the next is posed. Bulk question lists are not how the working session proceeds.
- Once a decision is approved, execute through planned steps without incremental check-ins until a new issue surfaces that requires a decision.
- After document production, state the next required step (FU-STEWARD process definition) and ask for explicit confirmation before proceeding.

## After This Session

With FU-RECORD complete, the next process to define is **FU-STEWARD — Donor and Sponsor Stewardship** (Important tier). FU-STEWARD operates on Active donor and funder relationships produced by FU-RECORD and maintains them through acknowledgment communications, impact reporting, periodic outreach, and lapse detection. The session prompt for FU-STEWARD will be drafted at the end of the FU-RECORD session.

After FU-STEWARD, the remaining Phase 4b session is **FU-REPORT — Fundraising Reporting** (Enhancement tier). Once all four FU process documents are complete, the consolidated end-of-FU-Phase-4b carry-forward to Contact Entity PRD v1.6 → v1.7 and Account Entity PRD v1.6 → v1.7 is drafted, bundling all FU-surfaced field additions into a single propagation per decision.
