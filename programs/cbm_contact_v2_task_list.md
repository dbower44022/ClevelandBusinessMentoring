# Task List — Contact Entity Definition
# Session Date: March 2026
# Entity: Contact

---

## TBD Items (Required Before Go-Live)

| # | Field/Item | Question | Needs Input From |
|---|---|---|---|
| 1 | Personal Notes Template | Design a structured note template for mentors to capture personal relationship details (family, pets, interests). Should it live on Contact, Engagement, or both? | Program staff |
| 2 | Business Discipline Taxonomy | Define the complete list of business areas/disciplines for mentor expertise and client needs — used for automated mentor-client matching. Same list applies to both Contact and Account entities. | Leadership/Program staff |
| 3 | Areas of Interest | Is this a separate field from Areas of Expertise? How is it used differently in matching? | Leadership/Program staff |
| 6 | Badge Thresholds | Define Bronze/Silver/Gold thresholds for primary mentors, co-mentors, and SMEs. What metrics are included and how are they weighted? | Leadership |
| — | Chapter List | Define the complete list of CBM chapters as they are established (geographic territories by zip code). | Leadership |

---

## Manual Configuration Items (Post-Deployment)

| # | Item | Where to Configure | Notes |
|---|---|---|---|
| 4 | Annual Ethics Agreement Renewal Alert | Administration → Workflows | Notify administrator when a mentor's ethics agreement date is approaching 12 months. |
| 5 | Badge Level Calculation Formula | Entity Manager → Contact → Formula | Calculate Bronze/Silver/Gold based on Total Clients Served and Total Mentoring Hours. Trigger recognition letter on level change. |
| 7 | Mentor Analytics Dashboard | Reports → Dashboards | Design dashboard showing mentor performance metrics across organization and by chapter. |
| 8 | Role-Based Access Control | Administration → Roles | Define roles for: Administrator, Intake Coordinator, Mentor, Chapter Administrator. Restrict sensitive fields and workflows accordingly. |
| 9 | Date of Last Activity | Entity Manager → Contact → Formula | Calculate from most recent session, workshop attendance, or engagement activity date. |
| — | Dynamic Logic — Mentor Tab | Entity Manager → Contact → Dynamic Logic | Show Mentor tab when Is Mentor, Is Co-Mentor, or Is SME is checked. |
| — | Dynamic Logic — Engagement Panel | Entity Manager → Contact → Dynamic Logic | Show Engagement panel for mentor and client contacts only — hide for partner contacts. |

---

## Decisions Made This Session

| # | Decision | Rationale |
|---|---|---|
| 1 | Contact extends native Person entity | Individuals are tracked as Contacts; organizations as Accounts. Native entity reuse avoids duplication. |
| 2 | Three role checkboxes (Is Mentor, Is Co-Mentor, Is SME) | Checkboxes are easier to see and filter than a multi-select. A person can hold all three simultaneously. |
| 3 | Mentor tab uses Dynamic Logic | Mentor fields are irrelevant for client and partner contacts. Dynamic Logic keeps the record clean. |
| 4 | Referral tracking at organization level only | Referrals are tracked on the Engagement (from which partner organization). Individual-level referral tracking not required. |
| 5 | Session history visible through Engagement | Sessions are not shown directly on Contact — accessible through the related Engagement. Keeps Contact record focused. |
| 6 | Conflict of interest not a dedicated field | Too rare to warrant a field. Handled via general Notes field if needed. |
| 7 | Technology skills as free text | Technology changes too fast for a fixed list. Free-form text for both mentors and clients. |
| 8 | Chapter as multi-select on Contact | Mentors can serve multiple chapters; client contacts typically one. Multi-select accommodates both cases. |
