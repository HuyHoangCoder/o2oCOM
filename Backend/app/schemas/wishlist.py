from pydantic import BaseModel
from datetime import datetime

class WishlistCreate(BaseModel):
    product_id: int

class WishlistOut(BaseModel):
    id: int
    user_id: int
    product_id: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }
