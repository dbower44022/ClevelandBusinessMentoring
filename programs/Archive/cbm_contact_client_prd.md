# CBM CRM — Contact: Client Contact Specification
**Version:** 1.0  
**Generated:** March 2026  
**Sessions:** Phase 2 Session A (Data) + Session B (Process)  
**Entity:** Contact (native EspoCRM entity)  
**Variant:** Client Contact  

---

## Purpose

The Client Contact variant of the Contact entity represents individual
people associated with client businesses receiving CBM mentoring services.
Client contacts are typically business owners, co-owners, or key staff
members. The primary use case for viewing a client contact record is
communication — finding contact details and reviewing recent email
exchanges and session history before reaching out. Client contacts do
not have their own lifecycle status — that is tracked on the Engagement.

**Entity Type:** Extension of native Contact (Person type)  
**Activity Stream:** Yes — available but not prominent. Placed on a
dedicated tab rather than front and center.

---

## Data Fields

### Identity & Contact

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| First Name | varchar | Yes | — | Legal first name |
| Last Name | varchar | Yes | — | Legal last name |
| Contact Type | enum | Yes | Client | Primary role of this contact in CBM. See dropdown values. |
| Title | varchar | No | — | Professional title or role at their business (e.g., Owner, CEO, Co-Owner) |
| Account | link | Yes | — | The business this contact belongs to. One business only. Editable if client starts a new business. |
| Primary Email | email | Yes | — | Primary business email address |
| Primary Phone | phone | No | — | Primary business phone number |
| Business Address | — | No | — | Business street address, city, state, zip |
| Personal Email | email | No | — | Personal email address |
| Personal Phone | phone | No | — | Personal phone number |
| Personal Address | — | No | — | Personal home address |
| Birthday | date | No | — | Used for personalized outreach and recognition |

### Profile

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| Business Skills | multiEnum | No | — | Business disciplines relevant to the client's background and needs. Same taxonomy as mentor expertise for matching. TBD: Taxonomy to be defined. |
| Technology Skills | text | No | — | Free-text description of client's technology background and tools |
| Role & Responsibilities | text | No | — | Description of the client's role and decision-making authority within their business |

### Analytics (Read-Only, Calculated)

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| Number of Sessions Attended | int | No | — | Total sessions attended across all engagements. Calculated from session records. Read-only. |
| Number of Workshops Attended | int | No | — | Total workshops attended. Calculated from workshop attendance records. Read-only. |
| Last Contact Date | date | No | — | Most recent email, session, or engagement activity. Calculated automatically. Read-only. |
| Create Date | date | No | — | Date the contact record was created. System-generated. Read-only. Locked — cannot be changed. |

### General

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| Notes | wysiwyg | No | — | General notes and observations about the client contact |

---

## Dropdown Values

### Contact Type

| Value | Description |
|---|---|
| Client | Individual associated with a client business receiving mentoring |
| Mentor | CBM mentor volunteer |
| Partner Contact | Individual at a partner organization |
| Administrator | CBM staff with elevated system access |

---

## Layout

### Tab 1 — Overview *(always visible — primary use case)*
- Full Name, Contact Type
- Account (Company), Title
- Primary Email, Primary Phone
- City (from Business Address)
- Notes

### Tab 2 — Sessions & Engagement
- Number of Sessions Attended, Number of Workshops Attended
- Last Contact Date, Create Date
- Engagements panel (all engagements)
- Workshops Attended panel

### Tab 3 — Profile
- Business Skills
- Technology Skills
- Role & Responsibilities

### Tab 4 — Personal *(less prominent)*
- Birthday
- Personal Email, Personal Phone
- Personal Address

### Tab 5 — Activity *(available, not prominent)*
- Activity stream
- Email history panel

### List View Columns
Last Name | First Name | Account | Title | Contact Type | City | Phone | Email

---

## Processes

### Record Creation

The primary client contact is created automatically when a prospective
client submits the intake form on the CBM website. The form submission
simultaneously creates three records: the Company (Account), the primary
Contact, and the Engagement. No automated emails are triggered by contact
creation — the Engagement creation process drives client notifications.

Additional contacts for the same company (e.g., a co-owner or spouse)
are added manually by the assigned mentor via the Engagement record or
directly on the Company record.

### Record Editing

Any mentor or admin can edit a client contact record. The Create Date
field is system-generated and read-only — it cannot be changed. The
linked Account (company) is editable and can be updated if a client
starts a new business or the original information changes.

Key field changes (Account link, Contact Type, Primary Email, Primary
Phone) are logged in the activity stream with timestamp and who made
the change.

