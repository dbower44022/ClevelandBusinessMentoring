# Task List — Contact: Mentor
# Session A Date: March 2026
# Session B Date: March 2026

---

## TBD Items (Required Before Go-Live)

| # | Item | Question | Needs Input From |
|---|---|---|---|
| 1 | Activity stream filtering | Which field changes should appear in the activity stream vs. be suppressed? Recommend: status changes, assignment changes, compliance renewals only. | Admin team |
| 2 | Mentor categorization | Are there classification tiers, regional groupings, or specializations beyond status and role flags? | Leadership |
| 3 | Primary Chapter list | Define the complete list of chapters as they are established (geographic territories by zip code) | Leadership |
| 4 | Calculated field formulas | Define exact formulas for all calculated fields: Total Active Engagements, Assigned/Accepted (7 days), Total Engagement History, Total Hours Delivered, Average NPS Score, Years of Service, Last Activity Date, Last Engagement Accepted | Technology |
| 5 | Structured skill taxonomy | Should mentors have predefined multi-select fields for skills and expertise to enable automated mentor-client matching? If yes, define the taxonomy. | Leadership/Program staff |
| 6 | Language list | Define the complete list of languages for the Languages Spoken field | Leadership/Program staff |
| 7 | How Did You Hear About CBM values | Define the list of referral source values | Leadership |
| 8 | Badge thresholds | Define Bronze/Silver/Gold thresholds — what metrics (clients served, hours, sessions) and what numbers for each level, for each role type (Mentor, Co-Mentor, SME) | Leadership |

---

## Manual Configuration Items (Post-Deployment)

| # | Item | Where to Configure | Notes |
|---|---|---|---|
| 1 | Activity stream filtering | Entity Manager → Contact → Stream | Log status changes, compliance renewals, assignment changes. Suppress minor field edits. |
| 2 | "New Mentor Applicants" saved view | List View → Save Filter | Filter: Mentor Status = Submitted. Sort: Date Created descending. |
| 3 | Application confirmation email workflow | Administration → Workflows | Trigger: Mentor Status changes to Submitted. Send to applicant: "Thank you for submitting your application, someone will contact you shortly." |
| 4 | Decline notification email template | Administration → Email Templates | For admin use when notifying declined applicants. Two versions: early stage (fake applications) optional; post-interview standard. |
| 5 | Provisional acceptance email template | Administration → Email Templates | For admin use when notifying applicants of Provisional acceptance, including next steps. |
| 6 | Provisional completion review view | List View → Save Filter | Show all Provisional mentors with compliance checkboxes visible for admin review. |
| 7 | Active promotion congratulations template | Administration → Email Templates | For admin use when promoting mentor to Active status. |
| 8 | Automated pause expiry workflow | Administration → Workflows | Trigger: Current date = Pause Assignments Until date. Action: Change Mentor Status from Paused to Active, clear Pause Assignments Until date. |
| 9 | Engagement panel sort/filter | Entity Manager → Contact → Relationships | Sort: Most recent first. Enable status filter. |
| 10 | Sessions panel sort/filter | Entity Manager → Contact → Relationships | Sort: Most recent first. Enable date range filter. |
| 11 | Partner Liaison panel active-only filter | Entity Manager → Contact → Relationships | Filter: Active partner liaisons only. |
| 12 | Google Workspace integration | Administration → Integrations → Google | Gmail sync for email logging, Google Calendar sync, Google Meet link generation. |
| 13 | Role-based field visibility | Administration → Roles | Other mentors: Profile and Overview tabs only. Admins: All tabs. Mentors: All except Personal and Administrative restricted fields. |
| 14 | Field-level editing permissions | Administration → Roles | Admin-only edit: Mentor Status, all Compliance fields, Badge Level. Mentor-edit: Profile, Availability, contact details. Read-only for all: calculated fields. |
| 15 | Status change audit logging | Entity Manager → Contact → Stream | Log all Mentor Status changes with: previous value, new value, timestamp, changed by. |
| 16 | Calculated field formulas | Entity Manager → Contact → Formula | All analytics fields are read-only calculated values. See TBD Item 4 for formula definitions. |
| 17 | Annual Code of Ethics renewal alert | Administration → Workflows | Trigger: Code of Ethics Date approaches 12 months. Notify: Admin team. |
| 18 | Badge level calculation formula | Entity Manager → Contact → Formula | Calculate Bronze/Silver/Gold from Total Hours Delivered and Total Engagement History. Trigger recognition letter on level change. See TBD Item 8 for thresholds. |
| 19 | LMS integration (future) | Administration → Integrations | When LMS selected: auto-update Ethics Class Completed, Intro to Mentoring Completed, and completion dates from LMS completion events. |

---

## Additional Fields Discovered in Session B

| Field | Type | Description | Added to YAML |
|---|---|---|---|
| isMentorReviewer | bool | Flags mentors available to conduct applicant interviews | Yes |
| ethicsClassCompleted | bool | Ethics class completion tracking | Yes |
| ethicsClassCompletionDate | date | Ethics class completion date | Yes |
| introToMentoringCompleted | bool | Intro to Mentoring class completion | Yes |
| introToMentoringDate | date | Intro to Mentoring completion date | Yes |
| mentoringAgreementSigned | bool | Mentoring Agreement signed flag | Yes |
| mentoringAgreementDate | date | Mentoring Agreement date | Yes |
| datePaused | date | Date mentor status changed to Paused | Yes |
| statusChangeReason | text | Reason for Inactive or Resigned status change | Yes |

---

## Decisions Made

| # | Decision | Rationale |
|---|---|---|
| 1 | Single chapter assignment only | Multiple chapters would make analytics and client assignment calculations extremely difficult |
| 2 | Three role checkboxes (Is Mentor, Is Co-Mentor, Is SME) | A mentor can hold multiple roles simultaneously. Checkboxes are easier to filter than multi-select. |
| 3 | Is Mentor Reviewer as separate boolean | Allows filtering the mentor list to find available interview panelists quickly |
| 4 | Status Change Reason covers both Inactive and Resigned | One field serves both end states rather than duplicating |
| 5 | No pause reason field | Not needed — the date and duration provide sufficient operational context |
| 6 | Provisional promotion is manual (admin-triggered) | Admin judgment required to verify all four requirements before promoting |
| 7 | Auto-resume on Pause Until date | Reduces admin overhead for scheduled pauses (vacations, busy periods) |
| 8 | Records never deleted | Full historical retention for analytics and potential reactivation |
| 9 | Compliance fields admin-only edit | Prevents mentors from self-certifying compliance items |
| 10 | Sessions visible directly on mentor record | Allows mentors to audit their own session entry without navigating through engagements |
| 11 | Profile fields mentor-editable | Mentors maintain their own professional profiles |
| 12 | Decline notification is manual | Fake/invalid applications should not receive automated responses |
