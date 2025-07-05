from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.db.database import Base


class PaymentLog(Base):
    __tablename__ = "payment_logs"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    amount = Column(Float, default=0)
    payment_method = Column(String(50), nullable=False)
    status = Column(String(50), default="pending")
    created_at = Column(DateTime, server_default=func.now(), nullable=False)