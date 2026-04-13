# CBM CRM — Contact: Mentor Specification
**Version:** 1.0  
**Generated:** March 2026  
**Sessions:** Phase 2 Session A (Data) + Session B (Process)  
**Entity:** Contact (native EspoCRM entity)  
**Variant:** Mentor  

---

## Purpose

The Mentor variant of the Contact entity represents vetted volunteers who
provide free business mentoring to CBM clients. Mentors go through a
structured onboarding process from initial application through active
mentoring, and can hold one or more roles simultaneously — primary Mentor,
Co-Mentor, or Subject Matter Expert. The Mentor record is the operational
hub for tracking a mentor's profile, availability, compliance, performance
analytics, and lifecycle status.

**Entity Type:** Extension of native Contact (Person type)  
**Activity Stream:** Yes — significant events only (status changes,
assignment changes, compliance renewals)

---

## Data Fields

### Identity & Contact

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| First Name | varchar | Yes | — | Legal first name |
| Last Name | varchar | Yes | — | Legal last name |
| Preferred Name | varchar | No | — | Name the mentor goes by day to day |
| Photo | image | No | — | Profile headshot uploaded by the mentor |
| Primary Email | email | Yes | — | Primary contact email address |
| Personal Email | email | No | — | Personal email address, separate from CBM Gmail |
| Primary Phone | phone | No | — | Primary contact phone number |
| Personal Phone | phone | No | — | Personal phone number |
| Home Address | — | No | — | Home address (street, city, state, zip) |
| Spouse / Partner Name | varchar | No | — | Used for personalized relationship building |
| Birthday | date | No | — | Used for recognition and personalized outreach |
| Work Status | enum | No | — | Current employment status. See dropdown values. |
| Military Status | enum | No | — | Military background. See dropdown values. |

### Mentor Role & Status

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| Is Mentor | bool | No | false | Approved as primary mentor, eligible for direct client assignment |
| Is Co-Mentor | bool | No | false | Participates as co-mentor alongside a primary mentor |
| Is Subject Matter Expert | bool | No | false | Provides specialist expertise to support other mentors. Never assigned as primary. |
| Is Workshop Presenter | bool | No | false | Willing and available to present at CBM workshops and seminars |
| Is Mentor Reviewer | bool | No | false | Available to conduct interviews of prospective mentor applicants |
| Mentor Status | enum | Yes | Submitted | Current lifecycle stage. See dropdown values. |
| Primary Chapter | enum | Yes | — | The single chapter the mentor is assigned to. TBD: Chapter list to be defined. |
| Mentoring Information Complete | bool | No | false | Admin-set flag confirming all required profile information has been reviewed and verified |

### Profile (Mentor-Edited)

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| Area of Expertise | wysiwyg | No | — | Rich text description of business expertise and specializations |
| Industry Experience | wysiwyg | No | — | Rich text description of industry background and experience |
| Education Details | wysiwyg | No | — | Rich text description of educational background and qualifications |
| Interests | wysiwyg | No | — | Rich text description of professional and personal interests |
| Languages Spoken | multiEnum | No | — | Languages the mentor is fluent in. TBD: Language list to be defined. |
| LinkedIn | url | No | — | LinkedIn profile URL |
| Twitter/X | url | No | — | Twitter/X profile URL |
| YouTube | url | No | — | YouTube channel URL |
| Instagram | url | No | — | Instagram profile URL |

### Availability & Capacity

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| Max Client Requests / Week | int | No | — | Maximum number of new client requests the mentor is willing to review per week. Mentor-set. |
| Max Active Clients | int | No | — | Maximum number of simultaneous active client engagements. Mentor-set. |
| Pause Mentor Assignments Until | date | No | — | Date when mentor automatically resumes accepting new client assignments. Used for scheduled pauses. |
| Date Paused | date | No | — | Date the mentor's status was changed to Paused. Set automatically on status change. |
| Mentor Self Schedule URL | url | No | — | Link to mentor's personal scheduling tool (e.g., Calendly) for client booking |
| Profile Visible on Website | bool | No | false | Controls whether the mentor's profile appears on the public CBM website |

