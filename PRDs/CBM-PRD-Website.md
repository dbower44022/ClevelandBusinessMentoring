# CBM PRD: Website & Public Presence

**Cleveland Business Mentors**
Section PRD: Website & Public Presence
Version 0.1  |  Draft  |  2025

## 1. Overview
The CBM public website is the primary channel through which clients discover the organization, request mentoring, and register for workshops. It is also how prospective volunteers, donors, and ecosystem partners learn about CBM's mission and credibility.

## 2. Goals
- Clearly communicate who CBM is and who it serves
- Enable clients to request mentoring services
- Enable prospective volunteers to express interest in joining
- Promote upcoming workshops, clinics, and events
- Provide a curated Northeast Ohio resource guide
- Establish credibility and trustworthiness with donors and partners

## 3. Technical Architecture
### 3.1 Stack Decision
The website is implemented in WordPress. This approach was chosen for the following reasons:
- Rich plugin ecosystem — mature, well-supported plugins for forms, LMS integration, SEO, and accessibility
- CRM integration — form plugins (Gravity Forms or WPForms) post data directly to EspoCRM via the REST API
- LMS connectivity — proven integration paths between WordPress and Moodle
- Content management — non-technical staff can update pages, events, and resources without developer involvement
- Managed hosting options — the selected hosting provider handles WordPress core updates, security, backups, and SSL

### 3.2 Hosting Architecture
The website is hosted on a managed WordPress hosting provider. Managed WordPress hosting was selected to ensure WordPress core updates, security patches, daily backups, SSL, and server maintenance are handled by the provider rather than volunteer staff. The specific hosting provider is To Be Determined. Candidates under evaluation include managed WordPress platforms offering nonprofit discounts and Google Cloud infrastructure.

### 3.3 Deployment & Updates
Website updates are managed through the WordPress admin interface and deployed by the hosting provider’s managed infrastructure. The deployment model works as follows:
- Content updates (pages, posts, events) are made directly in the WordPress admin dashboard by authorized staff
- Theme, plugin, and configuration changes are managed by the tech admin via the WordPress admin interface or SFTP
- WordPress core, theme, and plugin updates are applied by the tech admin and tested in a staging environment before going live
- The hosting provider manages automatic daily backups, SSL renewal, and server-level security
This approach minimizes the operational burden on volunteer staff while ensuring the site remains secure, up to date, and reliably available.

## 4. Form & Dynamic Content Strategy
WordPress natively supports dynamic form processing through plugins. All intake and registration forms on the CBM website are built using a WordPress form plugin (Gravity Forms or WPForms) and post data directly to EspoCRM via the REST API. The key forms and their integration targets are:
- Client Mentoring Request form — posts to EspoCRM REST API; creates linked Company, Contact, and Engagement records (Engagement Status = Submitted)
- Mentor Application form — posts to EspoCRM REST API; creates a Contact record (Contact Type = Mentor, Mentor Status = Submitted)
- Workshop & Event Registration — to be defined; integration target TBD pending LMS and event management decisions
- Contact form — routes to CBM admin email via WordPress form plugin email notification; no CRM record created
Note: The WordPress form plugin selection (Gravity Forms vs. WPForms) is To Be Determined. Both support REST API webhooks and are compatible with the EspoCRM integration approach. Final selection will be made prior to site build.

