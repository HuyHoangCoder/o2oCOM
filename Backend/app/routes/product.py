from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.product import Product
from app.models.category import Category
from app.schemas.product import ProductCreate, ProductOut, ProductUpdate
from typing import List

router = APIRouter(tags=["Admin - Products"])

# ───────────────────── DB ───────────────────── #
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ───────────────────── ROUTES ───────────────────── #

# Get all products
@router.get("/products", response_model=List[ProductOut])
def get_all_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

# Get products by category
@router.get("/products/by-category/{category_id}", response_model=List[ProductOut])
def get_products_by_category(category_id: int, db: Session = Depends(get_db)):
    return db.query(Product).filter(Product.category_id == category_id).all()

# Get product by ID
@router.get("/products/{product_id}", response_model=ProductOut)
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy sản phẩm.")
    return product

# Create product
@router.post("/products", response_model=ProductOut)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    if product.category_id:
        category = db.query(Category).filter(Category.id == product.category_id).first()
        if not category:
            raise HTTPException(status_code=400, detail="❌ Danh mục không tồn tại.")

    new_product = Product(**product.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# Update product
@router.put("/products/{product_id}")
def update_product(product_id: int, update_data: ProductUpdate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy sản phẩm.")

    update_fields = update_data.dict(exclude_unset=True)
    for key, value in update_fields.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return {"message": "✅ Cập nhật sản phẩm thành công.", "data": product}

# Delete product
@router.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy sản phẩm.")
    db.delete(product)
    db.commit()
    return {"message": "✅ Đã xoá sản phẩm thành công."}
