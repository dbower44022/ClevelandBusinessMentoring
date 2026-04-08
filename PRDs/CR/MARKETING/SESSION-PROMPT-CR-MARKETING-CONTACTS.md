# Session Prompt: CR-MARKETING-CONTACTS Process Definition

## Context

I'm working on the CBM CRM implementation. The CR-MARKETING Sub-Domain Overview v1.0 is complete, establishing the marketing sub-domain's purpose, personas, two-process inventory, dependency ordering, prospect contact lifecycle model, Universal Contact-Creation Rules, marketing platform integration model, application source attribution model, and campaign tracking architecture.

This session produces the CR-MARKETING-CONTACTS process document — the first of two process documents in the CR-MARKETING sub-domain. Per the Document Production Process, process documents follow a structured interview producing a Word document with all required sections.

Before doing any work, please:

1. Read the CLAUDE.md in both the `dbower44022/crmbuilder` and `dbower44022/ClevelandBusinessMentoring` repos
2. Read the interview guide for process definition at `PRDs/process/interviews/interview-process-definition.md` in the crmbuilder repo
3. Read all documents uploaded with this prompt

## Process Being Defined

**CR-MARKETING-CONTACTS — Marketing Contact Management**

Covers creating and maintaining prospect and marketing contact records in the CRM, segmenting contact lists for targeted outreach, synchronizing lists to the external marketing platform, and tracking how contacts move through the prospect-to-applicant pipeline. Prospect contacts are maintained in the CRM as the single source of truth. The process is continuous — contacts are created, updated, and reclassified as they progress through the funnel or become inactive.

This process owns the operational rules for Contact creation across all CR-MARKETING pathways: web inquiry forms, marketing list imports, single-record additions, and any other inbound channel. It applies the Universal Contact-Creation Rules (Sub-Domain Overview Section 4.4) to ensure consistent Account linkage, contactType assignment, and lifecycle field initialization. It also owns the multi-contact-per-company detection logic that prevents duplicate outreach to the same firm.

## Personas

| ID | Persona | Role in This Process |
| --- | --- | --- |
| MST-PER-007 | Client Recruiter | Sole operator. Creates and maintains prospect contact records, imports marketing lists, manages segmentation, runs multi-contact-per-company detection reports, oversees the prospect-to-applicant pipeline, and performs ongoing data hygiene. |

No supporting personas participate in CR-MARKETING-CONTACTS as primary actors. The process operates entirely within the Client Recruiter's workflow.

## Entities Used

| CRM Entity | Type | Entity PRD | Role in This Process |
| --- | --- | --- | --- |
| Contact | Native Person | v1.2 → v1.3 | Creates and maintains prospect Contact records. New fields added by Sub-Domain Overview: prospectStatus, sourceAttributionDetails, emailOptOut, smsOptOut, plus four marketing engagement roll-up fields. The howDidYouHearAboutCbm enum value list is finalized (10 values). |
| Account | Native Company | v1.1 → v1.2 | Creates and links Client Accounts when prospect Contacts provide company information. New field added: clientStatus. The native website field is the basis for prospect-Contact-to-Account matching. |

## Key Decisions Inherited from Sub-Domain Overview

The Sub-Domain Overview locked in several decisions that this process document must respect — they are not open for re-litigation in this session, only for operationalization into specific system requirements:

- **Prospects ARE Contact records.** The CRM is the single source of truth for all contacts including marketing-stage prospects.
- **Two-field lifecycle model.** Contact.prospectStatus tracks the marketing-funnel state of an individual person. Account.clientStatus tracks the client-relationship state of a company. Both fields have TBD value lists pending CBM leadership input (CR-MARKETING-ISS-003 and CR-MARKETING-ISS-004 respectively).
- **Universal Contact-Creation Rules** apply to all Contact-creation pathways CRM-wide. This process document specifies the CR-MARKETING-side application of those rules.
- **Account creation is conditional on company information.** All input forms collect optional company name and website. If either is provided, an Account is created or linked via the precedence ladder (website → exact name → manual/new). If neither is provided, an Account-less Contact is created and that is a fully supported state.
- **Account matching uses the website field as the primary signal.** The native Account.website field is the basis for automatic matching.
- **Multi-contact-per-company detection runs at three points:** list import, segmentation, single-record creation.
- **MN-INTAKE handoff:** when a prospect Contact applies, the linked Account moves to clientStatus = Applicant (or a new Account is created), and Contact.prospectStatus moves to Converted.

## Key Questions to Address

1. **Prospect contact creation pathways.** What are the specific CR-MARKETING input pathways the Client Recruiter uses today and plans to use? Web inquiry forms, marketing list imports (CSV), single-record manual creation, partner-supplied lists, event registration spillover, others? Each pathway needs specific system requirements for how Contact creation works.

