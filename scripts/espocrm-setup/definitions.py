"""
CBM CRM entity, field, relationship, and layout definitions.

All definitions are derived from CBM-PRD-CRM-Client.docx v1.4.
EspoCRM field types: varchar, text, enum, multiEnum, int, float, bool,
                     date, datetime, email, phone, url, link, linkMultiple,
                     address, currency, wysiwyg, personName.
"""

# ======================================================================
# US States (for State of Registration dropdown)
# ======================================================================

US_STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming", "District of Columbia",
]

# ======================================================================
# NAICS Sectors and Subsectors (2022 federal standard)
# ======================================================================

NAICS_SECTORS = [
    "11 - Agriculture, Forestry, Fishing and Hunting",
    "21 - Mining, Quarrying, and Oil and Gas Extraction",
    "22 - Utilities",
    "23 - Construction",
    "31-33 - Manufacturing",
    "42 - Wholesale Trade",
    "44-45 - Retail Trade",
    "48-49 - Transportation and Warehousing",
    "51 - Information",
    "52 - Finance and Insurance",
    "53 - Real Estate and Rental and Leasing",
    "54 - Professional, Scientific, and Technical Services",
    "55 - Management of Companies and Enterprises",
    "56 - Administrative and Support and Waste Management and Remediation Services",
    "61 - Educational Services",
    "62 - Health Care and Social Assistance",
    "71 - Arts, Entertainment, and Recreation",
    "72 - Accommodation and Food Services",
    "81 - Other Services (except Public Administration)",
    "92 - Public Administration",
]

NAICS_SUBSECTORS = [
    "111 - Crop Production",
    "112 - Animal Production and Aquaculture",
    "113 - Forestry and Logging",
    "114 - Fishing, Hunting and Trapping",
    "115 - Support Activities for Agriculture and Forestry",
    "211 - Oil and Gas Extraction",
    "212 - Mining (except Oil and Gas)",
    "213 - Support Activities for Mining",
    "221 - Utilities",
    "236 - Construction of Buildings",
    "237 - Heavy and Civil Engineering Construction",
    "238 - Specialty Trade Contractors",
    "311 - Food Manufacturing",
    "312 - Beverage and Tobacco Product Manufacturing",
    "313 - Textile Mills",
    "314 - Textile Product Mills",
    "315 - Apparel Manufacturing",
    "316 - Leather and Allied Product Manufacturing",
    "321 - Wood Product Manufacturing",
    "322 - Paper Manufacturing",
    "323 - Printing and Related Support Activities",
    "324 - Petroleum and Coal Products Manufacturing",
    "325 - Chemical Manufacturing",
    "326 - Plastics and Rubber Products Manufacturing",
    "327 - Nonmetallic Mineral Product Manufacturing",
    "331 - Primary Metal Manufacturing",
    "332 - Fabricated Metal Product Manufacturing",
    "333 - Machinery Manufacturing",
    "334 - Computer and Electronic Product Manufacturing",
    "335 - Electrical Equipment, Appliance, and Component Manufacturing",
    "336 - Transportation Equipment Manufacturing",
    "337 - Furniture and Related Product Manufacturing",
    "339 - Miscellaneous Manufacturing",
    "423 - Merchant Wholesalers, Durable Goods",
    "424 - Merchant Wholesalers, Nondurable Goods",
    "425 - Wholesale Trade Agents and Brokers",
    "441 - Motor Vehicle and Parts Dealers",
    "444 - Building Material and Garden Equipment and Supplies Dealers",
    "445 - Food and Beverage Retailers",
    "449 - Furniture, Home Furnishings, Electronics, and Appliance Retailers",
    "451 - Sporting Goods, Hobby, Musical Instrument, Book, and Miscellaneous Retailers",
    "455 - General Merchandise Retailers",
    "456 - Health and Personal Care Retailers",
    "457 - Gasoline Stations and Fuel Dealers",
    "458 - Clothing, Clothing Accessories, Shoe, and Jewelry Retailers",
    "481 - Air Transportation",
    "482 - Rail Transportation",
    "483 - Water Transportation",
    "484 - Truck Transportation",
    "485 - Transit and Ground Passenger Transportation",
    "486 - Pipeline Transportation",
    "487 - Scenic and Sightseeing Transportation",
    "488 - Support Activities for Transportation",
    "491 - Postal Service",
    "492 - Couriers and Messengers",
    "493 - Warehousing and Storage",
    "512 - Motion Picture and Sound Recording Industries",
    "513 - Publishing Industries",
    "516 - Broadcasting and Content Providers",
    "517 - Telecommunications",
    "518 - Computing Infrastructure Providers, Data Processing, Web Hosting, and Related Services",
    "519 - Web Search Portals, Libraries, Archives, and Other Information Services",
    "521 - Monetary Authorities-Central Bank",
    "522 - Credit Intermediation and Related Activities",
    "523 - Securities, Commodity Contracts, and Other Financial Investments",
    "524 - Insurance Carriers and Related Activities",
    "525 - Funds, Trusts, and Other Financial Vehicles",
    "531 - Real Estate",
    "532 - Rental and Leasing Services",
    "533 - Lessors of Nonfinancial Intangible Assets",
    "541 - Professional, Scientific, and Technical Services",
    "551 - Management of Companies and Enterprises",
    "561 - Administrative and Support Services",
    "562 - Waste Management and Remediation Services",
    "611 - Educational Services",
    "621 - Ambulatory Health Care Services",
    "622 - Hospitals",
    "623 - Nursing and Residential Care Facilities",
    "624 - Social Assistance",
    "711 - Performing Arts, Spectator Sports, and Related Industries",
    "712 - Museums, Historical Sites, and Similar Institutions",
    "713 - Amusement, Gambling, and Recreation Industries",
    "721 - Accommodation",
    "722 - Food Services and Drinking Places",
    "811 - Repair and Maintenance",
    "812 - Personal and Laundry Services",
    "813 - Religious, Grantmaking, Civic, Professional, and Similar Organizations",
    "814 - Private Households",
    "921 - Executive, Legislative, and Other General Government Support",
    "922 - Justice, Public Order, and Safety Activities",
    "923 - Administration of Human Resource Programs",
    "924 - Administration of Environmental Quality Programs",
    "925 - Administration of Housing Programs, Urban Planning, and Community Development",
    "926 - Administration of Economic Programs",
    "927 - Space Research and Technology",
    "928 - National Security and International Affairs",
]

