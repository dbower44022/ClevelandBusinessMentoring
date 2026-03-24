# Cleveland Business Mentors — CRM Configuration

This repository contains all configuration and documentation for the
Cleveland Business Mentors EspoCRM implementation.

## Structure

```
ClevelandBusinessMentoring/
├── PRDs/                    # Product Requirements Documents
├── programs/                # YAML program files (EspoCRM configuration)
├── Implementation Docs/     # Generated reference manual
├── reports/                 # Deployment run/verify reports
├── ComparisonDocs/          # Research and platform comparison documents
├── AccountInformation/      # Account credentials and recovery information
├── UI Mocks and Screenshots/# UI design assets
├── scripts/                 # Utility scripts
│   └── espocrm-setup/       # Early EspoCRM setup reference scripts
├── tests/
│   └── php/                 # PHP tests for WordPress integration
└── wp-content/
    └── mu-plugins/          # WordPress/EspoCRM integration plugin
```

## Deployment

Configuration is deployed using the
[EspoCRM Implementation Tool](https://github.com/dbower44022/espo-implementation-tool).

Place YAML program files in the `programs/` directory. The tool loads
them automatically when this folder is configured as the project folder
for an instance.

See the tool's [Deployment Guide](https://github.com/dbower44022/espo-implementation-tool/blob/main/docs/deployment-guide.md)
for step-by-step deployment instructions.

## Reference Manual

The generated CRM reference manual lives in `Implementation Docs/`.
It is produced by the implementation tool's **Generate Docs** function
and must not be edited manually.

## YAML Program Files

| File | Contents |
|---|---|
| `cbm_engagement_fields.yaml` | Engagement entity — fields and layout |
| `cbm_session_fields.yaml` | Session entity — fields and layout |
| `cbm_nps_survey_fields.yaml` | NPS Survey Response entity |
| `cbm_workshop_fields.yaml` | Workshop entity |
| `cbm_workshop_attendance_fields.yaml` | Workshop Attendance entity |
| `cbm_dues_fields.yaml` | Dues entity |
| `cbm_contact_fields.yaml` | Contact — mentor and client fields |
| `cbm_account_fields.yaml` | Account (Company) — client fields |
| `cbm_partner_account_fields.yaml` | Account — partner fields extension |
| `cbm_partner_contact_fields.yaml` | Contact — partner contact extension |
| `cbm_partner_agreement_fields.yaml` | Partner Agreement entity |
| `cbm_client_partner_association_fields.yaml` | Client-Partner Association entity |
| `cbm_partner_activity_fields.yaml` | Partner Activity entity |
| `cbm_relationships.yaml` | Core entity relationships |
| `cbm_partner_relationships.yaml` | Partner module relationships |
| `cbm_full_rebuild.yaml` | Full rebuild convenience file |
