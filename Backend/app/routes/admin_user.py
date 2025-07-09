from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.admin_user import AdminUser
from app.schemas.admin_user import AdminUserCreate, AdminUserUpdate, AdminUserOut
from typing import List
import hashlib
from jose import jwt
import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

router = APIRouter(tags=["Admin - User Management"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

def create_access_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

# ===== Danh sách admin =====
@router.get("/", response_model=List[AdminUserOut])
def list_admins(db: Session = Depends(get_db)):
    return db.query(AdminUser).all()

# ===== Tạo admin =====
@router.post("/", response_model=AdminUserOut)
def create_admin(admin: AdminUserCreate, db: Session = Depends(get_db)):
    if db.query(AdminUser).filter(AdminUser.username == admin.username).first():
        raise HTTPException(status_code=400, detail="❌ Username đã tồn tại.")

    new_admin = AdminUser(
        username=admin.username,
        password_hash=hash_password(admin.password),
        role=admin.role
    )
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return new_admin

# ===== Cập nhật admin =====
@router.put("/{admin_id}")
def update_admin(admin_id: int, update_data: AdminUserUpdate, db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy admin.")

    if update_data.password:
        admin.password_hash = hash_password(update_data.password)
    if update_data.role:
        admin.role = update_data.role

    db.commit()
    return {"message": "✅ Cập nhật tài khoản admin thành công."}

# ===== Xoá admin =====
@router.delete("/{admin_id}")
def delete_admin(admin_id: int, db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy admin.")

    db.delete(admin)
    db.commit()
    return {"message": "✅ Đã xoá tài khoản admin."}

# ===== Đăng nhập admin =====
@router.post("/login")
def admin_login(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.username == username).first()
    if not admin or admin.password_hash != hash_password(password):
        raise HTTPException(status_code=401, detail="❌ Sai username hoặc mật khẩu.")

    token = create_access_token({"sub": admin.username, "role": admin.role})
    return {"message": "✅ Đăng nhập thành công!", "access_token": token, "token_type": "bearer"}
