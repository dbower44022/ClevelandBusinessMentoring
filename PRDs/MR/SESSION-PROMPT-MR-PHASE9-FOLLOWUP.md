# Session Prompt: MR Phase 9 Follow-Up Document Updates

**Repo:** `dbower44022/ClevelandBusinessMentoring`
**Date:** 04-16-26
**Prerequisite:** Read `CLAUDE.md` in both `crmbuilder` and `ClevelandBusinessMentoring` repos.

---

## Context

This session applies deferred document updates from the MR domain
Phase 9 (YAML Generation) conversation conducted on 04-13-26. During
that session, five exceptions were raised (MR-Y9-EXC-001 through
MR-Y9-EXC-005) — all related to enum option lists on the Contact
entity that were TBD or incomplete in the source documents. The
Phase 9 conversation resolved each exception with administrator-
supplied values recorded in `programs/MR/MR-Contact.yaml` and
documented in `programs/MR/EXCEPTIONS.md`.

This session applies those resolutions to the four upstream documents
that need updating. These are surgical, value-insertion edits — not
new content creation. The process documents and Domain PRDs that
reference these fields will inherit the corrected values through
their existing references to the Entity PRDs.

**This is an edit session, not an interview.** Read EXCEPTIONS.md
and MR-Contact.yaml for the authoritative values. Apply them to the
four target documents. Ask the administrator only if an ambiguity
arises that the source materials do not resolve.

---

## Before Starting

1. Read `CLAUDE.md` in both `dbower44022/crmbuilder` and
   `dbower44022/ClevelandBusinessMentoring`
2. Read `programs/MR/EXCEPTIONS.md` for the five exception records
3. Read `programs/MR/MR-Contact.yaml` for the authoritative enum
   values
4. Read the four target documents listed below

---

## Source of Truth for Values

All enum values below come from `programs/MR/MR-Contact.yaml`,
which was produced during the Phase 9 conversation and reviewed
by the administrator. EXCEPTIONS.md documents the rationale for
each resolution.

### howDidYouHearAboutCbm — 8 values (MR-Y9-EXC-005)

Supersedes the 10-value list established in Contact Entity PRD v1.3
and the CR-MARKETING Sub-Domain Overview v1.0.

1. Partner Referral
2. Social Media
3. CBM Email
4. Workshop or Event
5. Search Engine
6. News or Media
7. Personal Referral
8. Other

