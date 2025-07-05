from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.notification import Notification
from app.schemas.notification import NotificationCreate, NotificationOut
from typing import List

router = APIRouter(tags=["Notification"])

# Tạo thông báo
@router.post("/notifications", response_model=NotificationOut)
def create_notification(data: NotificationCreate, db: Session = Depends(get_db)):
    new_notification = Notification(title=data.title, content=data.content)
    db.add(new_notification)
    db.commit()
    db.refresh(new_notification)
    return new_notification

# Danh sách tất cả thông báo
@router.get("/notifications", response_model=List[NotificationOut])
def list_notifications(db: Session = Depends(get_db)):
    return db.query(Notification).order_by(Notification.created_at.desc()).all()

# Lấy chi tiết thông báo theo ID
@router.get("/notifications/{notification_id}", response_model=NotificationOut)
def get_notification(notification_id: int, db: Session = Depends(get_db)):
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if not notification:
        raise HTTPException(status_code=404, detail="Không tìm thấy thông báo.")
    return notification

# Cập nhật thông báo
@router.put("/notifications/{notification_id}", response_model=NotificationOut)
def update_notification(notification_id: int, data: NotificationCreate, db: Session = Depends(get_db)):
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if not notification:
        raise HTTPException(status_code=404, detail="Không tìm thấy thông báo.")

    notification.title = data.title
    notification.content = data.content
    db.commit()
    db.refresh(notification)
    return notification

# Xoá thông báo
@router.delete("/notifications/{notification_id}")
def delete_notification(notification_id: int, db: Session = Depends(get_db)):
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if not notification:
        raise HTTPException(status_code=404, detail="Không tìm thấy thông báo.")

    db.delete(notification)
    db.commit()
    return {"message": "✅ Đã xoá thông báo thành công."}