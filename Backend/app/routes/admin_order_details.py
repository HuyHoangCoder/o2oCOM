from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.order_detail import OrderDetail
from app.schemas.order_detail import OrderDetailCreate, OrderDetailUpdate, OrderDetailOut
from typing import List

router = APIRouter(tags=["Admin - Order Details"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ======== Thêm chi tiết đơn hàng ========
@router.post("/order-details", response_model=OrderDetailOut)
def create_order_detail(detail: OrderDetailCreate, db: Session = Depends(get_db)):
    new_detail = OrderDetail(**detail.dict())
    db.add(new_detail)
    db.commit()
    db.refresh(new_detail)
    return new_detail


# ======== Lấy tất cả chi tiết đơn hàng ========
@router.get("/order-details", response_model=List[OrderDetailOut])
def get_all_order_details(db: Session = Depends(get_db)):
    return db.query(OrderDetail).all()


# ======== Lấy chi tiết đơn hàng theo ID ========
@router.get("/order-details/{detail_id}", response_model=OrderDetailOut)
def get_order_detail_by_id(detail_id: int, db: Session = Depends(get_db)):
    detail = db.query(OrderDetail).filter(OrderDetail.id == detail_id).first()
    if not detail:
        raise HTTPException(status_code=404, detail="Chi tiết đơn hàng không tồn tại.")
    return detail


# ======== Cập nhật chi tiết đơn hàng ========
@router.put("/order-details/{detail_id}", response_model=OrderDetailOut)
def update_order_detail(detail_id: int, update_data: OrderDetailUpdate, db: Session = Depends(get_db)):
    detail = db.query(OrderDetail).filter(OrderDetail.id == detail_id).first()
    if not detail:
        raise HTTPException(status_code=404, detail="Chi tiết đơn hàng không tồn tại.")

    update_fields = update_data.dict(exclude_unset=True)
    for key, value in update_fields.items():
        setattr(detail, key, value)

    db.commit()
    db.refresh(detail)
    return detail


# ======== Xoá chi tiết đơn hàng ========
@router.delete("/order-details/{detail_id}")
def delete_order_detail(detail_id: int, db: Session = Depends(get_db)):
    detail = db.query(OrderDetail).filter(OrderDetail.id == detail_id).first()
    if not detail:
        raise HTTPException(status_code=404, detail="Chi tiết đơn hàng không tồn tại.")

    db.delete(detail)
    db.commit()
    return {"message": "Đã xoá chi tiết đơn hàng thành công."}
