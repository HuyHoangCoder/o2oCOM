from pydantic import BaseModel
from typing import Optional

class ProductOriginBase(BaseModel):
    product_id: int
    origin_info: Optional[str] = None
    blockchain_hash: Optional[str] = None

class ProductOriginCreate(ProductOriginBase):
    pass

class ProductOriginUpdate(BaseModel):
    origin_info: Optional[str] = None
    blockchain_hash: Optional[str] = None

class ProductOriginOut(ProductOriginBase):
    id: int

    class Config:
        from_attributes = True
