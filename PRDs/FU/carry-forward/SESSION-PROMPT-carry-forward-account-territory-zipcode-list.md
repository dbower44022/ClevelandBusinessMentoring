# Carry-Forward Request: Restructure geographicServiceArea as a Structured Zip Code List

**Source session:** FU-REPORT process definition interview, 04-30-26
**Drafted by:** AI interviewer, per `crmbuilder/PRDs/process/interviews/guide-carry-forward-updates.md` v1.1
**Output location:** `PRDs/FU/carry-forward/SESSION-PROMPT-carry-forward-account-territory-zipcode-list.md`

---

## Gate 1 — Decision Approval

**Carry-forward request:** Restructure the `geographicServiceArea` field on Account from a single free-text value to a structured multi-value list of zip codes, expand its visibility from Partner-only to both Partner and Donor/Sponsor account types, and add the same field to the Fundraising Campaign entity. The field becomes the structural foundation for territory-based attribution: Partner service areas, Funder organization service territories, and Campaign-specific funded territories are all expressed as zip code lists, queryable for set-membership against client zip codes (Contact `addressPostalCode`). Closes ACT-ISS-004.

**What's changing:**

---

*Before* (Account Entity PRD v1.6 Section 3.3 "Service Area and Population", `geographicServiceArea` field row):

> **geographicServiceArea** — type `text`, Required: No, Values: ---
>
> The geographic territory or community the partner primarily serves — for example, City of Cleveland, Cuyahoga County, Greater Akron. **Domains:** CR. **Implementation:** Format (free text vs. controlled list) is an open issue — see ACT-ISS-004.

*After* (Account Entity PRD v1.7 Section 3.3 "Service Area and Population", `geographicServiceArea` field row):

> **geographicServiceArea** — type `multiEnum` (master list: Northeast Ohio zip codes, master list to be confirmed during implementation), Required: No, Values: zip codes drawn from the master list
>
> The geographic territory the organization primarily serves or funds, expressed as a list of zip codes. Used by Partner organizations to record their service area and by Donor/Sponsor organizations to record their funding territory for territory-based attribution reporting. **Domains:** CR, FU. **Visibility:** accountType has Partner OR accountType has Donor/Sponsor. **Implementation:** zip code values are queryable for set-membership against Contact `addressPostalCode` to support territory-based attribution. The Northeast Ohio zip code master list is defined during implementation.

---

*Before* (Account Entity PRD v1.6 Section 5.3 "Donor/Sponsor (accountType has Donor/Sponsor)" dynamic logic):

> **Show all fields in Section 3.4:** funderType, funderStatus, funderLifetimeGiving, funderNotes

*After* (Account Entity PRD v1.7 Section 5.3 "Donor/Sponsor (accountType has Donor/Sponsor)" dynamic logic):

> **Show all fields in Section 3.4:** funderType, funderStatus, funderLifetimeGiving, funderNotes
>
> **Also show from Section 3.3 Service Area and Population sub-grouping:** geographicServiceArea

---

*Before* (Account Entity PRD v1.6 Section 6 "Layout Guidance", Donor/Sponsor Profile Panel):

> **Donor/Sponsor Profile Panel (accountType has Donor/Sponsor)**
>
> funderType, funderStatus, funderLifetimeGiving, funderNotes.

*After* (Account Entity PRD v1.7 Section 6 "Layout Guidance", Donor/Sponsor Profile Panel):

> **Donor/Sponsor Profile Panel (accountType has Donor/Sponsor)**
>
> funderType, funderStatus, funderLifetimeGiving, funderNotes, geographicServiceArea.

---

*Before* (Account Entity PRD v1.6 Section 8 Open Issues, ACT-ISS-004):

> **ACT-ISS-004** — Geographic Service Area field format: free text vs. controlled list of Northeast Ohio geographies has not been decided. Carried forward from CR-ISS-002. Superseded in scope by CR-MARKETING-ISS-001 (geographic targeting model deferred to stakeholder input). The two issues will be resolved jointly when stakeholder input on partner count, sub-county prevalence, master list maintenance, and required precision is available.

*After* (Account Entity PRD v1.7 Section 8 Open Issues, ACT-ISS-004):

> **ACT-ISS-004 — CLOSED** by FU-REPORT process definition session, 04-30-26. The field is restructured from free text to a structured multi-value zip code list, used for both Partner service areas and Donor/Sponsor funding territories. Master list of Northeast Ohio zip codes to be defined during implementation. CR-MARKETING-ISS-001 remains open in CR-MARKETING scope to the extent it covers questions beyond field format (campaign targeting model, master list maintenance ownership).

---

*Before* (CR-PARTNER-MANAGE.docx v1.0 Section 8 supporting data, CR-PARTNER-MANAGE-DAT-032):