2. **Web inquiry form design.** What fields does the CRM-hosted web inquiry form collect beyond the universal "company name + website" fields? First name, last name, email, phone, zip code, source, interest area, or others? What fields are required vs. optional? Where does the form live, and how does it write to the CRM?

3. **Marketing list import workflow.** What does a CSV import look like operationally? File upload, field mapping, contactType selection (per-import or per-row), preview of new vs. existing records, Account matching results, conflict resolution for ambiguous cases, completion confirmation? What error conditions need to be handled?

4. **Multi-contact-per-company detection at import time.** When the import surfaces ambiguous matches, what does the Client Recruiter see? How are matches confirmed or rejected? What happens with rows that have neither company name nor website?

5. **Multi-contact-per-company detection via reports.** What standing reports or saved searches does the Client Recruiter need to spot multi-contact-per-company situations between imports? "Accounts with multiple prospect Contacts," "prospect Contacts at Active Client Accounts," etc.?

6. **prospectStatus value list and transition rules.** While the values themselves are TBD pending CBM leadership, this process document needs to specify which Client Recruiter actions trigger which transitions (assuming the straw man values: New Prospect, Engaged, Unresponsive, Converted, Opted Out). When does a contact move from New Prospect to Engaged? Who decides Unresponsive? Is the transition automatic or manual?

7. **Data hygiene requirements.** What ongoing maintenance does the Client Recruiter perform on prospect contact records? Deduplication, stale-prospect cleanup, opt-out reconciliation, address corrections, company affiliation updates?

8. **Sync preparation.** What does the Client Recruiter do before triggering an on-demand sync to the marketing platform? Are there pre-sync validation checks the system should run?

9. **Segmentation tooling.** What does building a segment look like in practice? Saved searches, list builder, tags? How are segments named, stored, and re-used?

10. **Reporting needs.** Beyond multi-contact-per-company, what prospect pipeline reports does the Client Recruiter need? Pipeline counts by prospectStatus, source attribution rollups, geographic distribution, conversion rate from prospect to applicant?

## Items Deferred From This Session

The following items were raised during the Sub-Domain Overview session but deferred to stakeholder input. They should be acknowledged in the process document but not pinned down here without resolution:

- **CR-MARKETING-ISS-001 (Geographic targeting model).** Geographic segmentation requirements depend on whether CBM adopts a county-only model, a Service Area entity model, or something else. Until resolved, this process document should describe geographic segmentation in terms of the existing native city/state/zip fields and note that more granular targeting depends on ISS-001 resolution.
- **CR-MARKETING-ISS-003 (prospectStatus values).** The straw man can guide requirements, but the actual values need leadership input.
- **CR-MARKETING-ISS-004 (clientStatus values).** Same situation.

## Prior Process Documents

This is the first process document in the CR-MARKETING sub-domain. No prior CR-MARKETING process documents exist.

CR-PARTNER process documents (CR-PARTNER-PROSPECT v1.0 and CR-PARTNER-MANAGE v1.0) are complete in the parent CR domain. They are not direct upstream dependencies for CR-MARKETING-CONTACTS, but they should be available for reference if cross-sub-domain coordination questions arise.

## Documents to Upload

Upload the following documents with this prompt:

1. **CBM-SubDomain-Overview-Marketing.docx** — the CR-MARKETING Sub-Domain Overview (from `PRDs/CR/MARKETING/` in CBM repo) — primary input
2. **Contact-Entity-PRD.docx** — the Contact Entity PRD (from `PRDs/entities/` in CBM repo) — for native field reference and existing field definitions
3. **Account-Entity-PRD.docx** — the Account Entity PRD (from `PRDs/entities/` in CBM repo) — for native field reference and existing field definitions

Note: The Sub-Domain Overview is the primary input. The parent CR Domain Overview and Master PRD are not uploaded — content relevant to CR-MARKETING-CONTACTS has been incorporated into the Sub-Domain Overview.

## Output

Produce the CR-MARKETING-CONTACTS process document as a Word document and commit to:
`PRDs/CR/MARKETING/CR-MARKETING-CONTACTS.docx`

## After This Session

With CR-MARKETING-CONTACTS complete:

* The next process to define is CR-MARKETING-CAMPAIGNS
* For that conversation, upload the Sub-Domain Overview plus the CR-MARKETING-CONTACTS process document we just completed
* CR-MARKETING-CAMPAIGNS operates on the prospect contact lists, segmentation patterns, and lifecycle field handling established here — the requirements defined in this document are prerequisites
* The carry-forward updates to upstream documents identified by the Sub-Domain Overview (Contact Entity PRD v1.3, Account Entity PRD v1.2, Master PRD v2.4, MN-INTAKE v2.3, CR Domain Overview v1.1, Entity Inventory v1.3) should be applied either before or after this process session, but should be complete before CR-MARKETING-CAMPAIGNS begins
