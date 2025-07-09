from sqlalchemy import Column, Integer, Float, ForeignKey, String
from app.db.database import Base

class ProductIngredient(Base):
    __tablename__ = "product_ingredients"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    ingredient_id = Column(Integer, ForeignKey("ingredients.id"), nullable=False)
    quantity = Column(Float, nullable=False)
    unit = Column(String(50), nullable=True)
    name = Column(String(255), nullable=True)  