> **geographicServiceArea** — type `text`, Required: No, Values: ---
>
> Geographic territory the partner serves. May be filled in or refined during management if not fully captured during prospecting. Format is open per ACT-ISS-004.

*After* (CR-PARTNER-MANAGE.docx v1.1 Section 8 supporting data, CR-PARTNER-MANAGE-DAT-032):

> **geographicServiceArea** — type `multiEnum` (Northeast Ohio zip code master list), Required: No, Values: zip codes drawn from the master list
>
> Geographic territory the partner serves, expressed as a list of zip codes. May be filled in or refined during management if not fully captured during prospecting. Format resolved by ACT-ISS-004 closure: structured zip code list.

---

*Before* (CR-PARTNER-MANAGE.docx v1.0 Section 9 Open Issues, ACT-ISS-004):

> **ACT-ISS-004** — Geographic Service Area field format (free text vs. controlled list) not yet decided by CBM leadership. Carried forward from Account Entity PRD. Relevant because the Partner Coordinator may update geographicServiceArea during management.

*After* (CR-PARTNER-MANAGE.docx v1.1 Section 9 Open Issues, ACT-ISS-004):

> **ACT-ISS-004 — CLOSED** by FU-REPORT process definition session, 04-30-26. The field is now a structured multi-value zip code list. The Partner Coordinator updates `geographicServiceArea` by selecting zip codes from the master list rather than typing free text.

---

*Before* (CR Domain PRD v1.1, the Partner field summary referencing geographicServiceArea):

> Service Area and Population: geographicServiceArea (text, format TBD per ACT-ISS-004/CR-MARKETING-ISS-001), targetPopulation (text), partnerNotes (wysiwyg, restricted access).

*After* (CR Domain PRD v1.2, the Partner field summary referencing geographicServiceArea):

> Service Area and Population: geographicServiceArea (multiEnum — structured Northeast Ohio zip code list, format resolved by ACT-ISS-004 closure), targetPopulation (text), partnerNotes (wysiwyg, restricted access).

---

*Before* (CR Domain PRD v1.1 Section 6 Open Issues, ACT-ISS-004):

> **ACT-ISS-004** — Geographic Service Area field format. Superseded by CR-MARKETING-ISS-001.

*After* (CR Domain PRD v1.2 Section 6 Open Issues, ACT-ISS-004):

> **ACT-ISS-004 — CLOSED** by FU-REPORT process definition session, 04-30-26. The field is restructured from free text to a structured multi-value zip code list, used for both Partner service areas and Donor/Sponsor funding territories. CR-MARKETING-ISS-001 remains open to the extent it covers questions beyond field format.

---

*Before* (CR Domain Overview v1.3 Section about ACT-ISS-004):

> **Geographic Service Area format (ACT-ISS-004):** Currently free text. Format decision (free text vs. controlled list of Northeast Ohio geographies) to be resolved during CR-PARTNER process definition.

*After* (CR Domain Overview v1.4 Section about ACT-ISS-004):

> **Geographic Service Area format (ACT-ISS-004 — CLOSED):** Restructured from free text to a structured multi-value zip code list during FU-REPORT process definition, 04-30-26. Used for both Partner service areas and Donor/Sponsor funding territories.

---

*Before* (CR Domain Overview v1.3 Section 6 Open Issues, ACT-ISS-004 row):

> **ACT-ISS-004** — Account Entity — Geographic Service Area field format

*After* (CR Domain Overview v1.4 Section 6 Open Issues, ACT-ISS-004 row):

> **ACT-ISS-004 — CLOSED** — Account Entity — Geographic Service Area field format restructured to a structured zip code list by FU-REPORT, 04-30-26.

---

*Before* (FU-RECORD.docx v1.1 Section 8.4 Fundraising Campaign Fields Created, no `geographicServiceArea` field):

> The Fundraising Campaign entity is created and maintained by FU-RECORD. Eight fields are defined.
>
> [Existing eight fields: campaignName, campaignType, status, goalAmount, startDate, endDate, totalRaised, description.]

*After* (FU-RECORD.docx v1.2 Section 8.4 Fundraising Campaign Fields Created, ninth field added):

> The Fundraising Campaign entity is created and maintained by FU-RECORD. Nine fields are defined.
>
> [Existing eight fields, plus:]
>
> **FU-RECORD-DAT-047** — `geographicServiceArea`, type `multiEnum` (Northeast Ohio zip code master list), Required: No, Values: zip codes drawn from the master list
>
> Optional. Captures the geographic territory funded by this Campaign, expressed as a list of zip codes. Used for territory-based attribution reporting (FU-REPORT) when a Funder organization scopes funding to a specific area through a Campaign rather than at the funder level. Independent of the funder Account's `geographicServiceArea`. The Coordinator sets the field at Campaign creation or updates it during the Campaign's lifetime.

---

