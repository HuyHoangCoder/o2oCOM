from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)   # Tên đăng nhập
    email = Column(String(100), unique=True, nullable=False)      # Email duy nhất
    phone = Column(String(15), unique=True, nullable=False)       # Số điện thoại duy nhất
    password_hash = Column(String(255), nullable=False)           # Mật khẩu đã hash
    full_name = Column(String(100), nullable=True)                # Họ tên
    avatar_url = Column(String(255), nullable=True)               # Ảnh đại diện
    role = Column(String(20), default="member")                   # member / admin / khác
    created_at = Column(DateTime(timezone=True), server_default=func.now())  # Ngày tạo tài khoản
