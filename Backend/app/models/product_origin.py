from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.db.database import Base

class ProductOrigin(Base):
    __tablename__ = "product_origin"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("product.product_id"), nullable=False)
    origin_info = Column(Text, nullable=True)  # Thông tin nguồn gốc
    blockchain_hash = Column(String(255), nullable=True)  # Dấu vết blockchain nếu có
