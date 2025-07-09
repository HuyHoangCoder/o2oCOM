from pydantic import BaseModel

class AdminUserBase(BaseModel):
    username: str
    role: str = "staff"

class AdminUserCreate(AdminUserBase):
    password: str

class AdminUserUpdate(BaseModel):
    username: str | None = None
    password: str | None = None
    role: str | None = None
from pydantic import BaseModel
from datetime import datetime

class AdminUserOut(BaseModel):
    id: int
    username: str
    role: str
    created_at: datetime

    class Config:
        from_attributes = True
