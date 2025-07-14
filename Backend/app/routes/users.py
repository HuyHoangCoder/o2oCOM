from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.user import User
from app.schemas.user import UserUpdate
import os
import shutil

router = APIRouter(tags=["User"])

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "uploads")


# ================= Upload lần đầu =====================
@router.post("/{username}/avatar")
def upload_avatar(username: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.avatar:
        raise HTTPException(status_code=400, detail="Avatar đã tồn tại, vui lòng dùng PUT để cập nhật")

    save_avatar_file(username, file, user)
    db.commit()

    return {"message": "Upload avatar thành công", "avatar": user.avatar}


# ================= Cập nhật avatar =====================
@router.put("/{username}/avatar")
def update_avatar(username: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Xóa avatar cũ nếu có
    if user.avatar:
        old_file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", user.avatar)
        if os.path.exists(old_file_path):
            os.remove(old_file_path)

    save_avatar_file(username, file, user)
    db.commit()

    return {"message": "Cập nhật avatar thành công", "avatar": user.avatar}


# ================= Lấy avatar =====================
@router.get("/{username}/avatar")
def get_avatar(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not user.avatar:
        raise HTTPException(status_code=404, detail="Avatar not found")

    file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", user.avatar)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(file_path)


# ================= Xóa avatar =====================
@router.delete("/{username}/avatar")
def delete_avatar(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not user.avatar:
        raise HTTPException(status_code=404, detail="Avatar not found")

    file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", user.avatar)
    if os.path.exists(file_path):
        os.remove(file_path)

    user.avatar = None
    db.commit()

    return {"message": "Xóa avatar thành công"}


# ================= Hàm xử lý lưu file avatar =====================
def save_avatar_file(username: str, file: UploadFile, user: User):
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    file_extension = os.path.splitext(file.filename)[1]

    if file_extension.lower() not in [".jpg", ".jpeg", ".png", ".gif", ".webp"]:
        raise HTTPException(status_code=400, detail="Chỉ chấp nhận file ảnh (.jpg, .png, .jpeg, .gif, .webp)")

    filename = f"user_{username}{file_extension}"
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    user.avatar = f"uploads/{filename}"

@router.put("/{username}/info")
def update_user_info(username: str, update_data: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if update_data.full_name is not None:
        user.full_name = update_data.full_name
    if update_data.email is not None:
        user.email = update_data.email
    if update_data.phone is not None:
        user.phone = update_data.phone
    if update_data.role is not None:
        user.role = update_data.role

    db.commit()

    return {"message": "Cập nhật thông tin thành công"}