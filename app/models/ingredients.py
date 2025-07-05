from sqlalchemy import Column, Integer, String, Float
from app.db.database import Base

class Ingredient(Base):
    __tablename__ = "ingredients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    stock_quantity = Column(Float, default=0)
