from fastapi import APIRouter, Depends
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.message import Message
from app.models.user import User
from app.schemas.message import MessageCreate, MessageRead

router = APIRouter(prefix="/api/messages", tags=["messages"])


@router.post("/", response_model=MessageRead, status_code=201)
async def send_message(
    message_in: MessageCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    message = Message(
        sender_id=current_user.id,
        recipient_id=message_in.recipient_id,
        content=message_in.content,
    )
    db.add(message)
    await db.commit()
    await db.refresh(message)
    return message


@router.get("/", response_model=list[MessageRead])
async def list_my_messages(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Message)
        .where(
            or_(Message.sender_id == current_user.id, Message.recipient_id == current_user.id)
        )
        .order_by(Message.created_at.desc())
    )
    return result.scalars().all()


@router.get("/conversation/{user_id}", response_model=list[MessageRead])
async def get_conversation(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Message)
        .where(
            or_(
                (Message.sender_id == current_user.id) & (Message.recipient_id == user_id),
                (Message.sender_id == user_id) & (Message.recipient_id == current_user.id),
            )
        )
        .order_by(Message.created_at.asc())
    )
    return result.scalars().all()
