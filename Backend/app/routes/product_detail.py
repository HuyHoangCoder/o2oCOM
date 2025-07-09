from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.product_detail import ProductDetail
from app.schemas.product_detail import ProductDetailCreate, ProductDetailUpdate, ProductDetailOut
from typing import List
from datetime import datetime

router = APIRouter(tags=["Admin - Product Detail"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ======== Thêm chi tiết sản phẩm ========
@router.post("/product-detail", response_model=ProductDetailOut)
def create_product_detail(detail: ProductDetailCreate, db: Session = Depends(get_db)):
    new_detail = ProductDetail(**detail.dict())
    db.add(new_detail)
    db.commit()
    db.refresh(new_detail)
    return new_detail


# ======== Lấy tất cả chi tiết sản phẩm ========
@router.get("/product-detail", response_model=List[ProductDetailOut])
def get_all_product_details(db: Session = Depends(get_db)):
    return db.query(ProductDetail).all()


# ======== Lấy chi tiết sản phẩm theo ID ========
@router.get("/product-detail/{detail_id}", response_model=ProductDetailOut)
def get_product_detail_by_id(detail_id: int, db: Session = Depends(get_db)):
    detail = db.query(ProductDetail).filter(ProductDetail.id == detail_id).first()
    if not detail:
        raise HTTPException(status_code=404, detail="Chi tiết sản phẩm không tồn tại.")
    return detail


# ======== Cập nhật chi tiết sản phẩm ========
@router.put("/product-detail/{detail_id}", response_model=ProductDetailOut)
def update_product_detail(detail_id: int, update_data: ProductDetailUpdate, db: Session = Depends(get_db)):
    detail = db.query(ProductDetail).filter(ProductDetail.id == detail_id).first()
    if not detail:
        raise HTTPException(status_code=404, detail="Chi tiết sản phẩm không tồn tại.")

    update_fields = update_data.dict(exclude_unset=True)
    for key, value in update_fields.items():
        setattr(detail, key, value)

    detail.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(detail)
    return detail


# ======== Xoá chi tiết sản phẩm ========
@router.delete("/product-detail/{detail_id}")
def delete_product_detail(detail_id: int, db: Session = Depends(get_db)):
    detail = db.query(ProductDetail).filter(ProductDetail.id == detail_id).first()
    if not detail:
        raise HTTPException(status_code=404, detail="Chi tiết sản phẩm không tồn tại.")

    db.delete(detail)
    db.commit()
    return {"message": "Đã xoá chi tiết sản phẩm thành công."}
