from pydantic import BaseModel
from datetime import datetime

class NotificationCreate(BaseModel):
    title: str
    content: str

class NotificationOut(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime  # ✅ Đúng kiểu datetime luôn, FastAPI tự convert

    class Config:
        from_attributes = True  # Nếu FastAPI báo cảnh báo về orm_mode
