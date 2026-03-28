# CBM Forms — EspoCRM Field Mapping Reference

Generated: 2026-03-28  
Source: CBM_Test_Instance-CRM-Reference.md v1.2

This document maps every Gravity Forms field to its target EspoCRM entity and internal API field name. Use this when configuring the webhook handler that posts form submissions to EspoCRM.

---

## EspoCRM API Endpoints

| Operation | Method | Endpoint |
| --- | --- | --- |
| Create Company (Account) | POST | `/api/v1/Account` |
| Create Contact | POST | `/api/v1/Contact` |
| Create Engagement | POST | `/api/v1/CEngagement` |
| Link Contact to Account | PUT | `/api/v1/Account/{id}/contacts` |

Authentication: API key passed in header as `X-Api-Key: {api_key}`

---

## Client Mentoring Request Form

Form creates **three linked records** in sequence:
1. Account (Company)
2. Contact (linked to Account)
3. CEngagement (linked to Account)

### Step 1 — Create Account (Company)

POST `/api/v1/Account`

| GF Field ID | Form Label | EspoCRM Field Name | Type | Notes |
| --- | --- | --- | --- | --- |
| 5 | Business Name | `name` | Text | Native field. Use "Unknown" if blank (pre-startup). |
| 6 | Business Website | `cWebsite` | URL | Custom field. |
| 7.1 | Address — Street | `billingAddressStreet` | Text | Native address field. |
| 7.3 | Address — City | `billingAddressCity` | Text | Native address field. |
| 7.4 | Address — State | `billingAddressState` | Text | Native address field. |
| 7.5 | Address — ZIP | `billingAddressPostalCode` | Text | Native address field. |
| 8 | Organization Type | `cClientOrganizationType` | Enum | Custom field. Values: `For-Profit` \| `Non-Profit` |
| 9 | Business Stage | `cBusinessStage` | Enum | Custom field. Values: `Pre-Startup` \| `Startup` \| `Early Stage` \| `Growth Stage` \| `Established` |
| 10 | Industry Sector | `cNaicsSector` | Enum | Custom field. Values: 20 NAICS sector strings. |
| 11 | NAICS Subsector | `cNaicsSubsector` | Enum | Custom field. TBD — subsector list to be loaded. |
| 12 | Mentoring Focus Areas | `cMentoringFocusAreas` | Multi-select | Custom field. TBD — values to be defined by Leadership. |
| 13 | Mentoring Needs Description | `cMentoringNeedsDescription` | Rich Text | Custom field. |
| — | (set by handler) | `cAccountType` | Multi-select | Hard-code value: `["Client Company"]` |

### Step 2 — Create Contact

POST `/api/v1/Contact`

| GF Field ID | Form Label | EspoCRM Field Name | Type | Notes |
| --- | --- | --- | --- | --- |
| 1.3 | Name — First | `firstName` | Text | Native field. |
| 1.6 | Name — Last | `lastName` | Text | Native field. |
| 2 | Email Address | `emailAddress` | Email | Native field. Pass as `{"data": [{"address": "{value}", "primary": true}]}` |
| 3 | Phone Number | `phoneNumber` | Phone | Native field. Pass as `{"data": [{"number": "{value}", "primary": true}]}` |
| 4 | Zip Code | `addressPostalCode` | Text | Native Contact address field. |
| — | (set by handler) | `cContactType` | Enum | Hard-code value: `"Client"` |
| — | (set by handler) | `accountId` | Link | Set to the Account ID returned from Step 1. |
| — | (set by handler) | `isPrimaryContact` | Boolean | Hard-code value: `true` |

### Step 3 — Create Engagement

POST `/api/v1/CEngagement`

| GF Field ID | Form Label | EspoCRM Field Name | Type | Notes |
| --- | --- | --- | --- | --- |
| — | (set by handler) | `cStatus` | Enum | Hard-code value: `"Submitted"` |
| — | (set by handler) | `accountId` | Link | Set to the Account ID returned from Step 1. |
| — | (set by handler) | `name` | Text | Auto-generate: `"Engagement — {Business Name} — {submission date}"` |

---

## Mentor Application Form

Form creates **one record**:
1. Contact (Mentor)

