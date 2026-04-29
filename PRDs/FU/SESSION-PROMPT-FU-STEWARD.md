# Session Prompt: FU-STEWARD Process Definition (Phase 4b)

## Context

I am working on the CBM CRM implementation. The Fundraising (FU) Domain Overview v1.0 was produced on 04-22-26 and is committed at `PRDs/FU/CBM-Domain-Overview-Fundraising.docx`. The first FU process document, FU-PROSPECT v1.0, was completed on 04-22-26 and is committed at `PRDs/FU/FU-PROSPECT.docx`. The second FU process document, FU-RECORD v1.0, was completed on 04-29-26 and is committed at `PRDs/FU/FU-RECORD.docx`. This session produces the **third** process document in the Fundraising domain.

Fundraising is a flat domain (no sub-domains) with four processes in confirmed dependency order: FU-PROSPECT → FU-RECORD → FU-STEWARD (sequential lifecycle), plus FU-REPORT (asynchronous). Two personas participate in the domain: MST-PER-010 Donor / Sponsor Coordinator (primary operator) and MST-PER-002 Executive Member (oversight consumer). Four entities are in scope: Contact (cross-domain, Entity PRD v1.6), Account (cross-domain, Entity PRD v1.6), Contribution (FU-owned, Entity PRD pending Phase 5), and Fundraising Campaign (FU-owned, Entity PRD pending Phase 5).

Per the Document Production Process, process documents follow a structured interview producing a Word document committed at `PRDs/FU/FU-STEWARD.docx`.

## Before Doing Any Work

1. Clone the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos using the standard sparse-checkout pattern (targeting `PRDs` and `CLAUDE.md`).
2. Read the CLAUDE.md in both repos. Confirm with Doug which CLAUDE.md to read first per his working-style preference.
3. Read the Phase 4b interview guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo (current version v2.6, 04-20-26). This is the authoritative guide for this session.
4. Read `PRDs/process/interviews/guide-carry-forward-updates.md` in the crmbuilder repo. Updates to previously-completed documents discovered during this session are handled as a separate carry-forward-request artifact, not as an "Updates to Prior Documents" section inside the FU-STEWARD document itself.
5. Read the FU Domain Overview at `PRDs/FU/CBM-Domain-Overview-Fundraising.docx`.
6. Read the FU-PROSPECT process document at `PRDs/FU/FU-PROSPECT.docx` — this is the upstream process that creates the donor Contact and Funder Organization Account records and establishes the seven-stage lifecycle (Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed). Pay particular attention to the lifecycle field semantics (donorStatus on Contact, funderStatus on Account), the multi-Contact linkage pattern for Funder Organizations, the assignedSponsorCoordinator field specification, and the donorNotes / funderNotes restricted-visibility narrative fields.
7. Read the FU-RECORD process document at `PRDs/FU/FU-RECORD.docx` — this is the immediate upstream process that produces the Contribution and Fundraising Campaign records FU-STEWARD operates on. Pay particular attention to the Contribution status lifecycle (six values including the Active-relationship-implicit Received state), the contributionType discriminator, the donorLifetimeGiving and funderLifetimeGiving rollups, the acknowledgmentSent and acknowledgmentDate fields (which FU-STEWARD will use), and the Fundraising Campaign entity.
8. Read the Contact Entity PRD v1.6 at `PRDs/entities/Contact-Entity-PRD.docx` and the Account Entity PRD v1.6 at `PRDs/entities/Account-Entity-PRD.docx`, scoped to the fields most relevant to FU-STEWARD.
9. Do **not** reference `PRDs/CBM-Domain-PRD-Fundraising.md` (legacy) as authoritative. It is source material only.

## Process Being Defined

**FU-STEWARD — Donor and Sponsor Stewardship** (Important tier per Master PRD Section 3.6)

From the FU Domain Overview:

> Maintaining active relationships with committed donors and sponsors through communications, reporting, recognition, and lapse detection.

FU-STEWARD operates on Active donor and funder relationships — the population produced by FU-RECORD's automatic Committed → Active transition on first Contribution creation. It maintains those relationships through ongoing acknowledgment communications, impact reporting, periodic outreach, recognition obligations, and the detection of lapsing relationships. FU-STEWARD is also the process that owns the Active → Lapsed transition (FU-RECORD does not). Once a donor or funder lapses, FU-STEWARD may continue to attempt re-engagement, or the record may move to Closed by Coordinator judgment.

