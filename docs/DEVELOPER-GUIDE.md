# Developer Guide

**Project**: Cleveland Business Mentors
**Last Updated**: 2026-03-21

This guide covers everything you need to get started contributing to the Cleveland Business Mentors platform.

---

## Prerequisites

- **Python 3.11+** — required for `StrEnum`, `X | Y` union syntax, and other modern features
- **Git** — for version control
- **PostgreSQL 15+** — for production database (optional for development; tests use SQLite)

---

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/dbower44022/ClevelandBusinessMentoring.git
cd ClevelandBusinessMentoring
```

### 2. Create a Virtual Environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install Dependencies

```bash
# Install with dev dependencies (testing, linting, type checking)
pip install -e ".[dev]"
```

This installs:
- **Runtime**: FastAPI, SQLAlchemy, Alembic, asyncpg, Pydantic, python-jose, bcrypt, httpx
- **Dev**: pytest, pytest-asyncio, pytest-cov, ruff, mypy, aiosqlite

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/cbm
SECRET_KEY=generate-a-real-secret-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

For a real secret key, use:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 5. Set Up PostgreSQL (Optional)

If you want to run the app against a real database:

```bash
# Create the database
createdb cbm

# Generate and apply migrations
alembic revision --autogenerate -m "initial schema"
alembic upgrade head
```

If you're just running tests, skip this — tests use SQLite automatically.

---

## Running the Application

### Dev Server

```bash
uvicorn app.main:app --reload
```

- API available at `http://localhost:8000`
- Interactive Swagger docs at `http://localhost:8000/docs`
- ReDoc at `http://localhost:8000/redoc`
- Health check at `http://localhost:8000/health`

### Quick API Test

```bash
# Register a user
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "mentor@example.com", "password": "testpass123", "full_name": "Test Mentor", "role": "mentor"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "mentor@example.com", "password": "testpass123"}'

# Use the returned token
curl http://localhost:8000/api/users/me \
  -H "Authorization: Bearer <your-token-here>"
```

---

## Running Tests

Tests use SQLite (via aiosqlite) — no PostgreSQL needed.

```bash
# Run all tests
python -m pytest tests/ -v

# Run a specific test file
python -m pytest tests/test_auth.py -v

# Run a specific test
python -m pytest tests/test_auth.py::test_register_and_login -v

# Run with coverage report
python -m pytest tests/ --cov=app

# Run with coverage and HTML report
python -m pytest tests/ --cov=app --cov-report=html
```

### Test Infrastructure

The test setup lives in `tests/conftest.py`:

- **`setup_db` fixture** (autouse) — Creates all tables before each test and drops them after. Every test starts with a clean database.
- **`db` fixture** — Provides an async SQLAlchemy session bound to the test database.
- **`client` fixture** — Provides an `httpx.AsyncClient` connected to the FastAPI app via `ASGITransport`. Overrides the `get_db` dependency to use the test database.

### Writing New Tests

```python
import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_something(client: AsyncClient):
    # Register a user (most tests need an authenticated user)
    await client.post(
        "/api/auth/register",
        json={
            "email": "test@example.com",
            "password": "testpass123",
            "full_name": "Test User",
            "role": "mentee",
        },
    )

    # Login to get a token
    login_resp = await client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "testpass123"},
    )
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Make authenticated requests
    response = await client.get("/api/users/me", headers=headers)
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"
```

---

## Code Quality

### Linting with Ruff

```bash
# Check for issues
ruff check app/ tests/

# Auto-fix what can be fixed
ruff check --fix app/ tests/
```

**Configured rules** (in `pyproject.toml`):

| Rule Set | Coverage |
|---|---|
| `E` | pycodestyle errors |
| `F` | pyflakes |
| `I` | isort (import sorting) |
| `N` | pep8-naming |
| `W` | pycodestyle warnings |
| `UP` | pyupgrade (modern Python syntax) |

Line length: 99 characters. Target: Python 3.11.

### Type Checking with mypy

```bash
mypy app/
```

mypy runs in **strict mode** with the Pydantic plugin. This means:
- All functions need type annotations
- No implicit `Any` types
- No untyped function definitions
- Pydantic models are fully type-checked

---

## Project Conventions

### File Organization

- **One router per domain** — `auth.py`, `users.py`, `matching.py`, `sessions.py`, `messages.py`
- **One model per file** — `user.py`, `matching.py`, `session.py`, `message.py`
- **Schemas mirror models** — Each model file has a corresponding schema file
- **All routes under `/api/`** — Configured via `prefix="/api/..."` on each router

### Naming

- **Files**: lowercase with underscores (`matching.py`, not `Matching.py`)
- **Classes**: PascalCase (`UserCreate`, `MatchStatus`)
- **Functions**: snake_case (`get_current_user`, `list_my_matches`)
- **Enums**: `StrEnum` with UPPER_CASE values (`PENDING = "pending"`)
- **Database tables**: plural lowercase (`users`, `matches`, `sessions`, `messages`)