**Source:** FU-REPORT process definition interview, 04-30-26. The territory-based attribution model for the FU-REPORT Mentoring Service Delivery by Funding Territory report requires a structured way to express territory as a list of zip codes on both Funder organizations (Account) and on Fundraising Campaigns. The decision was made to restructure the existing `geographicServiceArea` field rather than add a parallel field, and to apply it consistently across Partner, Donor/Sponsor, and Fundraising Campaign uses. ACT-ISS-004 (free text vs. controlled list format) is resolved by adopting the structured zip code list. The decision also adds a `geographicServiceArea` field to Fundraising Campaign as a forward-looking design item that becomes part of the Phase 5 Fundraising Campaign Entity PRD when that work is performed.

---

**Propagation across dependent documents:**

| Document | Version | What changes in this document |
|---|---|---|
| Account Entity PRD | v1.6 → v1.7 | Section 3.3 `geographicServiceArea` field restructured from `text` to `multiEnum` (zip code list) with visibility expanded to `accountType has Partner OR accountType has Donor/Sponsor`. Section 5.3 Donor/Sponsor dynamic logic updated to show `geographicServiceArea`. Section 6 Donor/Sponsor Profile Panel layout adds `geographicServiceArea`. Section 8 ACT-ISS-004 closed with closure language. Field description updated to reflect dual-domain use and zip-code-list-membership semantics for territory-based attribution. |
| CR-PARTNER-MANAGE.docx | v1.0 → v1.1 | Section 8 CR-PARTNER-MANAGE-DAT-032 field row updated: type changes from `text` to `multiEnum`, description updated to reference structured zip code list. Section 9 ACT-ISS-004 closed with closure language. |
| CR Domain PRD | v1.1 → v1.2 | Partner field summary line updated to describe `geographicServiceArea` as `multiEnum` (zip code list). Section 6 ACT-ISS-004 closed with closure language. |
| CR Domain Overview | v1.3 → v1.4 | "Geographic Service Area format" subsection rewritten to reflect ACT-ISS-004 closure and the structured zip code list resolution. Section 6 Open Issues table ACT-ISS-004 row updated to CLOSED status. |
| FU-RECORD.docx | v1.1 → v1.2 | Section 8.4 Fundraising Campaign Fields Created adds new field FU-RECORD-DAT-047 `geographicServiceArea` (multiEnum, zip code list, optional). Section 8.4 introductory sentence updated from "Eight fields are defined" to "Nine fields are defined." |

---

**Mechanical edits (applied automatically, no approval required):**

- Version bumps and Last Updated timestamps on all five touched documents (timestamps refreshed to the carry-forward execution time)
- Depends On / upstream version references updated to match the new Account Entity PRD v1.7 reference where applicable
- Change Log entries added to each touched document describing the geographicServiceArea restructure and citing the FU-REPORT 04-30-26 session as the source
- Cross-document ID references (ACT-ISS-004 closure references, CR-PARTNER-MANAGE-DAT-032, FU-RECORD-DAT-047) kept consistent

---

**Notes on scope and what is NOT in this carry-forward:**

- **CR-MARKETING-ISS-001** is referenced but not closed. ACT-ISS-004 was previously linked to CR-MARKETING-ISS-001 with the note "the two issues will be resolved jointly." This carry-forward closes the field-format dimension shared between them but does not address CR-MARKETING-ISS-001's broader scope (geographic targeting model, master list maintenance ownership for the CR-MARKETING outreach use case). CR-MARKETING-ISS-001 remains open and may benefit from the field-format resolution when it is taken up in stakeholder review.

- **Fundraising Campaign Entity PRD does not yet exist.** The new field `geographicServiceArea` on Fundraising Campaign is added to FU-RECORD's Section 8.4 (where the entity's fields are currently maintained) rather than to a Fundraising Campaign Entity PRD. When the Fundraising Campaign Entity PRD is drafted in Phase 5, it inherits the field from FU-RECORD v1.2.

- **End-of-FU-Phase-4b bundled carry-forward to Account Entity PRD** is not affected by this carry-forward. The bundled carry-forward will take Account Entity PRD v1.7 → v1.8 to add `assignedSponsorCoordinator` and `lastContactDate` (and any FU-REPORT-surfaced additions) after FU-REPORT completes.

- **Migration of existing free-text values on Partner Accounts.** The Account Entity PRD does not specify a migration path for any existing Partner Account records that have free-text values in `geographicServiceArea`. Migration is a Phase 9 implementation matter handled when the master zip code list is defined.

- **CR-MARKETING and CR-EVENTS process documents** were not read during this drafting and may contain narrative references to geographic targeting that are tangentially affected by ACT-ISS-004's closure. If any such references are found during execution and constitute a semantic content change, they will be added to the propagation table at execution time and noted as a Deferred Item if substantive review is needed.

---

**Approve propagation?**
