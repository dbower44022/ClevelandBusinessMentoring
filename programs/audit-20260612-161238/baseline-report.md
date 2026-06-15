# Baseline Report — espocrm @ crm-test.clevelandbusinessmentors.org

Machine-produced working input to Phase 2 discovery and Phase 3 triage — analogous to the Domain Discovery Report. Nothing in it is authoritative until reconciled.

## Provenance

- **Source label:** espocrm @ crm-test.clevelandbusinessmentors.org
- **Source system:** espocrm
- **Source instance:** https://crm-test.clevelandbusinessmentors.org/
- **Snapshot at:** 2026-06-12T16:12:38Z
- **Profiled at:** 2026-06-12T16:15:20Z
- **Deposit events (newest first):** DEP-003 (success), DEP-002 (success), DEP-001 (success)
- **Thresholds:** {"dormancy_window_days": 365, "low_population_threshold": 0.05} (utilization profile options)
- **Engagement:** CBM
- **Anomaly planning items:** PI-004
- **Transform version:** 0.7.0
- **Profiler version:** 0.1.0
- **Renderer version:** 0.7.0
- **Rendered at:** 2026-06-12T17:20:36.197296+00:00

## Summary

| Type | Count | By status |
|---|---|---|
| entity | 14 | candidate: 14 |
| field | 214 | candidate: 214 |
| persona | 17 | candidate: 17 |
| process | 0 | 0 |
| manual_config | 0 | 0 |

- **Bands (entities + fields):** T1: 93, T1/T2 (use unprofiled): 11, T2: 111, T3: 3, T3/T4 (use unprofiled): 10
- **Gaps and ghosts:** G1: 1, G2: 89, G3: 0, G4: 57, G5: 0, G6: 0
- **Manifest:** /home/doug/Dropbox/Projects/ClevelandBusinessMentors/programs/audit-20260612-161238/audit-report.json
- **Profile:** /home/doug/Dropbox/Projects/ClevelandBusinessMentors/programs/audit-20260612-161238/utilization-profile.json

## Gaps and Ghosts

Review each item and flag the ones to raise as Phase 2 probes (phase completion criterion). Probe seeds are advisory wording — adapt, and never open with them (anchoring discipline, see the handoff notes).

### G1 — Dormant / empty entities

- **ENT-010 Event Registration** — empty — never used (0 records)
  - Probe seed: *Your current system has Event Registration, but it has never been used — tell me about that.*

### G2 — Low-population fields

- **FLD-116 Contact.Partners Managed** — low population (4.2% of records)
  - Probe seed: *Your current system tracks Contact.Partners Managed, but it is filled in on only 4.2% of records — tell me about that.*
- **FLD-001 CBM Member.AboutMentor** — low population (4.3% of records)
  - Probe seed: *Your current system tracks CBM Member.AboutMentor, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-006 CBM Member.Background Check Date** — low population (4.3% of records)
  - Probe seed: *Your current system tracks CBM Member.Background Check Date, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-013 CBM Member.Dues Payment Date** — low population (4.3% of records)
  - Probe seed: *Your current system tracks CBM Member.Dues Payment Date, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-014 CBM Member.Dues Renewal Date** — low population (4.3% of records)
  - Probe seed: *Your current system tracks CBM Member.Dues Renewal Date, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-016 CBM Member.Ethics Agreement Acceptance Date/Time** — low population (4.3% of records)
  - Probe seed: *Your current system tracks CBM Member.Ethics Agreement Acceptance Date/Time, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-027 CBM Member.Mentoring Skills** — low population (4.3% of records)
  - Probe seed: *Your current system tracks CBM Member.Mentoring Skills, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-040 CBM Member.Training Completion Date** — low population (4.3% of records)
  - Probe seed: *Your current system tracks CBM Member.Training Completion Date, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-122 Contact.Suffix** — low population (2.1% of records)
  - Probe seed: *Your current system tracks Contact.Suffix, but it is filled in on only 2.1% of records — tell me about that.*
- **FLD-161 Event.Event Fee** — low population (3.0% of records)
  - Probe seed: *Your current system tracks Event.Event Fee, but it is filled in on only 3.0% of records — tell me about that.*
- **FLD-163 Event.Event Overview** — low population (3.0% of records)
  - Probe seed: *Your current system tracks Event.Event Overview, but it is filled in on only 3.0% of records — tell me about that.*
- **FLD-109 Contact.Client Company** — low population (4.2% of records)
  - Probe seed: *Your current system tracks Contact.Client Company, but it is filled in on only 4.2% of records — tell me about that.*
- **FLD-173 Event.Venue Capacity** — low population (3.0% of records)
  - Probe seed: *Your current system tracks Event.Venue Capacity, but it is filled in on only 3.0% of records — tell me about that.*
- **FLD-072 Company.Annual Pledge Amount** — low population (3.7% of records)
  - Probe seed: *Your current system tracks Company.Annual Pledge Amount, but it is filled in on only 3.7% of records — tell me about that.*
- **FLD-073 Company.Annual Pledge Amount (Converted)** — low population (3.7% of records)
  - Probe seed: *Your current system tracks Company.Annual Pledge Amount (Converted), but it is filled in on only 3.7% of records — tell me about that.*
- **FLD-074 Company.Annual Pledge Amount (Currency)** — low population (3.7% of records)
  - Probe seed: *Your current system tracks Company.Annual Pledge Amount (Currency), but it is filled in on only 3.7% of records — tell me about that.*
- **FLD-104 Company.Sponsorship Start Date** — low population (3.7% of records)
  - Probe seed: *Your current system tracks Company.Sponsorship Start Date, but it is filled in on only 3.7% of records — tell me about that.*
- **FLD-106 Contact.Birthday** — low population (2.1% of records)
  - Probe seed: *Your current system tracks Contact.Birthday, but it is filled in on only 2.1% of records — tell me about that.*
- **FLD-117 Contact.Personal Profile** — low population (2.1% of records)
  - Probe seed: *Your current system tracks Contact.Personal Profile, but it is filled in on only 2.1% of records — tell me about that.*
- **FLD-121 Contact.Spouse Name** — low population (2.1% of records)
  - Probe seed: *Your current system tracks Contact.Spouse Name, but it is filled in on only 2.1% of records — tell me about that.*
- **FLD-045 Client.Certifications Currently Held** — low population (4.3% of records)
  - Probe seed: *Your current system tracks Client.Certifications Currently Held, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-046 Client.Client Ethnicity** — low population (4.3% of records)
  - Probe seed: *Your current system tracks Client.Client Ethnicity, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-047 Client.Client Race** — low population (4.3% of records)
  - Probe seed: *Your current system tracks Client.Client Race, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-052 Client.Formation Date** — low population (4.3% of records)
  - Probe seed: *Your current system tracks Client.Formation Date, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-053 Client.Funding Sources Used to Date** — low population (4.3% of records)
  - Probe seed: *Your current system tracks Client.Funding Sources Used to Date, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-054 Client.Geographic Market Reach** — low population (4.3% of records)
  - Probe seed: *Your current system tracks Client.Geographic Market Reach, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-062 Client.Primary Customer Type** — low population (4.3% of records)
  - Probe seed: *Your current system tracks Client.Primary Customer Type, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-066 Client.Sales Channels Used** — low population (4.3% of records)
  - Probe seed: *Your current system tracks Client.Sales Channels Used, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-069 Client.Veteran Status** — low population (4.3% of records)
  - Probe seed: *Your current system tracks Client.Veteran Status, but it is filled in on only 4.3% of records — tell me about that.*