**Changes from the 10-value list:** "Email Marketing" renamed to
"CBM Email". "CBM Website" removed (absorbed into "Search Engine"
or "Other" at the administrator's discretion). "Returning Client"
removed (no dedicated reactivation attribution value — reactivation
effectiveness is measured through Campaign tracking, not through
howDidYouHearAboutCbm).

### industrySectors — 20 values (MR-Y9-EXC-001)

Standard NAICS two-digit sector titles adopted from the archived
legacy YAML. Must align between Contact.industrySectors (multiEnum)
and Account.industrySector (enum).

1. Agriculture, Forestry, Fishing and Hunting
2. Mining, Quarrying, and Oil and Gas Extraction
3. Utilities
4. Construction
5. Manufacturing
6. Wholesale Trade
7. Retail Trade
8. Transportation and Warehousing
9. Information
10. Finance and Insurance
11. Real Estate and Rental and Leasing
12. Professional, Scientific, and Technical Services
13. Management of Companies and Enterprises
14. Administrative and Support and Waste Management
15. Educational Services
16. Health Care and Social Assistance
17. Arts, Entertainment, and Recreation
18. Accommodation and Food Services
19. Other Services (except Public Administration)
20. Public Administration

### mentoringFocusAreas — 42 values (MR-Y9-EXC-002)

Administrator-supplied during the Phase 9 conversation.

1. Accounting & Tax Services
2. Advertising, Design, & Marketing
3. Agriculture
4. Animal & Veterinary Services
5. Architecture, Engineering, & Related Services
6. Arts, Entertainment, & Recreation
7. Auto Repair & Mechanic
8. Beauty, Cosmetics & Salon Services
9. Business Consulting & Coaching
10. Childcare
11. Commercial & Residential Services
12. Construction
13. Counseling & Therapy
14. Distribution & Transportation of Goods
15. Education
16. Farming & Livestock
17. Fine Arts, Artisan, & Craft Work
18. Fishing & Hunting
19. Food & Beverage
20. Forestry
21. Funeral & Death Care Services
22. Information Technology
23. Manufacturing
24. Media & Publishing
25. Mining, Quarry, & Utilities
26. Nonprofit
27. Personal Care Services
28. Photography & Video Services
29. Professional Services
30. Public Relations & Communications
31. Real Estate
32. Recruiting & Staffing
33. Rental & Leasing
34. Restaurant & Bar
35. Retail
36. Social Assistance & Family Services
37. Transportation
38. Travel, Hospitality, & Tourism
39. Warehousing
40. Waste Management & Disposal
41. Website Development
42. Wellness, Healthcare, & Home Health

### skillsExpertiseTags — 33 values (MR-Y9-EXC-003)

Administrator-supplied. Field name reconciled to
`skillsExpertiseTags` (Contact Entity PRD convention, without
"And"). The MR Domain PRD uses `skillsAndExpertiseTags` — rename
during this session.

1. Accounting & Finance
2. Advertising
3. Bookkeeping
4. Branding
5. Budgeting
6. Business Structure
7. Cash Flow
8. Communications Tech
9. Contracts
10. Cybersecurity
11. Digital Marketing
12. Disaster Prep & Recovery
13. Ecommerce
14. Financial Literacy
15. Franchising
16. Funding/Loans
17. Government Contracting
18. Government Regulations
19. Hardware & Equipment
20. Human Resources
21. Import & Export
22. Intellectual Property
23. Legal
24. Management & Operations
25. Marketing
26. Marketing Strategy
27. PR/Media
28. Pricing
29. Social Media
30. Supply Chain Management
31. Tax Planning
32. Technology
33. Websites

### fluentLanguages — 36 values (MR-Y9-EXC-004)

Administrator-supplied. "Other" moved to last position per
convention.

1. American Sign Language
2. Arabic
3. Bengali
4. Cantonese
5. Chinese
6. Czech
7. Danish
8. Dutch
9. English
10. French
11. German
12. Greek
13. Gujarati
14. Hebrew
15. Hindi
16. Hungarian
17. Indonesian
18. Italian
19. Japanese
20. Korean
21. Lithuanian
22. Malay
23. Mandarin
24. Marathi
25. Norwegian
26. Pashto
27. Polish
28. Portuguese
29. Punjabi
30. Russian
31. Spanish
32. Swedish
33. Tagalog
34. Telugu
35. Urdu
36. Other

---

## Document 1: Contact Entity PRD v1.5 → v1.6

**File:** `PRDs/entities/Contact-Entity-PRD.docx`

### Changes

1. **Section 3.1 Shared Fields — howDidYouHearAboutCbm:** Replace
   the 10-value enum list with the 8-value list above. Update the
   description to note this supersedes the prior 10-value list per
   MR-Y9-EXC-005. Remove any reference to "CBM Website" or
   "Returning Client" as enum values.

2. **Section 3.3 Mentor-Specific Fields — mentoringFocusAreas:**
   Replace "TBD — see CON-ISS-005" (or the current placeholder)
   with the 42-value list above.

3. **Section 3.3 Mentor-Specific Fields — skillsExpertiseTags:**
   Verify the field name is `skillsExpertiseTags` (not
   `skillsAndExpertiseTags`). Replace "TBD — see CON-ISS-006"
   with the 33-value list above.

4. **Section 3.3 Mentor-Specific Fields — fluentLanguages:**
   Replace "TBD — see CON-ISS-007" with the 36-value list above.

5. **Open Issues:** Close CON-ISS-005 (mentoringFocusAreas values
   now enumerated), CON-ISS-006 (skillsExpertiseTags values now
   enumerated), CON-ISS-007 (fluentLanguages values now
   enumerated). Update CON-ISS-008 resolution note to reflect the
   8-value list superseding the prior 10-value list.

6. **Version:** Bump to v1.6. Update Last Updated to session date.

---

## Document 2: Account Entity PRD v1.5 → v1.6

**File:** `PRDs/entities/Account-Entity-PRD.docx`

### Changes

1. **Section 3 — industrySector field:** Replace "20 top-level
   NAICS sectors" (or similar count-only reference) with the
   explicit 20-value list above. Note that this field is an enum
   (single-select) on Account, while the corresponding
   Contact.industrySectors field is a multiEnum (multi-select).

2. **Version:** Bump to v1.6. Update Last Updated to session date.

---

## Document 3: CR-MARKETING Sub-Domain Overview v1.2 → v1.3

**File:** `PRDs/CR/MARKETING/CBM-SubDomain-Overview-Marketing.docx`

### Changes

1. **Channel rollup design:** The 10-value howDidYouHearAboutCbm
   list has been collapsed to 8 values. The channel-to-sub-domain
   rollup mapping must be revised:

   **Old 10-value rollup:**
   - Partner Referral → CR-PARTNER
   - Workshop or Event → CR-EVENTS
   - Email Marketing, Social Media, Search Engine, CBM Website,
     News or Media → CR-MARKETING
   - Returning Client → CR-REACTIVATE
   - Personal Referral, Other → organic/unattributed

   **New 8-value rollup:**
   - Partner Referral → CR-PARTNER
   - Workshop or Event → CR-EVENTS
   - CBM Email, Social Media, Search Engine, News or Media →
     CR-MARKETING
   - Personal Referral, Other → organic/unattributed

   Key changes: "Email Marketing" renamed to "CBM Email". "CBM
   Website" removed. "Returning Client" removed — CR-REACTIVATE no
   longer has a dedicated attribution value; reactivation
   effectiveness is measured through Campaign tracking on the
   Campaign entity (channel = Reactivation), not through
   howDidYouHearAboutCbm.

2. **Update any reference to the 10-value list** throughout the
   document to reflect the 8-value list.

3. **Update the Depends On** version references if Contact Entity
   PRD or Account Entity PRD version numbers changed.

4. **Version:** Bump to v1.3. Update Last Updated to session date.

---

## Document 4: MR Domain PRD v1.0 → v1.1

**File:** `PRDs/MR/CBM-Domain-PRD-MentorRecruitment.docx`

### Changes

1. **Field name rename — skillsAndExpertiseTags →
   skillsExpertiseTags:** Search the entire document and replace
   every occurrence of `skillsAndExpertiseTags` with
   `skillsExpertiseTags`. This aligns with the Contact Entity PRD
   convention per MR-Y9-EXC-003.

2. **Field name rename — howDidYouHearAboutCBM →
   howDidYouHearAboutCbm:** Search the entire document and replace
   every occurrence of `howDidYouHearAboutCBM` (uppercase BM) with
   `howDidYouHearAboutCbm` (lowercase bm). This aligns with the
   Contact Entity PRD convention per MR-Y9-EXC-005.

3. **Section 4 Data Reference — resolve TBD value lists:** For
   each of the following fields, replace the TBD marker with a
   reference to the Contact Entity PRD v1.6 where the values are
   now enumerated:
   - mentoringFocusAreas: "42 values — see Contact Entity PRD
     v1.6 Section 3.3" (closes CON-ISS-005 reference)
   - skillsExpertiseTags: "33 values — see Contact Entity PRD
     v1.6 Section 3.3" (closes CON-ISS-006 reference)
   - fluentLanguages: "36 values — see Contact Entity PRD v1.6
     Section 3.3" (closes CON-ISS-007 reference)
   - howDidYouHearAboutCbm: "8 values — see Contact Entity PRD
     v1.6 Section 3.1" (updates CON-ISS-008 reference)
   - industrySectors: "20 NAICS sectors — see Contact Entity PRD
     v1.6 Section 3.3 and Account Entity PRD v1.6" (closes
     MR-Y9-EXC-001 reference)

