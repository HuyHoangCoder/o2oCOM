from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PaymentLogBase(BaseModel):
    order_id: int
    amount: Optional[float] = 0
    payment_method: str
    status: Optional[str] = "pending"
    created_at: Optional[datetime] = None


class PaymentLogCreate(PaymentLogBase):
    created_at: Optional[datetime] = None


class PaymentLogUpdate(BaseModel):
    amount: Optional[float] = None
    payment_method: Optional[str] = None
    status: Optional[str] = None
    created_at: Optional[datetime] = None


class PaymentLogOut(PaymentLogBase):
    id: int

    class Config:
        from_attributes = True