### Compliance (Admin-Only Edit)

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| Background Check Completed | bool | No | false | Background check has been successfully completed. Admin-set. |
| Ethics Class Completed | bool | No | false | Mandatory ethics class has been completed. Admin-set (future: LMS automated). |
| Ethics Class Completion Date | date | No | — | Date ethics class was completed |
| Intro to Mentoring Completed | bool | No | false | Mandatory Introduction to Mentoring class has been completed. Admin-set (future: LMS automated). |
| Intro to Mentoring Date | date | No | — | Date Introduction to Mentoring class was completed |
| CRM Training Complete | bool | No | false | CRM system training has been completed. Admin-set. |
| Code of Ethics Signed | bool | No | false | Current annual Code of Ethics agreement has been signed. Admin-set. |
| Code of Ethics Date | date | No | — | Date current Code of Ethics was signed. Used for annual renewal tracking. |
| Code of Ethics Renewal Date | date | No | — | Due date for next Code of Ethics renewal |
| Mentoring Agreement Signed | bool | No | false | Mentoring Agreement has been signed. Required before Active status. Admin-set. |
| Mentoring Agreement Date | date | No | — | Date Mentoring Agreement was signed |

### Analytics (Read-Only, Calculated)

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| Total Active Engagements | int | No | — | Current number of active client engagements. Calculated from engagement records. |
| Assigned Engagements (7 days) | int | No | — | Number of client assignments offered in the past 7 days. Calculated. |
| Accepted Engagements (7 days) | int | No | — | Number of client assignments accepted in the past 7 days. Calculated. |
| Total Engagement History | int | No | — | Cumulative count of all engagements across full tenure. Calculated. |
| Total Hours Delivered | float | No | — | Cumulative mentoring hours across all sessions. Calculated. |
| Average NPS Score | float | No | — | Average NPS score received from clients across all engagements. Calculated. |
| Years of Service | float | No | — | Years since Date Joined. Calculated from Date Joined field. |
| Badge Level | enum | No | — | Recognition badge earned. Calculated. Read-only. TBD: Thresholds to be defined. |

### Key Dates

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| Date Joined | date | No | — | Date the mentor first joined CBM |
| Resign Date | date | No | — | Date the mentor resigned |
| Last Activity Date | date | No | — | Most recent CRM activity. Calculated. |
| Last Engagement Accepted | date | No | — | Date of most recently accepted client engagement. Calculated. |

### Administrative

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| Status Change Reason | text | No | — | Free-text reason captured when mentor goes Inactive or Resigned. Cleared on reactivation. |
| How Did You Hear About CBM | enum | No | — | Referral source when joining. TBD: Values to be defined. |

---

## Dropdown Values

### Mentor Status

| Value | Color | Description |
|---|---|---|
| Submitted | Gray | Application received, awaiting admin review |
| In-Review | Gray | Admin is actively reviewing the application |
| Provisional | Yellow (warning) | Accepted, completing onboarding requirements |
| Active | Green (success) | Fully qualified, available for client assignments |
| Paused | Orange (warning) | Temporarily unavailable for new assignments |
| Inactive | Red (danger) | No longer mentoring, clients reassigned |
| Resigned | Red (danger) | Voluntarily departed, data retained |
| Declined | Red (danger) | Application rejected |

### Work Status

| Value | Description |
|---|---|
| Employed Full-Time | Currently employed full time |
| Employed Part-Time | Currently employed part time |
| Self-Employed | Running own business |
| Retired | Retired from primary career |
| Unemployed | Not currently employed |

### Military Status

| Value | Description |
|---|---|
| Civilian | No military background |
| Active Military | Currently serving |
| Reserves | Currently in military reserves |
| Veteran | Former military service |

### Badge Level

| Value | Description |
|---|---|
| (none) | No badge earned yet |
| Bronze | First milestone. TBD: threshold to be defined. |
| Silver | Second milestone. TBD: threshold to be defined. |
| Gold | Highest milestone. TBD: threshold to be defined. |

---

## Layout

### Tab 1 — Overview *(always visible)*
- Photo, Full Name, Preferred Name
- Primary Email, Primary Phone
- Primary Chapter
- Mentor Status
- Is Mentor, Is Co-Mentor, Is Subject Matter Expert
- Is Workshop Presenter, Is Mentor Reviewer
- Profile Visible on Website
- Mentor Self Schedule URL

### Tab 2 — Profile *(mentor-edited, visible to other mentors)*
- Area of Expertise
- Industry Experience
- Education Details
- Interests
- Languages Spoken
- LinkedIn, Twitter/X, YouTube, Instagram
- Years of Service

