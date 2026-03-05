import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class MatchStatus(enum.StrEnum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    DECLINED = "declined"


class Match(Base):
    __tablename__ = "matches"

    id: Mapped[int] = mapped_column(primary_key=True)
    mentor_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    mentee_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    status: Mapped[MatchStatus] = mapped_column(
        Enum(MatchStatus), default=MatchStatus.PENDING
    )
    match_reason: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    mentor: Mapped["User"] = relationship(foreign_keys=[mentor_id])
    mentee: Mapped["User"] = relationship(foreign_keys=[mentee_id])


from app.models.user import User  # noqa: E402