This process is operating-rhythm-driven rather than event-driven. Where FU-PROSPECT advances by relationship judgment and FU-RECORD captures discrete transactional events, FU-STEWARD operates on a calendar of communications, reporting deadlines, and engagement checkpoints. The Coordinator's typical week or month includes a steady stream of stewardship work: thank-you communications for recent Contributions, anniversary recognitions, impact updates, board-member outreach, grant-report preparation, and periodic review of donor and funder activity to flag any relationships that are going cold.

This process creates and maintains:

- The Active → Lapsed transition on the donor or funder lifecycle field (the inverse of the FU-PROSPECT → FU-RECORD activation transition)
- Stewardship-specific narrative fields on Contact and Account (potentially: lastStewardshipContactDate, stewardshipPlan, stewardshipTier, etc. — to be defined during the interview)
- Acknowledgment communications generated against Contribution records (using the acknowledgmentSent and acknowledgmentDate fields per FU-RECORD-REQ-015)
- Stewardship outreach activity log (via Notes Service or via additional structured fields — to be determined)
- Grant-reporting deadline tracking (using nextGrantDeadline per FU-RECORD-DAT-038, plus any FU-STEWARD-specific deadline-tracking fields)

The process hands off to FU-REPORT for analytics on stewardship performance and to FU-RECORD when a stewarded donor makes another Contribution (which simply continues the Active relationship through a new Contribution record).

## Personas

| ID | Persona | Role in This Process |
| --- | --- | --- |
| MST-PER-010 | Donor / Sponsor Coordinator | Sole operator. Sends acknowledgment communications, prepares impact reports, conducts periodic outreach, tracks grant-reporting deadlines, monitors active relationships for signs of lapse, and transitions donors and funders from Active to Lapsed when appropriate. |

MST-PER-002 Executive Member is a read-only consumer of FU-STEWARD output via FU-REPORT — reviews stewardship dashboards and lapse-detection reports but does not operate this process. Executive Members may participate in high-value stewardship communications (signing letters, attending donor meetings, making thank-you calls) at the Coordinator's invitation, paralleling the FU-PROSPECT informal-participation pattern.

## Entities Used

| CRM Entity | Type | Entity PRD | Role in This Process |
| --- | --- | --- | --- |
| Contact | Native Person | v1.6 | Read and updated. donorStatus transitions from Active to Lapsed when stewardship signals indicate the relationship has gone cold. donorNotes accumulates stewardship narrative. donorLifetimeGiving (NEW from FU-RECORD) is a key analytic input to stewardship segmentation. Potentially additional FU-STEWARD-specific fields (stewardship plan, last contact date, stewardship tier) — to be defined. |
| Account | Native Company | v1.6 | Read and updated. funderStatus transitions from Active to Lapsed similarly. funderNotes accumulates stewardship narrative. funderLifetimeGiving informs stewardship priority. assignedSponsorCoordinator (FU-PROSPECT-DAT-027) identifies the staff member leading the relationship. Potentially additional FU-STEWARD-specific fields. |
| Contribution | Custom Base (FU-owned) | Pending Phase 5 | Read for stewardship-relevant context (recent giving history, grant-reporting deadlines, acknowledgment status). The acknowledgmentSent and acknowledgmentDate fields (FU-RECORD-DAT-032 and DAT-033) are written by FU-STEWARD as acknowledgment communications are sent — these are shared across FU-RECORD and FU-STEWARD. |
| Fundraising Campaign | Custom Base (FU-owned) | Pending Phase 5 | Read for stewardship context — major Campaign donors may receive specific stewardship treatment. Not modified by FU-STEWARD. |

## Open Questions Likely to Be Addressed During the Interview

These are anticipated topics for the interview. The structured discussion will surface decisions on each one.

1. **Stewardship operating rhythm.** What is the cadence — daily inbox-driven, weekly batch, monthly portfolio review, quarterly board-cycle, or some combination? What workflow patterns predominate (transactional acknowledgment communications vs. periodic relationship outreach)?

2. **Acknowledgment communications.** When a Contribution arrives, what acknowledgment is sent and how is it tracked? Does the Coordinator generate the communication from the CRM, from external systems, or by hand? How do the acknowledgmentSent and acknowledgmentDate fields relate to the actual sending workflow? Is there a tax-receipt distinction? Does acknowledgment vary by donor segment (individual vs. organizational, board member vs. anonymous, major donor vs. small donor)?

