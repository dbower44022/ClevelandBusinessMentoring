# Session Prompt: Execute Carry-Forward — FU-RECORD Acknowledgment Shared Ownership

## Context

I am working on the CBM CRM implementation. The Fundraising (FU) Domain Phase 4b process definition work has produced three of four process documents: FU-PROSPECT v1.0 (committed 04-22-26), FU-RECORD v1.0 (committed 04-29-26), and FU-STEWARD v1.0 (committed 04-29-26). During the FU-STEWARD interview on 04-29-26, the **hybrid acknowledgment ownership model** was surfaced — FU-RECORD owns primary acknowledgment writes at the moment of Contribution creation; FU-STEWARD owns catch-up acknowledgment writes during the sweep. FU-RECORD v1.0 currently frames acknowledgment generation as "addressed by FU-STEWARD where relevant", which understates FU-RECORD's primary role. This session reconciles that.

This session is a **carry-forward execution session**, not a process definition session. It applies a pre-drafted set of edits to FU-RECORD.docx, advancing it from v1.0 to v1.1. The Gate 1 decision is already drafted in the carry-forward request file with full before/after text inline; this session executes Gate 1 approval and Gate 2 execution per `crmbuilder/PRDs/process/interviews/guide-carry-forward-updates.md` v1.1.

The carry-forward affects exactly one document: `PRDs/FU/FU-RECORD.docx`. No other documents are touched. After this session, FU-RECORD is at v1.1 and the FU-REPORT process definition session can proceed against the cleaner upstream document.

## Before Doing Any Work

