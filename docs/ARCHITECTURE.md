# Technical Architecture

**Project**: Cleveland Business Mentors
**Last Updated**: 2026-03-21

---

## System Overview

Cleveland Business Mentors is a two-system architecture:

1. **FastAPI Backend** — REST API handling authentication, user management, matching, session scheduling, and messaging. Serves as the application's custom business logic layer.
2. **EspoCRM** — Off-the-shelf CRM platform handling the client/mentor domain model (companies, contacts, engagements, sessions, workshops, NPS surveys). Provisioned via automated Python scripts.

A WordPress website (planned) will serve as the public-facing intake layer, submitting form data to EspoCRM via its REST API.

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   WordPress      │     │   FastAPI         │     │   EspoCRM        │
│   (public site)  │────>│   (app logic)     │     │   (CRM data)     │
│                  │     │                   │     │                  │
│  - Intake forms  │     │  - Auth (JWT)     │     │  - Companies     │
│  - Info pages    │     │  - User profiles  │     │  - Contacts      │
│                  │     │  - Matching       │     │  - Engagements   │
│                  │     │  - Sessions       │     │  - Sessions      │
│                  │     │  - Messages       │     │  - Workshops     │
│                  │     │                   │     │  - NPS Surveys   │
└──────────────────┘     └────────┬─────────┘     └────────┬─────────┘
                                  │                         │
                           ┌──────┴──────┐          ┌──────┴──────┐
                           │ PostgreSQL  │          │ MySQL       │
                           │ (app data)  │          │ (CRM data)  │
                           └─────────────┘          └─────────────┘
```

---

## FastAPI Application Architecture

### Layered Structure

```
HTTP Request
    │
    ▼
┌─────────────────────────────────────────────┐
│  Routers (app/routers/)                     │
│  Route handlers, request/response mapping   │
├─────────────────────────────────────────────┤
│  Dependencies (app/core/deps.py)            │
│  Authentication, DB session injection       │
├─────────────────────────────────────────────┤
│  Services (app/services/) [placeholder]     │
│  Business logic, orchestration              │
├─────────────────────────────────────────────┤
│  Models (app/models/)                       │
│  SQLAlchemy ORM, database schema            │
├─────────────────────────────────────────────┤
│  Schemas (app/schemas/)                     │
│  Pydantic request/response validation       │
├─────────────────────────────────────────────┤
│  Core (app/core/)                           │
│  Config, security, database engine          │
└─────────────────────────────────────────────┘
```

### Authentication Flow

```
Client                          Server
  │                               │
  │  POST /api/auth/register      │
  │  {email, password, ...}       │
  │──────────────────────────────>│
  │                               │── Hash password (bcrypt)
  │                               │── Store User record
  │  201 {user data}              │
  │<──────────────────────────────│
  │                               │
  │  POST /api/auth/login         │
  │  {email, password}            │
  │──────────────────────────────>│
  │                               │── Verify password (bcrypt)
  │                               │── Create JWT (sub=user_id, exp=30min)
  │  200 {access_token, "bearer"} │
  │<──────────────────────────────│
  │                               │
  │  GET /api/users/me            │
  │  Authorization: Bearer <jwt>  │
  │──────────────────────────────>│
  │                               │── Decode JWT (python-jose)
  │                               │── Extract user_id from "sub" claim
  │                               │── Fetch User from DB
  │                               │── Check is_active
  │  200 {user profile}           │
  │<──────────────────────────────│
```

**Key implementation details:**

- Passwords are hashed with `bcrypt.hashpw()` using a random salt (`bcrypt.gensalt()`)
- JWT tokens contain `sub` (user ID as string) and `exp` (expiration timestamp)
- Token validation is handled by the `get_current_user` dependency in `app/core/deps.py`
- The `OAuth2PasswordBearer` scheme points to `/api/auth/login` as the token URL
- Inactive users (`is_active=False`) are rejected even with a valid token

### Dependency Injection

FastAPI's `Depends()` system provides two core dependencies:

```python
# Database session — yields an AsyncSession, auto-closes after request
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session