### Tab 3 — Availability *(admin and intake coordinator)*
- Max Client Requests / Week, Max Active Clients
- Total Active Engagements
- Assigned Engagements (7 days), Accepted Engagements (7 days)
- Pause Mentor Assignments Until, Date Paused

### Tab 4 — Analytics *(read-only)*
- Average NPS Score
- Total Engagement History
- Total Hours Delivered
- Badge Level
- Last Activity Date, Last Engagement Accepted

### Tab 5 — Compliance *(admin-only edit)*
- Background Check Completed
- Ethics Class Completed, Ethics Class Completion Date
- Intro to Mentoring Completed, Intro to Mentoring Date
- CRM Training Complete
- Code of Ethics Signed, Code of Ethics Date, Code of Ethics Renewal Date
- Mentoring Agreement Signed, Mentoring Agreement Date
- Mentoring Information Complete

### Tab 6 — Personal *(admin-only visibility)*
- Personal Email, Personal Phone
- Home Address
- Birthday, Spouse / Partner Name
- Work Status, Military Status
- Date Joined, Resign Date

### Tab 7 — Administrative *(admin-only)*
- Status Change Reason
- How Did You Hear About CBM

### List View Columns
Name | Mentor Status | Role (Is Mentor/Co-Mentor/SME) | Total Active Engagements | Accepting Assignments | Available Slots

---

## Processes

### Record Creation

A prospective mentor fills out an application form on the CBM website.
The form submission creates a new Contact record with Mentor Status =
Submitted. The record appears automatically in the "New Mentor Applicants"
saved view monitored by the admin team. An automated confirmation email
is sent to the applicant: "Thank you for submitting your application,
someone will contact you shortly."

### Lifecycle Transitions

| From | To | Triggered By | Prerequisites | Data Captured | Notifications |
|---|---|---|---|---|---|
| Submitted | In-Review | Admin | Admin review of form | — | None (silent) |
| Submitted | Declined | Admin | Obvious fake/invalid application | — | At admin discretion |
| In-Review | Declined | Admin | Interview panel decision | — | Admin sends email using template |
| In-Review | Provisional | Admin | Interview panel approval | — | Admin sends email with next steps using template |
| Provisional | Active | Admin | All 4 requirements complete | — | Admin sends congratulations email and phone call |
| Active | Paused | Mentor or Admin | Voluntary or admin-initiated | Date Paused, Pause Until (optional) | None |
| Paused | Active | Mentor (manual) or System (date-triggered) | Pause Until date reached, or mentor self-resumes | Pause Until date cleared | None |
| Active | Inactive | Mentor or Admin | Mutual agreement or admin decision | Status Change Reason | At admin discretion |
| Active | Resigned | Mentor or Admin | Mutual agreement or unresponsive mentor | Status Change Reason, Resign Date | At admin discretion |
| Resigned/Inactive | Active | Admin only | Admin assessment of situation | New onboarding requirements determined by admin | Admin-managed |

**Provisional → Active prerequisites (all four required):**
1. Ethics Class Completed ✓
2. Intro to Mentoring Completed ✓
3. Code of Ethics Signed ✓
4. Mentoring Agreement Signed ✓

### Record Editing

| Field Group | Admin | Mentor | Other Mentors |
|---|---|---|---|
| Profile fields | Edit | Edit | View only |
| Availability fields | Edit | Edit | View only |
| Compliance fields | Edit | View only | Hidden |
| Mentor Status | Edit | View only | View only |
| Badge Level | View only | View only | View only |
| All calculated fields | View only | View only | View only |
| Personal/Administrative | Edit | View only | Hidden |

Status changes are logged in the activity stream with timestamp, previous
value, new value, and who made the change.

### Record Termination

Mentor records are never deleted. When a mentor Resigns or becomes
Inactive, their record is retained indefinitely for historical reference
and analytics. Active engagements are reassigned manually by the admin
team using the standard client assignment process.

Resigned mentors may return at admin discretion. The admin determines
whether full re-onboarding is required or a simplified reactivation path
applies. No fixed rules — fully admin-managed.

---

## Relationships

| Relationship | Type | Mentor Panel Label | Other Side Label |
|---|---|---|---|
| Mentor → Account | many-to-one | Organization | Mentors |
| Mentor → Engagement | one-to-many | Engagements | Mentor |
| Mentor → Session | one-to-many | Sessions | Mentor |
| Mentor → Workshop (Presented) | many-to-many | Workshops Presented | Presenters |
| Mentor → Workshop (Attended) | many-to-many | Workshops Attended | Attendees |
| Mentor → Account (Partner Liaison) | one-to-many | Partner Liaisons (active only) | Assigned Liaison |

