from datetime import datetime

from pydantic import BaseModel


class MessageCreate(BaseModel):
    recipient_id: int
    content: str


class MessageRead(BaseModel):
    id: int
    sender_id: int
    recipient_id: int
    content: str
    is_read: bool
    created_at: datetime

    model_config = {"from_attributes": True}