# Current user — validates JWT, fetches user from DB
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    # Decode token → fetch user → check is_active → return User
```

Route handlers declare these as parameters:

```python
@router.get("/me")
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user
```

### Data Model

```
┌────────────────────┐
│       User         │
├────────────────────┤
│ id (PK)            │
│ email (unique)     │
│ hashed_password    │
│ full_name          │
│ role (enum)        │     ┌────────────────────┐
│ bio                │     │      Match         │
│ skills             │     ├────────────────────┤
│ industry           │     │ id (PK)            │
│ is_active          │◄────│ mentor_id (FK)     │
│ created_at         │◄────│ mentee_id (FK)     │
│                    │     │ status (enum)      │
│                    │     │ match_reason       │
│                    │     │ created_at         │
│                    │     └────────────────────┘
│                    │
│                    │     ┌────────────────────┐
│                    │     │     Session        │
│                    │     ├────────────────────┤
│                    │◄────│ mentor_id (FK)     │
│                    │◄────│ mentee_id (FK)     │
│                    │     │ scheduled_at       │
│                    │     │ duration_minutes   │
│                    │     │ status (enum)      │
│                    │     │ notes              │
│                    │     │ created_at         │
│                    │     └────────────────────┘
│                    │
│                    │     ┌────────────────────┐
│                    │     │     Message        │
│                    │     ├────────────────────┤
│                    │◄────│ sender_id (FK)     │
│                    │◄────│ recipient_id (FK)  │
│                    │     │ content            │
│                    │     │ is_read            │
│                    │     │ created_at         │
└────────────────────┘     └────────────────────┘
```

**Enums:**

| Model | Enum | Values |
|---|---|---|
| User | `UserRole` | `mentor`, `mentee`, `admin` |
| Match | `MatchStatus` | `pending`, `accepted`, `declined` |
| Session | `SessionStatus` | `scheduled`, `completed`, `cancelled` |

All enums use Python's `StrEnum` (not `str, Enum`) per Ruff UP042.

### Model Relationships

SQLAlchemy relationships use `Mapped[]` type annotations and `relationship()` with explicit `foreign_keys` to resolve ambiguity when a model has multiple FKs to the same table:

```python
# User has multiple FK references from Session (mentor_id, mentee_id)
mentor_sessions: Mapped[list["Session"]] = relationship(
    back_populates="mentor", foreign_keys="Session.mentor_id"
)
mentee_sessions: Mapped[list["Session"]] = relationship(
    back_populates="mentee", foreign_keys="Session.mentee_id"
)
```

**Circular import pattern:** Model files import each other at the bottom of the file (after class definitions) to resolve forward references for relationships. This is intentional and marked with `# noqa: E402`.

---

## EspoCRM Architecture

### Entity Model

The CRM schema extends EspoCRM's native Account (relabeled "Company") and Contact entities with custom entities:

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Account    │     │   Engagement     │     │   CbmSession     │
│  (Company)   │────>│                  │────>│                  │
│              │ 1:N │  status          │ 1:N │  sessionDateTime │
│  org type    │     │  startDate       │     │  duration        │
│  biz stage   │     │  closeDate       │     │  sessionType     │
│  NAICS       │     │  meetingCadence  │     │  topicsCovered   │
│  revenue     │     │  assignedMentor ─┼──┐  │  mentorNotes     │
│  challenges  │     │  coMentors       │  │  │  nextSteps       │
│  goals       │     │  smes            │  │  └──────────────────┘
└──────┬───────┘     │  engagementCont. │  │
       │ 1:N         └────────┬─────────┘  │  ┌──────────────────┐
       ▼                      │ 1:N        │  │ NpsSurveyResponse│
┌──────────────┐              ▼            │  ├──────────────────┤
│   Contact    │◄─────────────┘            │  │  npsScore (0-10) │
│              │◄──────────────────────────┘  │  surveyTrigger   │
│  roleAtBus.  │     ┌──────────────────┐     │  didCbmHelpYou   │
│  isPrimary   │     │    Workshop      │     │  feedback        │
│              │     ├──────────────────┤     └──────────────────┘
│              │     │  workshopDate    │
│              │     │  topicCategory   │     ┌──────────────────┐
│              │     │  presenter       │     │ WorkshopAttend.  │
│              │────>│  location        │────>├──────────────────┤
│              │ 1:N │  status          │ 1:N │  attended (bool) │
└──────────────┘     └──────────────────┘     │  attendanceDate  │
                                              └──────────────────┘