**Notes:**
- Engagement panel shows all engagements with status visible, sorted most recent first, filterable
- Sessions panel shows all sessions across all engagements, sorted most recent first, filterable
- Partner Liaison panel shows active/current assignments only
- NPS Survey Responses visible through Engagement records, not directly on Mentor

---

## Open Items — TBD (Required Before Go-Live)

| # | Item | Question | Needs Input From |
|---|---|---|---|
| 1 | Activity stream filtering | Which field changes should appear in the stream vs. be suppressed? | Admin team |
| 2 | Mentor categorization | Are there classification tiers, regional groupings, or specializations beyond status and role? | Leadership |
| 3 | Primary Chapter list | Define the complete list of chapters as they are established | Leadership |
| 4 | Calculated field formulas | Define exact formulas for all calculated fields | Technology |
| 5 | Structured skill taxonomy | Should mentors have predefined skill fields for automated matching? | Leadership/Program staff |
| 6 | Language list | Define the list of languages for the Languages Spoken field | Leadership/Program staff |
| 7 | How Did You Hear About CBM values | Define the list of referral source values | Leadership |
| 8 | Badge thresholds | Define Bronze/Silver/Gold thresholds for mentors, co-mentors, and SMEs | Leadership |

---

## Manual Configuration Required (Post-Deployment)

| # | Item | Where to Configure |
|---|---|---|
| 1 | Activity stream filtering | Entity Manager → Contact → Stream |
| 2 | "New Mentor Applicants" saved view | List View → Save Filter |
| 3 | Application confirmation email workflow | Administration → Workflows |
| 4 | Decline notification email template | Administration → Email Templates |
| 5 | Provisional acceptance email template | Administration → Email Templates |
| 6 | Provisional completion review view | List View → Save Filter |
| 7 | Active promotion congratulations email template | Administration → Email Templates |
| 8 | Automated pause expiry workflow | Administration → Workflows |
| 9 | Engagement panel sort/filter | Entity Manager → Contact → Relationships |
| 10 | Sessions panel sort/filter | Entity Manager → Contact → Relationships |
| 11 | Partner Liaison panel active-only filter | Entity Manager → Contact → Relationships |
| 12 | Google Workspace integration | Administration → Integrations → Google |
| 13 | Role-based field visibility | Administration → Roles |
| 14 | Field-level editing permissions | Administration → Roles |
| 15 | Status change audit logging | Entity Manager → Contact → Stream |
| 16 | All calculated field formulas | Entity Manager → Contact → Formula |
| 17 | Annual ethics renewal alert workflow | Administration → Workflows |
| 18 | Badge level calculation formula | Entity Manager → Contact → Formula |
| 19 | LMS integration (future) | Administration → Integrations |

---

## Decisions Made

| # | Decision | Rationale |
|---|---|---|
| 1 | Single chapter assignment only | Multiple chapters would make analytics and assignment calculations extremely difficult |
| 2 | Three role checkboxes (Is Mentor, Is Co-Mentor, Is SME) | A mentor can hold multiple roles simultaneously. Checkboxes are easier to filter than multi-select. |
| 3 | Is Mentor Reviewer as separate boolean | Allows filtering the mentor list to find available interview panelists |
| 4 | Status Change Reason covers both Inactive and Resigned | One field serves both end states rather than duplicating |
| 5 | No pause reason field | Not needed — the date and duration provide sufficient context |
| 6 | Provisional promotion is manual (admin-triggered) | Admin judgment required to verify all four requirements before promoting |
| 7 | Auto-resume on Pause Until date | Reduces admin overhead for scheduled pauses (vacations, etc.) |
| 8 | Records never deleted | Full historical retention for analytics and potential reactivation |
| 9 | Compliance fields admin-only edit | Prevents mentors from self-certifying compliance items |
| 10 | Sessions visible directly on mentor record | Allows mentors to audit their own session entry without navigating through engagements |
| 11 | Profile fields mentor-editable | Mentors maintain their own professional profiles |
| 12 | Decline notification is manual | Fake/invalid applications should not receive automated responses |

---

## Session Transcript

### Session A — Data Definition (March 2026)

