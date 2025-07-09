from sqlalchemy import Column, Integer, Float, Date, DateTime, ForeignKey, func
from app.db.database import Base

class SalesSummary(Base):
    __tablename__ = "sales_summary"

    id = Column(Integer, primary_key=True, index=True)
    franchisee_id = Column(Integer, ForeignKey("franchisee.id"), nullable=False)
    total_orders = Column(Integer, default=0)
    total_amount = Column(Float, default=0)
    total_discount = Column(Float, default=0)
    final_amount = Column(Float, default=0)
    created_at = Column(DateTime, server_default=func.now())
    summary_date = Column(Date, nullable=False)