- **FLD-123 Contribution.Acknowledgment Date** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Contribution.Acknowledgment Date, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-043 Client.Active Social Media Presence** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Client.Active Social Media Presence, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-075 Company.Applicant Since** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Company.Applicant Since, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-126 Contribution.Application Date** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Contribution.Application Date, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-076 Company.Assigned Liaison** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Company.Assigned Liaison, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-007 CBM Member.Board Position** — low population (0.0% of records)
  - Probe seed: *Your current system tracks CBM Member.Board Position, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-185 Partner.CBM Value Provided** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Partner.CBM Value Provided, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-009 CBM Member.City** — low population (0.0% of records)
  - Probe seed: *Your current system tracks CBM Member.City, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-140 Engagement.Close Date** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Engagement.Close Date, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-127 Contribution.Commitment Date** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Contribution.Commitment Date, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-080 Company.Company Notes** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Company.Company Notes, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-049 Client.Contact Email** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Client.Contact Email, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-011 CBM Member.Departure Date** — low population (0.0% of records)
  - Probe seed: *Your current system tracks CBM Member.Departure Date, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-129 Contribution.Designation** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Contribution.Designation, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-160 Event.Documents** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Event.Documents, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-142 Engagement.Employment Increase Percentage** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Engagement.Employment Increase Percentage, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-162 Event.Event Graphic** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Event.Event Graphic, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-164 Event.Event Release Date** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Event.Event Release Date, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-165 Event.Event Syllabus** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Event.Event Syllabus, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-130 Contribution.Expected Payment Date** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Contribution.Expected Payment Date, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-198 Resource.File** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Resource.File, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-146 Engagement.Hold End Date** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Engagement.Hold End Date, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-132 Contribution.In-Kind Description** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Contribution.In-Kind Description, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-133 Contribution.In-Kind Valuation Basis** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Contribution.In-Kind Valuation Basis, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-212 Sponsor.Last Contribution Date** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Sponsor.Last Contribution Date, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-147 Engagement.Last Session Date** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Engagement.Last Session Date, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-087 Company.LinkedIn Page** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Company.LinkedIn Page, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-059 Client.Local Licenses and Permits Held** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Client.Local Licenses and Permits Held, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-060 Client.Most Recent Full Year Revenue** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Client.Most Recent Full Year Revenue, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-134 Contribution.Next Grant Deadline** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Contribution.Next Grant Deadline, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-135 Contribution.Notes** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Contribution.Notes, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-089 Company.Parent Account** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Company.Parent Account, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-188 Partner.Partner Email** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Partner.Partner Email, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-091 Company.Partner Notes** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Company.Partner Notes, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-095 Company.Partner Type** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Company.Partner Type, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-096 Company.Partnership Agreement Date** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Company.Partnership Agreement Date, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-097 Company.Partnership Start Date** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Company.Partnership Start Date, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-028 CBM Member.Personal Email** — low population (0.0% of records)
  - Probe seed: *Your current system tracks CBM Member.Personal Email, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-029 CBM Member.Phone** — low population (0.0% of records)
  - Probe seed: *Your current system tracks CBM Member.Phone, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-030 CBM Member.PostalCode** — low population (0.0% of records)
  - Probe seed: *Your current system tracks CBM Member.PostalCode, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-032 CBM Member.Profile Photo** — low population (0.0% of records)
  - Probe seed: *Your current system tracks CBM Member.Profile Photo, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-200 Resource.Published At** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Resource.Published At, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-169 Event.Recording URL** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Event.Recording URL, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-170 Event.Registration URL** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Event.Registration URL, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-033 CBM Member.Resume Upload** — low population (0.0% of records)
  - Probe seed: *Your current system tracks CBM Member.Resume Upload, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-154 Engagement.Revenue Increase Percentage** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Engagement.Revenue Increase Percentage, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-171 Event.Sponsor Graphic** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Event.Sponsor Graphic, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-100 Company.Sponsor Notes** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Company.Sponsor Notes, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-103 Company.Sponsorship Renewal Date** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Company.Sponsorship Renewal Date, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-067 Client.State of Formation** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Client.State of Formation, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-034 CBM Member.Street** — low population (0.0% of records)
  - Probe seed: *Your current system tracks CBM Member.Street, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-105 Company.Target Population** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Company.Target Population, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-210 Session.Topics Covered** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Session.Topics Covered, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-214 Sponsor.Total Contribution** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Sponsor.Total Contribution, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-036 CBM Member.Total Lifetime Sessions** — low population (0.0% of records)
  - Probe seed: *Your current system tracks CBM Member.Total Lifetime Sessions, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-037 CBM Member.Total Mentoring Hours** — low population (0.0% of records)
  - Probe seed: *Your current system tracks CBM Member.Total Mentoring Hours, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-157 Engagement.Total Session Hours** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Engagement.Total Session Hours, but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-038 CBM Member.Total Sessions (Last 30 Days)** — low population (0.0% of records)
  - Probe seed: *Your current system tracks CBM Member.Total Sessions (Last 30 Days), but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-159 Engagement.Total Sessions (Last 30 Days)** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Engagement.Total Sessions (Last 30 Days), but it is filled in on only 0.0% of records — tell me about that.*
- **FLD-070 Client.Year Founded** — low population (0.0% of records)
  - Probe seed: *Your current system tracks Client.Year Founded, but it is filled in on only 0.0% of records — tell me about that.*

### G3 — Stale fields

none found

### G4 — Ghost options and undeclared values

- **FLD-209 Session.Session Type** — 1 declared option(s) unused (Phone Call)
  - Probe seed: *Session.Session Type offers options no record uses (Phone Call) — are those still needed?*
- **FLD-012 CBM Member.Departure Reason** — 4 declared option(s) unused (Career Change, Other, Personal, Time Constraints)
  - Probe seed: *CBM Member.Departure Reason offers options no record uses (Career Change, Other, Personal, Time Constraints) — are those still needed?*
- **FLD-015 CBM Member.Dues Status** — 1 declared option(s) unused (Waived)
  - Probe seed: *CBM Member.Dues Status offers options no record uses (Waived) — are those still needed?*
- **FLD-021 CBM Member.Industry Sector** — 13 declared option(s) unused (Administrative and Support and Waste Management, Arts, Entertainment, and Recreation, Construction, Educational Services, Finance and Insurance, Health Care and Social Assistance, Management of Companies and Enterprises, Mining, Quarrying, and Oil and Gas Extraction, Other Services (except Public Administration), Public Administration, Real Estate and Rental and Leasing, Retail Trade, Wholesale Trade)
  - Probe seed: *CBM Member.Industry Sector offers options no record uses (Administrative and Support and Waste Management, Arts, Entertainment, and Recreation, Construction, Educational Services, Finance and Insurance, Health Care and Social Assistance, Management of Companies and Enterprises, Mining, Quarrying, and Oil and Gas Extraction, Other Services (except Public Administration), Public Administration, Real Estate and Rental and Leasing, Retail Trade, Wholesale Trade) — are those still needed?*
- **FLD-024 CBM Member.Mentor Status** — 6 declared option(s) unused (, Approved, Dormant, Provisional, Retired, Terminated)
  - Probe seed: *CBM Member.Mentor Status offers options no record uses (, Approved, Dormant, Provisional, Retired, Terminated) — are those still needed?*
- **FLD-025 CBM Member.Mentor Type** — 4 declared option(s) unused (, Other, Presenter, Volunteer)
  - Probe seed: *CBM Member.Mentor Type offers options no record uses (, Other, Presenter, Volunteer) — are those still needed?*
- **FLD-019 CBM Member.Fluent Languages** — 34 declared option(s) unused (Arabic, Bengali, Cantonese, Chinese, Czech, Danish, Dutch, French, German, Greek, Gujarati, Hebrew, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Lithuanian, Malay, Mandarin, Marathi, Norwegian, Other, Pashto, Polish, Portuguese, Punjabi, Russian, Spanish, Swedish, Tagalog, Telugu, Urdu)
  - Probe seed: *CBM Member.Fluent Languages offers options no record uses (Arabic, Bengali, Cantonese, Chinese, Czech, Danish, Dutch, French, German, Greek, Gujarati, Hebrew, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Lithuanian, Malay, Mandarin, Marathi, Norwegian, Other, Pashto, Polish, Portuguese, Punjabi, Russian, Spanish, Swedish, Tagalog, Telugu, Urdu) — are those still needed?*
- **FLD-026 CBM Member.Mentoring Focus Areas** — 23 declared option(s) unused (Advertising, Design, & Marketing, Arts, Entertainment, & Recreation, Auto Repair & Mechanic, Beauty, Cosmetics & Salon Services, Childcare, Commercial & Residential Services, Construction, Counseling & Therapy, Distribution & Transportation of Goods, Farming & Livestock, Fine Arts, Artisan, & Craft Work, Fishing & Hunting, Forestry, Funeral & Death Care Services, Mining, Quarry, & Utilities, Personal Care Services, Photography & Video Services, Public Relations & Communications, Rental & Leasing, Social Assistance & Family Services, Transportation, Warehousing, Website Development)
  - Probe seed: *CBM Member.Mentoring Focus Areas offers options no record uses (Advertising, Design, & Marketing, Arts, Entertainment, & Recreation, Auto Repair & Mechanic, Beauty, Cosmetics & Salon Services, Childcare, Commercial & Residential Services, Construction, Counseling & Therapy, Distribution & Transportation of Goods, Farming & Livestock, Fine Arts, Artisan, & Craft Work, Fishing & Hunting, Forestry, Funeral & Death Care Services, Mining, Quarry, & Utilities, Personal Care Services, Photography & Video Services, Public Relations & Communications, Rental & Leasing, Social Assistance & Family Services, Transportation, Warehousing, Website Development) — are those still needed?*
- **FLD-110 Contact.Contact Type** — 3 declared option(s) unused (Administrator, Member, Presenter)
  - Probe seed: *Contact.Contact Type offers options no record uses (Administrator, Member, Presenter) — are those still needed?*
- **FLD-166 Event.Event Type** — 3 declared option(s) unused (, In Person Event, Online Course)
  - Probe seed: *Event.Event Type offers options no record uses (, In Person Event, Online Course) — are those still needed?*
- **FLD-167 Event.Format** — 2 declared option(s) unused (Hybrid, In-Person)
  - Probe seed: *Event.Format offers options no record uses (Hybrid, In-Person) — are those still needed?*
- **FLD-187 Partner.Partner Contact Cadence** — 3 declared option(s) unused (Annually, Quarterly, Semi-Annually)
  - Probe seed: *Partner.Partner Contact Cadence offers options no record uses (Annually, Quarterly, Semi-Annually) — are those still needed?*
- **FLD-192 Partner.Partnership Status** — 5 declared option(s) unused (Candidate, Inactive, MOU/Contract Sent, MOU/Contract Signed, Proposal Sent)
  - Probe seed: *Partner.Partnership Status offers options no record uses (Candidate, Inactive, MOU/Contract Sent, MOU/Contract Signed, Proposal Sent) — are those still needed?*
- **FLD-193 Partner.Partnership Type** — 3 declared option(s) unused (Community Partner, Service Partner, Training Partner)
  - Probe seed: *Partner.Partnership Type offers options no record uses (Community Partner, Service Partner, Training Partner) — are those still needed?*
- **FLD-195 Partner.Relation Goals Established** — 3 declared option(s) unused (, In Progress, No)
  - Probe seed: *Partner.Relation Goals Established offers options no record uses (, In Progress, No) — are those still needed?*
- **FLD-071 Company.Account Type** — 1 declared option(s) unused (Donor/Sponsor)
  - Probe seed: *Company.Account Type offers options no record uses (Donor/Sponsor) — are those still needed?*
- **FLD-079 Company.Client Status** — 4 declared option(s) unused (Active Client, Applicant, Former Client, Inactive Client)
  - Probe seed: *Company.Client Status offers options no record uses (Active Client, Applicant, Former Client, Inactive Client) — are those still needed?*
