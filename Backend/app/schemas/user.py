from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: EmailStr
    phone: str
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    

    class Config:
        from_attributes = True

class UserOut(UserBase):
    id: int

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