Client self-editing via a portal is TBD — see Task List Item 4.

### Record Termination

Client contact records are never deleted. When a client's engagement
ends, the contact record remains intact as historical data. The
Engagement status reflects the end of the mentoring relationship, not
the contact record. Historical data is retained for potential future
engagements and analytics.

Duplicate records can be merged using EspoCRM's built-in merge function.

---

## Relationships

| Relationship | Type | Contact Panel Label | Other Side Label |
|---|---|---|---|
| Contact → Account | many-to-one | Company | Contacts |
| Contact → Engagement | one-to-many | Engagements | Client Contacts |
| Contact → Workshop Attendance | one-to-many | Workshops Attended | Attendees |

**Notes:**
- Sessions are visible through the Engagement record, not directly on Contact
- NPS Survey Responses are visible through the Engagement record
- Email history visible via Google Workspace integration in activity stream

---

## Open Items — TBD (Required Before Go-Live)

| # | Item | Question | Needs Input From |
|---|---|---|---|
| 1 | Last Contact Date formula | Define exactly which activity types count as a "contact" for this calculation (email, session, engagement update?) | Technology/Admin team |
| 2 | Business Skills taxonomy | Define the complete predefined list for client business skills matching mentor expertise | Leadership/Program staff |
| 4 | Client self-service editing | Can clients update their own contact information through a portal or form? Which fields? | Leadership/Technology |

---

## Manual Configuration Required (Post-Deployment)

| # | Item | Where to Configure | Notes |
|---|---|---|---|
| 1 | Last Contact Date formula | Entity Manager → Contact → Formula | Calculate from most recent email, session, or engagement activity |
| 2 | Sessions Attended formula | Entity Manager → Contact → Formula | Count from session attendance records |
| 3 | Workshops Attended formula | Entity Manager → Contact → Formula | Count from workshop attendance records |
| 5 | Field change audit logging | Entity Manager → Contact → Stream | Log changes to: Account, Contact Type, Primary Email, Primary Phone |
| 6 | Duplicate detection rules | Administration → Duplicate Check Rules | Configure to detect duplicate contacts by name + company or email |
| 7 | Email display on Contact | Administration → Integrations → Google | Configure Gmail sync to show email history on contact record |

---

## Decisions Made

| # | Decision | Rationale |
|---|---|---|
| 1 | No status field on Client Contact | Client lifecycle is tracked on the Engagement, not the Contact |
| 2 | One business per contact | Simplifies relationships and analytics — a contact belongs to one company |
| 3 | Primary contact auto-created from intake form | Intake form simultaneously creates Company, Contact, and Engagement |
| 4 | Additional contacts added manually | Mentor adds secondary contacts (e.g., spouse, co-owner) via Engagement or Company |
| 5 | Records never deleted | Historical data retained for analytics and potential future engagements |
| 6 | Create Date is read-only and locked | System-generated value should never be manually altered |
| 7 | Activity stream available but not prominent | Placed on dedicated tab — contact details and sessions are the primary use case |
| 8 | Sessions visible through Engagement only | Keeps Contact record focused on communication use case |
| 9 | Referral source on Engagement not Contact | Referral governs all contacts on the engagement, not individual contacts |

---

## Session Transcript

### Session A — Data Definition (March 2026)

**Q:** From our discovery session, I described a Client Contact as an individual associated with a client business — often the business owner, co-owner, or key staff member. A client business typically has one or two contacts, with husband and wife being a common example. The mentoring relationship is primarily with the business, but day-to-day interaction is with these individuals. Does that still feel right?
**A:** Yes.

**Q:** When you see a list of client contacts in the CRM, what's the single most important piece of information that identifies each one at a glance?
**A:** Company Name, Company Type (Client/Partner/etc), City, website, email, phone.

**Q:** Those are mostly organization-level fields. When you think of a client contact record, are you thinking of the individual person or the business itself?
**A:** Sorry, I was thinking companies.

**Q:** With that clarified — when you see a list of individual client contacts, what's most important to identify each person at a glance?
**A:** Last name, first name, company name, contact type (Client, Mentor, etc.), city, phone, email.

**Q:** Should the client contact record have an activity stream?
**A:** Yes. But it is not prominent — it should be available instead of prominent.

**Q:** Tell me everything you'd want to know about a client contact record.
**A:** I would want to see their contact information first. When I search and view a contact, it is most likely I am planning to communicate with that contact. Then I would want to see any emails that have been exchanged with that contact — I want to make sure I know the last communications we had. I would also want to see a list of all engagement sessions, so I can quickly review the status of our last meeting. Finally I would want to see notes. Of course I may want to look at more detailed information, but these are the primary use cases for looking up a contact.

