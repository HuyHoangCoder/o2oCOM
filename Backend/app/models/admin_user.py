from sqlalchemy import Column, Integer, String
from sqlalchemy.sql import func
from app.db.database import Base

class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), default="staff")
    created_at = Column(String, server_default=func.now())
