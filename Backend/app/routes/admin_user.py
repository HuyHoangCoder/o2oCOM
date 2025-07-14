from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.admin_user import AdminUser
from app.schemas.admin_user import AdminLogin, AdminToken
from app.utils.auth import create_access_token
from passlib.hash import bcrypt

router = APIRouter(prefix="/auth/admin", tags=["Admin Auth"])

@router.post("/login", response_model=AdminToken)
def login_admin(data: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter_by(username=data.username).first()
    if not admin or not bcrypt.verify(data.password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "id": admin.id,
        "username": admin.username,
        "role": admin.role,
        "is_owner": admin.is_owner,
        "can_edit": admin.can_edit,
        "type": "admin"
    })
    return {"access_token": token}