### 4.1 Client Mentoring Request Form
The Client Mentoring Request form is the primary intake channel for prospective clients. It is a public-facing WordPress form accessible from the Get Mentoring page. On submission, the form posts data to EspoCRM via the REST API and automatically creates three linked records: a Company record (the business), a Contact record (the submitting individual, flagged as Primary Contact), and an Engagement record with Status = Submitted. The new submission appears immediately in the admin’s Submitted Engagements list view for review and assignment.
**Post-Submission Behavior**
- EspoCRM creates linked Company, Contact, and Engagement records (Engagement Status = Submitted)
- Admin receives an automatic system notification of the new submission
- Submitter receives a confirmation email acknowledging receipt of their request
- If the request is declined after admin review, Engagement Status is set to Declined and the admin notifies the applicant manually
**Form Fields**
The following fields are collected on the form. Fields marked Required must be completed before the form can be submitted. Contact record fields are noted; all remaining fields populate the Company record.

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
| Organization Type | Yes | Dropdown. Values: For-Profit | Non-Profit. Populates Company record. |
| Business Stage | Yes | Dropdown. Values: Pre-Startup | Startup | Early Stage | Growth Stage | Established. Populates Company record. |
| NAICS Sector | Yes | Dropdown. Top-level industry classification (20 NAICS sectors). Populates Company record. Drives NAICS Subsector filter. |
| NAICS Subsector | Yes | Dropdown. Filtered by selected NAICS Sector (~100 subsectors). Populates Company record. |
| Mentoring Focus Areas | Yes | Multi-select dropdown. Values to be defined by CBM leadership. Populates Company record. Used for mentor matching and funder reporting. |
| Mentoring Needs Description | Yes | Rich text field. Free-form description of what the client is seeking in a mentoring engagement. Populates Company record. |

### 4.2 Mentor Application Form
The Mentor Application form is the intake channel for prospective mentors. It is a public-facing WordPress form accessible from the Volunteer / Mentor page. On submission, the form posts data to EspoCRM via the REST API and automatically creates a Contact record with Contact Type = Mentor and Mentor Status = Submitted. The new application appears immediately in the admin’s Submitted Mentor Applications list view for review.
**Post-Submission Behavior**
- EspoCRM creates a Contact record (Contact Type = Mentor, Mentor Status = Submitted) with all submitted field values populated
- Terms & Conditions Accepted is set to Yes and Terms & Conditions Acceptance Date/Time is set to the submission timestamp
- Applicant receives a confirmation email to their personal email address acknowledging receipt and advising they will be contacted shortly
- Admin receives an automatic system notification of the new application
- If approved after review, admin changes Mentor Status to Provisional and begins the activation workflow
- If declined after review, admin changes Mentor Status to Declined and notifies the applicant manually. No automated notification is sent. The Contact record is retained permanently for historical reference.
**Form Fields**
The following fields are collected on the form. All fields populate the Contact record. Fields marked Required must be completed before the form can be submitted.

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

## 5. Content Requirements
### 5.1 Required Pages

| Page | Key Content |
| --- | --- |
| Home | Mission statement, who we serve, call to action (get mentoring / volunteer) |
| About | Mission, vision, values, how we work, governance overview |
| Get Mentoring | Who qualifies, what to expect, intake request form |
| Volunteer / Mentor | Who we're looking for, how it works, volunteer signup form |
| Workshops & Events | Upcoming events, registration links, past event summaries |
| Resources | Curated Northeast Ohio ecosystem resource guide |
| Partners | Ecosystem partners, referral relationships |
| Donate | Donation information, donor stewardship commitment |
| Contact | Contact form, location/service area information |

### 5.2 Design Principles
- Clean, uncluttered layout — accessibility and readability over visual complexity
- Large, readable font sizes — minimum 16px body text
- High contrast color scheme — meets WCAG AA accessibility standards
- Simple navigation — no more than 6–7 top-level menu items
- Mobile responsive — many clients will access via smartphone
- Fast load time — optimize images and minimize JavaScript

## 6. Accessibility Requirements
Given that CBM serves a broad community including older adults, the website must meet WCAG 2.1 AA accessibility standards:
- All images have descriptive alt text
- Color is not the only means of conveying information
- All interactive elements are keyboard accessible
- Sufficient color contrast ratios throughout
- Clear, descriptive link text (no 'click here')

## 7. Content Management
Since the site is built on WordPress, content updates are made directly in the WordPress admin dashboard without requiring developer involvement. Pages, events, and resource listings can be edited by any authorized staff member or volunteer with appropriate admin credentials.
As the organization grows and content ownership expands, WordPress user roles and permissions can be configured to give specific staff or volunteers access to only the content areas they manage, without exposing theme or plugin settings.

## 8. Open Questions
- Final domain name selection (clevelandbusinessmentors.org or shorter variant)
- Brand identity — colors, logo — needed before site development begins
- CRM integration method for embedded forms
- Whether to implement a simple blog/news section for SEO and community updates