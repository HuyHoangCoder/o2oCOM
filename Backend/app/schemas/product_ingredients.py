from pydantic import BaseModel
from typing import Optional

class ProductIngredientBase(BaseModel):
    product_id: int
    ingredient_id: int
    quantity: float
    unit: Optional[str] = None

class ProductIngredientCreate(ProductIngredientBase):
    pass

class ProductIngredientUpdate(BaseModel):
    quantity: Optional[float] = None
    unit: Optional[str] = None

class ProductIngredientOut(ProductIngredientBase):
    id: int

    class Config:
        from_attributes = True