- **FLD-085 Company.Industry Sector** — 10 declared option(s) unused (Administrative and Support and Waste Management, Management of Companies and Enterprises, Manufacturing, Mining, Quarrying, and Oil and Gas Extraction, Other Services (except Public Administration), Professional, Scientific, and Technical Services, Public Administration, Retail Trade, Utilities, Wholesale Trade)
  - Probe seed: *Company.Industry Sector offers options no record uses (Administrative and Support and Waste Management, Management of Companies and Enterprises, Manufacturing, Mining, Quarrying, and Oil and Gas Extraction, Other Services (except Public Administration), Professional, Scientific, and Technical Services, Public Administration, Retail Trade, Utilities, Wholesale Trade) — are those still needed?*
- **FLD-090 Company.Partner Contact Cadence** — 4 declared option(s) unused (Annually, As-Needed, Quarterly, Semi-Annually)
  - Probe seed: *Company.Partner Contact Cadence offers options no record uses (Annually, As-Needed, Quarterly, Semi-Annually) — are those still needed?*
- **FLD-092 Company.Partner Organization Type** — 6 declared option(s) unused (Academic Institution, Corporation, Financial Institution, Government Agency, Nonprofit, Other)
  - Probe seed: *Company.Partner Organization Type offers options no record uses (Academic Institution, Corporation, Financial Institution, Government Agency, Nonprofit, Other) — are those still needed?*
- **FLD-094 Company.Partner Status** — 3 declared option(s) unused (Active, Inactive, Lapsed)
  - Probe seed: *Company.Partner Status offers options no record uses (Active, Inactive, Lapsed) — are those still needed?*
- **FLD-102 Company.Sponsorship Level** — 3 declared option(s) unused (Bronze, Gold, Silver)
  - Probe seed: *Company.Sponsorship Level offers options no record uses (Bronze, Gold, Silver) — are those still needed?*
- **FLD-141 Engagement.Close Reason** — 3 declared option(s) unused (Client Withdrew, Inactive / No Response, Other)
  - Probe seed: *Engagement.Close Reason offers options no record uses (Client Withdrew, Inactive / No Response, Other) — are those still needed?*
- **FLD-145 Engagement.Engagement Status** — 6 declared option(s) unused (Abandoned, Assignment Dormant, Completed, Declined, Inactive, On-Hold)
  - Probe seed: *Engagement.Engagement Status offers options no record uses (Abandoned, Assignment Dormant, Completed, Declined, Inactive, On-Hold) — are those still needed?*
- **FLD-148 Engagement.Meeting Cadence** — 2 declared option(s) unused (Bi-Weekly, Monthly)
  - Probe seed: *Engagement.Meeting Cadence offers options no record uses (Bi-Weekly, Monthly) — are those still needed?*
- **FLD-149 Engagement.Mentoring Focus Areas** — 29 declared option(s) unused (Advertising, Design, & Marketing, Arts, Entertainment, & Recreation, Childcare, Commercial & Residential Services, Counseling & Therapy, Distribution & Transportation of Goods, Farming & Livestock, Fine Arts, Artisan, & Craft Work, Fishing & Hunting, Food & Beverage, Forestry, Funeral & Death Care Services, Manufacturing, Media & Publishing, Mining, Quarry, & Utilities, Personal Care Services, Photography & Video Services, Professional Services, Public Relations & Communications, Real Estate, Recruiting & Staffing, Rental & Leasing, Restaurant & Bar, Retail, Social Assistance & Family Services, Transportation, Travel, Hospitality, & Tourism, Warehousing, Waste Management & Disposal)
  - Probe seed: *Engagement.Mentoring Focus Areas offers options no record uses (Advertising, Design, & Marketing, Arts, Entertainment, & Recreation, Childcare, Commercial & Residential Services, Counseling & Therapy, Distribution & Transportation of Goods, Farming & Livestock, Fine Arts, Artisan, & Craft Work, Fishing & Hunting, Food & Beverage, Forestry, Funeral & Death Care Services, Manufacturing, Media & Publishing, Mining, Quarry, & Utilities, Personal Care Services, Photography & Video Services, Professional Services, Public Relations & Communications, Real Estate, Recruiting & Staffing, Rental & Leasing, Restaurant & Bar, Retail, Social Assistance & Family Services, Transportation, Travel, Hospitality, & Tourism, Warehousing, Waste Management & Disposal) — are those still needed?*
- **FLD-128 Contribution.Contribution Type** — 2 declared option(s) unused (Grant, Sponsorship)
  - Probe seed: *Contribution.Contribution Type offers options no record uses (Grant, Sponsorship) — are those still needed?*
- **FLD-131 Contribution.Gift Type** — 5 declared option(s) unused (ACH, Credit Card, In-Kind, Online Payment, Other)
  - Probe seed: *Contribution.Gift Type offers options no record uses (ACH, Credit Card, In-Kind, Online Payment, Other) — are those still needed?*
- **FLD-137 Contribution.Status** — 5 declared option(s) unused (Cancelled, Committed, Pledged, Received, Unsuccessful)
  - Probe seed: *Contribution.Status offers options no record uses (Cancelled, Committed, Pledged, Received, Unsuccessful) — are those still needed?*
- **FLD-081 Company.Company Type** — 2 declared option(s) unused (, Other)
  - Probe seed: *Company.Company Type offers options no record uses (, Other) — are those still needed?*
- **FLD-044 Client.Annual Revenue Range** — 9 declared option(s) unused ($1 Million to $2 Million, $100,000 to $250,000, $2 Million to $5 Million, $250,000 to $500,000, $5 Million to $10 Million, $500,000 to $1 Million, Over $10 Million, Prefer Not to Share, Under $50,000)
  - Probe seed: *Client.Annual Revenue Range offers options no record uses ($1 Million to $2 Million, $100,000 to $250,000, $2 Million to $5 Million, $250,000 to $500,000, $5 Million to $10 Million, $500,000 to $1 Million, Over $10 Million, Prefer Not to Share, Under $50,000) — are those still needed?*
- **FLD-051 Client.Fiscal Year End** — 11 declared option(s) unused (April, August, December, February, July, June, March, May, November, October, September)
  - Probe seed: *Client.Fiscal Year End offers options no record uses (April, August, December, February, July, June, March, May, November, October, September) — are those still needed?*
- **FLD-057 Client.Industry Sector** — 19 declared option(s) unused (Accommodation and Food Services, Administrative and Support and Waste Management, Arts, Entertainment, and Recreation, Construction, Educational Services, Finance and Insurance, Health Care and Social Assistance, Information, Management of Companies and Enterprises, Manufacturing, Mining, Quarrying, and Oil and Gas Extraction, Other Services (except Public Administration), Professional, Scientific, and Technical Services, Public Administration, Real Estate and Rental and Leasing, Retail Trade, Transportation and Warehousing, Utilities, Wholesale Trade)
  - Probe seed: *Client.Industry Sector offers options no record uses (Accommodation and Food Services, Administrative and Support and Waste Management, Arts, Entertainment, and Recreation, Construction, Educational Services, Finance and Insurance, Health Care and Social Assistance, Information, Management of Companies and Enterprises, Manufacturing, Mining, Quarrying, and Oil and Gas Extraction, Other Services (except Public Administration), Professional, Scientific, and Technical Services, Public Administration, Real Estate and Rental and Leasing, Retail Trade, Transportation and Warehousing, Utilities, Wholesale Trade) — are those still needed?*
- **FLD-058 Client.Legal Entity Type** — 11 declared option(s) unused (Benefit Corporation (B-Corp), C-Corporation, Cooperative, General Partnership, Limited Liability Company (LLC), Limited Liability Partnership (LLP), Limited Partnership, Nonprofit Corporation, Not Yet Formed, Other, S-Corporation)
  - Probe seed: *Client.Legal Entity Type offers options no record uses (Benefit Corporation (B-Corp), C-Corporation, Cooperative, General Partnership, Limited Liability Company (LLC), Limited Liability Partnership (LLP), Limited Partnership, Nonprofit Corporation, Not Yet Formed, Other, S-Corporation) — are those still needed?*
- **FLD-063 Client.Profitability Status** — 4 declared option(s) unused (Breakeven, Owner Draws Only (No Formal Profit), Pre-Revenue, Prefer Not to Share)
  - Probe seed: *Client.Profitability Status offers options no record uses (Breakeven, Owner Draws Only (No Formal Profit), Pre-Revenue, Prefer Not to Share) — are those still needed?*
- **FLD-065 Client.Revenue Trend (last 12 months)** — 5 declared option(s) unused (Declining Modestly, Declining Significantly, Flat, Growing Modestly, Too New to Tell)
  - Probe seed: *Client.Revenue Trend (last 12 months) offers options no record uses (Declining Modestly, Declining Significantly, Flat, Growing Modestly, Too New to Tell) — are those still needed?*
- **FLD-122 Contact.Suffix** — 6 declared option(s) unused (, CPA, Esq, Jr, MD, Sr)
  - Probe seed: *Contact.Suffix offers options no record uses (, CPA, Esq, Jr, MD, Sr) — are those still needed?*
- **FLD-196 Resource.Category** — 6 declared option(s) unused (Financing, Leadership and Strategy, Legal and Compliance, Marketing and Sales, Operations, Other)
  - Probe seed: *Resource.Category offers options no record uses (Financing, Leadership and Strategy, Legal and Compliance, Marketing and Sales, Operations, Other) — are those still needed?*
- **FLD-202 Resource.Resource Type** — 6 declared option(s) unused (Audio, Document, Link, Other, Recorded Event, Template)
  - Probe seed: *Resource.Resource Type offers options no record uses (Audio, Document, Link, Other, Recorded Event, Template) — are those still needed?*
