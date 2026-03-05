import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class UserRole(enum.StrEnum):
    MENTOR = "mentor"
    MENTEE = "mentee"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    full_name: Mapped[str] = mapped_column(String(255))
    role: Mapped[UserRole] = mapped_column(Enum(UserRole))
    bio: Mapped[str | None] = mapped_column(Text)
    skills: Mapped[str | None] = mapped_column(Text)  # comma-separated
    industry: Mapped[str | None] = mapped_column(String(255))
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    # Relationships
    mentor_sessions: Mapped[list["Session"]] = relationship(
        back_populates="mentor", foreign_keys="Session.mentor_id"
    )
    mentee_sessions: Mapped[list["Session"]] = relationship(
        back_populates="mentee", foreign_keys="Session.mentee_id"
    )
    sent_messages: Mapped[list["Message"]] = relationship(
        back_populates="sender", foreign_keys="Message.sender_id"
    )
    received_messages: Mapped[list["Message"]] = relationship(
        back_populates="recipient", foreign_keys="Message.recipient_id"
    )


from app.models.message import Message  # noqa: E402
from app.models.session import Session  # noqa: E402
