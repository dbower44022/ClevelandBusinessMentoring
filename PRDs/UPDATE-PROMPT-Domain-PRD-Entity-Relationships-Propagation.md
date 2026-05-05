# Update Prompt: Propagate Entity Relationships Sub-Section to MR, CR, and FU Domain PRDs

## Context

I'm working on the CBM CRM implementation. CBM-Domain-PRD-Mentoring v1.1 (commit `60f009b`, 05-05-26) introduced a new structural convention: open Section 4 of every Domain PRD with a consolidated "Entity Relationships" sub-section, parallel to the per-entity Relationships sub-sections in the Entity PRDs. The Phase 7 Domain Reconciliation Guide is being updated separately from v1.5 to v1.6 (companion prompt `UPDATE-PROMPT-Domain-Reconciliation-Guide-Entity-Relationships.md` in the `dbower44022/crmbuilder` repo) to specify the convention as a required Section 4 sub-section going forward.

This prompt propagates the same convention into the three existing Domain PRDs that predate v1.6 of the methodology guide:
- MR Domain PRD v1.1 → v1.2 (`PRDs/MR/CBM-Domain-PRD-MentorRecruitment.docx`)
- CR Domain PRD v1.2 → v1.3 (`PRDs/CR/CBM-Domain-PRD-ClientRecruiting.docx`) — currently Phase 8 Approved
- FU Domain PRD v1.0 → v1.1 (`PRDs/FU/CBM-Domain-PRD-Fundraising.docx`) — currently Phase 8 Approved

The propagation is structural-only: it adds a new sub-section to Section 4 of each Domain PRD without changing any existing field tables, requirements, decisions, open issues, or workflow descriptions. The information being surfaced (relationships) already exists in the Entity PRDs and in the relationship-typed fields scattered across each Domain PRD's existing Section 4 — the new sub-section consolidates that information into one place.

Before doing any work, please:
1. Read the CLAUDE.md in the `dbower44022/crmbuilder` repo
2. Read the CLAUDE.md in this repo (`dbower44022/ClevelandBusinessMentoring`)
3. Read the precedent: CBM-Domain-PRD-Mentoring v1.1 Section 4 (commit `60f009b`) — note the table structure, the three explanatory notes, and the placement at the very start of Section 4
4. Confirm `guide-domain-reconciliation.md` v1.6 has been merged to `dbower44022/crmbuilder` (it specifies the formal requirement). If it hasn't, stop and ask whether to proceed against the unwritten v1.6 spec or wait.

## Important: Phase 8 Approved Documents

CR Domain PRD v1.2 and FU Domain PRD v1.0 are currently in "Approved — Phase 8 Stakeholder Review complete" state. This propagation adds a structural sub-section that consolidates information already present elsewhere in each PRD; no requirements, decisions, or workflow content changes. By precedent, structural additions of this nature do not require re-review (consistent with how mid-cycle field additions to Approved Domain PRDs have been handled — e.g., the geographicServiceArea restructure on 04-30-26 that touched CR Domain PRD v1.1 → v1.2 without requiring re-review).

That said, the Status field on CR Domain PRD v1.3 and FU Domain PRD v1.1 should be carefully framed in the Change Log entry for each to note that this is a structural propagation rather than a content revision. Use the language pattern: "Status: Approved — Phase 8 Stakeholder Review complete (05-01-26); structural sub-section addition v1.X (DD-DD-DD) does not require re-review."

If you (the executor) are unsure whether this convention applies cleanly to either Approved PRD, stop and ask before proceeding.

## The Three Updates (sequenced as separate commits)

Each Domain PRD gets its own commit. Process them in order: MR first, CR second, FU third. This way each commit is reviewable in isolation and revert-able independently if needed.

### Update 1 — MR Domain PRD v1.1 → v1.2

File: `PRDs/MR/CBM-Domain-PRD-MentorRecruitment.docx`

