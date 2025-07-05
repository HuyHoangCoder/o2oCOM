from sqlalchemy import Column, Integer, Float, ForeignKey, String
from app.db.database import Base

class ProductIngredient(Base):
    __tablename__ = "product_ingredients"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("product.product_id"), nullable=False)
    ingredient_id = Column(Integer, ForeignKey("ingredients.ingredient_id"), nullable=False)
    quantity = Column(Float, nullable=False)  # Số lượng nguyên liệu cần cho sản phẩm
    unit = Column(String(50), nullable=True)  # Đơn vị tính, ví dụ: gram, ml, cái...
