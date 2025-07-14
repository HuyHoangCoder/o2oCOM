from fastapi import APIRouter, Depends, HTTPException, Security
from sqlalchemy.orm import Session
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.hash import bcrypt
from jose import jwt, JWTError
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from app.db.database import get_db
from app.models.admin_user import AdminUser
from app.schemas.admin_user import AdminLogin, AdminToken, AdminCreate

router = APIRouter(tags=["Admin Auth"])
security = HTTPBearer()

# ✅ Load biến môi trường
load_dotenv()

def get_secret_key():
    secret = os.getenv("SECRET_KEY")
    if not secret:
        raise RuntimeError("❌ SECRET_KEY không được load từ .env")
    return secret

ALGORITHM = os.getenv("ALGORITHM", "HS256")

# ===================== JWT =====================
def create_access_token(data: dict, expires_minutes: int = 60):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, get_secret_key(), algorithm=ALGORITHM)

def decode_token(token: str):
    return jwt.decode(token, get_secret_key(), algorithms=[ALGORITHM])

# ===================== Middlewares =====================
def get_current_admin(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    if not token or token.count('.') != 2:
        raise HTTPException(status_code=401, detail="❌ Token format error.")
    try:
        payload = decode_token(token)
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="❌ Invalid token.")

def require_owner(admin=Depends(get_current_admin)):
    if not admin.get("is_owner"):
        raise HTTPException(status_code=403, detail="❌ Chỉ chủ hệ thống mới được phép thực hiện.")
    return admin

def require_edit_permission(admin=Depends(get_current_admin)):
    if not admin.get("can_edit"):
        raise HTTPException(status_code=403, detail="❌ Bạn không có quyền chỉnh sửa. Chờ được cấp quyền.")
    return admin

# ===================== API =====================

# ✅ Tạo tài khoản chủ hệ thống (chỉ gọi 1 lần)
@router.post("/init-owner")
def init_owner(data: AdminCreate, db: Session = Depends(get_db)):
    if db.query(AdminUser).filter_by(is_owner=True).first():
        raise HTTPException(status_code=403, detail="❌ Chủ hệ thống đã tồn tại.")
    hashed_pw = bcrypt.hash(data.password)
    new_owner = AdminUser(
        username=data.username,
        password_hash=hashed_pw,
        role="admin",
        is_owner=True,
        can_edit=True
    )
    db.add(new_owner)
    db.commit()
    return {"msg": "✅ Tạo chủ hệ thống thành công", "id": new_owner.id}

# ✅ Đăng nhập admin
@router.post("/login", response_model=AdminToken)
def login_admin(data: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter_by(username=data.username).first()
    if not admin or not bcrypt.verify(data.password, admin.password_hash):
        raise HTTPException(status_code=401, detail="❌ Sai tài khoản hoặc mật khẩu.")
    token = create_access_token({
        "id": admin.id,
        "username": admin.username,
        "role": admin.role,
        "is_owner": admin.is_owner,
        "can_edit": admin.can_edit
    })
    return {"access_token": token, "token_type": "bearer"}

# ✅ Tạo nhân viên (chỉ chủ hệ thống)
@router.post("/staff/create")
def create_staff(
    data: AdminCreate,
    db: Session = Depends(get_db),
    admin=Depends(require_owner)
):
    if db.query(AdminUser).filter_by(username=data.username).first():
        raise HTTPException(status_code=400, detail="❌ Tài khoản đã tồn tại.")
    hashed_pw = bcrypt.hash(data.password)
    new_staff = AdminUser(
        username=data.username,
        password_hash=hashed_pw,
        role=data.role,
        is_owner=False,
        can_edit=data.can_edit
    )
    db.add(new_staff)
    db.commit()
    return {"msg": "✅ Tạo nhân viên thành công", "id": new_staff.id}

# ✅ Cập quyền chỉnh sửa (chỉ chủ)
@router.put("/staff/{account_id}/set-edit")
def update_edit_permission(
    account_id: int,
    can_edit: bool,
    db: Session = Depends(get_db),
    admin=Depends(require_owner)
):
    staff = db.query(AdminUser).filter(AdminUser.id == account_id, AdminUser.is_owner == False).first()
    if not staff:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy tài khoản nhân viên.")
    staff.can_edit = can_edit
    db.commit()
    return {"msg": f"✅ Đã cập nhật quyền chỉnh sửa cho {staff.username} → {can_edit}"}

# ✅ Xoá tài khoản (chỉ chủ, không tự xoá mình)
@router.delete("/staff/{account_id}/delete")
def delete_staff_account(
    account_id: int,
    db: Session = Depends(get_db),
    admin=Depends(require_owner)
):
    if admin["id"] == account_id:
        raise HTTPException(status_code=400, detail="❌ Bạn không thể tự xoá tài khoản của chính mình.")
    staff = db.query(AdminUser).filter(AdminUser.id == account_id, AdminUser.is_owner == False).first()
    if not staff:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy tài khoản hoặc đây không phải là nhân viên.")
    db.delete(staff)
    db.commit()
    return {"msg": f"✅ Đã xoá tài khoản {staff.username} thành công."}

# ✅ Check owner
@router.get("/only-owner")
def test_owner_route(admin=Depends(require_owner)):
    return {"msg": "✅ Xin chào chủ hệ thống!"}

# ✅ Check edit permission
@router.get("/can-edit-only")
def check_permission(admin=Depends(require_edit_permission)):
    return {"message": "✅ Bạn có quyền chỉnh sửa."}
