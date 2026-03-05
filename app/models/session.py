import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class SessionStatus(enum.StrEnum):
    SCHEDULED = "scheduled"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class Session(Base):
    __tablename__ = "sessions"

    id: Mapped[int] = mapped_column(primary_key=True)
    mentor_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    mentee_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    scheduled_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    duration_minutes: Mapped[int] = mapped_column(default=60)
    status: Mapped[SessionStatus] = mapped_column(
        Enum(SessionStatus), default=SessionStatus.SCHEDULED
    )
    notes: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    mentor: Mapped["User"] = relationship(
        back_populates="mentor_sessions", foreign_keys=[mentor_id]
    )
    mentee: Mapped["User"] = relationship(
        back_populates="mentee_sessions", foreign_keys=[mentee_id]
    )


from app.models.user import User  # noqa: E402