**Source Entity PRDs to extract MR-domain relationships from:**
- Contact Entity PRD v1.7 (Section 4, filtered to Mentor-context relationships)
- Account Entity PRD v1.8 (Section 4, filtered to Mentor-context — Account is not heavily used in MR but appears for prospective Mentor employer references if present)
- Dues Entity PRD v1.1 (Section 4 — Dues → Contact relationship)

**MR domain relationship inventory** (executor should verify against actual Entity PRDs and the MR-* YAML files at `programs/MR/MR-Contact.yaml`, `programs/MR/MR-Dues.yaml`):
- Contact (Mentor) ↔ Account (manyToMany, native — same native relationship as in MN, but largely unused in MR; include if any MR process references the link, otherwise omit)
- Dues → Contact (manyToOne, declared in MR-Dues.yaml — payer link)
- Any Contact → Contact relationship for sponsoring mentor / referral mentor (verify in MR-Contact.yaml)
- Any other relationships introduced by the MR-Y9 work — check current YAMLs

**Insertion location:** at the very start of Section 4, before any per-entity field tables. If Section 4 has an introductory paragraph, the new sub-section goes after the paragraph.

**Sub-section structure:** title "Entity Relationships", followed by a single consolidated table with columns Relationship | Related Entity | Link Type | YAML Location | Domain(s); followed by 1–3 short explanatory notes covering native relationships and any cross-domain-contributed relationships.

**Header / Revision Control:**
- Version: `1.1` → `1.2`
- Last Updated: current session timestamp (`MM-DD-YY HH:MM`)
- Status: continues from v1.1's status (typically Draft or whatever it currently shows; do not change unless re-review status is also being updated)

**Change Log:** append a v1.2 entry. Reference: "Section 4 propagation per methodology guide v1.6 (Domain PRD Entity Relationships sub-section convention). Source precedent: MN Domain PRD v1.1 (05-05-26)."

**Decisions Made:** append one entry — `MR-DEC-NN — Entity Relationships sub-section added to Section 4 per methodology guide v1.6.`

**Commit:** `docs(MR): Domain PRD v1.2 — add Entity Relationships sub-section to Section 4 (methodology guide v1.6 propagation)`

### Update 2 — CR Domain PRD v1.2 → v1.3

File: `PRDs/CR/CBM-Domain-PRD-ClientRecruiting.docx`

**Source Entity PRDs to extract CR-domain relationships from:**
- Contact Entity PRD v1.7 (Section 4, filtered to CR-MARKETING and CR-PARTNER and CR-EVENTS contexts)
- Account Entity PRD v1.8 (Section 4, filtered to Partner and Donor/Sponsor contexts where CR-relevant)
- Event Entity PRD v1.0 (Section 4)
- Event Registration Entity PRD v1.0 (Section 4)
- Partnership Agreement Entity PRD v1.0 (Section 4)
- Marketing Campaign Entity PRD v1.0 (Section 4)
- Campaign Group Entity PRD v1.0 (Section 4)
- Campaign Engagement Entity PRD v1.0 (Section 4)
- Segment Entity PRD v1.0 (Section 4)

**CR domain is sub-domain-structured** (CR-PARTNER, CR-MARKETING, CR-EVENTS, CR-REACTIVATE). Decide during execution whether the consolidated table is one single table covering all CR sub-domains, or four sub-tables organized by sub-domain. Recommendation: **one consolidated table** (matching the MN precedent), with the Domain(s) column carrying sub-domain codes (e.g., `CR-PARTNER`, `CR-MARKETING`, `CR-EVENTS`, `CR-REACTIVATE`) to disambiguate. This avoids cross-table references for relationships that span sub-domains (e.g., Contact ↔ Account is shared across all four CR sub-domains).

If the executor finds the single-table approach unwieldy due to row count, ask the user before splitting into sub-tables. The MN precedent had 12 rows; CR is likely larger but should still be single-table-manageable (~20–30 rows).

**Insertion location:** at the very start of Section 4, before any per-entity field tables.