3. **Stewardship-specific fields on Contact and Account.** Are there fields needed beyond what FU-PROSPECT and FU-RECORD have already defined? Candidates include: stewardshipTier (an enum segmenting donors by giving level or strategic priority), lastStewardshipContact (a date for "when did we last reach out"), stewardshipPlan (a wysiwyg narrative for "what is our cultivation strategy with this donor"), preferredStewardshipChannel (Email / Phone / In-Person / Mail / Letter). Final list to be determined during the interview.

4. **Active → Lapsed transition.** What signals trigger the transition? Is it time-based (no Contribution in 12 months), engagement-based (no response to N outreach attempts), Coordinator-judgment-only, or a combination? Is there a system-fired alert when a donor has been inactive for a configurable period? Does Lapsed transition automatically or only on Coordinator action?

5. **Grant-reporting deadline tracking.** nextGrantDeadline exists on Grant Contributions per FU-RECORD-DAT-038. How does FU-STEWARD use it — alerts before deadline, deadline-grouped views, calendar integration? When a deadline is met, is the field cleared, advanced to the next deadline, or archived?

6. **Impact reporting.** Stewardship often requires sending donors and funders periodic reports on the program impact their gifts produced — engagement counts, session hours, client outcomes. The FU Domain Overview Section 4.7 notes that FU consumes program-impact data from the Mentoring domain. How is impact reporting orchestrated — manually composed per recipient, templated with merge fields, fully automated? Is impact reporting attached to specific Contributions, specific Campaigns, or just to donor records? What reporting cadence is typical?

7. **Recognition obligations (Sponsorships).** FU-RECORD captured recognition obligations (logo placement, program advertisement, website listing, verbal recognition at events) as free-form notes on Sponsorship Contributions, with a deliberate decision to not structure them. Does FU-STEWARD need to operationalize these obligations — a tracking view, a deadline reminder, a fulfillment checklist — or are notes still sufficient?

8. **Periodic outreach and contact cadence.** Beyond transactional acknowledgments, what proactive outreach does FU-STEWARD drive — birthday greetings, anniversary recognitions, holiday cards, mid-year updates? Is this a batch-mode process (generate a list of donors due for outreach this month) or a one-by-one process (Coordinator reviews donor records and decides per case)?

9. **Lapse-detection workflow.** Once a donor or funder is identified as at-risk (extended inactivity, missed pledge installment, declined renewal), what is the recovery workflow? Does the Coordinator initiate a re-engagement sequence? Are re-engagement attempts tracked? What signals success (a new Contribution) vs. confirmed lapse (no response after N attempts)?

10. **Reporting and pipeline visibility.** What stewardship-specific views does the Coordinator need? Active donor list with last-contact recency? Upcoming grant-reporting deadlines? Acknowledgment-pending Contributions? At-risk relationships? Stewardship-tier distribution? The detail of FU-REPORT vs. FU-STEWARD reporting is itself a question to resolve.

11. **Access control on stewardship narrative.** Does the stewardshipPlan or equivalent narrative inherit the existing donorNotes / funderNotes restricted-visibility model (Donor / Sponsor Coordinator and above), or does it have a different scope?

12. **Cross-process interaction with FU-RECORD.** The acknowledgment fields (acknowledgmentSent, acknowledgmentDate) are written by FU-STEWARD but live on Contribution. Is there any conflict or coordination needed? Is FU-STEWARD authorized to edit Contribution fields beyond the acknowledgment fields, or is editing scope limited?

13. **Cross-process interaction with FU-PROSPECT.** Lapsed and Closed donors may be re-engaged via FU-PROSPECT (per FU-PROSPECT Section 4.2). How does the FU-STEWARD lapse declaration coordinate with FU-PROSPECT's re-engagement path? Is there an explicit handoff or is it implicit?

## Prior Process Documents in This Domain

Two prior process documents exist in the Fundraising domain:

- **FU-PROSPECT v1.0** (`PRDs/FU/FU-PROSPECT.docx`) — Donor and Sponsor Prospecting. Establishes donor Contacts and Funder Organization Accounts and moves them through the seven-stage lifecycle to Committed. The handoff to FU-RECORD is the Committed → Active transition triggered automatically on first Contribution creation. FU-PROSPECT also owns Lapsed and Closed re-engagement.
- **FU-RECORD v1.0** (`PRDs/FU/FU-RECORD.docx`) — Contribution Recording. Records every contribution event (Donation, Sponsorship, Grant) on Contribution records, manages Fundraising Campaign records, and triggers the automatic Active transition on the donor or funder lifecycle field. Closes EI-ISS-001 with the field-level acknowledgment model.

