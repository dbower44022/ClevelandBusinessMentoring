# CBM CRM — Contact: Partner Contact Specification
**Version:** 1.0  
**Generated:** March 2026  
**Sessions:** Phase 2 Session A (Data) + Session B (Process)  
**Entity:** Contact (native EspoCRM entity)  
**Variant:** Partner Contact  

---

## Purpose

The Partner Contact variant represents individuals at partner organizations
that CBM works with — banks, nonprofits, universities, and other community
organizations. The primary use case is relationship management — knowing
who the contact is, their context within their organization and CBM, and
the history of interactions. Partner contacts have no lifecycle status
and no complex processes. They are manually created and maintained by
mentors and admins.

**Entity Type:** Extension of native Contact (Person type)  
**Activity Stream:** Yes — primary mechanism for logging notes, emails,
calls, and meetings over time.

---

## Data Fields

### Identity & Contact

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| First Name | varchar | Yes | — | Legal first name |
| Last Name | varchar | Yes | — | Legal last name |
| Contact Type | enum | Yes | Partner Contact | Primary role of this contact in CBM. Defaults to Partner Contact for this variant. |
| Title | varchar | No | — | Professional title at their organization |
| Account | link | Yes | — | Primary partner organization this contact belongs to |
| LinkedIn | url | No | — | LinkedIn profile URL for professional context |
| Primary Email | email | Yes | — | Primary business email address |
| Primary Phone | phone | No | — | Primary business phone number |
| Work Address | — | No | — | Business street address, city, state, zip |
| Personal Email | email | No | — | Personal email address |
| Personal Phone | phone | No | — | Personal phone number |
| Personal Address | — | No | — | Personal home address |
| Birthday | date | No | — | Used for personalized relationship building |

### Analytics (Read-Only, Calculated)

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| Create Date | date | No | — | Date the contact record was created. System-generated. Read-only. |
| Last Activity Date | date | No | — | Most recent activity — email, call, note, or meeting. Calculated automatically. Read-only. |

---

## Dropdown Values

### Contact Type

| Value | Description |
|---|---|
| Client | Individual associated with a client business |
| Mentor | CBM mentor volunteer |
| Partner Contact | Individual at a partner organization (default for this variant) |
| Administrator | CBM staff with elevated system access |

---

## Layout

### Tab 1 — Overview *(always visible)*
- Full Name, Contact Type
- Account (Primary Organization), Title
- Primary Email, Primary Phone
- City (from Work Address)
- LinkedIn

### Tab 2 — Personal
- Birthday
- Personal Email, Personal Phone
- Personal Address

### Tab 3 — Activity *(available — primary interaction log)*
- Activity stream (notes, emails, calls, meetings)

### List View Columns
Last Name | First Name | Company | Title | Contact Type | Email | Phone | City

---

## Processes

### Record Creation

Partner contact records are created manually by a mentor or admin.
No automated notifications or emails are triggered on creation.

### Record Editing

Any mentor or admin can edit a partner contact record. No fields are
locked. Changes to key fields (Primary Organization, Contact Type) are
logged in the activity stream with timestamp and who made the change.

### Record Termination

Partner contact records are never deleted. CBM does not track changes
to outside organizations — if a partner contact leaves their
organization or the partner relationship ends, the record remains intact
as historical data.

---

## Relationships

| Relationship | Type | Contact Panel Label | Other Side Label |
|---|---|---|---|
| Contact → Account (primary) | many-to-one | Primary Organization | Partner Contacts |
| Contact → Account (additional) | many-to-many | Also Associated With | Associated Contacts |
| Contact → Workshop Attendance | one-to-many | Workshops Attended | Attendees |

**Notes:**
- Engagements are linked at the organization (Account) level, not the individual contact level
- Email and meeting history visible via Google Workspace integration in activity stream

---

## Open Items — TBD (Required Before Go-Live)

None.

---

## Manual Configuration Required (Post-Deployment)

| # | Item | Where to Configure | Notes |
|---|---|---|---|
| 1 | Note logging on Partner Contact | Entity Manager → Contact → Stream | Ensure activity stream allows unlimited notes from mentors and admins |
| 2 | Field change audit logging | Entity Manager → Contact → Stream | Log changes to: Primary Organization (Account), Contact Type |