### Enums

Always use `enum.StrEnum`:

```python
import enum

class MyStatus(enum.StrEnum):
    ACTIVE = "active"
    INACTIVE = "inactive"
```

Do **not** use `class MyStatus(str, enum.Enum)` — Ruff rule UP042 enforces this.

### Model Relationships with Circular Imports

When a model needs to reference another model for relationships, import the other model at the **bottom** of the file:

```python
from app.core.database import Base

class MyModel(Base):
    # ... model definition ...
    other: Mapped["OtherModel"] = relationship(...)

# Import at bottom to resolve forward references
from app.models.other import OtherModel  # noqa: E402
```

### Pydantic Schemas

- **`Create` schemas** — Fields required for creating a record (no `id`, no `created_at`)
- **`Read` schemas** — All fields returned in responses (includes `id`, `created_at`). Must set `model_config = {"from_attributes": True}` for ORM compatibility.
- **`Update` schemas** — All fields optional, applied via `model_dump(exclude_unset=True)`

### Authorization Pattern

Protected routes use the `get_current_user` dependency:

```python
from app.core.deps import get_current_user

@router.get("/protected")
async def protected_route(current_user: User = Depends(get_current_user)):
    # current_user is the authenticated User object
    return current_user
```

For routes that need auth but don't use the user object, prefix with underscore:

```python
@router.get("/mentors")
async def list_mentors(
    _current_user: User = Depends(get_current_user),  # auth required but unused
    db: AsyncSession = Depends(get_db),
):
    ...
```

---

## Database Migrations

Alembic is configured for async operation. Models are imported in `alembic/env.py`.

```bash
# Generate a migration from model changes
alembic revision --autogenerate -m "add foo column to users"

# Apply all pending migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1

# See current migration state
alembic current

# See migration history
alembic history
```

When adding a new model:
1. Create the model file in `app/models/`
2. Import it in `alembic/env.py` (alongside the existing imports)
3. Run `alembic revision --autogenerate -m "description"`

---

## EspoCRM Provisioning Scripts

The `scripts/espocrm-setup/` directory contains scripts to provision the CRM schema.

### Running the Setup

```bash
cd scripts/espocrm-setup

# Preview what would be created (no API calls)
python setup_crm.py --dry-run

# Provision everything
python setup_crm.py \
  --url https://crm.example.com \
  --user admin \
  --password secret

# Or use environment variables
export ESPOCRM_URL=https://crm.example.com
export ESPOCRM_ADMIN_USER=admin
export ESPOCRM_ADMIN_PASSWORD=secret
python setup_crm.py

# Run a single step
python setup_crm.py --step entities
python setup_crm.py --step fields
python setup_crm.py --step relationships
python setup_crm.py --step dynamic-logic
python setup_crm.py --step rebuild
```

### Modifying CRM Definitions

All entity, field, and relationship definitions live in `definitions.py`. To add a new field:

1. Add the field dict to the appropriate `*_FIELDS` list in `definitions.py`
2. Run `python setup_crm.py --step fields` to create it in EspoCRM
3. Run `python setup_crm.py --step rebuild` to regenerate metadata

---

## Common Tasks

### Adding a New API Endpoint

1. **Model** (if new entity): Create `app/models/newentity.py`, add to `alembic/env.py` imports
2. **Schema**: Create `app/schemas/newentity.py` with `Create`, `Read`, `Update` schemas
3. **Router**: Create `app/routers/newentity.py` with route handlers
4. **Register**: Add `app.include_router(newentity.router)` in `app/main.py`
5. **Test**: Create `tests/test_newentity.py`
6. **Migrate**: Run `alembic revision --autogenerate -m "add newentity table"`

### Adding a Field to an Existing Model

1. Add the column in the model file (`app/models/*.py`)
2. Add it to the relevant schemas (`app/schemas/*.py`)
3. Run `alembic revision --autogenerate -m "add field_name to tablename"`
4. Apply: `alembic upgrade head`

---

## Troubleshooting

### "Module 'app' not found"

Make sure you installed in editable mode:

```bash
pip install -e ".[dev]"
```

### Tests fail with "no such table"

The `setup_db` fixture should handle this automatically. If you see this error, make sure your test file imports the `client` fixture from `conftest.py` (it's auto-discovered by pytest).

### "asyncpg is not installed"

For running the app against PostgreSQL, asyncpg is required:

```bash
pip install asyncpg
```

For tests, only aiosqlite is needed (included in dev dependencies).

### Ruff complains about import order

Run `ruff check --fix` to auto-sort imports. If a bottom-of-file import is flagged, add `# noqa: E402` to suppress it (this is the expected pattern for circular model imports).
