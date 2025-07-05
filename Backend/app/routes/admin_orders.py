from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderUpdate, OrderOut
from typing import List
from datetime import datetime

router = APIRouter(tags=["Admin - Orders"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ======== Thêm đơn hàng ========
@router.post("/orders", response_model=OrderOut)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    new_order_data = order.dict()
    if not new_order_data.get("created_at"):
        new_order_data["created_at"] = datetime.utcnow()

    new_order = Order(**new_order_data)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order


# ======== Lấy tất cả đơn hàng ========
@router.get("/orders", response_model=List[OrderOut])
def get_all_orders(db: Session = Depends(get_db)):
    orders = db.query(Order).all()
    return [OrderOut.from_orm(order) for order in orders]


# ======== Lấy đơn hàng theo ID ========
@router.get("/orders/{order_id}", response_model=OrderOut)
def get_order_by_id(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Đơn hàng không tồn tại.")
    return OrderOut.from_orm(order)


# ======== Cập nhật đơn hàng ========
@router.put("/orders/{order_id}", response_model=OrderOut)
def update_order(order_id: int, update_data: OrderUpdate, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Đơn hàng không tồn tại.")

    update_fields = update_data.dict(exclude_unset=True)
    for key, value in update_fields.items():
        setattr(order, key, value)

    db.commit()
    db.refresh(order)
    return OrderOut.from_orm(order)


# ======== Xoá đơn hàng ========
@router.delete("/orders/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Đơn hàng không tồn tại.")

    db.delete(order)
    db.commit()
    return {"message": "Đã xoá đơn hàng thành công."}
