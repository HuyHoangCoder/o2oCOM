from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.payment_log import PaymentLog
from app.schemas.payment_log import PaymentLogCreate, PaymentLogUpdate, PaymentLogOut
from typing import List
from datetime import datetime

router = APIRouter(tags=["Admin - Payment Logs"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ======== Thêm log thanh toán ========
@router.post("/payment-logs", response_model=PaymentLogOut)
def create_payment_log(log: PaymentLogCreate, db: Session = Depends(get_db)):
    log_data = log.dict()
    if not log_data.get("created_at"):
        log_data["created_at"] = datetime.utcnow()

    new_log = PaymentLog(**log_data)
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return new_log


# ======== Lấy tất cả log thanh toán ========
@router.get("/payment-logs", response_model=List[PaymentLogOut])
def get_all_payment_logs(db: Session = Depends(get_db)):
    return db.query(PaymentLog).all()


# ======== Lấy log thanh toán theo ID ========
@router.get("/payment-logs/{log_id}", response_model=PaymentLogOut)
def get_payment_log_by_id(log_id: int, db: Session = Depends(get_db)):
    log = db.query(PaymentLog).filter(PaymentLog.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Log thanh toán không tồn tại.")
    return log


# ======== Cập nhật log thanh toán ========
@router.put("/payment-logs/{log_id}", response_model=PaymentLogOut)
def update_payment_log(log_id: int, update_data: PaymentLogUpdate, db: Session = Depends(get_db)):
    log = db.query(PaymentLog).filter(PaymentLog.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Log thanh toán không tồn tại.")

    update_fields = update_data.dict(exclude_unset=True)
    for key, value in update_fields.items():
        setattr(log, key, value)

    db.commit()
    db.refresh(log)
    return log


# ======== Xoá log thanh toán ========
@router.delete("/payment-logs/{log_id}")
def delete_payment_log(log_id: int, db: Session = Depends(get_db)):
    log = db.query(PaymentLog).filter(PaymentLog.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Log thanh toán không tồn tại.")

    db.delete(log)
    db.commit()
    return {"message": "Đã xoá log thanh toán thành công."}