```

### Provisioning Pipeline

The `scripts/espocrm-setup/setup_crm.py` script runs a 5-step pipeline:

| Step | Action | Details |
|---|---|---|
| 1 | Create Entities | 5 custom entities (Engagement, CbmSession, NpsSurveyResponse, Workshop, WorkshopAttendance) |
| 2 | Create Fields | 50+ fields across Account, Contact, and custom entities |
| 3 | Create Relationships | 11 relationships (1:N, N:M, N:1) |
| 4 | Apply Dynamic Logic | Conditional field visibility (e.g., registration fields shown only when "Registered with State" is true) |
| 5 | Rebuild | Regenerates EspoCRM metadata, database schema, and caches |

All operations are **idempotent** — the script skips entities, fields, and links that already exist.

### Dynamic Logic Rules

| Entity | Field | Condition |
|---|---|---|
| Account | stateOfRegistration, legalBusinessStructure, einOnFile, dateOfFormation, registeredAgent, einNumber | Visible when `registeredWithState = true` |
| CbmSession | meetingLocationType | Visible when `sessionType = "In-Person"` |
| CbmSession | locationDetails | Visible when `meetingLocationType = "Other"` |

---

## Database Strategy

### Production: PostgreSQL

- Async driver: `asyncpg`
- Connection string format: `postgresql+asyncpg://user:pass@host:port/dbname`
- Engine: `create_async_engine()` from SQLAlchemy
- Session: `async_sessionmaker` with `expire_on_commit=False`

### Testing: SQLite

- Async driver: `aiosqlite`
- Connection string: `sqlite+aiosqlite:///./test.db`
- Tables created/dropped per test via `Base.metadata.create_all/drop_all`
- FastAPI's `dependency_overrides` swaps the DB session for tests

### Migration Strategy (Alembic)

- Alembic is configured for async operation in `alembic/env.py`
- All models are imported in `env.py` to populate `Base.metadata`
- Target metadata: `Base.metadata` from `app.core.database`
- No migration scripts have been generated yet

---

## Configuration

All configuration flows through `app/core/config.py` via Pydantic Settings:

```python
class Settings(BaseSettings):
    app_name: str = "Cleveland Business Mentoring"
    database_url: str = "postgresql+asyncpg://..."
    secret_key: str = "change-me-to-a-random-secret"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    model_config = {"env_file": ".env", "extra": "ignore"}
```

- Settings are read from environment variables, falling back to `.env` file, then defaults
- `extra = "ignore"` allows additional env vars without errors
- A singleton `settings = Settings()` is imported throughout the app

---

## Security Considerations

### Current Implementation

- Passwords hashed with bcrypt (random salt per password)
- JWT tokens with configurable expiration (default 30 minutes)
- Token validation on every protected request
- Inactive user check on every protected request
- Duplicate email prevention at registration

### Known Gaps

- No CORS middleware configured
- No rate limiting
- No password strength requirements
- No refresh token mechanism (token expiry = session expiry)
- No role-based authorization beyond authentication
- No HTTPS enforcement at the application level
- `SECRET_KEY` default is insecure (must be changed for production)
- No input sanitization beyond Pydantic type coercion

---

## Design Decisions

### Why two systems (FastAPI + EspoCRM)?

EspoCRM provides a mature CRM UI for staff to manage companies, contacts, engagements, and sessions without custom frontend development. FastAPI provides a programmable API layer for custom workflows, integrations, and any future web/mobile frontends.

### Why async SQLAlchemy?

FastAPI is an async framework. Using async SQLAlchemy (2.0 style with `Mapped` types) ensures database operations don't block the event loop, matching the framework's concurrency model.

### Why SQLite for tests?

SQLite via aiosqlite requires no external database server, making tests fast and portable. The async SQLAlchemy abstraction ensures the same ORM code works against both SQLite (tests) and PostgreSQL (production).

### Why StrEnum?

Python 3.11's `StrEnum` serializes directly to strings in JSON responses without extra configuration. Ruff rule UP042 enforces this over the older `str, Enum` pattern.

### Why circular imports at module bottom?

SQLAlchemy relationships require both model classes to be defined before they can reference each other. Importing at the bottom of each model file (after class definitions) is the standard SQLAlchemy pattern for resolving forward references without breaking import order.
