# Session Prompt: FU-REPORT Process Definition (Phase 4b)

## Context

I am working on the CBM CRM implementation. The Fundraising (FU) Domain Overview v1.0 was produced on 04-22-26 and is committed at `PRDs/FU/CBM-Domain-Overview-Fundraising.docx`. Three FU process documents are now complete: FU-PROSPECT v1.0 (committed 04-22-26 at `PRDs/FU/FU-PROSPECT.docx`), FU-RECORD v1.0 (committed 04-29-26 at `PRDs/FU/FU-RECORD.docx`), and FU-STEWARD v1.0 (committed 04-29-26 at `PRDs/FU/FU-STEWARD.docx`). This session produces the **fourth and final** process document in the Fundraising domain.

Fundraising is a flat domain (no sub-domains) with four processes in confirmed dependency order: FU-PROSPECT → FU-RECORD → FU-STEWARD (sequential lifecycle), plus FU-REPORT (asynchronous). Two personas participate in the domain: MST-PER-010 Donor / Sponsor Coordinator (operator across FU-PROSPECT, FU-RECORD, FU-STEWARD) and MST-PER-002 Executive Member (oversight consumer; primary audience for FU-REPORT). Four entities are in scope: Contact (cross-domain, Entity PRD v1.6), Account (cross-domain, Entity PRD v1.6), Contribution (FU-owned, Entity PRD pending Phase 5), and Fundraising Campaign (FU-owned, Entity PRD pending Phase 5). Mentoring-domain entities (Engagement, Session) are read-only inputs to FU-REPORT for grant-compliance and donor-impact reporting.

Per the Document Production Process, process documents follow a structured interview producing a Word document committed at `PRDs/FU/FU-REPORT.docx`.

One carry-forward request is outstanding before FU-REPORT begins: `SESSION-PROMPT-carry-forward-fu-record-acknowledgment-shared-ownership.md` updates FU-RECORD v1.0 → v1.1 to reflect the hybrid acknowledgment ownership model surfaced during the FU-STEWARD interview. Whether this carry-forward is executed before, during, or after FU-REPORT is a process question for the administrator. The carry-forward does not affect FU-REPORT scope but FU-REPORT should reference the most current FU-RECORD version available at session time.

## Before Doing Any Work

1. Clone the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos using the standard sparse-checkout pattern (targeting `PRDs` and `CLAUDE.md`).
2. Read the CLAUDE.md in both repos. Confirm with Doug which CLAUDE.md to read first per his working-style preference.
3. Read the Phase 4b interview guide at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo (current version v2.6, 04-20-26). This is the authoritative guide for this session.
4. Read `PRDs/process/interviews/guide-carry-forward-updates.md` in the crmbuilder repo. Updates to previously-completed documents discovered during this session are handled as a separate carry-forward-request artifact.
5. Read the FU Domain Overview at `PRDs/FU/CBM-Domain-Overview-Fundraising.docx`.
6. Read the three upstream FU process documents in order:
   - `PRDs/FU/FU-PROSPECT.docx` — establishes the donor and funder lifecycle, the seven-stage status field, the assignedSponsorCoordinator linkage, and the Active activation pattern.
   - `PRDs/FU/FU-RECORD.docx` — establishes the Contribution and Fundraising Campaign entities, the giving rollups (donorLifetimeGiving, funderLifetimeGiving, totalRaised), the audit-trail scope, and the field-level acknowledgment model.
   - `PRDs/FU/FU-STEWARD.docx` — establishes the lastContactDate fields, the Active → Lapsed transition, and the stewardship narrative on donorNotes/funderNotes that informs at-risk-relationship reporting.
7. Read the Contact Entity PRD v1.6 at `PRDs/entities/Contact-Entity-PRD.docx` and the Account Entity PRD v1.6 at `PRDs/entities/Account-Entity-PRD.docx`, scoped to the fields most relevant to FU-REPORT.
8. Do **not** reference `PRDs/CBM-Domain-PRD-Fundraising.md` (legacy) as authoritative. It is source material only.

## Process Being Defined

**FU-REPORT — Fundraising Reporting** (Enhancement tier per Master PRD Section 3.6)

From the FU Domain Overview:

> Producing fundraising analytics, board-level summaries, grant compliance reports, and annual donor giving summaries for internal and external stakeholders.

FU-REPORT is the **only Enhancement-tier** process in the Fundraising domain — valuable but may be deferred or delivered in a reduced form at Year 1 go-live. It is the asynchronous reporting process that reads from the records FU-PROSPECT, FU-RECORD, and FU-STEWARD produce, plus program-impact data from Mentoring-domain entities, and produces analytics and compliance reports for internal and external stakeholders.

FU-REPORT is read-only: it creates no fundraising records, transitions no statuses, and writes no Contact, Account, Contribution, Fundraising Campaign, or Mentoring-domain fields. Its outputs are reports — dashboards, lists, exports, formatted documents — not data on existing entities.

This process produces:

- Internal analytics for board and management review (campaign performance against goals, giving trends, lifetime value analysis, pipeline status, stewardship-activity overviews)
- External stakeholder reporting (grant-compliance reports combining fundraising data with Mentoring-domain program-impact data, annual donor giving summaries for tax purposes, sponsor recognition reports)
- Operational reporting consumed by FU-PROSPECT, FU-RECORD, and FU-STEWARD operators (pipeline views, sweep lists)

The handoff scope of FU-REPORT is unusual: it does not produce a discrete handoff event to any other process. Reports are consumed on demand by personas who can run them or who receive them on a schedule.

## Personas

| ID  | Persona | Role in This Process |
| --- | --- | --- |
| MST-PER-002 | Executive Member | Primary audience for board-level FU-REPORT output. Consumes campaign performance, giving trends, lifetime value, pipeline status, and grant-compliance reports as part of board oversight. Read-only. |
| MST-PER-010 | Donor / Sponsor Coordinator | Secondary audience and primary operator for ad-hoc reporting. Runs reports for internal use, generates exports for grant-compliance submissions, produces annual donor giving summaries. May produce reports at the request of MST-PER-002 or other CBM staff. |

External stakeholders (funders, donors, board members in their personal-donor capacity) consume FU-REPORT *output* — but they do not operate the process. Output delivery to external stakeholders is composed by the Coordinator outside the CRM (per FU-STEWARD's donor-specific impact reporting pattern) or generated as a formatted export.

## Entities Used (Read-Only)

| CRM Entity | Type | Entity PRD | Role in This Process |
| --- | --- | --- | --- |
| Contact | Native Person | v1.6 | Read. donorStatus, donorNotes, donorLifetimeGiving, lastContactDate, and standard identity fields are read for donor analytics. |
| Account | Native Company | v1.6 | Read. funderStatus, funderType, funderNotes, funderLifetimeGiving, lastContactDate, assignedSponsorCoordinator, and standard identity fields are read for funder analytics. |
| Contribution | Custom Base (FU-owned) | Pending Phase 5 | Read. contributionType, status, amount, all date fields, donor links, campaign link, acknowledgment fields, nextGrantDeadline, in-kind fields, and notes are read for contribution analytics, giving trends, and grant-compliance reporting. |
| Fundraising Campaign | Custom Base (FU-owned) | Pending Phase 5 | Read. campaignName, campaignType, status, goalAmount, totalRaised, startDate, endDate, and description are read for campaign-performance analytics. |
| Engagement (Mentoring) | Custom Base (MN-owned) | v1.2 | Read on a read-only basis to source program-impact data for grant-compliance and donor-impact reports. |
| Session (Mentoring) | Custom Event (MN-owned) | v1.1 | Read on a read-only basis to source session-hour data, attendee counts, topic coverage for program-impact reporting. |

## Open Questions Likely to Be Addressed During the Interview

These are anticipated topics for the interview. The structured discussion will surface decisions on each one.

1. **Reporting cadence and audience.** Are FU-REPORT outputs produced on a fixed schedule (monthly board packet, quarterly summary, annual donor letter cycle), on demand (Coordinator runs them when needed), or both? How are reports delivered to consumers — printed/PDF, accessed live in the CRM, exported and emailed?

2. **Internal analytics scope.** Specific reports the Executive Member needs for board oversight. Examples: campaign performance against goal, year-over-year giving trends, lifetime value distribution, pipeline status (counts by stage), at-risk relationship summary (Active records with stale lastContactDate), grant pipeline status, lapsed-donor analysis. Final list is for the interview.

3. **Grant-compliance reporting.** What does a grant-compliance report contain — fundraising data only, fundraising data plus program impact, formatted to funder template? Are funder-specific templates needed? How is program-impact data sourced from Mentoring-domain — pre-aggregated views, ad-hoc queries, fixed reports?

4. **Annual donor giving summaries.** Tax-purpose summaries sent to individual donors annually. Generation pattern — bulk-generate at year-end, on-demand per donor, or both? Format — letter, PDF, email body? Distribution — through the CRM, externally?

5. **Sponsor recognition reports.** Recognition obligations were captured in Contribution notes per FU-RECORD's design. Does FU-REPORT produce a sponsor-recognition report (list of sponsors plus their obligations) or is this purely Coordinator-facing during stewardship?

6. **Reporting against Lapsed and Closed records.** FU-PROSPECT and FU-STEWARD produce Lapsed and Closed records. FU-REPORT may want to surface these — pipeline-attrition reports, re-engagement-opportunity reports, lapse-cause distributions. Scope to be determined.

7. **Ad-hoc reporting capability.** Beyond defined reports, does the Coordinator need ad-hoc query/list capability over fundraising records — for example, "all Active funders in the Foundation funderType that have given over $10,000 lifetime" — and what is the appropriate user interface for that?

8. **Field-level visibility in reports.** Restricted-visibility fields (donorNotes, funderNotes, Contribution-record visibility) must respect persona-level access rules even within FU-REPORT output. How does the system enforce this — report-time filtering, separate report visibility per persona, or aggregate-only outputs?

9. **Interaction with the carry-forward.** The FU-RECORD acknowledgment-shared-ownership carry-forward is outstanding. FU-REPORT references the acknowledgment fields for analytics (acknowledgment-pending counts, acknowledgment-rate dashboards). Does the FU-REPORT design need to reflect the hybrid ownership model explicitly, or does it simply read the fields without caring which process wrote them?

## Prior Process Documents in This Domain

Three prior process documents exist in the Fundraising domain:

* **FU-PROSPECT v1.0** (`PRDs/FU/FU-PROSPECT.docx`) — establishes the seven-stage donor and funder lifecycle and the cultivation pipeline.
* **FU-RECORD v1.0** (`PRDs/FU/FU-RECORD.docx`) — establishes the Contribution and Fundraising Campaign entities and the Active activation transition.
* **FU-STEWARD v1.0** (`PRDs/FU/FU-STEWARD.docx`) — establishes the periodic-review stewardship process, the lastContactDate fields, and the Active → Lapsed transition.

FU-REPORT is the fourth and final process in the Fundraising domain. The interview guide's "State the Context from Prior Work" step should summarize all three predecessors as a complete domain context before the interview begins.

## Documents to Upload

Upload the following documents with the session prompt:

1. **CBM-Domain-Overview-Fundraising.docx** — FU Domain Overview v1.0.
2. **FU-PROSPECT.docx** — first-process document v1.0.
3. **FU-RECORD.docx** — second-process document v1.0 (or v1.1 if the carry-forward has executed).
4. **FU-STEWARD.docx** — third-process document v1.0.

The Master PRD, Entity Inventory, Contact Entity PRD v1.6, Account Entity PRD v1.6, Engagement Entity PRD v1.2, and Session Entity PRD v1.1 are not uploaded — the AI will read them directly from the repository after cloning, scoped to the fields relevant to FU-REPORT.

## Output

1. **Primary artifact.** The FU-REPORT process document as a Word (.docx) file, committed to `PRDs/FU/FU-REPORT.docx`. The document has all ten required sections per the Phase 4b interview guide.

2. **Secondary artifact (conditional).** If the interview discovers updates needed to FU-PROSPECT, FU-RECORD, FU-STEWARD, the FU Domain Overview, the Contact Entity PRD v1.6, or the Account Entity PRD v1.6, draft a carry-forward request per `guide-carry-forward-updates.md` and save at `PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-{slug}.md`. Field additions on Contact, Account, Contribution, or Fundraising Campaign that are surfaced during this session are recorded in the FU-REPORT document's Data Collected section and join the consolidated end-of-FU-Phase-4b carry-forward bundle.

## Output Standards Reminder

* The document must have a metadata table at the top (Version, Status, Last Updated in `MM-DD-YY HH:MM` format, Domain Code, Process Code, Process Category, Implementation Tier, Depends On) and a Change Log section at the end.
* The document is a business-language PRD. **No product names** anywhere in the document.
* **One topic at a time during the interview.** Doug responds to one question before the next is posed.
* Once a decision is approved, execute through planned steps without incremental check-ins until a new issue surfaces that requires a decision.
* After document production, state the next required step (the consolidated end-of-FU-Phase-4b carry-forward sessions to Contact Entity PRD v1.6 → v1.7 and Account Entity PRD v1.6 → v1.7) and ask for explicit confirmation before proceeding.

## After This Session

With FU-REPORT complete, the FU domain Phase 4b process definition work is finished. The next steps are:

1. **Execute outstanding carry-forwards.** The FU-RECORD acknowledgment-shared-ownership carry-forward (drafted at the end of FU-STEWARD), and any carry-forwards drafted during the FU-REPORT session, run as separate sessions per `guide-carry-forward-updates.md`.

2. **Consolidated end-of-FU-Phase-4b carry-forwards** to the cross-domain Entity PRDs:
   - **Contact Entity PRD v1.6 → v1.7:** add donorStatus (FU-PROSPECT-DAT-020), donorNotes (FU-PROSPECT-DAT-021), donorLifetimeGiving (FU-RECORD-DAT-018), lastContactDate (FU-STEWARD-DAT-017), plus any FU-REPORT-surfaced additions.
   - **Account Entity PRD v1.6 → v1.7:** add assignedSponsorCoordinator (FU-PROSPECT-DAT-027), lastContactDate (FU-STEWARD-DAT-020), plus any FU-REPORT-surfaced additions.

3. **Phase 5 Entity PRDs** for the FU-owned entities: Contribution Entity PRD and Fundraising Campaign Entity PRD, drafted from the field specifications established by FU-PROSPECT, FU-RECORD, FU-STEWARD, and FU-REPORT.

4. **Phase 7 Domain Reconciliation** for FU, producing the FU Domain PRD.