- **FLD-172 Event.Topic** — 7 declared option(s) unused (Industry-Specific, Leadership & People, Legal & Compliance, Marketing & Sales, Networking, Operations, Other)
  - Probe seed: *Event.Topic offers options no record uses (Industry-Specific, Leadership & People, Legal & Compliance, Marketing & Sales, Networking, Operations, Other) — are those still needed?*
- **FLD-205 Session.Meeting Location Type** — 2 declared option(s) unused (, Client's Place of Business)
  - Probe seed: *Session.Meeting Location Type offers options no record uses (, Client's Place of Business) — are those still needed?*
- **FLD-194 Partner.Partnership Value** — 5 declared option(s) unused (Connection to stakeholders / expanding influence, Link on Website, None, Other, Workshop Speakers / Educational Resources)
  - Probe seed: *Partner.Partnership Value offers options no record uses (Connection to stakeholders / expanding influence, Link on Website, None, Other, Workshop Speakers / Educational Resources) — are those still needed?*
- **FLD-086 Company.Industry Subsector** — 1 declared option(s) unused ()
  - Probe seed: *Company.Industry Subsector offers options no record uses () — are those still needed?*
- **FLD-045 Client.Certifications Currently Held** — 14 declared option(s) unused (Cuyahoga County SBE, Cuyahoga County WBE, Federal Disadvantaged Business Enterprise (DBE), Ohio Encouraging Diversity, Growth and Equity (EDGE), Ohio Veteran-Friendly Business Enterprise (VFBE), Ohio Women Business Enterprise (WBE), Other, SBA 8(a) Business Development, SBA Economically Disadvantaged WOSB (EDWOSB), SBA HUBZone, SBA Service-Disabled VOSB (SDVOSB), SBA Small Disadvantaged Business (SDB), SBA Veteran-Owned Small Business (VOSB), SBA Women-Owned Small Business (WOSB))
  - Probe seed: *Client.Certifications Currently Held offers options no record uses (Cuyahoga County SBE, Cuyahoga County WBE, Federal Disadvantaged Business Enterprise (DBE), Ohio Encouraging Diversity, Growth and Equity (EDGE), Ohio Veteran-Friendly Business Enterprise (VFBE), Ohio Women Business Enterprise (WBE), Other, SBA 8(a) Business Development, SBA Economically Disadvantaged WOSB (EDWOSB), SBA HUBZone, SBA Service-Disabled VOSB (SDVOSB), SBA Small Disadvantaged Business (SDB), SBA Veteran-Owned Small Business (VOSB), SBA Women-Owned Small Business (WOSB)) — are those still needed?*
- **FLD-046 Client.Client Ethnicity** — 2 declared option(s) unused (, Hispanic or Latino)
  - Probe seed: *Client.Client Ethnicity offers options no record uses (, Hispanic or Latino) — are those still needed?*
- **FLD-047 Client.Client Race** — 5 declared option(s) unused (, American Indian or Alaska Native, Asian, Black or African American, Native Hawaiin or Other Pacific Islander)
  - Probe seed: *Client.Client Race offers options no record uses (, American Indian or Alaska Native, Asian, Black or African American, Native Hawaiin or Other Pacific Islander) — are those still needed?*
- **FLD-053 Client.Funding Sources Used to Date** — 12 declared option(s) unused (Angel Investor, Bank Loan (Conventional), Bootstrap (Revenue Only), Crowdfunding, Equipment Financing, Grant, Line of Credit, Microloan, Other, Personal Savings, Revenue-Based Financing, Venture Capital)
  - Probe seed: *Client.Funding Sources Used to Date offers options no record uses (Angel Investor, Bank Loan (Conventional), Bootstrap (Revenue Only), Crowdfunding, Equipment Financing, Grant, Line of Credit, Microloan, Other, Personal Savings, Revenue-Based Financing, Venture Capital) — are those still needed?*
- **FLD-054 Client.Geographic Market Reach** — 6 declared option(s) unused (International, Local (within Cuyahoga County), Multi-State, National, Regional (Northeast Ohio), Statewide (Ohio))
  - Probe seed: *Client.Geographic Market Reach offers options no record uses (International, Local (within Cuyahoga County), Multi-State, National, Regional (Northeast Ohio), Statewide (Ohio)) — are those still needed?*
- **FLD-062 Client.Primary Customer Type** — 4 declared option(s) unused (Business-to-Business (B2B), Business-to-Government (B2G), Nonprofit-to-Donor (for nonprofit clients), Other)
  - Probe seed: *Client.Primary Customer Type offers options no record uses (Business-to-Business (B2B), Business-to-Government (B2G), Nonprofit-to-Donor (for nonprofit clients), Other) — are those still needed?*
- **FLD-066 Client.Sales Channels Used** — 9 declared option(s) unused (Catalog or Direct Mail, Distributors and Resellers, E-Commerce Website, Online Marketplaces (Amazon, Etsy, eBay, etc.), Other, Referrals and Word of Mouth, Subscription or Recurring Revenue, Trade Shows and Events, Wholesale to Other Businesses)
  - Probe seed: *Client.Sales Channels Used offers options no record uses (Catalog or Direct Mail, Distributors and Resellers, E-Commerce Website, Online Marketplaces (Amazon, Etsy, eBay, etc.), Other, Referrals and Word of Mouth, Subscription or Recurring Revenue, Trade Shows and Events, Wholesale to Other Businesses) — are those still needed?*
- **FLD-069 Client.Veteran Status** — 7 declared option(s) unused (, Active Duty, Member of National Guard, Member of Reserve, Service Disabled Veteran, Spouse of Military Member, Veteran)
  - Probe seed: *Client.Veteran Status offers options no record uses (, Active Duty, Member of National Guard, Member of Reserve, Service Disabled Veteran, Spouse of Military Member, Veteran) — are those still needed?*
- **FLD-043 Client.Active Social Media Presence** — 8 declared option(s) unused (Facebook, Instagram, LinkedIn, Other, Pinterest, TikTok, X (formerly Twitter), YouTube)
  - Probe seed: *Client.Active Social Media Presence offers options no record uses (Facebook, Instagram, LinkedIn, Other, Pinterest, TikTok, X (formerly Twitter), YouTube) — are those still needed?*
- **FLD-175 Event Registration.Attendance Status** — 4 declared option(s) unused (Attended, Cancelled, No-Show, Registered)
  - Probe seed: *Event Registration.Attendance Status offers options no record uses (Attended, Cancelled, No-Show, Registered) — are those still needed?*
- **FLD-185 Partner.CBM Value Provided** — 6 declared option(s) unused (Co-hosted events or webinars, Free mentoring support, Other, Recognition on CBM Materials, Recognition on CBM Site, Speking Opportunities)
  - Probe seed: *Partner.CBM Value Provided offers options no record uses (Co-hosted events or webinars, Free mentoring support, Other, Recognition on CBM Materials, Recognition on CBM Site, Speking Opportunities) — are those still needed?*
- **FLD-095 Company.Partner Type** — 6 declared option(s) unused (Client Referral, Co-Sponsor, Funder, Joint Marketing, Mentor Source, Other)
  - Probe seed: *Company.Partner Type offers options no record uses (Client Referral, Co-Sponsor, Funder, Joint Marketing, Mentor Source, Other) — are those still needed?*
- **FLD-182 Event Registration.Registration Source** — 2 declared option(s) unused (Online, Walk-In)
  - Probe seed: *Event Registration.Registration Source offers options no record uses (Online, Walk-In) — are those still needed?*
- **FLD-183 Event Registration.Reminders Sent** — 3 declared option(s) unused (1-day, 1-hour, 7-day)
  - Probe seed: *Event Registration.Reminders Sent offers options no record uses (1-day, 1-hour, 7-day) — are those still needed?*

### G5 — Automation referencing missing fields

none found

### G6 — Empty roles

*Not evaluated: role membership is not captured by the v1 audit; review role assignment in the source admin UI during triage.*

## Candidates by Best-Guess Domain

### Unassigned (best guess — triage assigns)

#### ENT-004 Contact (candidate) — band T3

- Kind: —; 48 records, newest 2026-06-12T15:33:30
- Curated UI: layouts captured (bottomPanelsDetail, bottomPanelsDetailSmall, detail, detailConvert, detailSmall, filters, kanban, list, listSmall, massUpdate, relationships, sidePanelsDetailSmall)

| Field | Name | Type | Band | Population | Last populated | Options | Flags |
|---|---|---|---|---|---|---|---|
| FLD-110 | Contact Type | multi_enum | T1 | 48 / 100.0% | 2026-06-12T15:33:30 | 5 of 8 used | ghost_options: 3 |
| FLD-108 | CBM Client Profile | reference | T1 | 21 / 43.8% | 2026-06-08T15:08:26 |  |  |
| FLD-115 | Mentor Profile | reference | T1 | 17 / 35.4% | 2026-06-12T15:33:30 |  |  |
| FLD-118 | Preferred Name | text | T1 | 14 / 29.2% | 2026-06-12T15:33:30 |  |  |
| FLD-113 | LinkedIn Profile | text | T1 | 5 / 10.4% | 2026-06-12T15:33:30 |  |  |
| FLD-116 | Partners Managed | reference | T2 | 2 / 4.2% | 2026-06-11T03:43:47 |  | low_population |
| FLD-122 | Suffix | enum | T2 | 1 / 2.1% | 2026-06-02T12:57:41 | 1 of 7 used | ghost_options: 6, low_population |
| FLD-109 | Client Company | reference | T2 | 2 / 4.2% | 2026-05-17T20:18:37 |  | low_population |
| FLD-106 | Birthday | date | T2 | 1 / 2.1% | 2026-05-17T05:01:04 |  | low_population |
| FLD-117 | Personal Profile | long_text | T2 | 1 / 2.1% | 2026-05-17T05:01:04 |  | low_population |
| FLD-121 | Spouse Name | text | T2 | 1 / 2.1% | 2026-05-17T05:01:04 |  | low_population |
| FLD-107 | Calls | reference | T3/T4 (use unprofiled) | — (no records) |  |  |  |
| FLD-111 | Contributions | reference | T3/T4 (use unprofiled) | — (no records) |  |  |  |
| FLD-112 | Documents | reference | T3/T4 (use unprofiled) | — (no records) |  |  |  |
| FLD-114 | Meetings | reference | T3/T4 (use unprofiled) | — (no records) |  |  |  |
| FLD-119 | Related Partners | reference | T3/T4 (use unprofiled) | — (no records) |  |  |  |
| FLD-120 | Sponsor Profile | reference | T3/T4 (use unprofiled) | — (no records) |  |  |  |

#### ENT-009 Event (candidate) — band T1

- Kind: event; 33 records, newest 2026-06-11T23:00:06
- Curated UI: layouts captured (bottomPanelsDetail, bottomPanelsDetailSmall, detail, detailSmall, filters, kanban, list, listSmall, massUpdate)

| Field | Name | Type | Band | Population | Last populated | Options | Flags |
|---|---|---|---|---|---|---|---|
| FLD-166 | Event Type | enum | T1 | 33 / 100.0% | 2026-06-11T23:00:06 | 1 of 4 used | ghost_options: 3 |
| FLD-167 | Format | enum | T1 | 33 / 100.0% | 2026-06-11T23:00:06 | 1 of 3 used | ghost_options: 2 |
| FLD-168 | Location | long_text | T1 | 14 / 42.4% | 2026-06-08T13:30:11 |  |  |
| FLD-172 | Topic | enum | T1 | 3 / 9.1% | 2026-05-30T03:45:27 | 3 of 10 used | ghost_options: 7 |
| FLD-174 | Virtual Meeting URL | text | T1 | 2 / 6.1% | 2026-05-30T03:45:27 |  |  |
| FLD-161 | Event Fee | number | T2 | 1 / 3.0% | 2026-05-30T03:45:27 |  | low_population |
| FLD-163 | Event Overview | long_text | T2 | 1 / 3.0% | 2026-05-30T03:45:27 |  | low_population |
| FLD-173 | Venue Capacity | number | T2 | 1 / 3.0% | 2026-05-17T20:12:14 |  | low_population |
| FLD-160 | Documents | text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-162 | Event Graphic | text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-164 | Event Release Date | datetime | T2 | 0 / 0.0% |  |  | low_population |
| FLD-165 | Event Syllabus | long_text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-169 | Recording URL | text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-170 | Registration URL | text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-171 | Sponsor Graphic | text | T2 | 0 / 0.0% |  |  | low_population |

#### ENT-003 Company (candidate) — band T3

- Kind: —; 27 records, newest 2026-06-11T03:43:10
- Curated UI: layouts captured (bottomPanelsDetail, bottomPanelsDetailSmall, detail, detailConvert, detailSmall, filters, kanban, list, listSmall, massUpdate, sidePanelsDetailSmall)

| Field | Name | Type | Band | Population | Last populated | Options | Flags |
|---|---|---|---|---|---|---|---|
| FLD-077 | Business Stage | enum | T1 | 27 / 100.0% | 2026-06-11T03:43:10 | 5 of 5 used |  |
| FLD-079 | Client Status | enum | T1 | 27 / 100.0% | 2026-06-11T03:43:10 | 1 of 5 used | ghost_options: 4 |
| FLD-085 | Industry Sector | enum | T1 | 27 / 100.0% | 2026-06-11T03:43:10 | 10 of 20 used | ghost_options: 10 |
| FLD-094 | Partner Status | enum | T1 | 27 / 100.0% | 2026-06-11T03:43:10 | 1 of 4 used | ghost_options: 3 |
| FLD-081 | Company Type | multi_enum | T1 | 22 / 81.5% | 2026-06-08T15:08:26 | 3 of 5 used | ghost_options: 2 |
| FLD-078 | Client Profile | reference | T1 | 21 / 77.8% | 2026-06-08T15:08:26 |  |  |
| FLD-071 | Account Type | multi_enum | T1 | 20 / 74.1% | 2026-06-11T03:43:10 | 2 of 3 used | ghost_options: 1 |
| FLD-088 | Organization Type | enum | T1 | 8 / 29.6% | 2026-06-11T03:43:10 | 2 of 2 used |  |
| FLD-086 | Industry Subsector | enum | T1 | 5 / 18.5% | 2026-05-19T03:40:22 | 1 of 2 used | ghost_options: 1 |
| FLD-090 | Partner Contact Cadence | enum | T1 | 5 / 18.5% | 2026-06-11T03:43:10 | 1 of 5 used | ghost_options: 4 |
| FLD-102 | Sponsorship Level | enum | T1 | 5 / 18.5% | 2026-06-11T03:43:10 | 2 of 5 used | ghost_options: 3 |
| FLD-093 | Partner Profile | reference | T1 | 3 / 11.1% | 2026-06-11T03:43:10 |  |  |
| FLD-092 | Partner Organization Type | enum | T1 | 2 / 7.4% | 2026-06-11T03:43:10 | 1 of 7 used | ghost_options: 6 |
| FLD-098 | Primary Contact | reference | T1 | 2 / 7.4% | 2026-05-17T06:12:33 |  |  |
| FLD-101 | Sponsor Profile | reference | T1 | 2 / 7.4% | 2026-05-28T14:12:13 |  |  |
| FLD-072 | Annual Pledge Amount | money | T2 | 1 / 3.7% | 2026-05-17T06:12:33 |  | low_population |
| FLD-073 | Annual Pledge Amount (Converted) | money | T2 | 1 / 3.7% | 2026-05-17T06:12:33 |  | low_population |
| FLD-074 | Annual Pledge Amount (Currency) | enum | T2 | 1 / 3.7% | 2026-05-17T06:12:33 |  | low_population |
| FLD-104 | Sponsorship Start Date | date | T2 | 1 / 3.7% | 2026-05-17T06:12:33 |  | low_population |
| FLD-075 | Applicant Since | datetime | T2 | 0 / 0.0% |  |  | low_population |
| FLD-076 | Assigned Liaison | reference | T2 | 0 / 0.0% |  |  | low_population |
| FLD-080 | Company Notes | long_text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-087 | LinkedIn Page | text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-089 | Parent Account | reference | T2 | 0 / 0.0% |  |  | low_population |
| FLD-091 | Partner Notes | long_text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-095 | Partner Type | derived | T2 | 0 / 0.0% |  | 0 of 6 used | ghost_options: 6, low_population |
| FLD-096 | Partnership Agreement Date | date | T2 | 0 / 0.0% |  |  | low_population |
| FLD-097 | Partnership Start Date | date | T2 | 0 / 0.0% |  |  | low_population |
| FLD-099 | Public Announcement Allowed | boolean | T2 | 27 / 100.0% |  |  |  |
| FLD-100 | Sponsor Notes | long_text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-103 | Sponsorship Renewal Date | date | T2 | 0 / 0.0% |  |  | low_population |
| FLD-105 | Target Population | long_text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-082 | Contributions | reference | T3/T4 (use unprofiled) | — (no records) |  |  |  |
| FLD-083 | Documents | reference | T3/T4 (use unprofiled) | — (no records) |  |  |  |
| FLD-084 | Engagements | reference | T3/T4 (use unprofiled) | — (no records) |  |  |  |

#### ENT-001 CBM Member (candidate) — band T1

- Kind: —; 23 records, newest 2026-06-12T15:52:16
- Curated UI: layouts captured (bottomPanelsDetail, bottomPanelsDetailSmall, detail, detailSmall, filters, kanban, list, listSmall, massUpdate)

| Field | Name | Type | Band | Population | Last populated | Options | Flags |
|---|---|---|---|---|---|---|---|
| FLD-004 | Available Capacity | number | T1 | 23 / 100.0% | 2026-06-12T15:52:16 |  |  |
| FLD-010 | Current Active Clients | number | T1 | 23 / 100.0% | 2026-06-12T15:52:16 |  |  |
| FLD-021 | Industry Sector | enum | T1 | 23 / 100.0% | 2026-06-12T15:52:16 | 7 of 20 used | ghost_options: 13 |
| FLD-024 | Mentor Status | enum | T1 | 23 / 100.0% | 2026-06-12T15:52:16 | 2 of 8 used | ghost_options: 6 |
| FLD-025 | Mentor Type | enum | T1 | 23 / 100.0% | 2026-06-12T15:52:16 | 2 of 6 used | ghost_options: 4 |
| FLD-026 | Mentoring Focus Areas | multi_enum | T1 | 19 / 82.6% | 2026-06-12T15:44:01 | 19 of 42 used | ghost_options: 23 |
| FLD-041 | Why Interested in Mentoring | long_text | T1 | 17 / 73.9% | 2026-06-12T15:33:31 |  |  |
| FLD-019 | Fluent Languages | multi_enum | T1 | 16 / 69.6% | 2026-06-12T15:44:01 | 2 of 36 used | ghost_options: 34 |
| FLD-031 | Professional Bio | long_text | T1 | 16 / 69.6% | 2026-06-12T15:44:01 |  |  |
| FLD-020 | How did you hear about CBM? | text | T1 | 15 / 65.2% | 2026-06-12T15:33:31 |  |  |
| FLD-012 | Departure Reason | enum | T1 | 8 / 34.8% | 2026-06-12T15:52:16 | 1 of 5 used | ghost_options: 4 |
| FLD-015 | Dues Status | enum | T1 | 8 / 34.8% | 2026-06-12T15:52:16 | 2 of 3 used | ghost_options: 1 |
| FLD-008 | CBM Email | text | T1 | 6 / 26.1% | 2026-06-12T15:44:01 |  |  |
| FLD-023 | Mentor Start Date | date | T1 | 5 / 21.7% | 2026-06-12T15:44:01 |  |  |
| FLD-022 | Maximum Client Capacity | number | T1 | 3 / 13.0% | 2026-06-12T15:44:01 |  |  |
| FLD-003 | Area Of Expertise | multi_enum | T1 | 2 / 8.7% | 2026-06-12T15:44:01 | 2 of 2 used |  |
| FLD-042 | Years of Industry Experience | number | T1 | 2 / 8.7% | 2026-06-12T15:44:01 |  |  |
| FLD-001 | AboutMentor | long_text | T2 | 1 / 4.3% | 2026-06-04T19:26:12 |  | low_population |
| FLD-006 | Background Check Date | date | T2 | 1 / 4.3% | 2026-06-04T19:26:12 |  | low_population |
| FLD-013 | Dues Payment Date | date | T2 | 1 / 4.3% | 2026-06-04T19:26:12 |  | low_population |
| FLD-014 | Dues Renewal Date | date | T2 | 1 / 4.3% | 2026-06-04T19:26:12 |  | low_population |
| FLD-016 | Ethics Agreement Acceptance Date/Time | datetime | T2 | 1 / 4.3% | 2026-06-04T19:26:12 |  | low_population |
| FLD-027 | Mentoring Skills | long_text | T2 | 1 / 4.3% | 2026-06-04T19:26:12 |  | low_population |
| FLD-040 | Training Completion Date | date | T2 | 1 / 4.3% | 2026-06-04T19:26:12 |  | low_population |
| FLD-002 | Accepting New Clients | boolean | T2 | 23 / 100.0% |  |  |  |
| FLD-005 | Background Check Completed | boolean | T2 | 23 / 100.0% |  |  |  |
| FLD-007 | Board Position | text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-009 | City | derived | T2 | 0 / 0.0% |  |  | low_population |
| FLD-011 | Departure Date | date | T2 | 0 / 0.0% |  |  | low_population |
| FLD-017 | Ethics Agreement Accepted | boolean | T2 | 23 / 100.0% |  |  |  |
| FLD-018 | Felony Conviction | boolean | T2 | 23 / 100.0% |  |  |  |
| FLD-028 | Personal Email | derived | T2 | 0 / 0.0% |  |  | low_population |
| FLD-029 | Phone | derived | T2 | 0 / 0.0% |  |  | low_population |
| FLD-030 | PostalCode | derived | T2 | 0 / 0.0% |  |  | low_population |
| FLD-032 | Profile Photo | text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-033 | Resume Upload | text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-034 | Street | derived | T2 | 0 / 0.0% |  |  | low_population |
| FLD-035 | TermsAccepted | boolean | T2 | 23 / 100.0% |  |  |  |
| FLD-036 | Total Lifetime Sessions | number | T2 | 0 / 0.0% |  |  | low_population |
| FLD-037 | Total Mentoring Hours | number | T2 | 0 / 0.0% |  |  | low_population |
| FLD-038 | Total Sessions (Last 30 Days) | number | T2 | 0 / 0.0% |  |  | low_population |
| FLD-039 | Training Completed | boolean | T2 | 23 / 100.0% |  |  |  |

#### ENT-002 Client (candidate) — band T1

- Kind: —; 23 records, newest 2026-06-08T15:08:26
- Curated UI: layouts captured (bottomPanelsDetail, bottomPanelsDetailSmall, detail, detailSmall, filters, kanban, list, listSmall, massUpdate)

| Field | Name | Type | Band | Population | Last populated | Options | Flags |
|---|---|---|---|---|---|---|---|
| FLD-058 | Legal Entity Type | enum | T1 | 4 / 17.4% | 2026-06-04T19:59:41 | 1 of 12 used | ghost_options: 11 |
| FLD-044 | Annual Revenue Range | enum | T1 | 3 / 13.0% | 2026-06-04T19:59:41 | 2 of 11 used | ghost_options: 9 |
| FLD-057 | Industry Sector | enum | T1 | 3 / 13.0% | 2026-06-04T19:59:41 | 1 of 20 used | ghost_options: 19 |
| FLD-063 | Profitability Status | enum | T1 | 3 / 13.0% | 2026-06-04T19:59:41 | 2 of 6 used | ghost_options: 4 |
| FLD-065 | Revenue Trend (last 12 months) | enum | T1 | 3 / 13.0% | 2026-06-04T19:59:41 | 1 of 6 used | ghost_options: 5 |
| FLD-051 | Fiscal Year End | enum | T1 | 2 / 8.7% | 2026-06-04T19:59:41 | 1 of 12 used | ghost_options: 11 |
| FLD-045 | Certifications Currently Held | multi_enum | T2 | 1 / 4.3% | 2026-05-15T19:34:28 | 2 of 16 used | ghost_options: 14, low_population |
| FLD-046 | Client Ethnicity | enum | T2 | 1 / 4.3% | 2026-05-15T19:34:28 | 1 of 3 used | ghost_options: 2, low_population |
| FLD-047 | Client Race | enum | T2 | 1 / 4.3% | 2026-05-15T19:34:28 | 1 of 6 used | ghost_options: 5, low_population |
| FLD-052 | Formation Date | date | T2 | 1 / 4.3% | 2026-05-15T19:34:28 |  | low_population |
| FLD-053 | Funding Sources Used to Date | multi_enum | T2 | 1 / 4.3% | 2026-05-15T19:34:28 | 3 of 15 used | ghost_options: 12, low_population |
| FLD-054 | Geographic Market Reach | enum | T2 | 1 / 4.3% | 2026-05-15T19:34:28 | 1 of 7 used | ghost_options: 6, low_population |
| FLD-062 | Primary Customer Type | multi_enum | T2 | 1 / 4.3% | 2026-05-15T19:34:28 | 1 of 5 used | ghost_options: 4, low_population |
| FLD-066 | Sales Channels Used | multi_enum | T2 | 1 / 4.3% | 2026-05-15T19:34:28 | 2 of 11 used | ghost_options: 9, low_population |
| FLD-069 | Veteran Status | enum | T2 | 1 / 4.3% | 2026-05-15T19:34:28 | 1 of 8 used | ghost_options: 7, low_population |
| FLD-043 | Active Social Media Presence | multi_enum | T2 | 0 / 0.0% |  | 0 of 8 used | ghost_options: 8, low_population |
| FLD-048 | Conducts Business Primarily Online | boolean | T2 | 23 / 100.0% |  |  |  |
| FLD-049 | Contact Email | derived | T2 | 0 / 0.0% |  |  | low_population |
| FLD-050 | Federal EIN Obtained | boolean | T2 | 23 / 100.0% |  |  |  |
| FLD-055 | Has Claimed Google Business Profile | boolean | T2 | 23 / 100.0% |  |  |  |
| FLD-056 | Home-Based Business | boolean | T2 | 23 / 100.0% |  |  |  |
| FLD-059 | Local Licenses and Permits Held | long_text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-060 | Most Recent Full Year Revenue | money | T2 | 0 / 0.0% |  |  | low_population |
| FLD-061 | Ohio Vendor's License Obtained | boolean | T2 | 23 / 100.0% |  |  |  |
| FLD-064 | Registered on SAM.gov | boolean | T2 | 23 / 100.0% |  |  |  |
| FLD-067 | State of Formation | text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-068 | Uses Email Marketing | boolean | T2 | 23 / 100.0% |  |  |  |
| FLD-070 | Year Founded | number | T2 | 0 / 0.0% |  |  | low_population |

#### ENT-008 Engagement (candidate) — band T1

- Kind: —; 19 records, newest 2026-06-09T20:00:25
- Curated UI: layouts captured (bottomPanelsDetail, bottomPanelsDetailSmall, detail, detailSmall, filters, kanban, list, listSmall, massUpdate)

| Field | Name | Type | Band | Population | Last populated | Options | Flags |
|---|---|---|---|---|---|---|---|
| FLD-145 | Engagement Status | enum | T1 | 19 / 100.0% | 2026-06-09T20:00:25 | 6 of 12 used | ghost_options: 6 |
| FLD-149 | Mentoring Focus Areas | multi_enum | T1 | 19 / 100.0% | 2026-06-09T20:00:25 | 13 of 42 used | ghost_options: 29 |
| FLD-150 | Mentoring Needs Description | long_text | T1 | 19 / 100.0% | 2026-06-09T20:00:25 |  |  |
| FLD-148 | Meeting Cadence | enum | T1 | 8 / 42.1% | 2026-06-09T20:00:25 | 2 of 4 used | ghost_options: 2 |
| FLD-141 | Close Reason | enum | T1 | 7 / 36.8% | 2026-06-09T20:00:25 | 1 of 4 used | ghost_options: 3 |
| FLD-144 | Engagement Start Date | date | T1 | 3 / 15.8% | 2026-06-09T20:00:25 |  |  |
| FLD-158 | Total Sessions | number | T1 | 3 / 15.8% | 2026-06-05T14:22:17 |  |  |
| FLD-143 | Engagement Notes | long_text | T1 | 2 / 10.5% | 2026-06-03T14:40:40 |  |  |
| FLD-153 | Next Session Date/Time | datetime | T1 | 1 / 5.3% | 2026-05-15T19:47:09 |  |  |
| FLD-140 | Close Date | date | T2 | 0 / 0.0% |  |  | low_population |
| FLD-142 | Employment Increase Percentage | number | T2 | 0 / 0.0% |  |  | low_population |
| FLD-146 | Hold End Date | date | T2 | 0 / 0.0% |  |  | low_population |
| FLD-147 | Last Session Date | date | T2 | 0 / 0.0% |  |  | low_population |
| FLD-151 | New Business Started | boolean | T2 | 19 / 100.0% |  |  |  |
| FLD-152 | New Location Opened | boolean | T2 | 19 / 100.0% |  |  |  |
| FLD-154 | Revenue Increase Percentage | number | T2 | 0 / 0.0% |  |  | low_population |
| FLD-155 | Significant Employment Increase | boolean | T2 | 19 / 100.0% |  |  |  |
| FLD-156 | Significant Revenue Increase | boolean | T2 | 19 / 100.0% |  |  |  |
| FLD-157 | Total Session Hours | number | T2 | 0 / 0.0% |  |  | low_population |
| FLD-159 | Total Sessions (Last 30 Days) | number | T2 | 0 / 0.0% |  |  | low_population |

#### ENT-013 Session (candidate) — band T1

- Kind: event; 15 records, newest 2026-06-12T16:04:05
- Curated UI: layouts captured (bottomPanelsDetail, bottomPanelsDetailSmall, detail, detailSmall, filters, kanban, list, listSmall, massUpdate)

| Field | Name | Type | Band | Population | Last populated | Options | Flags |
|---|---|---|---|---|---|---|---|
| FLD-209 | Session Type | enum | T1 | 15 / 100.0% | 2026-06-12T16:04:05 | 2 of 3 used | ghost_options: 1 |
| FLD-205 | Meeting Location Type | enum | T1 | 5 / 33.3% | 2026-05-22T18:26:57 | 2 of 4 used | ghost_options: 2 |
| FLD-208 | Session Notes | long_text | T1 | 4 / 26.7% | 2026-06-12T16:04:05 |  |  |
| FLD-206 | Next Session Date/Time | datetime | T1 | 3 / 20.0% | 2026-06-12T16:04:05 |  |  |
| FLD-207 | Next Steps | long_text | T1 | 2 / 13.3% | 2026-06-12T16:04:05 |  |  |
| FLD-204 | Location Details | text | T1 | 1 / 6.7% | 2026-05-17T18:21:05 |  |  |
| FLD-210 | Topics Covered | multi_enum | T2 | 0 / 0.0% |  |  | low_population |

#### ENT-011 Partner (candidate) — band T1

- Kind: —; 3 records, newest 2026-06-11T03:45:51
- Curated UI: layouts captured (bottomPanelsDetail, bottomPanelsDetailSmall, detail, detailSmall, filters, kanban, list, listSmall, massUpdate)

| Field | Name | Type | Band | Population | Last populated | Options | Flags |
|---|---|---|---|---|---|---|---|
| FLD-192 | Partnership Status | enum | T1 | 3 / 100.0% | 2026-06-11T03:45:51 | 1 of 6 used | ghost_options: 5 |
| FLD-187 | Partner Contact Cadence | enum | T1 | 2 / 66.7% | 2026-06-11T03:45:51 | 2 of 5 used | ghost_options: 3 |
| FLD-193 | Partnership Type | enum | T1 | 2 / 66.7% | 2026-06-11T03:45:51 | 2 of 5 used | ghost_options: 3 |
| FLD-186 | Last Contacted | date | T1 | 1 / 33.3% | 2026-06-11T03:45:51 |  |  |
| FLD-189 | Partner Notes | long_text | T1 | 1 / 33.3% | 2026-05-19T18:32:55 |  |  |
| FLD-190 | Partnership Agreement Date | date | T1 | 1 / 33.3% | 2026-05-19T18:32:55 |  |  |
| FLD-191 | Partnership Start Date | date | T1 | 1 / 33.3% | 2026-05-19T18:32:55 |  |  |
| FLD-194 | Partnership Value | multi_enum | T1 | 1 / 33.3% | 2026-05-19T18:32:55 | 3 of 8 used | ghost_options: 5 |
| FLD-195 | Relation Goals Established | enum | T1 | 1 / 33.3% | 2026-06-11T03:45:51 | 1 of 4 used | ghost_options: 3 |
| FLD-185 | CBM Value Provided | multi_enum | T2 | 0 / 0.0% |  | 0 of 6 used | ghost_options: 6, low_population |
| FLD-188 | Partner Email | derived | T2 | 0 / 0.0% |  |  | low_population |

#### ENT-005 Contribution (candidate) — band T1

- Kind: —; 2 records, newest 2026-06-09T14:38:05
- Curated UI: layouts captured (bottomPanelsDetailSmall, detail, detailSmall, kanban, list, listSmall, massUpdate)

| Field | Name | Type | Band | Population | Last populated | Options | Flags |
|---|---|---|---|---|---|---|---|
| FLD-128 | Contribution Type | enum | T1 | 2 / 100.0% | 2026-06-09T14:38:05 | 1 of 3 used | ghost_options: 2 |
| FLD-131 | Gift Type | enum | T1 | 2 / 100.0% | 2026-06-09T14:38:05 | 2 of 7 used | ghost_options: 5 |
| FLD-137 | Status | enum | T1 | 2 / 100.0% | 2026-06-09T14:38:05 | 1 of 6 used | ghost_options: 5 |
| FLD-125 | Amount | money | T1 | 1 / 50.0% | 2026-06-09T14:38:05 |  |  |
| FLD-136 | Received Date | date | T1 | 1 / 50.0% | 2026-06-09T14:38:05 |  |  |
| FLD-123 | Acknowledgment Date | date | T2 | 0 / 0.0% |  |  | low_population |
| FLD-124 | Acknowledgment Sent | boolean | T2 | 2 / 100.0% |  |  |  |
| FLD-126 | Application Date | date | T2 | 0 / 0.0% |  |  | low_population |
| FLD-127 | Commitment Date | date | T2 | 0 / 0.0% |  |  | low_population |
| FLD-129 | Designation | text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-130 | Expected Payment Date | date | T2 | 0 / 0.0% |  |  | low_population |
| FLD-132 | In-Kind Description | text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-133 | In-Kind Valuation Basis | text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-134 | Next Grant Deadline | date | T2 | 0 / 0.0% |  |  | low_population |
| FLD-135 | Notes | long_text | T2 | 0 / 0.0% |  |  | low_population |

#### ENT-014 Sponsor (candidate) — band T1

- Kind: —; 2 records, newest 2026-05-28T14:12:19
- Curated UI: layouts captured (bottomPanelsDetail, bottomPanelsDetailSmall, detail, detailSmall, kanban, list, listSmall, massUpdate)

| Field | Name | Type | Band | Population | Last populated | Options | Flags |
|---|---|---|---|---|---|---|---|
| FLD-211 | Last Contacted | date | T1 | 1 / 50.0% | 2026-05-19T04:22:34 |  |  |
| FLD-213 | Primary CBM Manager | reference | T1 | 1 / 50.0% | 2026-05-19T04:22:34 |  |  |
| FLD-212 | Last Contribution Date | date | T2 | 0 / 0.0% |  |  | low_population |
| FLD-214 | Total Contribution | money | T2 | 0 / 0.0% |  |  | low_population |

#### ENT-006 Document (candidate) — band T3

- Kind: —; 1 records, newest 2026-05-22T14:07:18
- Curated UI: layouts captured (bottomPanelsDetail, bottomPanelsDetailSmall, detail, detailSmall, filters, kanban, list, listSmall, massUpdate, relationships)

| Field | Name | Type | Band | Population | Last populated | Options | Flags |
|---|---|---|---|---|---|---|---|
| FLD-138 | Engagement | reference | T1 | 1 / 100.0% | 2026-05-22T14:07:18 |  |  |

#### ENT-012 Resource (candidate) — band T1

- Kind: —; 1 records, newest 2026-06-01T15:44:21
- Curated UI: layouts captured (bottomPanelsDetailSmall, detail, detailSmall, kanban, list, listSmall, massUpdate)

| Field | Name | Type | Band | Population | Last populated | Options | Flags |
|---|---|---|---|---|---|---|---|
| FLD-196 | Category | enum | T1 | 1 / 100.0% | 2026-06-01T15:44:21 | 1 of 7 used | ghost_options: 6 |
| FLD-201 | Resource Date | date | T1 | 1 / 100.0% | 2026-06-01T15:44:21 |  |  |
| FLD-202 | Resource Type | enum | T1 | 1 / 100.0% | 2026-06-01T15:44:21 | 1 of 7 used | ghost_options: 6 |
| FLD-203 | URL | text | T1 | 1 / 100.0% | 2026-06-01T15:44:21 |  |  |
| FLD-197 | Featured | boolean | T2 | 1 / 100.0% |  |  |  |
| FLD-198 | File | text | T2 | 0 / 0.0% |  |  | low_population |
| FLD-199 | Listed Publicly | boolean | T2 | 1 / 100.0% |  |  |  |
| FLD-200 | Published At | datetime | T2 | 0 / 0.0% |  |  | low_population |

#### ENT-007 Email (candidate) — band T3/T4 (use unprofiled)

- Kind: —; — (no records)
- Curated UI: layouts captured (bottomPanelsDetailSmall, detail, detailSmall, filters, kanban, list, listSmall, massUpdate)

| Field | Name | Type | Band | Population | Last populated | Options | Flags |
|---|---|---|---|---|---|---|---|
| FLD-139 | Partner Profile | reference | T1/T2 (use unprofiled) | — (no records) |  |  |  |

#### ENT-010 Event Registration (candidate) — band T2

- Kind: —; 0 records
- Flags: dormant, empty
- Curated UI: layouts captured (bottomPanelsDetailSmall, detail, detailSmall, kanban, list, listSmall, massUpdate)

| Field | Name | Type | Band | Population | Last populated | Options | Flags |
|---|---|---|---|---|---|---|---|
| FLD-175 | Attendance Status | enum | T1/T2 (use unprofiled) | 0 /  |  | 0 of 4 used | ghost_options: 4 |
| FLD-176 | Cancellation Date | datetime | T1/T2 (use unprofiled) | 0 /  |  |  |  |
| FLD-177 | Cancellation Reason | long_text | T1/T2 (use unprofiled) | 0 /  |  |  |  |
| FLD-178 | Confirmation Sent | datetime | T1/T2 (use unprofiled) | 0 /  |  |  |  |
| FLD-179 | Last Communication Bounced | datetime | T1/T2 (use unprofiled) | 0 /  |  |  |  |
| FLD-180 | Post-Event Follow-Up Sent | datetime | T1/T2 (use unprofiled) | 0 /  |  |  |  |
| FLD-181 | Registration Date | datetime | T1/T2 (use unprofiled) | 0 /  |  |  |  |
| FLD-182 | Registration Source | enum | T1/T2 (use unprofiled) | 0 /  |  | 0 of 2 used | ghost_options: 2 |
| FLD-183 | Reminders Sent | multi_enum | T1/T2 (use unprofiled) | 0 /  |  | 0 of 3 used | ghost_options: 3 |
| FLD-184 | Special Requests | long_text | T1/T2 (use unprofiled) | 0 /  |  |  |  |

## Personas

Source roles and teams are persona *evidence*, not personas; triage confirms or merges them against the Phase 1 interview personas. Empty-role findings are cross-referenced in G6, not duplicated here.

| Persona | Name | Kind | Scope access | Status |
|---|---|---|---|---|
| PER-001 | Client Assignment Role | role | `{"Account": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "all"}, "ClientProfile": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "all"}, "Contact": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "all"}, "Document": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "no"}, "Email": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "no"}, "Engagement": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "all"}, "KnowledgeBaseArticle": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "no"}, "MentorProfile": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "all"}, "Report": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "no"}, "Session": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "all"}}` | candidate |
| PER-003 | ClientMentorIntakeRole | role | `{"Account": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "no"}, "ClientProfile": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "no"}, "Contact": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "no"}, "Engagement": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "no"}, "Event": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "no"}, "MentorProfile": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "no"}}` | candidate |
| PER-004 | ContentAndEventAdmin | role | `{"Event": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "no"}}` | candidate |
| PER-006 | Data Integrity Team Role | role |  | candidate |
| PER-007 | Event Manager Role | role |  | candidate |
| PER-008 | Mentor Administration Role | role | `{"MentorProfile": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "all"}}` | candidate |
| PER-010 | Mentor Role | role | `{"Account": {"create": true, "delete": "no", "edit": "own", "read": "all", "stream": "own"}, "ClientProfile": {"create": false, "delete": "no", "edit": "own", "read": "own", "stream": "own"}, "Contact": {"create": true, "delete": "no", "edit": "own", "read": "all", "stream": "own"}, "Document": {"create": true, "delete": "own", "edit": "own", "read": "team", "stream": "no"}, "Email": {"create": true, "delete": "own", "edit": "own", "read": "own", "stream": "no"}, "EmailTemplate": {"create": true, "delete": "own", "edit": "team", "read": "team", "stream": "no"}, "Engagement": {"create": false, "delete": "no", "edit": "own", "read": "own", "stream": "own"}, "Event": {"create": false, "delete": "no", "edit": "own", "read": "all", "stream": "own"}, "KnowledgeBaseArticle": {"create": false, "delete": "no", "edit": "no", "read": "team", "stream": "no"}, "MentorProfile": {"create": false, "delete": "no", "edit": "no", "read": "all", "stream": "no"}, "Report": {"create": true, "delete": "own", "edit": "own", "read": "team", "stream": "no"}, "ReportCategory": {"create": false, "delete": "no", "edit": "no", "read": "team", "stream": "no"}, "Session": {"create": true, "delete": "no", "edit": "own", "read": "own", "stream": "own"}, "User": {"create": false, "delete": "no", "edit": "own", "read": "team", "stream": "no"}}` | candidate |
| PER-013 | Partner Manager Role | role | `{"Account": {"create": true, "delete": "no", "edit": "team", "read": "team", "stream": "team"}, "Contact": {"create": true, "delete": "no", "edit": "team", "read": "team", "stream": "team"}, "PartnerProfile": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "all"}}` | candidate |
| PER-015 | Sponsor Manager Role | role | `{"Account": {"create": true, "delete": "no", "edit": "team", "read": "team", "stream": "team"}, "Contact": {"create": true, "delete": "no", "edit": "team", "read": "team", "stream": "team"}, "SponsorProfile": {"create": true, "delete": "no", "edit": "team", "read": "team", "stream": "no"}}` | candidate |
| PER-016 | Standard User | role | `{"Email": {"create": true, "delete": "no", "edit": "all", "read": "all", "stream": "no"}, "EmailTemplate": {"create": true, "delete": "no", "edit": "no", "read": "all", "stream": "no"}, "EmailTemplateCategory": {"create": false, "delete": "no", "edit": "no", "read": "all", "stream": "no"}, "Engagement": {"create": true, "delete": "no", "edit": "own", "read": "own", "stream": "no"}, "Event": {"create": true, "delete": "no", "edit": "own", "read": "own", "stream": "no"}, "MentorProfile": {"create": false, "delete": "no", "edit": "no", "read": "all", "stream": "no"}, "Session": {"create": true, "delete": "no", "edit": "own", "read": "own", "stream": "no"}}` | candidate |
| PER-002 | Client Assignment Team | team |  | candidate |
| PER-005 | Data Integrity Team | team |  | candidate |
| PER-009 | Mentor Administration Team | team |  | candidate |
| PER-011 | Mentor Team | team |  | candidate |
| PER-012 | Partner Management Team | team |  | candidate |
| PER-014 | Sponsor Management Team | team |  | candidate |
| PER-017 | System Administration Team | team |  | candidate |

## Standard/Custom Partition and Stock Usage

- Entities discovered: 10 custom, 13 standard
- Fields discovered: 208 custom, 0 standard
- Custom items are the candidate sections above; bare standard items deposit nothing by design (WTK-090 §3.2)

### Standard entities in real use (T3)

| Entity | Records | Newest | Note |
|---|---|---|---|
| User | 23 | 2026-06-12T03:56:24Z | confirmable into a candidate at triage |
| Case | 1 | 2026-06-01T16:34:29Z | confirmable into a candidate at triage |

### Standard fields in real use (T3)

*Stock fields were not audited (include_native_fields unset); entity-level stock usage only.*

## Coverage Appendix

Reconciliation (manifest items = rendered + named exclusions):

- bare standard dormant (T4 noise floor): 7
- bare standard in use (section U): 2
- candidate entities (section D): 14
- custom fields (section D): 208
- **Total:** 231 manifest items = 231 explained + 0 unexplained

### T4 — standard + dormant (noise floor)

- entity Call — 0 records
- entity Campaign — 0 records
- entity Lead — 0 records
- entity Meeting — 0 records
- entity Opportunity — 0 records
- entity Target List — 0 records
- entity Task — 0 records

### Anomalies

- {"entity": "User", "field": "emails", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "User", "field": "userData", "metric": "populated_count", "note": "isLinked rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "User", "field": "cAccounts", "metric": "populated_count", "note": "isLinked rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "Account", "field": "cCompanyPartnerType", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "Account", "field": "cPortalUsers", "metric": "populated_count", "note": "isLinked rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "Contact", "field": "accounts", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "Contact", "field": "calls", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "Contact", "field": "cases", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "Contact", "field": "cCEngagementsAsContact", "metric": "populated_count", "note": "isLinked rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "Contact", "field": "cCPresenterEvents", "metric": "populated_count", "note": "isLinked rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "Contact", "field": "cCEvents", "metric": "populated_count", "note": "isLinked rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "Contact", "field": "cCSessionsAttended", "metric": "populated_count", "note": "isLinked rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "Document", "field": "accounts", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "Document", "field": "contacts", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "CClientProfile", "field": "clientContactEmail", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "CEvent", "field": "eventGraphic", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "CEvent", "field": "sponsorGraphic", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "CMentorProfile", "field": "postalCode", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "CMentorProfile", "field": "personalEmail", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "CMentorProfile", "field": "contactPhone", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "CMentorProfile", "field": "contactCity", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "CMentorProfile", "field": "contactStreet", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "CMentorProfile", "field": "profilePhoto", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "CMentorProfile", "field": "resumeUpload", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- {"entity": "CPartnerProfile", "field": "partnerEmail", "metric": "populated_count", "note": "isNotNull rejected for attribute; metric scan-derived", "scope": "metric", "status": 400}
- Anomaly planning item: PI-004

- The placeholder domain `Baseline: espocrm @ crm-test.clevelandbusinessmentors.org` is a mechanical container pending Phase 3 triage re-homing, not a domain group

## Phase 2/3 Handoff Notes

- **Anchoring discipline:** this report is withheld from the stakeholder during Phase 2 until their unprompted account is captured; ghosts are introduced as probes, never as the opening frame (Master CRMBuilder PRD §7).
- The consultant reviews the gaps-and-ghosts list (147 item(s)) and flags the ones to raise as probes — a Phase 1.5 completion criterion.
- Phase 3 triage sessions batch by the 1 domain group(s) above (Master CRMBuilder PRD §8); group headings are best guesses — triage assigns.
