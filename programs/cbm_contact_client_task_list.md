# Task List — Contact: Client Contact
# Session A Date: March 2026
# Session B Date: March 2026

---

## TBD Items (Required Before Go-Live)

| # | Item | Question | Needs Input From |
|---|---|---|---|
| 1 | Last Contact Date formula | Which activity types count as a "contact" — email, session, engagement update? Define exact formula. | Technology/Admin team |
| 2 | Business Skills taxonomy | Define the complete predefined list for client business skills — same list as mentor Areas of Expertise for matching | Leadership/Program staff |
| 4 | Client self-service editing | Can clients update their own contact information via a portal or form? If yes, which fields? | Leadership/Technology |

---

## Manual Configuration Items (Post-Deployment)

| # | Item | Where to Configure | Notes |
|---|---|---|---|
| 1 | Last Contact Date formula | Entity Manager → Contact → Formula | Calculate from most recent email, session, or engagement activity |
| 2 | Sessions Attended formula | Entity Manager → Contact → Formula | Count from session attendance records linked to this contact |
| 3 | Workshops Attended formula | Entity Manager → Contact → Formula | Count from workshop attendance records linked to this contact |
| 5 | Field change audit logging | Entity Manager → Contact → Stream | Log changes to: Account, Contact Type, Primary Email, Primary Phone |
| 6 | Duplicate detection rules | Administration → Duplicate Check Rules | Detect duplicates by name + company or email address |
| 7 | Email display on Contact | Administration → Integrations → Google | Configure Gmail sync for email history on contact record |

---

## Additional Fields Discovered in Session B

None — no new fields discovered in the process session.

---

## Decisions Made

| # | Decision | Rationale |
|---|---|---|
| 1 | No status field on Client Contact | Client lifecycle tracked on Engagement, not Contact |
| 2 | One business per contact | Simplifies relationships and analytics |
| 3 | Primary contact auto-created from intake form | Form simultaneously creates Company, Contact, and Engagement |
| 4 | Additional contacts added manually by mentor | Secondary contacts (spouse, co-owner) added via Engagement or Company |
| 5 | Records never deleted | Historical data retained for analytics and potential future engagements |
| 6 | Create Date is read-only and locked | System-generated — should never be manually altered |
| 7 | Activity stream available but not prominent | Primary use case is communication — stream on separate tab |
| 8 | Sessions visible through Engagement only | Keeps Contact focused on communication use case |
| 9 | Referral source on Engagement not Contact | Referral governs all contacts on the engagement |
