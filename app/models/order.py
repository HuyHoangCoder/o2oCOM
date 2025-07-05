from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.db.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    franchisee_id = Column(Integer, ForeignKey("franchisee.id"), nullable=True)
    sales_summary_id = Column(Integer, ForeignKey("sales_summary.id"), nullable=True)
    total_amount = Column(Float, default=0)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    status = Column(String(50), default="pending")  # pending, completed, cancelled...