---

## Decisions Made

| # | Decision | Rationale |
|---|---|---|
| 1 | No lifecycle status | Partner contacts have no onboarding or lifecycle stages |
| 2 | Engagements at organization level only | Partner referrals tracked on the Account, not the individual contact |
| 3 | Notes via activity stream | Supports unlimited notes over time rather than a single notes field |
| 4 | Records never deleted | Historical data retained regardless of partner relationship status |
| 5 | Multiple organization associations | A partner contact can be associated with more than one partner organization with a primary designated |

---

## Session Transcript

### Session A — Data Definition (March 2026)

**Q:** From our discovery session, I described a Partner Contact as an individual at a partner organization. CBM doesn't currently track the specific person making referrals, just the organization. However, partner contacts may be associated with multiple partner organizations, with a primary one designated. Does that still feel right?
**A:** Yes.

**Q:** When you see a list of partner contacts, what's most important at a glance?
**A:** Last, First, Company, Title, Type, Email, Phone, City.

**Q:** Should the partner contact record have an activity stream?
**A:** Yes.

**Q:** Tell me everything you'd want to know about a partner contact record.
**A:** I would want to know what partner company they are related to. A list of notes about their role in the partner, and with our organization. A list of meetings/calls that we have in the past or future. Any email correspondence, any workshops attended. Any engagements linked.

**Q:** Beyond name, phone, and email, what else do you need for a partner contact?
**A:** Title, work address so I know if they are local, LinkedIn link.

**Q:** Should we track personal contact details for partner contacts?
**A:** Yes. Birthday, all the same fields as clients.

**Q:** Should we track both a primary organization and additional organizations?
**A:** Yes.

**Q:** Should Contact Type default to Partner Contact for this variant?
**A:** Yes.

**Q:** Do partner contacts have their own status or lifecycle?
**A:** No.

**Q:** What dates matter for a partner contact?
**A:** Create Date, Last Activity Date.

**Q:** Are Create Date and Last Activity Date calculated automatically?
**A:** Yes.

**Q:** Are there any quantitative fields for a partner contact?
**A:** No.

**Q:** Should notes be one field or support multiple linked notes?
**A:** There should be a link to as many notes as desired.

**Q:** Are there any boolean/checkbox fields for a partner contact?
**A:** No.

**Q:** Are there any compliance requirements for partner contacts?
**A:** No.

**Q:** Should area of focus be a structured field or a note?
**A:** That would be a note.

**Q:** Are there any communication preferences or settings for partner contacts?
**A:** No.

**Q:** Are there any administrative fields for partner contacts?
**A:** No.

**Q:** Does the proposed layout feel right?
**A:** Yep.

**Q:** Do the list view columns still feel right?
**A:** Yes.

**Q:** Should additional organizations show as a relationship panel on the partner contact record?
**A:** Yes.

**Q:** How does a partner contact get linked to an engagement?
**A:** I guess, it is ok that the partner contacts organization is linked to the engagement.

**Q:** Should workshops attended appear on the partner contact record?
**A:** Yes.

**Q:** Any other relationships on the partner contact record?
**A:** No.

**Q:** Are there any business rules for partner contact records?
**A:** No.

**Q:** Does the data summary feel complete?
**A:** Good.

---

### Session B — Process Definition (March 2026)

**Q:** Ready to start Session B for Contact: Partner Contact?
**A:** Yes.

**Q:** How does a new partner contact record get created?
**A:** A mentor or admin manually creates the record.

**Q:** Does anything happen automatically when a partner contact is created?
**A:** No.

**Q:** Who can edit a partner contact record?
**A:** Mentors or admins.

**Q:** Are there any fields that should be locked once set?
**A:** No.

**Q:** Should changes to important fields be logged in the activity stream?
**A:** Yes.

**Q:** What happens when a partner contact leaves their organization or the partner relationship ends?
**A:** No. We do not track changes to outside organizations.

**Q:** Are partner contact records ever deleted?
**A:** No.

**Q:** Are there any automated notifications for partner contact events?
**A:** No.

**Q:** Are there any external systems that interact with partner contact records?
**A:** No.

**Q:** Does the process summary feel complete?
**A:** Yes.
