# Cleveland Business Mentors

A mentoring management platform connecting business mentors with mentees in the Cleveland area. The system manages mentor-mentee matching, session scheduling, direct messaging, and profile management through a REST API, with CRM operations handled by EspoCRM.

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Python 3.11+ |
| Web Framework | FastAPI 0.115+ |
| ORM | SQLAlchemy 2.0 (async) |
| Database (prod) | PostgreSQL 15+ via asyncpg |
| Database (test) | SQLite via aiosqlite |
| Migrations | Alembic 1.14+ |
| Auth | JWT (python-jose) + bcrypt |
| Validation | Pydantic 2.0+ with email support |
| HTTP Client | httpx 0.28+ |
| Linting | Ruff (E, F, I, N, W, UP rules) |
| Type Checking | mypy (strict mode, Pydantic plugin) |
| Testing | pytest + pytest-asyncio |
| CRM | EspoCRM (provisioned via admin API scripts) |

## Quick Start

### Prerequisites

- Python 3.11 or higher
- PostgreSQL 15+ (for production; tests use SQLite)

### Setup

```bash
# Clone and enter the project
git clone https://github.com/dbower44022/ClevelandBusinessMentoring.git
cd ClevelandBusinessMentoring

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install with dev dependencies
pip install -e ".[dev]"

# Configure environment
cp .env.example .env
# Edit .env with your database credentials and a real SECRET_KEY
```

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `postgresql+asyncpg://postgres:postgres@localhost:5432/cbm` | Async PostgreSQL connection string |
| `SECRET_KEY` | `change-me-to-a-random-secret` | JWT signing secret (change in production) |
| `ALGORITHM` | `HS256` | JWT algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | Token expiration time |

### Run the Dev Server

```bash
uvicorn app.main:app --reload
```

The API is available at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

### Run Tests

```bash
# All tests (uses SQLite, no Postgres needed)
python -m pytest tests/ -v

# Single test file
python -m pytest tests/test_auth.py -v

# With coverage
python -m pytest tests/ --cov=app
```

### Lint and Type Check

```bash
# Lint
ruff check app/ tests/

# Auto-fix lint issues
ruff check --fix app/ tests/

# Type check
mypy app/
```

### Database Migrations

```bash
# Generate a migration from model changes
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head
```

## API Endpoints

All routes are under the `/api/` prefix. Protected endpoints require a JWT `Bearer` token in the `Authorization` header.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | No | Health check |
| `POST` | `/api/auth/register` | No | Register a new user |
| `POST` | `/api/auth/login` | No | Login, returns JWT token |
| `GET` | `/api/users/me` | Yes | Get current user profile |
| `PATCH` | `/api/users/me` | Yes | Update current user profile |
| `GET` | `/api/users/mentors` | Yes | List active mentors (optional `?industry=` filter) |
| `GET` | `/api/users/{user_id}` | Yes | Get user by ID |
| `POST` | `/api/matches/` | Yes | Create a mentor-mentee match |
| `GET` | `/api/matches/` | Yes | List matches for current user |
| `PATCH` | `/api/matches/{match_id}` | Yes | Update match status |
| `POST` | `/api/sessions/` | Yes | Schedule a mentoring session |
| `GET` | `/api/sessions/` | Yes | List sessions for current user |
| `PATCH` | `/api/sessions/{session_id}` | Yes | Update session status/notes |
| `POST` | `/api/messages/` | Yes | Send a message |
| `GET` | `/api/messages/` | Yes | List all messages for current user |
| `GET` | `/api/messages/conversation/{user_id}` | Yes | Get conversation with a specific user |

## Project Structure

```
app/
  main.py              # FastAPI app, router registration, health endpoint
  core/
    config.py          # Pydantic Settings (reads .env)
    database.py        # Async engine, session factory, Base declarative class
    security.py        # bcrypt password hashing, JWT creation/decoding
    deps.py            # FastAPI dependencies (get_current_user, get_db)
  models/              # SQLAlchemy ORM models
    user.py            # User model with UserRole enum
    matching.py        # Match model with MatchStatus enum
    session.py         # Session model with SessionStatus enum
    message.py         # Message model
  schemas/             # Pydantic request/response schemas
    user.py            # UserCreate, UserRead, UserUpdate, LoginRequest, Token
    matching.py        # MatchCreate, MatchRead, MatchUpdateStatus
    session.py         # SessionCreate, SessionRead, SessionUpdateStatus
    message.py         # MessageCreate, MessageRead
  routers/             # API route handlers
    auth.py            # Registration and login
    users.py           # User profile and mentor listing
    matching.py        # Mentor-mentee match management
    sessions.py        # Session scheduling
    messages.py        # Direct messaging
  services/            # Business logic layer (placeholder)
tests/
  conftest.py          # Async test fixtures (SQLite DB, httpx AsyncClient)
  test_auth.py         # Auth endpoint tests
  test_health.py       # Health endpoint test
scripts/
  espocrm-setup/       # EspoCRM CRM provisioning scripts
    setup_crm.py       # Main setup orchestrator (5-step pipeline)
    espocrm_admin.py   # HTTP client for EspoCRM admin API
    definitions.py     # Entity, field, relationship, and dynamic logic definitions
alembic/
  env.py               # Async Alembic environment configuration
  versions/            # Migration scripts (none generated yet)
PRDs/                  # Product Requirements Documents (.docx, .md, .drawio)
docs/                  # Internal project documentation
```

## Related Documentation

- `docs/PROJECT-STATUS.md` — Current project status, what's built, what's next
- `docs/ARCHITECTURE.md` — Detailed technical architecture and design decisions
- `docs/DEVELOPER-GUIDE.md` — Developer onboarding and contribution guide
- `PRDs/` — Product Requirements Documents (CRM schemas, website specs, workflows)
