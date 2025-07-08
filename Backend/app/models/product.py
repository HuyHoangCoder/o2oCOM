from sqlalchemy import Column, Integer, String, Float, Boolean, Text, ForeignKey
from sqlalchemy.sql import func
from app.db.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=True)
    image_url = Column(String(255), nullable=True)
    calories = Column(Integer, nullable=True)
    is_best_seller = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    category_id = Column(Integer, ForeignKey("category.id"), nullable=True)
    created_at = Column(String, server_default=func.now())
    stock_quantity = Column(Integer, default=0)  # ✅ Bổ sung số lượng tồn kho