**Q:** From our discovery session, I described a Mentor as a vetted volunteer who provides free business mentoring to CBM clients, going through a structured onboarding process from Prospect through Active status, and potentially holding one or more roles — primary Mentor, Co-Mentor, or Subject Matter Expert. Does that still feel right?
**A:** Yes.

**Q:** When you see a list of mentors in the CRM, what's the single most important piece of information that identifies each one at a glance?
**A:** Name, status (Are they Active), Type (SME, Co-Mentor, Mentor), # active engagements, Available for client assignments, # of available client assignments.

**Q:** Should each mentor record have an activity stream?
**A:** Yes. It would be good to quickly see any recent changes that should be reviewed, as long as it is not too chatty so that the important changes don't get lost in the noise.

**Q:** Tell me everything you'd want to know about a mentor record.
**A:** The most important information will be how to get in touch with the mentor - Phone, emails. Next I will want to see their areas of experience and expertise and the profile that they publish that gives their history. Finally, I would want to see any joint meetings we have in past and future, and the same with emails. Finally, I would want to see any engagements that we have in common. This description will differ if my role is an Admin or another mentor/co-mentor/SME.

**Q:** Beyond name, phone, and email, what else do you need to identify a mentor?
**A:** Personal email, Home Address, birthday, Number of assigned engagements past 7 days, Number of accepted engagements past 7 days, total active engagements, Photo of contact profile, spouse first name, Work Status, Military Status.

**Q:** What values would Work Status have?
**A:** Employed Full-Time, Employed Part-Time, Self-Employed, Retired, Unemployed — that seems correct.

**Q:** What values would Military Status have?
**A:** Civilian, Active Military, Veteran, Reserves. No military spouse.

**Q:** Are the engagement count fields calculated automatically from engagement records?
**A:** Correct.

**Q:** Is the profile photo uploaded by the mentor themselves or managed by an admin?
**A:** Mentor uploads.

**Q:** What stages does a mentor go through?
**A:** Submitted, In-Review, Provisional, Declined, Active, Paused, Inactive, Resigned.

**Q:** Should the mentor status values be color-coded?
**A:** Submitted, In-Review — gray. Provisional — yellow. Paused — orange (almost red). Inactive, Resigned, Declined — red. Otherwise green (Active).

**Q:** What dates matter for a mentor record?
**A:** Date joined, Code of ethics completion date, Code of ethics renewal date, Birthdate, Resign date, Last Activity Date, Last engagement accepted.

**Q:** Are Last Activity Date and Last Engagement Accepted calculated automatically?
**A:** Yes.

**Q:** Do you categorize or classify mentors in any way beyond status and roles?
**A:** I am unfamiliar.

**Q:** Should chapter be on the mentor record, and how?
**A:** Yes. It should show their primary chapter.

**Q:** Should mentors be able to be associated with multiple chapters beyond their primary?
**A:** No — change that. Only one primary chapter. Multiple chapters would make analytics and assignments extremely difficult. One chapter only.

**Q:** What quantitative data do you track for a mentor?
**A:** Years of Service, Average NPS Score, Number of assigned engagements past 7 days, Number of accepted engagements past 7 days, total active engagements, Total Engagement history, Number of hours delivered history.

**Q:** Are the quantitative fields calculated from engagement records or manually entered?
**A:** Yes. Engagement records drive most analytics.

**Q:** Is Years of Service calculated from the Date Joined field?
**A:** Calculated from join date.

**Q:** Are there any free-text fields on the Mentor record?
**A:** Yes, there will be a number of free text WYSIWYG fields — Area of Expertise, Industry Experience, Education Details, Interests.

**Q:** Are the profile text fields mentor-edited or admin-managed?
**A:** Mentor edited.

**Q:** What boolean/checkbox fields do you need for a mentor?
**A:** Workshop Presenter, Co-Mentor, Mentor, Subject Matter Expert, Mentoring Information Complete.

**Q:** Is Mentoring Information Complete set manually by an admin during the review process, or calculated automatically?
**A:** Yes, it is part of the process to review a mentor before they are accepted — so manually set by admin.

**Q:** Is Workshop Presenter simply a flag indicating the mentor is willing and able to present at workshops?
**A:** Yes.

**Q:** What compliance requirements need to be tracked for a mentor?
**A:** Code of conduct/ethics signed and date, Mentor Training completed and date, CRM Training Complete.

