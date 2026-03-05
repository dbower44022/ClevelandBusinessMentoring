# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cleveland Business Mentoring is a Learning Management System (LMS) built with FastAPI and PostgreSQL. It connects business mentors with mentees through matching, scheduling, messaging, and profile management.

## Commands

```bash
# Setup
python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"

# Run the dev server
uvicorn app.main:app --reload

# Run all tests (uses SQLite in-memory, no Postgres needed)
python -m pytest tests/ -v

# Run a single test file or test
python -m pytest tests/test_auth.py -v
python -m pytest tests/test_auth.py::test_register_and_login -v

# Run tests with coverage
python -m pytest tests/ --cov=app

# Lint
ruff check app/ tests/
ruff check --fix app/ tests/

# Type check
mypy app/

# Database migrations
alembic revision --autogenerate -m "description"
alembic upgrade head
```

## Architecture

**FastAPI + async SQLAlchemy 2.0 + PostgreSQL (asyncpg)**. Tests use SQLite via aiosqlite.

```
app/
  main.py          # FastAPI app, router registration, health endpoint
  core/
    config.py      # Pydantic Settings (reads .env)
    database.py    # Async engine, session factory, Base declarative class
    security.py    # bcrypt password hashing, JWT creation/decoding
    deps.py        # FastAPI dependencies (get_current_user via OAuth2)
  models/          # SQLAlchemy ORM models (User, Match, Session, Message)
  schemas/         # Pydantic request/response schemas
  routers/         # API route handlers, one file per domain
tests/
  conftest.py      # Async test fixtures: SQLite DB, httpx AsyncClient
```

### Key patterns

- **Auth flow**: JWT bearer tokens. Register at `/api/auth/register`, login at `/api/auth/login`. Token contains `sub` = user ID.
- **Dependency injection**: `get_current_user` in `core/deps.py` is the auth dependency used by protected routes. `get_db` provides async DB sessions.
- **Models use circular imports**: Model files import each other at module bottom (after class definitions) to resolve relationship forward references.
- **Enums**: Use `enum.StrEnum` (not `str, enum.Enum`). Ruff enforces this via UP042.
- **All routes are under `/api/`** prefix: `/api/auth/`, `/api/users/`, `/api/matches/`, `/api/sessions/`, `/api/messages/`.
- **Test client**: Tests use `httpx.AsyncClient` with `ASGITransport`, overriding `get_db` to use the test SQLite database.

### Configuration

Copy `.env.example` to `.env`. Key settings: `DATABASE_URL`, `SECRET_KEY`, `ACCESS_TOKEN_EXPIRE_MINUTES`.

### Ruff rules

Line length 99. Rules: E, F, I (isort), N (naming), W, UP (pyupgrade). Target Python 3.11+.
