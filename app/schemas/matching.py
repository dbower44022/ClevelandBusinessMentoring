from datetime import datetime

from pydantic import BaseModel

from app.models.matching import MatchStatus


class MatchCreate(BaseModel):
    mentee_id: int
    mentor_id: int
    match_reason: str | None = None


class MatchRead(BaseModel):
    id: int
    mentor_id: int
    mentee_id: int
    status: MatchStatus
    match_reason: str | None
    created_at: datetime

    model_config = {"from_attributes": True}


class MatchUpdateStatus(BaseModel):
    status: MatchStatus