**Q:** Is CRM Training Complete tracked with a date or just a checkbox?
**A:** Just a checkbox.

**Q:** Is there a background check requirement for mentors?
**A:** Yes. Just a yes/no checkbox.

**Q:** Should the background check have a completion date?
**A:** No.

**Q:** What fields do you need to track a mentor's capacity?
**A:** Max Client Requests per week, Max Active Clients, and a status change to indicate they are paused from taking new clients.

**Q:** Is Max Client Requests per week set by the mentor or an admin?
**A:** Mentor set.

**Q:** Is Max Active Clients also set by the mentor?
**A:** Yes.

**Q:** Are there structured/predefined skill fields for mentor-client matching beyond the WYSIWYG profile fields?
**A:** I am not sure. Add to TBD.

**Q:** Should languages spoken be tracked for a mentor?
**A:** Yes, that would be helpful.

**Q:** Should languages be a predefined list or free text?
**A:** List of main languages.

**Q:** Are there communication preferences or notification settings to track for a mentor?
**A:** I don't think that is necessary.

**Q:** Are there administrative fields the admin team needs to track?
**A:** Yes.

**Q:** What administrative fields does the admin team need to track?
**A:** Profile visible on website — boolean. Pause Mentor Assignments Until — date. Mentor Self Schedule URL — text.

**Q:** Is Mentor Self Schedule URL a link to the mentor's personal scheduling tool like Calendly?
**A:** Yes.

**Q:** Is Pause Mentor Assignments Until set by the mentor, admin, or both?
**A:** Both.

**Q:** Any other administrative fields?
**A:** That's it.

**Q:** Should social media accounts be tracked for a mentor?
**A:** Yes.

**Q:** Which social media platforms should be tracked?
**A:** LinkedIn, Twitter/X, YouTube, Instagram.

**Q:** Should social media be individual URL fields per platform or a single free-text field?
**A:** One for each, so we could display links on a website if desired.

**Q:** Should personal email and phone be under Personal rather than Overview?
**A:** Yes. We may want to hide some of that information in the future, so it would be good to have it all isolated.

**Q:** Does moving personal email and phone to the Personal tab feel right?
**A:** Yes.

**Q:** Do the list view columns still feel right — Name, Status, Type, # active engagements, Available for client assignments, # of available client assignments?
**A:** Yes.

**Q:** Should engagements show as one combined panel or separate panels by role?
**A:** One list of all active engagements.

**Q:** Should the engagement panel show active only or all engagements including historical?
**A:** If the list contains the engagement status it could be all engagements. What would the sort order be? Can we apply filters to a list of relations?

**Q:** All engagements with status visible, sorted most recent first, filterable — does that work?
**A:** Yep.

**Q:** Should sessions appear directly on the mentor record or through the engagement?
**A:** It would be nice to see all sessions on the mentor record so a mentor can quickly audit if they have entered all session information.

**Q:** Should sessions show all or only recent ones?
**A:** How would they see them all if they do not see one they are looking for?

**Q:** Should workshops appear on the mentor record?
**A:** Yes.

**Q:** One combined workshop panel or separate panels for presented vs. attended?
**A:** Both — separate panels.

**Q:** Should partner organizations the mentor is liaison for appear on their record?
**A:** Yes.

**Q:** Should the partner organization panel show all or only active/current?
**A:** Only active/current.

**Q:** Any other relationships on the mentor record?
**A:** Surveys received, email received, calendar events.

**Q:** NPS Surveys — linked through engagements or a direct panel on the mentor record?
**A:** Good — through the activity stream for emails and calendar events, surveys through engagements.

**Q:** Does the data summary feel complete for now?
**A:** I am sure we will find something after a full review. But for now that looks good.

---

### Session B — Process Definition (March 2026)

**Q:** Ready to start Session B?
**A:** Yep.

**Q:** How does a new mentor record get created?
**A:** In all cases, the prospective mentor will fill in a form on the website to apply to be a mentor.

**Q:** When a mentor application is submitted, what happens automatically?
**A:** The new record will appear in a view "New Mentor Applicants" that is monitored by the Admin Team. We could do email notifications, but they would simply login and look at this view.

**Q:** Does the applicant receive an automatic confirmation email after submitting?
**A:** Yes. The admin gets a "thank you for submitting your application, someone will contact you shortly" email sent to the applicant.

