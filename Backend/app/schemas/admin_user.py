# ===================== Schemas: app/schemas/admin_user.py =====================
from pydantic import BaseModel
from typing import Optional

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminToken(BaseModel):
    access_token: str
    token_type: str = "bearer"

class AdminCreate(BaseModel):
    username: str
    password: str
    role: str = "staff"
    can_edit: Optional[bool] = False