FU-STEWARD is the third process in the Fundraising lifecycle. The interview guide's "State the Context from Prior Work" step should summarize FU-PROSPECT and FU-RECORD's contributions and flag them for conflict checking as FU-STEWARD's data model emerges.

## Documents to Upload

Upload the following documents with the session prompt:

1. **CBM-Domain-Overview-Fundraising.docx** — FU Domain Overview v1.0.
2. **FU-PROSPECT.docx** — first-process document v1.0.
3. **FU-RECORD.docx** — second-process document v1.0.

The Master PRD, Entity Inventory, Contact Entity PRD v1.6, and Account Entity PRD v1.6 are not uploaded — the AI will read them directly from the repository after cloning, scoped to the fields relevant to FU-STEWARD.

## Output

1. **Primary artifact.** The FU-STEWARD process document as a Word (.docx) file, committed to `PRDs/FU/FU-STEWARD.docx`. The document has all ten required sections per the Phase 4b interview guide: Process Purpose, Process Triggers, Personas Involved, Process Workflow, Process Completion, System Requirements (with `FU-STEWARD-REQ-xxx` identifiers), Process Data (with `FU-STEWARD-DAT-xxx` identifiers), Data Collected, Open Issues, Interview Transcript.

2. **Secondary artifact (conditional).** If the interview discovers that FU-PROSPECT v1.0, FU-RECORD v1.0, the FU Domain Overview v1.0, the Contact Entity PRD v1.6, or the Account Entity PRD v1.6 needs a change beyond adding a new field — for example, a value-list change, a visibility-rule adjustment, a dynamic-logic change, or a correction to a prior workflow step — draft a carry-forward request per `guide-carry-forward-updates.md` and save it at `PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-{slug}.md`. If the change is only the addition of new fields on Contact, Account, Contribution, or Fundraising Campaign surfaced during this session, record them in the FU-STEWARD document's Data Collected section and defer the consolidated Entity PRD carry-forwards until the end of FU Phase 4b, consistent with the plan established by the Domain Overview and followed by FU-PROSPECT and FU-RECORD.

## Output Standards Reminder

Per Doug's working-style preferences:

- The document must have a metadata table at the top (Version, Status, Last Updated in `MM-DD-YY HH:MM` format, Domain Code, Process Code, Process Category, Implementation Tier, Depends On) and a Change Log section at the end.
- The document is a business-language PRD. **No product names** anywhere in the document (no EspoCRM, WordPress, Gravity Forms, Moodle, LimeSurvey, Constant Contact, DigitalOcean, or similar).
- **One topic at a time during the interview.** Doug responds to one question before the next is posed. Bulk question lists are not how the working session proceeds.
- Once a decision is approved, execute through planned steps without incremental check-ins until a new issue surfaces that requires a decision.
- After document production, state the next required step (FU-REPORT process definition) and ask for explicit confirmation before proceeding.

## After This Session

With FU-STEWARD complete, the next process to define is **FU-REPORT — Fundraising Reporting** (Enhancement tier). FU-REPORT is the asynchronous reporting process that reads from FU-PROSPECT, FU-RECORD, and FU-STEWARD outputs (plus Mentoring-domain program-impact data) to produce internal analytics and external compliance reports. The session prompt for FU-REPORT will be drafted at the end of the FU-STEWARD session.

After FU-REPORT, the consolidated end-of-FU-Phase-4b carry-forward to Contact Entity PRD v1.6 → v1.7 and Account Entity PRD v1.6 → v1.7 is drafted, bundling all FU-surfaced field additions into a single propagation per the bundling decision documented in the FU Domain Overview v1.0 Section 5. As of the FU-RECORD completion, the bundled carry-forward currently includes:

- **To Contact Entity PRD v1.6 → v1.7:** donorStatus (FU-PROSPECT-DAT-020), donorNotes (FU-PROSPECT-DAT-021), donorLifetimeGiving (FU-RECORD-DAT-018).
- **To Account Entity PRD v1.6 → v1.7:** assignedSponsorCoordinator (FU-PROSPECT-DAT-027).

Any additional field additions surfaced by FU-STEWARD and FU-REPORT will be appended to these bundles before the carry-forward sessions execute.