1. Clone both repositories using the standard sparse-checkout pattern with PAT-authenticated URLs (PATs are stored in Claude's memory):
   - `dbower44022/crmbuilder` — sparse-checkout `PRDs` and `CLAUDE.md`.
   - `dbower44022/ClevelandBusinessMentoring` — sparse-checkout `PRDs` and `CLAUDE.md`.
2. Set git identity for the CBM clone before any work that may end in a commit:
   - `git config user.email "dbower@clevelandbusinessmentoring.org"`
   - `git config user.name "Doug Bower"`
3. Read both CLAUDE.md files. Confirm with Doug which CLAUDE.md to read first per his working-style preference. Pay particular attention to the "Latest structural change (04-29-26): FU-STEWARD" entry in the CBM CLAUDE.md — that entry references this carry-forward as outstanding.
4. Read `PRDs/process/interviews/guide-carry-forward-updates.md` v1.1 in the crmbuilder repo. This is the authoritative procedural guide for the session. The two-gate model (Gate 1 — Decision Approval; Gate 2 — Execute and Report) governs the entire flow.
5. Read the carry-forward request file at `PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-fu-record-acknowledgment-shared-ownership.md` in the CBM repo. This file contains the complete Gate 1 content — decision summary, full before/after text for all four edits, source citation, propagation table, and mechanical-edits notice.
6. Read `PRDs/FU/FU-RECORD.docx` v1.0. **Verify the version assertion:** the metadata table at the top must show Version = 1.0. If the version is anything else, stop and ask Doug for guidance — another instance may have already executed this carry-forward.
7. Read `PRDs/FU/FU-STEWARD.docx` v1.0 — specifically Section 6 (FU-STEWARD-REQ-004), Section 9 (EI-ISS-001 disposition note), and Section 10.7 (Interview Transcript: Acknowledgment Communications and the Hybrid Ownership Model). This is the upstream source authorizing the carry-forward.

## Carry-Forward Being Executed

**Decision summary:** Update FU-RECORD v1.0 → v1.1 to reflect the hybrid acknowledgment ownership model — FU-RECORD owns primary acknowledgment writes at Contribution creation; FU-STEWARD owns catch-up acknowledgment writes during the sweep. The two acknowledgment fields (`acknowledgmentSent`, `acknowledgmentDate`) are jointly owned write fields.

**Source:** FU-STEWARD process definition interview, 04-29-26, documented in `PRDs/FU/FU-STEWARD.docx` v1.0 Section 10.7 (Interview Transcript) and Section 9 (Open Issues, EI-ISS-001 disposition note).

**Documents affected:** Exactly one — `PRDs/FU/FU-RECORD.docx` v1.0 → v1.1.

**Edits to apply** (full before/after text is in the carry-forward request file; the AI does not need to re-derive the text):

| # | Section | What changes |
|---|---|---|
| 1 | Section 1, last paragraph | Rewritten to introduce the hybrid acknowledgment ownership model, distinguishing FU-RECORD as primary write path from FU-STEWARD as catch-up write path. |
| 2 | Section 4.1, step 6 ("Acknowledgment generation") | Rewritten to identify it as the primary write path and to reference the FU-STEWARD catch-up write path for missed acknowledgments. |
| 3 | Section 6, FU-RECORD-REQ-015 | Rewritten to describe joint ownership of the acknowledgment fields and to reference FU-STEWARD-REQ-004. |
| 4 | Section 9, EI-ISS-001 disposition closing sentences | Rewritten to replace the original "out of scope" framing with the hybrid ownership pattern. |

**Mechanical edits (applied automatically, no separate approval):**
- Version bump on FU-RECORD.docx from v1.0 to v1.1
- Last Updated timestamp updated to today's date and time in `MM-DD-YY HH:MM` format
- Change Log entry added describing the hybrid acknowledgment ownership update and citing FU-STEWARD v1.0 as the source
- Depends On line refreshed if any upstream-document version references need updating

## Session Flow

This session runs the two-gate process from `guide-carry-forward-updates.md` v1.1.

### Gate 1 — Decision Approval

After the pre-session reading is complete and the FU-RECORD v1.0 version assertion has passed, present the Gate 1 content from the carry-forward request file as a single decision-approval prompt. The five required elements are already in the carry-forward request file:

1. Decision summary
2. Before / After content (inline text for all four edits)
3. Source citation
4. Propagation table (single row — FU-RECORD v1.0 → v1.1)
5. Mechanical edits notice

End the Gate 1 message with the standard "Approve propagation?" question. **Do not begin editing until Doug approves Gate 1.**

If Doug declines, stop the session. If Doug approves, proceed to Gate 2.

### Gate 2 — Execute and Report

After Gate 1 approval, perform all edits in one pass. **Do not ask further questions during execution** per the carry-forward guide.

The recommended execution approach for FU-RECORD.docx (a docx file with significant content):

1. Unpack the docx using `python3 /mnt/skills/public/docx/scripts/office/unpack.py` to a working directory.
2. Apply the four content edits to `word/document.xml` using string replacement on the relevant paragraphs. The before/after text in the carry-forward request file is the literal source; copy it verbatim.
3. Apply the mechanical edits — locate the Version cell in the metadata table and change "1.0" to "1.1" (use surrounding XML context to disambiguate from other "1.0" occurrences); locate the Last Updated cell and replace the timestamp with today's `MM-DD-YY HH:MM`; add a Change Log row at the top of the Change Log table (after the header row) describing the v1.1 edits.
4. Repack using `python3 /mnt/skills/public/docx/scripts/office/pack.py` with `--original` set to the v1.0 source.
5. Validate using `python3 /mnt/skills/public/docx/scripts/office/validate.py`.
6. Convert to markdown via pandoc as a final sanity check that all four edits rendered correctly.
7. Copy the result to `/mnt/user-data/outputs/FU-RECORD.docx` and overwrite `PRDs/FU/FU-RECORD.docx` in the local clone.
8. Update the CBM `CLAUDE.md`:
   - Update the Process status paragraph to indicate FU-RECORD is now at v1.1 and the carry-forward is complete.
   - Add a "Latest structural change" entry for the v1.1 update (carry-forward execution), demoting the existing FU-STEWARD entry to "Prior structural change."
9. Commit and push:
   - `git add PRDs/FU/FU-RECORD.docx CLAUDE.md`
   - `git commit -m "FU-RECORD v1.1 — hybrid acknowledgment ownership carry-forward"`
   - `git push` (use `git pull --rebase` first if remote has diverged)
10. Present the updated FU-RECORD.docx via the present_files tool with the path in `/mnt/user-data/outputs/`.

After execution, report back with the Change Summary specified by Gate 2:

> **Carry-forward complete:** Hybrid acknowledgment ownership added to FU-RECORD.
>
> | Document | Version | Edits Applied |
> |---|---|---|
> | FU-RECORD.docx | v1.0 → v1.1 | Section 1 last paragraph rewritten; Section 4.1 step 6 rewritten; Section 6 FU-RECORD-REQ-015 rewritten; Section 9 EI-ISS-001 disposition closing rewritten; mechanical bumps applied (version, timestamp, change log). |
>
> **Files written:**
> - PRDs/FU/FU-RECORD.docx (v1.1)
> - CLAUDE.md (process status updated)
>
> **Deferred items:** [list anything that required judgment during execution] / [If none:] No deferred items.

## Output

1. **Primary artifact.** `PRDs/FU/FU-RECORD.docx` v1.1 with the four content edits applied and mechanical edits applied.
2. **Updated CBM CLAUDE.md** reflecting the v1.1 state.
3. **Git commit pushed to `main`** with a clear commit message identifying the carry-forward.
4. **Change Summary message** to Doug per the Gate 2 template.

No new documents are produced. No other documents are touched. The FU-STEWARD document, the FU Domain Overview, FU-PROSPECT, the Contact Entity PRD, the Account Entity PRD, the Master PRD, and the Entity Inventory are all untouched by this carry-forward.

## Output Standards Reminder

- The Last Updated timestamp on FU-RECORD.docx must use the `MM-DD-YY HH:MM` format (e.g., `04-29-26 21:45`).
- No product names anywhere — FU-RECORD v1.1, like v1.0, is a business-language PRD.
- The Change Log table at the end of FU-RECORD must have a new row at the top of the data area describing the v1.1 edits and citing FU-STEWARD v1.0 as the source.
- The before/after text in the carry-forward request file is the literal source for the four content edits. Do not paraphrase, abbreviate, or restructure the after-text. Apply it verbatim.

## After This Session

With FU-RECORD at v1.1, the next required step is the **FU-REPORT process definition session** — the fourth and final process in the Fundraising domain. The session prompt is committed at `PRDs/FU/SESSION-PROMPT-FU-REPORT.md` and is ready for use.

After FU-REPORT is complete, the FU domain Phase 4b process definition work is finished, and the consolidated end-of-FU-Phase-4b carry-forwards to the cross-domain Entity PRDs follow:
- Contact Entity PRD v1.6 → v1.7: add `donorStatus`, `donorNotes`, `donorLifetimeGiving`, `lastContactDate`, plus any FU-REPORT-surfaced additions.
- Account Entity PRD v1.6 → v1.7: add `assignedSponsorCoordinator`, `lastContactDate`, plus any FU-REPORT-surfaced additions.
