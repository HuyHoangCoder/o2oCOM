from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProductDetailBase(BaseModel):
    product_id: int
    ingredients_list: Optional[str] = None
    preparation_time: Optional[str] = None
    nutrition_facts: Optional[str] = None
    storage_instructions: Optional[str] = None


class ProductDetailCreate(ProductDetailBase):
    pass


class ProductDetailUpdate(BaseModel):
    ingredients_list: Optional[str] = None
    preparation_time: Optional[str] = None
    nutrition_facts: Optional[str] = None
    storage_instructions: Optional[str] = None


class ProductDetailOut(ProductDetailBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True