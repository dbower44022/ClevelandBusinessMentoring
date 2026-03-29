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
- CRM integration — Gravity Forms posts data directly to EspoCRM via the REST API
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
WordPress natively supports dynamic form processing through plugins. All intake and registration forms on the CBM website are built using Gravity Forms and post data directly to EspoCRM via the REST API. The key forms and their integration targets are:
- Client Mentoring Request form — posts to EspoCRM REST API; creates linked Company, Contact, and Engagement records (Engagement Status = Submitted)
- Mentor Application form — posts to EspoCRM REST API; creates a Contact record (Contact Type = Mentor, Mentor Status = Submitted)
- Workshop & Event Registration — to be defined; integration target TBD pending LMS and event management decisions
- Contact form — routes to CBM admin email via WordPress form plugin email notification; no CRM record created
Note: Gravity Forms has been selected as the WordPress form plugin for all CBM intake forms.

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