from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.session import Session
from app.models.user import User
from app.schemas.session import SessionCreate, SessionRead, SessionUpdateStatus

router = APIRouter(prefix="/api/sessions", tags=["sessions"])


@router.post("/", response_model=SessionRead, status_code=201)
async def create_session(
    session_in: SessionCreate,
    db: AsyncSession = Depends(get_db),
    _current_user: User = Depends(get_current_user),
):
    session = Session(**session_in.model_dump())
    db.add(session)
    await db.commit()
    await db.refresh(session)
    return session


@router.get("/", response_model=list[SessionRead])
async def list_my_sessions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Session).where(
            or_(Session.mentor_id == current_user.id, Session.mentee_id == current_user.id)
        )
    )
    return result.scalars().all()


@router.patch("/{session_id}", response_model=SessionRead)
async def update_session(
    session_id: int,
    update: SessionUpdateStatus,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Session).where(Session.id == session_id))
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    if session.mentor_id != current_user.id and session.mentee_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    session.status = update.status
    if update.notes is not None:
        session.notes = update.notes
    await db.commit()
    await db.refresh(session)
    return session
