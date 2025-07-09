from pydantic import BaseModel
from datetime import date, datetime

class SalesSummaryBase(BaseModel):
    franchisee_id: int
    total_orders: int = 0
    total_amount: float = 0
    total_discount: float = 0
    final_amount: float = 0
    summary_date: date

class SalesSummaryCreate(SalesSummaryBase):
    pass

class SalesSummaryUpdate(SalesSummaryBase):
    pass

class SalesSummaryOut(SalesSummaryBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
