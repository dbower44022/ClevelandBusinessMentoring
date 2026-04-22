# Session Prompt: FU-PROSPECT Process Definition (Phase 4b)

## Context

I am working on the CBM CRM implementation. The Fundraising (FU) Domain Overview v1.0 was produced on 04-22-26 and is committed to the repository at `PRDs/FU/CBM-Domain-Overview-Fundraising.docx`. Fundraising is a flat domain (no sub-domains) with four processes in confirmed dependency order: FU-PROSPECT → FU-RECORD → FU-STEWARD (sequential lifecycle), plus FU-REPORT (asynchronous). Two personas participate in the domain: MST-PER-010 Donor / Sponsor Coordinator (primary operator) and MST-PER-002 Executive Member (oversight consumer). Four entities are in scope: Contact (cross-domain, Entity PRD v1.6), Account (cross-domain, Entity PRD v1.6), Contribution (FU-owned, Entity PRD pending Phase 5), and Fundraising Campaign (FU-owned, Entity PRD pending Phase 5).

This session produces the **FU-PROSPECT** process document — the first of four process documents in the Fundraising domain. Per the Document Production Process, process documents follow a structured interview producing a Word document committed at `PRDs/FU/FU-PROSPECT.docx`.

## Before Doing Any Work

1. Clone the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos using the standard sparse-checkout pattern (targeting `PRDs` and `CLAUDE.md`).
2. Read the CLAUDE.md in both repos. Confirm with Doug which CLAUDE.md to read first per his working-style preference.
3. Read the Phase 4b interview guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo (current version v2.6, 04-20-26). This is the authoritative guide for this session.
4. Read `PRDs/process/interviews/guide-carry-forward-updates.md` in the crmbuilder repo. Updates to previously-completed documents discovered during this session are handled as a separate carry-forward-request artifact, not as an "Updates to Prior Documents" section inside the FU-PROSPECT document itself.
5. Read the FU Domain Overview at `PRDs/FU/CBM-Domain-Overview-Fundraising.docx` — this is the primary input for this session.
6. Read the Contact Entity PRD v1.6 at `PRDs/entities/Contact-Entity-PRD.docx` and the Account Entity PRD v1.6 at `PRDs/entities/Account-Entity-PRD.docx`, scoped to the fields most relevant to FU-PROSPECT.
7. Do **not** reference `PRDs/CBM-Domain-PRD-Fundraising.md` (legacy) as authoritative. It is source material only and its four-separate-entities data model has been deprecated by the Entity Inventory v1.5 Contribution consolidation.

## Process Being Defined

**FU-PROSPECT — Donor and Sponsor Prospecting** (Important tier per Master PRD Section 3.6)

From the FU Domain Overview:

> Identifying and pursuing prospective donors, sponsors, and funding institutions through the prospecting pipeline. Establishes the Contact or Account record with donor/funder type and status, moves the record through the prospect lifecycle (Prospect, Contacted, In Discussion, Committed, Active), and creates the foundation every downstream FU process depends on. Nothing in FU happens without a record in the system.

This process creates and manages records at the **entry point** of the Fundraising lifecycle. It produces:

- Donor Contact records (Contact with `contactType` including Donor) for individual prospects
- Funder Organization Account records (Account with `accountType` including Donor/Sponsor) for organizational prospects
- The donor/funder lifecycle state progressing from initial identification through commitment

The process hands off to FU-RECORD when a prospect commits and the first contribution is recorded (status transition Committed → Active).

## Personas

| ID | Persona | Role in This Process |
| --- | --- | --- |
| MST-PER-010 | Donor / Sponsor Coordinator | Sole operator. Identifies prospects, manages outreach, qualifies opportunities, moves prospects through the pipeline, and activates them. |

MST-PER-002 Executive Member may participate informally in high-value prospects at the Coordinator's invitation but is not accountable for pipeline outcomes and does not operate the process. The FU Domain Overview establishes this distinction.

## Entities Used

| CRM Entity | Type | Entity PRD | Role in This Process |
| --- | --- | --- | --- |
| Contact | Native Person | v1.6 | Creates and maintains individual donor prospect records. `contactType` includes Donor. Donor-specific lifecycle field not yet defined (CON-ISS-003 — this session should close this issue). |
| Account | Native Company | v1.6 | Creates and maintains Funder Organization prospect records. `accountType` includes Donor/Sponsor. Existing FU-scoped fields on Account: `funderType`, `funderStatus` (7-value enum: Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed), `funderLifetimeGiving` (system-calculated, FU-STEWARD territory), `funderNotes` (wysiwyg, restricted). This session should confirm or adjust these and add the `assignedSponsorCoordinator` link field (FU-DO-ISS-001). |

