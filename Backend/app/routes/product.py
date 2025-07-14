from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.product import Product
from app.models.category import Category
from app.schemas.product import ProductCreate, ProductOut, ProductUpdate
from typing import List, Optional
import shutil, uuid
from pathlib import Path
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
def create_product(
    name: str = Form(...),
    description: Optional[str] = Form(None),
    price: Optional[float] = Form(None),
    calories: Optional[int] = Form(None),
    is_best_seller: Optional[bool] = Form(False),
    is_active: Optional[bool] = Form(True),
    category_id: Optional[int] = Form(None),
    stock_quantity: Optional[int] = Form(0),
    image_url: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    # Nếu upload ảnh thì lưu file và ghi lại đường dẫn
    if image:
        filename = f"{uuid.uuid4().hex}_{image.filename}"
        upload_path = Path("static/images") / filename
        upload_path.parent.mkdir(parents=True, exist_ok=True)
        with open(upload_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        image_url = f"/static/images/{filename}"  # Ghi đè image_url

    # Validate category
    if category_id:
        category = db.query(Category).filter(Category.id == category_id).first()
        if not category:
            raise HTTPException(status_code=400, detail="❌ Danh mục không tồn tại.")

    new_product = Product(
        name=name,
        description=description,
        price=price,
        calories=calories,
        is_best_seller=is_best_seller,
        is_active=is_active,
        category_id=category_id,
        stock_quantity=stock_quantity,
        image_url=image_url
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# Update product
@router.put("/products/{product_id}", response_model=ProductOut)
def update_product(
    product_id: int,
    name: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    price: Optional[float] = Form(None),
    calories: Optional[int] = Form(None),
    is_best_seller: Optional[bool] = Form(None),
    is_active: Optional[bool] = Form(None),
    category_id: Optional[int] = Form(None),
    stock_quantity: Optional[int] = Form(None),
    image_url: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy sản phẩm.")

    # Nếu có ảnh upload mới → lưu file, thay ảnh cũ
    if image:
        filename = f"{uuid.uuid4().hex}_{image.filename}"
        upload_path = Path("static/images") / filename
        upload_path.parent.mkdir(parents=True, exist_ok=True)
        with open(upload_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        product.image_url = f"/static/images/{filename}"  # Ghi đè image_url
    elif image_url is not None:
        product.image_url = image_url  # Cập nhật từ form nếu có

    # Cập nhật các trường khác nếu được truyền
    if name is not None:
        product.name = name
    if description is not None:
        product.description = description
    if price is not None:
        product.price = price
    if calories is not None:
        product.calories = calories
    if is_best_seller is not None:
        product.is_best_seller = is_best_seller
    if is_active is not None:
        product.is_active = is_active
    if category_id is not None:
        product.category_id = category_id
    if stock_quantity is not None:
        product.stock_quantity = stock_quantity

    db.commit()
    db.refresh(product)
    return product

# Delete product
@router.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy sản phẩm.")
    db.delete(product)
    db.commit()
    return {"message": "✅ Đã xoá sản phẩm thành công."}
