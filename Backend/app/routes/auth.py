from fastapi import APIRouter, HTTPException, Depends, Header, Security
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from app.db.database import SessionLocal
from app.models.user import User
from app.schemas.user import UserOut
from app.utils.email import generate_otp, send_otp_email
from jose import jwt, JWTError
import time, hashlib, datetime, re, os
from typing import Optional
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

router = APIRouter(tags=["Auth"])

SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
BASE_URL = os.getenv("BASE_URL") or "http://localhost:8000"

otp_store = {}
temp_user_data = {}
forgot_password_otp_store = {}

security = HTTPBearer()

def create_access_token(data: dict, expires_delta: int = 3600):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_delta)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

class RegisterRequest(BaseModel):
    username: str
    password: str
    email: EmailStr
    full_name: str | None = None
    # phone: str

class OTPVerifyRequest(BaseModel):
    email: EmailStr
    otp: str

class LoginRequest(BaseModel):
    username: str
    password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class UpdateUserRequest(BaseModel):
    full_name: str | None = None
    phone: str | None = None
    avatar_url: str | None = None

class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str

@router.post("/register")
async def register_request(payload: RegisterRequest, db: Session = Depends(get_db)):
    if len(payload.password) < 8 or not re.search(r"[A-Z]", payload.password) or not re.search(r"[!@#$%^&*(),.?\":{}|<>]", payload.password):
        raise HTTPException(status_code=400, detail="❌ Mật khẩu phải có ít nhất 8 ký tự, 1 chữ in hoa, 1 ký tự đặc biệt.")

    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=400, detail="❌ Email đã được sử dụng.")
    if db.query(User).filter(User.username == payload.username).first():
        raise HTTPException(status_code=400, detail="❌ Username đã tồn tại.")
    # if db.query(User).filter(User.phone == payload.phone).first():
    #     raise HTTPException(status_code=400, detail="❌ Số điện thoại đã được sử dụng.")
    
    otp = generate_otp()
    otp_store[payload.email] = (otp, time.time())
    await send_otp_email(payload.email, otp, purpose="xác thực")
    
    temp_user_data[payload.email] = {
        "username": payload.username,
        "password_hash": hash_password(payload.password),
        "full_name": payload.full_name,
        # "phone": payload.phone,
        "role": "member"
    }
    return {"message": "✅ Đã gửi mã OTP tới email. Vui lòng xác thực."}

@router.post("/verify-otp")
def verify_otp(payload: OTPVerifyRequest, db: Session = Depends(get_db)):
    if payload.email not in otp_store or payload.email not in temp_user_data:
        raise HTTPException(status_code=400, detail="❌ Email chưa đăng ký hoặc chưa gửi OTP.")
    
    stored_otp, timestamp = otp_store[payload.email]
    if time.time() - timestamp > 300:
        raise HTTPException(status_code=400, detail="❌ Mã OTP đã hết hạn.")
    if payload.otp != stored_otp:
        raise HTTPException(status_code=400, detail="❌ Mã OTP không đúng.")
    
    data = temp_user_data[payload.email]
    new_user = User(
        username=data["username"],
        email=payload.email,
        password_hash=data["password_hash"],
        full_name=data["full_name"],
        # phone=data["phone"],
        role="member"
    )
    db.add(new_user)
    db.commit()

    del otp_store[payload.email]
    del temp_user_data[payload.email]

    token = create_access_token({"sub": new_user.username, "role": new_user.role})
    return {"message": "✅ Đăng ký và xác minh OTP thành công!", "access_token": token, "token_type": "bearer"}

@router.post("/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == payload.username).first()

    if not user or user.password_hash != hash_password(payload.password):
        raise HTTPException(status_code=401, detail="❌ Sai username hoặc mật khẩu.")
    
    token = create_access_token({"sub": user.username, "role": user.role})

    return {
        "message": "✅ Đăng nhập thành công!",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role
        }
    }


@router.post("/refresh-token")
def refresh_token(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        role = payload.get("role")
    except JWTError:
        raise HTTPException(status_code=401, detail="❌ Token không hợp lệ hoặc đã hết hạn.")
    
    new_token = create_access_token({"sub": username, "role": role})
    return {"message": "✅ Đã cấp lại token mới!", "access_token": new_token, "token_type": "bearer"}

@router.get("/users/{user_id}")
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy người dùng.")
    
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        # "phone": user.phone,
        "role": user.role
    }

@router.get("/users")
def get_all_users(role: Optional[str] = Depends(lambda: None), db: Session = Depends(get_db)):
    query = db.query(User)
    if role:
        query = query.filter(User.role == role)
    users = query.all()

    return [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "full_name": user.full_name,
            # "phone": user.phone,
            "role": user.role
        }
        for user in users
    ]

@router.post("/forgot-password")
async def forgot_password(payload: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="❌ Email chưa được đăng ký.")
    
    otp = generate_otp()
    forgot_password_otp_store[payload.email] = (otp, time.time())
    await send_otp_email(payload.email, otp, purpose="đổi mật khẩu")
    return {"message": "✅ Đã gửi mã OTP khôi phục mật khẩu tới email."}

@router.put("/users/{user_id}")
def update_user_info(user_id: int, payload: UpdateUserRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy người dùng.")
    
    # if payload.phone and not re.fullmatch(r"0\d{9}", payload.phone):
    #     raise HTTPException(status_code=400, detail="❌ Số điện thoại phải đủ 10 số và bắt đầu bằng số 0.")
    
    if payload.full_name:
        user.full_name = payload.full_name
    # if payload.phone:
    #     user.phone = payload.phone
    if payload.avatar_url:
        user.avatar_url = payload.avatar_url

    db.commit()
    return {"message": "✅ Cập nhật thông tin thành công."}

@router.put("/users/{user_id}/change-password")
def change_password(user_id: int, payload: ChangePasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy người dùng.")
    
    if user.password_hash != hash_password(payload.old_password):
        raise HTTPException(status_code=400, detail="❌ Mật khẩu cũ không đúng.")
    
    user.password_hash = hash_password(payload.new_password)
    db.commit()
    return {"message": "✅ Đổi mật khẩu thành công."}

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy người dùng.")
    
    db.delete(user)
    db.commit()
    return {"message": f"✅ Đã xóa tài khoản ID {user_id}."}

def get_current_user_role(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        role = payload.get("role")
        if role not in ["admin", "moderator"]:
            raise HTTPException(status_code=403, detail="❌ Không đủ quyền truy cập.")
        return role
    except JWTError:
        raise HTTPException(status_code=401, detail="❌ Token không hợp lệ.")
