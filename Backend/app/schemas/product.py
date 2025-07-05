from pydantic import BaseModel
from typing import Optional


class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    calories: Optional[int] = None
    is_best_seller: Optional[bool] = False
    is_active: Optional[bool] = True
    category_id: Optional[int] = None
    stock_quantity: Optional[int] = 0  # ✅ Bổ sung


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
    image_url: Optional[str]
    calories: Optional[int]
    is_best_seller: Optional[bool]
    is_active: Optional[bool]
    category_id: Optional[int]
    stock_quantity: Optional[int]  # ✅ Bổ sung


class ProductOut(ProductBase):
    id: int

    class Config:
        from_attributes = True
