from pydantic import BaseModel
from typing import Optional


class OrderDetailBase(BaseModel):
    order_id: int
    product_id: int
    quantity: Optional[int] = 1
    price: Optional[float] = 0


class OrderDetailCreate(OrderDetailBase):
    pass


class OrderDetailUpdate(BaseModel):
    quantity: Optional[int] = None
    price: Optional[float] = None


class OrderDetailOut(OrderDetailBase):
    id: int

    class Config:
        from_attributes = True
