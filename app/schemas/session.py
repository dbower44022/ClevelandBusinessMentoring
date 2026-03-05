from datetime import datetime

from pydantic import BaseModel

from app.models.session import SessionStatus


class SessionCreate(BaseModel):
    mentor_id: int
    mentee_id: int
    scheduled_at: datetime
    duration_minutes: int = 60
    notes: str | None = None


class SessionRead(BaseModel):
    id: int
    mentor_id: int
    mentee_id: int
    scheduled_at: datetime
    duration_minutes: int
    status: SessionStatus
    notes: str | None
    created_at: datetime

    model_config = {"from_attributes": True}


class SessionUpdateStatus(BaseModel):
    status: SessionStatus
    notes: str | None = None