### Create Contact (Mentor)

POST `/api/v1/Contact`

| GF Field ID | Form Label | EspoCRM Field Name | Type | Notes |
| --- | --- | --- | --- | --- |
| 1.3 | Name — First | `firstName` | Text | Native field. |
| 1.4 | Name — Middle | `middleName` | Text | Native field (EspoCRM extended name). |
| 1.6 | Name — Last | `lastName` | Text | Native field. |
| 2 | Preferred Name | `cPreferredName` | Text | Custom field. Max 100 chars. |
| 3 | Personal Email Address | `emailAddress` | Email | Native field. Pass as `{"data": [{"address": "{value}", "primary": true}]}` |
| 4 | Phone Number | `phoneNumber` | Phone | Native field. Pass as `{"data": [{"number": "{value}", "primary": true}]}` |
| 5.1 | Address — Street | `addressStreet` | Text | Native Contact address field. |
| 5.3 | Address — City | `addressCity` | Text | Native Contact address field. |
| 5.4 | Address — State | `addressState` | Text | Native Contact address field. |
| 5.5 | Address — ZIP | `addressPostalCode` | Text | Native Contact address field. |
| 6 | LinkedIn Profile URL | `cLinkedInProfile` | URL | Custom field. |
| 7.1 | Currently Employed (checkbox) | `cCurrentlyEmployed` | Boolean | Custom field. Map checkbox value `"1"` → `true`, unchecked → `false`. |
| 8 | Professional Bio / Work Experience | `cProfessionalBio` | Rich Text | Custom field. |
| 9 | Industry Experience and Expertise | `cNaicsSectors` | Multi-select | Custom field. Pass as JSON array of selected values. |
| 10 | Languages Spoken Fluently | `cLanguagesSpoken` | Multi-select | Custom field. TBD — language list to be defined. Pass as JSON array. |
| 11 | Why Interested in Mentoring | `cWhyInterestedInMentoring` | Rich Text | Custom field. |
| 12 | How Did You Hear About CBM | `cHowDidYouHearAboutCbm` | Enum | Custom field. TBD — values to be defined. |
| 13 | Felony Conviction Disclosure | `cFelonyConviction` | Boolean | Custom field. Map `"Yes"` → `true`, `"No"` → `false`. RESTRICTED field — admin-only visibility. |
| 14.1 | Terms & Conditions Acceptance | `cTermsAndConditionsAccepted` | Boolean | Custom field. Map checked → `true`. |
| — | (set by handler) | `cTermsAndConditionsAcceptanceDateTime` | DateTime | Hard-code value: current UTC timestamp at time of submission. Format: `"YYYY-MM-DD HH:MM:SS"` |
| — | (set by handler) | `cContactType` | Enum | Hard-code value: `"Mentor"` |
| — | (set by handler) | `cMentorStatus` | Enum | Hard-code value: `"Submitted"` |

---

## TBD Items — Required Before Go-Live

The following items have placeholder values in the forms and must be finalized before the site launches:

| Item | Form | Field | Owner |
| --- | --- | --- | --- |
| Mentoring Focus Areas values | Client Intake | Field 12 | CBM Leadership |
| NAICS Subsector list (~100 values) | Client Intake | Field 11 | Tech Admin |
| Languages Spoken values | Mentor Application | Field 10 | CBM Leadership |
| How Did You Hear About CBM values | Mentor Application | Field 12 | CBM Leadership |
| Terms & Conditions page URL | Mentor Application | Field 14 description | CBM Team |
| Admin notification email address | Both forms | Notifications → Admin | CBM Admin |

---

## Multi-Select Field Formatting

EspoCRM multi-select fields expect values as a JSON array. When the webhook handler receives a comma-separated string from Gravity Forms, it must convert it:

```
Input:  "Manufacturing, Construction, Retail Trade"
Output: ["Manufacturing", "Construction", "Retail Trade"]
```

---

## Email and Phone Field Formatting

EspoCRM's native email and phone fields use a nested object format:

```json
"emailAddress": {
  "data": [{ "address": "user@example.com", "primary": true }]
}

"phoneNumber": {
  "data": [{ "number": "555-555-5555", "primary": true }]
}
```
