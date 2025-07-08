from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class FranchiseeBase(BaseModel):
    name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None

class FranchiseeCreate(FranchiseeBase):
    pass

class FranchiseeUpdate(FranchiseeBase):
    pass

class FranchiseeOut(FranchiseeBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
