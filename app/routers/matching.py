from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.matching import Match
from app.models.user import User
from app.schemas.matching import MatchCreate, MatchRead, MatchUpdateStatus

router = APIRouter(prefix="/api/matches", tags=["matching"])


@router.post("/", response_model=MatchRead, status_code=201)
async def create_match(
    match_in: MatchCreate,
    db: AsyncSession = Depends(get_db),
    _current_user: User = Depends(get_current_user),
):
    match = Match(**match_in.model_dump())
    db.add(match)
    await db.commit()
    await db.refresh(match)
    return match


@router.get("/", response_model=list[MatchRead])
async def list_my_matches(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Match).where(
            or_(Match.mentor_id == current_user.id, Match.mentee_id == current_user.id)
        )
    )
    return result.scalars().all()


@router.patch("/{match_id}", response_model=MatchRead)
async def update_match_status(
    match_id: int,
    update: MatchUpdateStatus,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Match).where(Match.id == match_id))
    match = result.scalar_one_or_none()
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    if match.mentor_id != current_user.id and match.mentee_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    match.status = update.status
    await db.commit()
    await db.refresh(match)
    return match
