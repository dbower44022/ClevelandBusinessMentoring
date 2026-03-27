# CBM PRD: Intake Forms

**Cleveland Business Mentors**
Section PRD: Intake Forms
Version 0.1  |  Draft  |  2026
## 1. Overview
This PRD defines the two public-facing intake forms hosted on the CBM WordPress website. Each form collects applicant data and posts it to EspoCRM via the REST API, automatically creating the appropriate CRM records. The forms are built using Gravity Forms.

The two forms covered in this document are:
- Client Mentoring Request Form — collects information from prospective clients seeking mentoring services
- Mentor Application Form — collects information from prospective mentors applying to join the CBM mentor pool

## 2. Integration Architecture
Both forms follow the same integration pattern:
- The Gravity Forms plugin captures the submitted data
- On submission, the plugin fires a webhook or REST API call to EspoCRM
- EspoCRM’s REST API receives the payload and creates the appropriate records
- EspoCRM triggers any configured workflow actions (admin notifications, confirmation emails)

EspoCRM REST API authentication uses an API key scoped to a dedicated integration user account. Field mapping between form fields and EspoCRM entity fields is configured within Gravity Forms’ webhook/integration settings.

## 3. Client Mentoring Request Form
The Client Mentoring Request form is the primary intake channel for prospective clients. It is a public-facing form accessible from the Get Mentoring page of the CBM website.

### 3.1 Records Created
On submission, the form automatically creates three linked records in EspoCRM:
- Company record — the business being mentored
- Contact record — the submitting individual, flagged as Primary Contact = Yes, linked to the Company
- Engagement record — the mentoring relationship record, with Status = Submitted

The new Engagement appears immediately in the admin’s Submitted Engagements list view for review and assignment.

### 3.2 Post-Submission Behavior
- EspoCRM creates linked Company, Contact, and Engagement records (Engagement Status = Submitted)
- Admin receives an automatic system notification of the new submission
- Submitter receives a confirmation email acknowledging receipt of their request
- If the request is declined after admin review, Engagement Status is set to Declined and the admin notifies the applicant manually. No automated notification is sent.
- The Contact and Company records are retained permanently regardless of outcome.

### 3.3 Form Fields
The following fields are collected on the form. Contact record fields are noted; all remaining fields populate the Company record.

| Field | Required | Description / Notes |
| --- | --- | --- |
| First Name | Yes | Text field. Populates Contact record. |
| Last Name | Yes | Text field. Populates Contact record. |
| Email Address | Yes | Email field. Populates Contact record. Used for all follow-up communications including mentor introduction and Phase 2 form delivery. |
| Phone | Yes | Phone field. Populates Contact record. |
| Zip Code | Yes | Text field. Populates Contact record. Used for geographic reporting. |
| Business Name | No | Text field. Populates Company record. May be left blank for pre-startup applicants who have not yet named their business. |
| Website | No | URL field. Populates Company record. |
| Address | No | Address field (street, city, state, zip). Populates Company record. |
| Organization Type | No | Dropdown. Values: For-Profit | Non-Profit. Populates Company record. |
| Business Stage | Yes | Dropdown. Values: Pre-Startup | Startup | Early Stage | Growth Stage | Established. Populates Company record. |
| NAICS Sector | No | Dropdown. Top-level industry classification (20 NAICS sectors). Populates Company record. Drives NAICS Subsector filter. |
| NAICS Subsector | No | Dropdown. Filtered by selected NAICS Sector (~100 subsectors). Populates Company record. |
| Mentoring Focus Areas | Yes | Multi-select dropdown. Values to be defined by CBM leadership. Populates Company record. Used for mentor matching and funder reporting. |
| Mentoring Needs Description | Yes | Rich text field. Free-form description of what the client is seeking in a mentoring engagement. Populates Company record. |

## 4. Mentor Application Form
The Mentor Application form is the intake channel for prospective mentors. It is a public-facing form accessible from the Volunteer / Mentor page of the CBM website.

### 4.1 Records Created
On submission, the form automatically creates one record in EspoCRM:
- Contact record — with Contact Type = Mentor and Mentor Status = Submitted

The new application appears immediately in the admin’s Submitted Mentor Applications list view for review.

### 4.2 Post-Submission Behavior
- EspoCRM creates a Contact record (Contact Type = Mentor, Mentor Status = Submitted) with all submitted field values populated
- Terms & Conditions Accepted is set to Yes and Terms & Conditions Acceptance Date/Time is set to the submission timestamp
- Applicant receives a confirmation email to their personal email address acknowledging receipt and advising they will be contacted shortly
- Admin receives an automatic system notification of the new application
- If approved after review, admin changes Mentor Status to Provisional and begins the activation workflow (see CBM-PRD-CRM-Mentor.docx Section 4.2)
- If declined after review, admin changes Mentor Status to Declined and notifies the applicant manually. No automated notification is sent. The Contact record is retained permanently for historical reference.

### 4.3 Form Fields
The following fields are collected on the form. All fields populate the Contact record.

| Field | Required | Description / Notes |
| --- | --- | --- |
| First Name | Yes | Text field. |
| Middle Name | No | Text field. |
| Last Name | Yes | Text field. |
| Preferred Name | No | Text field. The name the mentor prefers to be called. Used in communications and mentor profile. |
| Personal Email | Yes | Email field. The applicant’s personal email — not a CBM Gmail address. Used for all onboarding communications prior to CBM Gmail activation. |
| Phone | No | Phone field. |
| Street Address | No | Address field (street, city, state, zip). |
| LinkedIn Profile URL | No | URL field. |
| Currently Employed | No | Checkbox. Whether the applicant is currently employed at time of application. |
| Professional Bio / Work Experience | No | Rich text field. Free-form description of professional background and work experience. Used for mentor profiles and matching. |
| Industry Experience and Expertise | No | Multi-select dropdown. Maps to NAICS Sectors and Skills & Expertise Tags on the Contact record. Values TBD. |
| Fluent Languages | No | Multi-select dropdown. Languages the applicant is fluent in. Values TBD. |
| Why Interested in Mentoring | No | Rich text field. The applicant’s stated motivation for joining CBM as a mentor. |
| How Did You Hear About CBM | No | Dropdown. Values TBD. Used for outreach and referral tracking. |
| Felony Conviction Disclosure | Yes | Checkbox or Yes/No field. Required disclosure. Reviewed by admin during application screening. |
| Terms & Conditions Acceptance | Yes | Checkbox. Must be checked before form can be submitted. Sets Terms & Conditions Accepted = Yes and records the acceptance timestamp on the Contact record. |

## 5. Open Questions
- Mentoring Focus Areas dropdown values — to be defined by CBM leadership before go-live
- Industry Experience and Expertise values on the Mentor Application form — to be aligned with final NAICS Sector list
- Fluent Languages dropdown values — to be defined
- “How Did You Hear About CBM” dropdown values — to be defined
- Confirmation email copy for both forms — to be written by CBM