**Sub-section structure:** same as MR — title "Entity Relationships", consolidated table, 2–4 explanatory notes covering native relationships, native parent links, and cross-domain-contributed relationships (e.g., Engagement → Account Referring Partner is declared in MN-Engagement.yaml but is part of the CR-PARTNER attribution model — this relationship should appear in the CR Domain PRD's table marked `Domain(s): CR-PARTNER (declared on MN entity)`).

**Header / Revision Control:**
- Version: `1.2` → `1.3`
- Last Updated: current session timestamp
- Status: keep "Approved — Phase 8 Stakeholder Review complete (05-01-26)"; do not append a new approval row, but do note in the Change Log that v1.3 is a structural sub-section addition not requiring re-review.

**Change Log:** append a v1.3 entry. Reference: "Structural Section 4 sub-section addition per methodology guide v1.6. Source precedent: MN Domain PRD v1.1 (05-05-26). Does not require re-review per [the Approved-document handling pattern]."

**Decisions Made:** append one entry — `CR-DEC-NN — Entity Relationships sub-section added to Section 4 per methodology guide v1.6.`

**Commit:** `docs(CR): Domain PRD v1.3 — add Entity Relationships sub-section to Section 4 (methodology guide v1.6 propagation)`

### Update 3 — FU Domain PRD v1.0 → v1.1

File: `PRDs/FU/CBM-Domain-PRD-Fundraising.docx`

**Source Entity PRDs to extract FU-domain relationships from:**
- Contact Entity PRD v1.7 (Section 4, filtered to Donor context — Section 3.8 Donor-Specific Fields-related links)
- Account Entity PRD v1.8 (Section 4, filtered to Donor/Sponsor and Funder context)
- Contribution Entity PRD v1.0 (Section 4)
- Fundraising Campaign Entity PRD v1.0 (Section 4)
- Engagement Entity PRD v1.3 (Section 4 — read-only consumption for territory attribution per FU-REPORT)
- Session Entity PRD v1.1 (Section 4 — read-only consumption for territory attribution per FU-REPORT)

**FU domain has cross-domain reads to MN entities** (Engagement and Session for the Mentoring Service Delivery by Funding Territory report per FU-REPORT v1.1). These cross-domain consumption relationships should be included in the FU Domain PRD's table with `Domain(s)` notation that captures the reader/consumer relationship — e.g., `FU (read-only from MN)`. The MN-domain entity ownership stays with MN; FU only reads.

**Special handling for the Active Donors and Funders Sweep List union view:** the cross-entity union (Contact + Account) used for FU-MC-UV-001 is implemented as a saved-view post-deployment, not a YAML relationship. It does NOT belong in the Entity Relationships table. If this question arises during execution, default to: only YAML-declarable relationships (or native platform relationships) appear in the table; saved-view aggregations belong in MANUAL-CONFIG, not in Section 4.

**Insertion location:** at the very start of Section 4, before any per-entity field tables.

**Sub-section structure:** same as MR and CR. Three explanatory notes likely needed: native relationships, native parent links, and the cross-domain read-only consumption from MN.

**Header / Revision Control:**
- Version: `1.0` → `1.1`
- Last Updated: current session timestamp
- Status: keep "Approved — Phase 8 Stakeholder Review complete (05-01-26)"; do not append a new approval row, but do note in the Change Log that v1.1 is a structural sub-section addition not requiring re-review.

**Change Log:** append a v1.1 entry. Reference: "Structural Section 4 sub-section addition per methodology guide v1.6. Source precedent: MN Domain PRD v1.1 (05-05-26). Does not require re-review per [the Approved-document handling pattern]."

**Decisions Made:** append one entry — `FU-DEC-NN — Entity Relationships sub-section added to Section 4 per methodology guide v1.6.`

**Commit:** `docs(FU): Domain PRD v1.1 — add Entity Relationships sub-section to Section 4 (methodology guide v1.6 propagation)`

## What NOT to Change

- Do not modify any per-entity field table in any of the three Domain PRDs. The new Entity Relationships sub-section opens Section 4 and the existing field tables continue unchanged after it.
- Do not add new requirements, fields, decisions, or open issues beyond the single Decisions Made entry per Domain PRD.
- Do not modify any process documents, Entity PRDs, YAML files, MANUAL-CONFIG.md files, or any other documents.
- Do not change any Status field beyond what is specified in the Header / Revision Control section above.
- Do not introduce inconsistencies between the three Domain PRDs' tables — use consistent column headers, link-type vocabulary, YAML location formatting, and Domain(s) notation across all three.
- Do not reference specific product names (EspoCRM, etc.) in any Domain PRD body content per Level 2 PRD output standards.

## Documents to Upload

Upload the following with this prompt:
1. `PRDs/MR/CBM-Domain-PRD-MentorRecruitment.docx` (current v1.1)
2. `PRDs/CR/CBM-Domain-PRD-ClientRecruiting.docx` (current v1.2 Approved)
3. `PRDs/FU/CBM-Domain-PRD-Fundraising.docx` (current v1.0 Approved)
4. `PRDs/entities/Contact-Entity-PRD.docx` (v1.7)
5. `PRDs/entities/Account-Entity-PRD.docx` (v1.8)
6. `PRDs/entities/Dues-Entity-PRD.docx` (v1.1)
7. `PRDs/entities/Event-Entity-PRD.docx` (v1.0)
8. `PRDs/entities/EventRegistration-Entity-PRD.docx` (v1.0)
9. `PRDs/entities/PartnershipAgreement-Entity-PRD.docx` (v1.0)
10. `PRDs/entities/MarketingCampaign-Entity-PRD.docx` (v1.0)
11. `PRDs/entities/CampaignGroup-Entity-PRD.docx` (v1.0)
12. `PRDs/entities/CampaignEngagement-Entity-PRD.docx` (v1.0)
13. `PRDs/entities/Segment-Entity-PRD.docx` (v1.0)
14. `PRDs/entities/Contribution-Entity-PRD.docx` (v1.0)
15. `PRDs/entities/Fundraising-Campaign-Entity-PRD.docx` (v1.0)
16. `PRDs/entities/Engagement-Entity-PRD.docx` (v1.3 — for FU's read-only consumption rows)
17. `PRDs/entities/Session-Entity-PRD.docx` (v1.1 — for FU's read-only consumption rows)
18. `PRDs/MN/CBM-Domain-PRD-Mentoring.docx` (v1.1 — as the precedent for the table structure)

For YAML location strings, the executor should reference the YAML files in `programs/MN/`, `programs/MR/`, `programs/CR/`, and `programs/FU/` of this repo as needed. The MR YAMLs (MR-Contact.yaml, MR-Dues.yaml) and FU YAMLs (FU-Contact.yaml, FU-Account.yaml, FU-Contribution.yaml, FU-FundraisingCampaign.yaml) are deployed and current. The MN YAMLs are also current. The CR YAMLs are partially complete — only CR-Account.yaml has been deployed; the remaining 8 CR YAMLs are deferred per the 05-04-26 deployment validation pass. For CR relationships where the YAML does not yet exist, the YAML location column should read `to be declared in {expected file}.yaml` matching the methodology guide v1.6 forward-reference convention.

## Output

Produce three updated Domain PRD files and commit them as three separate commits to the CBM repo. Each commit should follow the title pattern listed in its Update section above. Each Domain PRD's commit body should list the row count of its Entity Relationships table, the explanatory notes added, and any noteworthy executor decisions about scope or sub-table structure.

After all three commits are pushed, state that the methodology-guide propagation across MR, CR, and FU Domain PRDs is complete. Provide a brief consolidated summary of all three updates for review, including the row counts of each Entity Relationships table.

## Sequencing Note

If the session runs long and only some of the three updates can be completed, commit each completed update individually and then stop with a clear continuation prompt for the remaining updates. Per the user's working style, the next session should be able to resume from the last committed update without re-litigating decisions.