**Q:** How does a record move from Submitted to In-Review?
**A:** Once an admin reviews the form submitted, they will change the status to In-Review or mark it as Declined if it is obviously fictitious (Donald Duck).

**Q:** When an application is Declined at the review stage, does the applicant get notified?
**A:** That is up to the Admin. If it is an obvious fake application, probably not.

**Q:** When a record moves to In-Review, is the applicant notified?
**A:** Silent.

**Q:** How does the review and interview process work in the In-Review stage?
**A:** The admin will contact at least two senior mentors who have agreed to act as reviewers. They will email the candidate and set up a meeting. Once the meeting is over they will give their opinion to the admin group and they will together make a final decision.

**Q:** Should reviewer mentors be tracked in the CRM?
**A:** It would be a good idea to add a "Mentor Reviewer" boolean so the list can be sorted to see who is available for interviews.

**Q:** Should the reviewers assigned to a specific applicant be tracked on the applicant's record?
**A:** No.

**Q:** When a prospect is Declined after the interview, does the applicant get notified?
**A:** Yes. The admin would send an email to the declined prospect. It would not be automatic, although they may want to create an email template.

**Q:** When a prospect is moved to Provisional, does the applicant get notified?
**A:** Yes. They will be sent an email by the admin with next steps.

**Q:** What has to happen before a provisional mentor can become Active?
**A:** They must complete an Ethics class and an Introduction to Mentoring class. They must sign two documents — a Mentoring Agreement and an Ethics Agreement.

**Q:** Are the training completion fields manually checked or automatically updated from a training system?
**A:** Initially all manual. Eventually we will integrate an LMS that will report classes have been completed.

**Q:** Who promotes a mentor from Provisional to Active, and how?
**A:** The admin team will review the status on a regular basis and send a congratulations email and give them a phone call.

**Q:** When promoted to Active, are mentors immediately available for client assignments?
**A:** They are immediately available.

**Q:** When a mentor goes Paused, what information needs to be captured?
**A:** Just that they are paused and the date that they went paused.

**Q:** Should there be a Date Paused field in addition to the Pause Until date?
**A:** Yes.

**Q:** When a mentor goes Paused, are existing clients notified or does it only affect new assignments?
**A:** It only pauses new assignments.

**Q:** How does a paused mentor transition back to Active?
**A:** They change it themselves.

**Q:** How should the Pause Until date work — are there different pause scenarios?
**A:** It should get cleared automatically. There are two possible workflows: 1 — The person pauses because they'll be on vacation or busy for a period of time, so they set a Pause Until date. 2 — The person has too many active clients and wants to stop getting new clients until they have more time, with no specific end date.

**Q:** Should there be a field to capture the reason for the pause?
**A:** No.

**Q:** How does a mentor go from Active to Inactive, and what happens to their clients?
**A:** The user or admin can change the status to Inactive. Usually the admin will discuss this with the mentor, however if the mentor is not responsive, the admin would take action themselves. Based on the situation, the admin would probably re-assign all clients to new mentors using the same process as used for new clients.

**Q:** Should a reason be captured when a mentor goes Inactive?
**A:** That would be a good idea, so everyone remembers why they went inactive.

**Q:** Should the same reason field be used for Resigned status?
**A:** That would be good.

**Q:** Are there automatic notifications when a mentor goes Inactive?
**A:** This is up to the admin, so no automatic notifications.

**Q:** How does a mentor resign?
**A:** Same as Inactive. Usually a discussion with admin. However, if unresponsive the admin may make the change for the mentor.

**Q:** Can a resigned mentor return to CBM?
**A:** Yes. It would be a manual process where the admin decides if they will be reactivated and what must be done. They may have to go through the onboarding process again, or not.

**Q:** Is a resigned mentor's record ever fully deleted?
**A:** Never deleted.

**Q:** Who can edit mentor record fields?
**A:** The admin and the mentor can edit all fields. Other mentors can view but not edit.

**Q:** Are there fields the mentor themselves cannot edit?
**A:** The calculated fields obviously. Compliance checkboxes and the badge level would be another good one.

**Q:** Should status changes be logged in the activity stream?
**A:** Yes.

**Q:** Are there any other automated emails or reminders beyond what we've covered?
**A:** No.

**Q:** Are there any other external systems involved in the mentor lifecycle?
**A:** The Google Workspace for email, calendar and docs.

**Q:** Does the process summary feel complete?
**A:** Looks great.
