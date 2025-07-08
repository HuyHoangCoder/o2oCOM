from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.product_origin import ProductOrigin
from app.models.product import Product
from app.schemas.product_origin import ProductOriginCreate, ProductOriginOut, ProductOriginUpdate
from typing import List

router = APIRouter(tags=["Product Origin"])

# Lấy danh sách nguồn gốc của tất cả sản phẩm
@router.get("/product/origins", response_model=List[ProductOriginOut])
def get_all_origins(db: Session = Depends(get_db)):
    return db.query(ProductOrigin).all()

# Lấy nguồn gốc của 1 sản phẩm cụ thể
@router.get("/product/{product_id}/origin", response_model=ProductOriginOut)
def get_origin_by_product(product_id: int, db: Session = Depends(get_db)):
    origin = db.query(ProductOrigin).filter(ProductOrigin.product_id == product_id).first()
    if not origin:
        raise HTTPException(status_code=404, detail="Không tìm thấy thông tin nguồn gốc sản phẩm.")
    return origin

# Thêm thông tin nguồn gốc sản phẩm
@router.post("/product/origins", response_model=ProductOriginOut)
def create_origin(origin: ProductOriginCreate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.product_id == origin.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại.")

    existing_origin = db.query(ProductOrigin).filter(ProductOrigin.product_id == origin.product_id).first()
    if existing_origin:
        raise HTTPException(status_code=400, detail="Sản phẩm này đã có thông tin nguồn gốc.")

    new_origin = ProductOrigin(**origin.dict())
    db.add(new_origin)
    db.commit()
    db.refresh(new_origin)
    return new_origin

# Cập nhật thông tin nguồn gốc sản phẩm
@router.put("/product/origins/{origin_id}", response_model=ProductOriginOut)
def update_origin(origin_id: int, origin_update: ProductOriginUpdate, db: Session = Depends(get_db)):
    origin = db.query(ProductOrigin).filter(ProductOrigin.id == origin_id).first()
    if not origin:
        raise HTTPException(status_code=404, detail="Thông tin nguồn gốc không tồn tại.")

    for field, value in origin_update.dict(exclude_unset=True).items():
        setattr(origin, field, value)

    db.commit()
    db.refresh(origin)
    return origin

# Xóa thông tin nguồn gốc sản phẩm
@router.delete("/product/origins/{origin_id}")
def delete_origin(origin_id: int, db: Session = Depends(get_db)):
    origin = db.query(ProductOrigin).filter(ProductOrigin.id == origin_id).first()
    if not origin:
        raise HTTPException(status_code=404, detail="Thông tin nguồn gốc không tồn tại.")

    db.delete(origin)
    db.commit()
    return {"message": "Xóa thông tin nguồn gốc thành công"}
