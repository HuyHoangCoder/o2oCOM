from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class OrderBase(BaseModel):
    user_id: int
    franchisee_id: Optional[int] = None
    sales_summary_id: Optional[int] = None
    total_amount: Optional[float] = 0
    status: Optional[str] = "pending"


class OrderCreate(OrderBase):
    created_at: Optional[datetime] = None


class OrderUpdate(BaseModel):
    franchisee_id: Optional[int] = None
    sales_summary_id: Optional[int] = None
    total_amount: Optional[float] = None
    status: Optional[str] = None
    created_at: Optional[datetime] = None


class OrderOut(OrderBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
