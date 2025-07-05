from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.sql import func
from app.db.database import Base


class ProductDetail(Base):
    __tablename__ = "product_detail"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    ingredients_list = Column(Text, nullable=True)
    preparation_time = Column(String(100), nullable=True)
    nutrition_facts = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    storage_instructions = Column(Text, nullable=True)
    updated_at = Column(DateTime, onupdate=func.now(), server_default=func.now(), nullable=False)