The Contribution and Fundraising Campaign entities are **not** created or modified in FU-PROSPECT. FU-PROSPECT manages the prospect pipeline only; the first Contribution record is created in FU-RECORD once a Committed prospect transitions to Active.

## Open Issues Deferred from the Domain Overview

This session must address or explicitly defer each of the following (per the Domain Overview's Section 6 Open Issues):

1. **CON-ISS-003 — Donor lifecycle field on Contact.** Individual donor prospects need a lifecycle field analogous to Mentor's `mentorStatus` or Account's `funderStatus`. Likely name: `donorStatus`. Likely value set: aligned with or parallel to `funderStatus` (Prospect, Contacted, In Discussion, Committed, Active, Lapsed, Closed) but may differ based on how individual donor relationships actually progress. Decide the name, the enum values, and the dynamic-logic visibility rule (expected: `contactType has Donor`). Closing CON-ISS-003 is an in-scope outcome of this session.

2. **FU-DO-ISS-001 — assignedSponsorCoordinator link field on Account.** Finalize the field name, required/optional status, and visibility rule (expected: `accountType has Donor/Sponsor`). Confirm the field targets Contact and that it represents the specific staff member leading the Funder Organization relationship. This session produces the definitive specification; the carry-forward request to bump Account Entity PRD v1.6 to v1.7 is drafted at the end of FU Phase 4b (after FU-STEWARD, when all FU-surfaced Account field additions can be bundled).

3. **FU-DO-ISS-002 — Contribution consolidation model.** Informational. The Entity Inventory v1.5's single-Contribution-entity-with-discriminator model is adopted. Write all FU-PROSPECT system requirements and data items against this model, not the legacy four-entity structure.

4. **EI-ISS-001 — Acknowledgment / tax-receipt model.** Not in scope for FU-PROSPECT. This is an FU-RECORD concern and is deferred to that session.

## Key Questions to Address

These scaffold the interview. The interview guide (`interview-process-definition.md`) will drive the overall structure; these are the topics the administrator should expect the AI to probe.

1. **Prospect identification sources.** Where does the Donor / Sponsor Coordinator find prospective donors and funders? Community research, board referrals, alumni of prior grant programs, existing Contact/Account records being reclassified, inbound inquiries, peer organizations, public directories of foundations?

2. **Individual prospect versus organizational prospect.** Do both populations follow the same pipeline stages or do they diverge? For example, do foundations take longer to progress through Contacted → In Discussion than individual donors? Does the workflow differ (grant applications for foundations, solicitation letters for individuals)?

3. **Qualification criteria.** What makes a prospective donor or funder worth pursuing at each pipeline stage? What moves a record from Prospect to Contacted, Contacted to In Discussion, In Discussion to Committed? Is there a formal checklist or is it judgment-based?

4. **Outreach workflow and cadence.** What outreach activities happen during the pipeline? Initial contact method (letter, email, phone, meeting), follow-up rhythm, escalation or abandonment when prospects go cold. How are these activities recorded — free-form notes, communication log, structured fields?

5. **Coordinator assignment workflow.** When and how is `assignedSponsorCoordinator` set on a Funder Organization Account? Is it set at creation, or only when the relationship reaches a certain stage? Can it be changed (reassignment, coverage during absence), and if so, by whom? Is there an equivalent concept at the individual-donor (Contact) level, or is that handled by the `assignedUser` native field?

6. **Donor versus Sponsor versus Funder distinctions.** The Master PRD and legacy source material use all three terms. The Account `funderType` enum already covers Corporation, Foundation, Government Agency, Community Foundation, Individual (Organization), Other. Is there a functional distinction inside FU-PROSPECT between a "sponsor" (typically event-linked, typically corporate) and a "funder" (grants, general operating support), or are they handled identically through the same pipeline?

7. **Commitment and activation criteria.** What specific conditions define the Committed status? What moves a record from Committed to Active? The Domain Overview states Active is set by the first received contribution — does any non-monetary commitment (verbal pledge, signed letter of intent, grant award notification without funds yet received) also activate the record, or does Active strictly require received funds?

8. **Lapse and closure handling.** What happens when a prospect goes cold? Are there two failure paths (Lapsed = reachable but not interested now; Closed = permanently withdrawn or unsuitable), or one? What triggers a transition to Lapsed or Closed — Coordinator judgment, time-based rules, or explicit decline from the prospect?

9. **Linking prospects to existing Contacts and Accounts.** When a Coordinator identifies a prospective donor who is already in the system as a Mentor, a Client, a Board Member, or a Partner, what is the correct operation — append Donor to `contactType` on the existing Contact, or create a new record? The Universal Contact-Creation Rules established by CR-MARKETING apply here; confirm they are sufficient for the FU use case and surface any gaps.

10. **Reporting and dashboard needs for the prospecting pipeline.** What reports does the Coordinator need from FU-PROSPECT alone? Pipeline summary by status, conversion rate by funder type, activity report (outreach last 30 days), stale-prospect list? Reports spanning the full lifecycle (combining prospect, contribution, and stewardship data) belong to FU-REPORT and are out of scope for this session.

## Prior Process Documents

This is the first process document in the Fundraising domain. No prior FU process documents exist. Context from prior processes in other domains is relevant only where FU-PROSPECT shares entities with them (Contact and Account). The interview guide's "State the Context from Prior Work" step should use the "first process in the domain" framing.

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-Domain-Overview-Fundraising.docx** — the FU Domain Overview v1.0 (from `PRDs/FU/` in the CBM repo). This is the primary input for this session per the Phase 4b interview guide.

The Master PRD is not uploaded — its FU-relevant content (domain purpose, personas, process list) has been synthesized into the Domain Overview. The Contact and Account Entity PRDs are not uploaded — the AI will read them from the repository after cloning, scoped to the fields relevant to FU-PROSPECT.

## Output

1. **Primary artifact.** The FU-PROSPECT process document as a Word (.docx) file, committed to `PRDs/FU/FU-PROSPECT.docx`. The document has all ten required sections per the Phase 4b interview guide: Process Purpose, Process Triggers, Personas Involved, Process Workflow, Process Completion, System Requirements (with `FU-PROSPECT-REQ-xxx` identifiers), Process Data (with `FU-PROSPECT-DAT-xxx` identifiers), Data Collected, Open Issues, Interview Transcript.

2. **Secondary artifact (conditional).** If the interview discovers that Contact Entity PRD v1.6 or Account Entity PRD v1.6 needs a change beyond adding a new field (for example, a value-list change, a visibility-rule adjustment, or a dynamic-logic change), draft a carry-forward request per `guide-carry-forward-updates.md` and save it at `PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-{slug}.md`. If the change is only the addition of new fields surfaced during this session (the expected case for `donorStatus` on Contact and `assignedSponsorCoordinator` on Account), record them in the FU-PROSPECT document's Data Collected section and defer the consolidated Entity PRD carry-forward until the end of FU Phase 4b, as planned in the Domain Overview.

## Output Standards Reminder

Per Doug's working-style preferences:

- The document must have a metadata table at the top (Version, Status, Last Updated in `MM-DD-YY HH:MM` format, Domain Code, Depends On) and a Change Log section at the end. This applies to all FU documents.
- The document is a business-language PRD. **No product names** anywhere in the document (no EspoCRM, no WordPress, no Gravity Forms, no Moodle, etc.). Product names may be discussed during the interview, but they must not appear in the output.
- **One topic at a time during the interview.** Doug will respond to one question before the next is posed. Bulk question lists are not how the working session proceeds.
- After document production, state the next required step (FU-RECORD process definition) and ask for explicit confirmation before proceeding.

## After This Session

With FU-PROSPECT complete, the next process to define is **FU-RECORD — Contribution Recording** (Core tier). FU-RECORD operates on records produced by FU-PROSPECT — the donor Contact and Funder Organization Account records, with their lifecycle fields transitioned to Active — and creates the first Contribution records. The session prompt for FU-RECORD will be drafted at the end of the FU-PROSPECT session.

The three remaining FU Phase 4b sessions after FU-RECORD are FU-STEWARD and FU-REPORT, after which the Account Entity PRD v1.6 → v1.7 carry-forward is drafted to bundle all FU-surfaced Account field additions into a single PRD bump.
