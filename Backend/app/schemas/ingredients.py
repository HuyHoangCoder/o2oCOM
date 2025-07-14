from pydantic import BaseModel
from typing import Optional

class IngredientBase(BaseModel):
    name: str
    stock_quantity: Optional[float] = 0

class IngredientCreate(IngredientBase):
    pass

class IngredientUpdate(BaseModel):
    name: Optional[str] = None
    stock_quantity: Optional[float] = None

class IngredientOut(IngredientBase):
    id: int

    class Config:
        from_attributes = True