**Q:** Beyond name, phone, and email, what else do you need to identify a client contact?
**A:** Company name.

**Q:** Do you need to track the client contact's physical address?
**A:** That would be nice.

**Q:** Should address be business or personal, or both?
**A:** The primary information would be their business address. However, on a Personal Tab we would want to see their personal address, email, phone, etc.

**Q:** Does a client contact have a title or role at their business?
**A:** Yes. That would be important too. I forgot that!

**Q:** What values would Contact Type have?
**A:** Yes — Client, Mentor, Partner Contact, Administrator.

**Q:** Should Contact Type be single-select or allow multiple types?
**A:** Single select is fine for now.

**Q:** Do client contacts have their own status or lifecycle stages?
**A:** That is all tracked on the engagement.

**Q:** What dates matter for a client contact record?
**A:** Last contact date, birthdate, create date.

**Q:** Are Last Contact Date and Create Date calculated automatically?
**A:** Should be automatic, except for birthdate.

**Q:** What quantitative data do you track for a client contact?
**A:** Number of sessions attended, number of workshops attended.

**Q:** Are session and workshop counts calculated automatically?
**A:** Yes.

**Q:** Are there any free-text fields for a client contact?
**A:** Yes. Just a personal notes field that is WYSIWYG.

**Q:** Are there any boolean/checkbox fields for a client contact?
**A:** No.

**Q:** Are there any compliance requirements tracked for client contacts?
**A:** No.

**Q:** Should business skills and technology skills be on the client contact record?
**A:** Yes.

**Q:** Same approach for skills — predefined multi-select for business skills, free text for technology?
**A:** Yes.

**Q:** Should role and responsibilities at the business be tracked?
**A:** Yes.

**Q:** Are there communication preferences or notification settings to track for a client contact?
**A:** No. The user will decide what makes sense.

**Q:** Are there administrative fields the admin team needs to track for a client contact?
**A:** No.

**Q:** Should referral source be on the client contact or the engagement?
**A:** It really should be on the engagement because that would be a question for the input form, and should govern all contacts on the engagement.

**Q:** Does the proposed tab layout feel right?
**A:** Yes.

**Q:** Should Contact Title be added to the list view columns?
**A:** Yes, add the contact title.

**Q:** Can a client contact be associated with multiple businesses?
**A:** One business.

**Q:** Should engagements show directly on the client contact record?
**A:** Yes.

**Q:** Should the engagement panel show all engagements or active only?
**A:** All. There will not be many cases where there are more than one.

**Q:** Should sessions appear directly on the client contact record or through the engagement?
**A:** I think it is enough to have it on the engagement.

**Q:** Should workshops attended appear on the client contact record?
**A:** Absolutely.

**Q:** Should NPS surveys appear on the client contact record or through the engagement?
**A:** Engagement.

**Q:** Any other relationships on the client contact record?
**A:** Email.

**Q:** Are there any business rules for client contact records?
**A:** Not that I can think of.

**Q:** Does the data summary feel complete?
**A:** Yes.

---

### Session B — Process Definition (March 2026)

**Q:** Ready to start Session B for Contact: Client Contact?
**A:** Yes.

**Q:** How does a new client contact record get created?
**A:** When a prospective client fills out the form on the website, they will add company and contact information that will be used to create the company, contact, and engagement automatically. If there are other contacts for the company, the mentor can add them manually via the engagement or the company.

**Q:** When the intake form is submitted and a contact record is created, what happens automatically?
**A:** The Client Intake process defines that an email is sent when the first engagement is created. But there are no other automated emails for contact creation, editing, or deleting.

**Q:** Who can edit a client contact record once it's created?
**A:** Any mentor or admin can edit a contact record.

**Q:** Can the client contact themselves edit their own record?
**A:** TBD.

**Q:** Are there any fields that should be locked once set?
**A:** The original creation date should be locked. The linked company could change.

**Q:** Should changes to important fields be logged in the activity stream?
**A:** Yes.

**Q:** What happens to a client contact record when their engagement ends?
**A:** No change. It is historical data and could be used in the future.

**Q:** Can client contact records be merged if duplicates are created?
**A:** Yes, that could happen.

**Q:** Are there any notifications triggered by client contact record events?
**A:** No.

**Q:** Are there any external systems that interact with the client contact record?
**A:** No.

**Q:** Does the process summary feel complete?
**A:** Yep.
