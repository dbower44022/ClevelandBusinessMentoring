from datetime import datetime

from pydantic import BaseModel, EmailStr

from app.models.user import UserRole


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: UserRole
    bio: str | None = None
    skills: str | None = None
    industry: str | None = None


class UserRead(BaseModel):
    id: int
    email: str
    full_name: str
    role: UserRole
    bio: str | None
    skills: str | None
    industry: str | None
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    full_name: str | None = None
    bio: str | None = None
    skills: str | None = None
    industry: str | None = None


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