4. **Section 6 Open Issues:** Update any references to CON-ISS-005
   through CON-ISS-008 to reflect their resolved status.

5. **Version:** Bump to v1.1. Update Last Updated to session date.

---

## Carry-Forward Note

After these four updates are applied, the following documents
reference the old 10-value howDidYouHearAboutCbm list and will
need minor updates in a subsequent session:

- **CR Domain PRD v1.0** (`PRDs/CR/CBM-Domain-PRD-ClientRecruiting.docx`):
  Section 4.1.1 references the 10-value list and the "Returning
  Client → CR-REACTIVATE" rollup mapping. Update to 8-value list
  and revised rollup. Bump to v1.1.

- **CR Domain Overview v1.2** (`PRDs/CR/CBM-Domain-Overview-ClientRecruiting.docx`):
  May reference the 10-value list. Verify and update if needed.
  Bump to v1.3.

These carry-forward updates are minor (value list replacement and
rollup mapping revision) and can be applied in the same session or
deferred to the next CR domain session.

---

## After This Session

Update `CLAUDE.md` to reflect:
- Contact Entity PRD v1.6, Account Entity PRD v1.6
- CR-MARKETING SDO v1.3
- MR Domain PRD v1.1
- CON-ISS-005 through CON-ISS-007 closed
- CON-ISS-008 updated to reflect 8-value list
- Carry-forward updates pending for CR Domain PRD and CR Domain
  Overview