# Placeholder values — CBM leadership must define these before go-live.
MENTORING_FOCUS_AREAS = [
    "Business Planning",
    "Marketing & Sales",
    "Financial Management",
    "Operations",
    "Human Resources",
    "Legal & Compliance",
    "Technology",
    "Funding & Capital",
    "Leadership & Management",
    "Growth Strategy",
]

# ======================================================================
# ENTITY DEFINITIONS — custom entities to create
# ======================================================================

# Note: Account (Company) and Contact are native EspoCRM entities.
# We relabel Account → Company and add custom fields.

CUSTOM_ENTITIES = [
    {
        "name": "Engagement",
        "type": "Base",
        "labelSingular": "Engagement",
        "labelPlural": "Engagements",
        "stream": True,
        "disabled": False,
        "kanbanStatusIgnoreList": [],
    },
    {
        "name": "CbmSession",
        "type": "Base",
        "labelSingular": "Session",
        "labelPlural": "Sessions",
        "stream": True,
        "disabled": False,
    },
    {
        "name": "NpsSurveyResponse",
        "type": "Base",
        "labelSingular": "NPS Survey Response",
        "labelPlural": "NPS Survey Responses",
        "stream": False,
        "disabled": False,
    },
    {
        "name": "Workshop",
        "type": "Base",
        "labelSingular": "Workshop",
        "labelPlural": "Workshops",
        "stream": True,
        "disabled": False,
    },
    {
        "name": "WorkshopAttendance",
        "type": "Base",
        "labelSingular": "Workshop Attendance",
        "labelPlural": "Workshop Attendance",
        "stream": False,
        "disabled": False,
    },
]


# ======================================================================
# FIELD DEFINITIONS — grouped by entity
# ======================================================================

# ------------------------------------------------------------------
# Account (Company) — Phase 1 intake fields
# ------------------------------------------------------------------

ACCOUNT_FIELDS_PHASE1 = [
    {
        "name": "organizationType",
        "type": "enum",
        "label": "Organization Type",
        "required": True,
        "options": ["For-Profit", "Non-Profit"],
        "isSorted": False,
    },
    {
        "name": "businessStage",
        "type": "enum",
        "label": "Business Stage",
        "required": True,
        "options": ["Pre-Startup", "Startup", "Early Stage", "Growth Stage", "Established"],
        "isSorted": False,
    },
    {
        "name": "naicsSector",
        "type": "enum",
        "label": "NAICS Sector",
        "required": True,
        "options": NAICS_SECTORS,
        "isSorted": False,
    },
    {
        "name": "naicsSubsector",
        "type": "enum",
        "label": "NAICS Subsector",
        "required": True,
        "options": NAICS_SUBSECTORS,
        "isSorted": False,
    },
    {
        "name": "mentoringFocusAreas",
        "type": "multiEnum",
        "label": "Mentoring Focus Areas",
        "required": True,
        "options": MENTORING_FOCUS_AREAS,
    },
    {
        "name": "mentoringNeedsDescription",
        "type": "wysiwyg",
        "label": "Mentoring Needs Description",
        "required": True,
    },
    {
        "name": "companyRole",
        "type": "enum",
        "label": "Company Role",
        "required": False,
        "options": ["Client Company", "Partner", "Funder", "Other"],
        "default": "Client Company",
        "isSorted": False,
    },
]

# ------------------------------------------------------------------
# Account (Company) — Phase 2 post-assignment fields
# ------------------------------------------------------------------

ACCOUNT_FIELDS_PHASE2 = [
    {
        "name": "businessDescription",
        "type": "wysiwyg",
        "label": "Business Description",
    },
    {
        "name": "timeInOperation",
        "type": "varchar",
        "label": "Time in Operation",
        "maxLength": 100,
    },
    {
        "name": "currentTeamSize",
        "type": "int",
        "label": "Current Team Size",
        "min": 0,
    },
    {
        "name": "revenueRange",
        "type": "enum",
        "label": "Revenue Range",
        "options": [
            "Pre-Revenue",
            "Under $50K",
            "$50K - $100K",
            "$100K - $250K",
            "$250K - $500K",
            "$500K - $1M",
            "$1M - $5M",
            "Over $5M",
        ],
        "isSorted": False,
    },
    {
        "name": "fundingSituation",
        "type": "wysiwyg",
        "label": "Funding Situation",
    },
    {
        "name": "currentChallenges",
        "type": "wysiwyg",
        "label": "Current Challenges",
    },
    {
        "name": "goalsAndObjectives",
        "type": "wysiwyg",
        "label": "Goals and Objectives",
    },
    {
        "name": "desiredOutcomes",
        "type": "wysiwyg",
        "label": "Desired Outcomes (6-12 Months)",
    },
    {
        "name": "previousMentoringExperience",
        "type": "wysiwyg",
        "label": "Previous Mentoring/Advisory Experience",
    },
    {
        "name": "currentProfessionalAdvisors",
        "type": "multiEnum",
        "label": "Current Professional Advisors",
        "options": [
            "Banker / Financial Institution",
            "Attorney / Legal Counsel",
            "Accountant / CPA",
            "IT Consultant",
            "Insurance Agent",
            "Marketing / PR Consultant",
            "Business Coach",
        ],
    },
    {
        "name": "registeredWithState",
        "type": "bool",
        "label": "Registered with State",
        "default": False,
    },
    {
        "name": "stateOfRegistration",
        "type": "enum",
        "label": "State of Registration",
        "options": US_STATES,
        "isSorted": True,
    },
    {
        "name": "legalBusinessStructure",
        "type": "enum",
        "label": "Legal Business Structure",
        "options": [
            "Sole Proprietor",
            "Partnership",
            "LLC",
            "S-Corp",
            "C-Corp",
            "Non-Profit 501(c)(3)",
            "Other",
        ],
        "isSorted": False,
    },
    {
        "name": "einOnFile",
        "type": "bool",
        "label": "EIN on File",
        "default": False,
    },
    {
        "name": "dateOfFormation",
        "type": "date",
        "label": "Date of Formation",
    },
    {
        "name": "registeredAgent",
        "type": "bool",
        "label": "Registered Agent",
        "default": False,
    },
    {
        "name": "einNumber",
        "type": "varchar",
        "label": "EIN Number",
        "maxLength": 20,
        # Field-level security is configured separately via Roles.
    },
]

ACCOUNT_FIELDS = ACCOUNT_FIELDS_PHASE1 + ACCOUNT_FIELDS_PHASE2

# ------------------------------------------------------------------
# Contact — custom fields (native fields: firstName, lastName, etc.)
# ------------------------------------------------------------------

CONTACT_FIELDS = [
    {
        "name": "roleAtBusiness",
        "type": "varchar",
        "label": "Role at Business",
        "maxLength": 150,
    },
    {
        "name": "isPrimaryContact",
        "type": "bool",
        "label": "Primary Contact",
        "default": False,
    },
]

# ------------------------------------------------------------------
# Engagement
# ------------------------------------------------------------------

ENGAGEMENT_FIELDS = [
    {
        "name": "status",
        "type": "enum",
        "label": "Status",
        "required": True,
        "options": [
            "Submitted",
            "Pending Acceptance",
            "Assigned",
            "Active",
            "On-Hold",
            "Dormant",
            "Inactive",
            "Abandoned",
            "Completed",
        ],
        "default": "Submitted",
        "isSorted": False,
        "style": {
            "Submitted": "info",
            "Pending Acceptance": "warning",
            "Assigned": "primary",
            "Active": "success",
            "On-Hold": "warning",
            "Dormant": "danger",
            "Inactive": "danger",
            "Abandoned": "default",
            "Completed": "success",
        },
    },
    {
        "name": "startDate",
        "type": "date",
        "label": "Start Date",
    },
    {
        "name": "closeDate",
        "type": "date",
        "label": "Close Date",
    },
    {
        "name": "meetingCadence",
        "type": "enum",
        "label": "Meeting Cadence",
        "options": ["Weekly", "Bi-Weekly", "Monthly", "As Needed"],
        "isSorted": False,
    },
    {
        "name": "engagementCloseReason",
        "type": "enum",
        "label": "Engagement Close Reason",
        "options": [
            "Goals Achieved",
            "Client Withdrew",
            "Inactive / No Response",
            "Other",
        ],
        "isSorted": False,
    },
    {
        "name": "submissionDate",
        "type": "datetime",
        "label": "Submission Date",
    },
    {
        "name": "totalSessions",
        "type": "int",
        "label": "Total Sessions",
        "readOnly": True,
        "min": 0,
    },
    {
        "name": "totalSessionsLast30Days",
        "type": "int",
        "label": "Total Sessions (Last 30 Days)",
        "readOnly": True,
        "min": 0,
    },
    {
        "name": "lastSessionDate",
        "type": "datetime",
        "label": "Last Session Date",
        "readOnly": True,
    },
    {
        "name": "totalSessionHours",
        "type": "float",
        "label": "Total Session Hours",
        "readOnly": True,
        "min": 0,
    },
    {
        "name": "nextSessionDateTime",
        "type": "datetime",
        "label": "Next Session Date/Time",
    },
]

# ------------------------------------------------------------------
# Session (CbmSession — avoids collision with EspoCRM reserved names)
# ------------------------------------------------------------------

CBM_SESSION_FIELDS = [
    {
        "name": "sessionDateTime",
        "type": "datetime",
        "label": "Session Date/Time",
        "required": True,
    },
    {
        "name": "duration",
        "type": "int",
        "label": "Duration (minutes)",
        "required": True,
        "min": 1,
    },
    {
        "name": "sessionType",
        "type": "enum",
        "label": "Session Type",
        "required": True,
        "options": ["In-Person", "Video Call", "Phone Call"],
        "isSorted": False,
    },
    {
        "name": "meetingLocationType",
        "type": "enum",
        "label": "Meeting Location Type",
        "options": ["CBM Office", "Client's Place of Business", "Other"],
        "isSorted": False,
    },
    {
        "name": "locationDetails",
        "type": "varchar",
        "label": "Location Details",
        "maxLength": 255,
    },
    {
        "name": "topicsCovered",
        "type": "multiEnum",
        "label": "Topics Covered",
        "options": MENTORING_FOCUS_AREAS,
    },
    {
        "name": "topicsCoveredNotes",
        "type": "wysiwyg",
        "label": "Topics Covered Notes",
    },
    {
        "name": "mentorNotes",
        "type": "wysiwyg",
        "label": "Mentor Notes",
    },
    {
        "name": "nextSteps",
        "type": "wysiwyg",
        "label": "Next Steps",
    },
    {
        "name": "newBusinessStarted",
        "type": "bool",
        "label": "New Business Started",
        "default": False,
    },
    {
        "name": "nextSessionDateTime",
        "type": "datetime",
        "label": "Next Session Date/Time",
    },
]

# ------------------------------------------------------------------
# NPS Survey Response
# ------------------------------------------------------------------

NPS_SURVEY_RESPONSE_FIELDS = [
    {
        "name": "surveyTrigger",
        "type": "enum",
        "label": "Survey Trigger",
        "options": ["2nd Session", "Every 5 Sessions", "Engagement Close"],
        "readOnly": True,
        "isSorted": False,
    },
    {
        "name": "surveyDateTime",
        "type": "datetime",
        "label": "Survey Date/Time",
        "readOnly": True,
    },
    {
        "name": "npsScore",
        "type": "int",
        "label": "NPS Score",
        "required": True,
        "min": 0,
        "max": 10,
    },
    {
        "name": "didCbmHelpYou",
        "type": "bool",
        "label": "Did CBM Help You?",
        "required": True,
    },
    {
        "name": "wouldReturnToMentor",
        "type": "int",
        "label": "I Would Return to See This Mentor Again",
        "required": True,
        "min": 1,
        "max": 5,
    },
    {
        "name": "mentorListenedAndUnderstood",
        "type": "int",
        "label": "Mentor Listened and Understood My Needs",
        "required": True,
        "min": 1,
        "max": 5,
    },
    {
        "name": "improvementFeedback",
        "type": "wysiwyg",
        "label": "How Could CBM Better Meet Your Needs?",
    },
]

# ------------------------------------------------------------------
# Workshop
# ------------------------------------------------------------------

WORKSHOP_FIELDS = [
    {
        "name": "workshopDateTime",
        "type": "datetime",
        "label": "Date/Time",
        "required": True,
    },
    {
        "name": "topicCategory",
        "type": "enum",
        "label": "Topic/Category",
        "required": True,
        "options": MENTORING_FOCUS_AREAS,
        "isSorted": False,
    },
    {
        "name": "presenter",
        "type": "varchar",
        "label": "Presenter",
        "maxLength": 255,
    },
    {
        "name": "location",
        "type": "varchar",
        "label": "Location",
        "maxLength": 255,
    },
    {
        "name": "workshopDescription",
        "type": "wysiwyg",
        "label": "Description",
    },
    {
        "name": "maximumCapacity",
        "type": "int",
        "label": "Maximum Capacity",
        "min": 0,
    },
    {
        "name": "status",
        "type": "enum",
        "label": "Status",
        "required": True,
        "options": ["Scheduled", "Completed", "Cancelled"],
        "default": "Scheduled",
        "isSorted": False,
    },
]

# ------------------------------------------------------------------
# Workshop Attendance
# ------------------------------------------------------------------

WORKSHOP_ATTENDANCE_FIELDS = [
    {
        "name": "attendanceDate",
        "type": "date",
        "label": "Attendance Date",
        "readOnly": True,
    },
    {
        "name": "attended",
        "type": "bool",
        "label": "Attended",
        "required": True,
        "default": True,
    },
]


# ======================================================================
# RELATIONSHIP DEFINITIONS
# ======================================================================

# EspoCRM link types:
#   "hasMany" / "belongsTo"  = one-to-many
#   "hasMany" / "hasMany"    = many-to-many
#   "hasOne"  / "belongsTo"  = one-to-one

RELATIONSHIPS = [
    # 3.1 Company → Contact (one-to-many)
    # Note: This is a native relationship (accounts → contacts) that already
    # exists in EspoCRM. We only need to verify it, not create it.

    # 3.2 Company → Engagement (one-to-many)
    {
        "entity": "Account",
        "entityForeign": "Engagement",
        "link": "engagements",
        "linkForeign": "company",
        "label": "Engagements",
        "labelForeign": "Company",
        "linkType": "hasMany",
        "linkForeignType": "belongsTo",
    },

    # 3.3 Engagement → Assigned Mentor (many-to-one: Engagement.assignedMentor → Contact)
    {
        "entity": "Engagement",
        "entityForeign": "Contact",
        "link": "assignedMentor",
        "linkForeign": "mentorEngagements",
        "label": "Assigned Mentor",
        "labelForeign": "Mentor Engagements",
        "linkType": "belongsTo",
        "linkForeignType": "hasMany",
    },

    # 3.3 Engagement → Co-Mentors (many-to-many)
    {
        "entity": "Engagement",
        "entityForeign": "Contact",
        "link": "coMentors",
        "linkForeign": "coMentorEngagements",
        "label": "Co-Mentors",
        "labelForeign": "Co-Mentor Engagements",
        "linkType": "hasMany",
        "linkForeignType": "hasMany",
        "relationName": "engagementCoMentor",
    },

    # 3.3 Engagement → SMEs (many-to-many)
    {
        "entity": "Engagement",
        "entityForeign": "Contact",
        "link": "smes",
        "linkForeign": "smeEngagements",
        "label": "SMEs",
        "labelForeign": "SME Engagements",
        "linkType": "hasMany",
        "linkForeignType": "hasMany",
        "relationName": "engagementSme",
    },

    # 3.4 Engagement → Session (one-to-many)
    {
        "entity": "Engagement",
        "entityForeign": "CbmSession",
        "link": "sessions",
        "linkForeign": "engagement",
        "label": "Sessions",
        "labelForeign": "Engagement",
        "linkType": "hasMany",
        "linkForeignType": "belongsTo",
    },

    # 3.5 Engagement → NPS Survey Response (one-to-many)
    {
        "entity": "Engagement",
        "entityForeign": "NpsSurveyResponse",
        "link": "npsSurveyResponses",
        "linkForeign": "engagement",
        "label": "NPS Survey Responses",
        "labelForeign": "Engagement",
        "linkType": "hasMany",
        "linkForeignType": "belongsTo",
    },

    # NPS Survey Response → triggering Session (many-to-one, optional)
    {
        "entity": "NpsSurveyResponse",
        "entityForeign": "CbmSession",
        "link": "triggeringSession",
        "linkForeign": "npsSurveyResponses",
        "label": "Triggering Session",
        "labelForeign": "NPS Survey Responses",
        "linkType": "belongsTo",
        "linkForeignType": "hasMany",
    },

    # 3.6 Contact → Workshop Attendance (one-to-many)
    {
        "entity": "Contact",
        "entityForeign": "WorkshopAttendance",
        "link": "workshopAttendance",
        "linkForeign": "contact",
        "label": "Workshop Attendance",
        "labelForeign": "Contact",
        "linkType": "hasMany",
        "linkForeignType": "belongsTo",
    },

    # 3.7 Workshop → Workshop Attendance (one-to-many)
    {
        "entity": "Workshop",
        "entityForeign": "WorkshopAttendance",
        "link": "attendees",
        "linkForeign": "workshop",
        "label": "Attendees",
        "labelForeign": "Workshop",
        "linkType": "hasMany",
        "linkForeignType": "belongsTo",
    },

    # Workshop Attendance → Engagement (many-to-one, for context)
    {
        "entity": "WorkshopAttendance",
        "entityForeign": "Engagement",
        "link": "engagement",
        "linkForeign": "workshopAttendance",
        "label": "Engagement",
        "labelForeign": "Workshop Attendance",
        "linkType": "belongsTo",
        "linkForeignType": "hasMany",
    },

    # 3.9 Engagement → Engagement Contacts (many-to-many)
    {
        "entity": "Engagement",
        "entityForeign": "Contact",
        "link": "engagementContacts",
        "linkForeign": "participatingEngagements",
        "label": "Engagement Contacts",
        "labelForeign": "Participating Engagements",
        "linkType": "hasMany",
        "linkForeignType": "hasMany",
        "relationName": "engagementContact",
    },
]

# ======================================================================
# Dynamic Logic — conditional field visibility
# ======================================================================

# These are applied after fields are created. They control when fields
# are visible or required based on other field values.

DYNAMIC_LOGIC = {
    "Account": {
        # Show registration fields only when Registered with State = true
        "stateOfRegistration": {
            "visible": {
                "conditionGroup": [
                    {"type": "isTrue", "attribute": "registeredWithState"}
                ]
            }
        },
        "legalBusinessStructure": {
            "visible": {
                "conditionGroup": [
                    {"type": "isTrue", "attribute": "registeredWithState"}
                ]
            }
        },
        "einOnFile": {
            "visible": {
                "conditionGroup": [
                    {"type": "isTrue", "attribute": "registeredWithState"}
                ]
            }
        },
        "dateOfFormation": {
            "visible": {
                "conditionGroup": [
                    {"type": "isTrue", "attribute": "registeredWithState"}
                ]
            }
        },
        "registeredAgent": {
            "visible": {
                "conditionGroup": [
                    {"type": "isTrue", "attribute": "registeredWithState"}
                ]
            }
        },
        "einNumber": {
            "visible": {
                "conditionGroup": [
                    {"type": "isTrue", "attribute": "registeredWithState"}
                ]
            }
        },
    },
    "CbmSession": {
        # Show Meeting Location Type only when Session Type = In-Person
        "meetingLocationType": {
            "visible": {
                "conditionGroup": [
                    {
                        "type": "equals",
                        "attribute": "sessionType",
                        "value": "In-Person",
                    }
                ]
            }
        },
        # Show Location Details only when Meeting Location Type = Other
        "locationDetails": {
            "visible": {
                "conditionGroup": [
                    {
                        "type": "equals",
                        "attribute": "meetingLocationType",
                        "value": "Other",
                    }
                ]
            }
        },
    },
}
