import os
import uuid
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryOut
from typing import List

router = APIRouter(tags=["Category"])

# Dependency lấy DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

UPLOAD_DIR = "uploads/images"

# Lấy tất cả danh mục
@router.get("/categories", response_model=List[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()

# Tạo danh mục
@router.post("/categories", response_model=CategoryOut)
async def create_category(
    name: str = Form(...),
    description: str = Form(""),
    image_url: str = Form(""),  # Link nếu không upload ảnh
    is_active: bool = Form(True),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    # Nếu có upload ảnh
    if image:
        ext = os.path.splitext(image.filename)[-1]
        filename = f"{uuid.uuid4()}{ext}"
        file_path = os.path.join(UPLOAD_DIR, filename)

        os.makedirs(UPLOAD_DIR, exist_ok=True)
        with open(file_path, "wb") as f:
            f.write(await image.read())

        image_url = f"/uploads/images/{filename}"

    new_category = Category(
        name=name,
        description=description,
        image_url=image_url,
        is_active=is_active
    )
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category

# Lấy danh mục theo ID
@router.get("/categories/{category_id}", response_model=CategoryOut)
def get_category_by_id(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy danh mục.")
    return category

# Cập nhật danh mục
@router.put("/categories/{category_id}")
async def update_category(
    category_id: int,
    name: str = Form(None),
    description: str = Form(None),
    image_url: str = Form(None),
    is_active: bool = Form(None),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy danh mục.")

    if name: category.name = name
    if description: category.description = description
    if is_active is not None: category.is_active = is_active

    if image:
        ext = os.path.splitext(image.filename)[-1]
        filename = f"{uuid.uuid4()}{ext}"
        file_path = os.path.join(UPLOAD_DIR, filename)

        os.makedirs(UPLOAD_DIR, exist_ok=True)
        with open(file_path, "wb") as f:
            f.write(await image.read())

        category.image_url = f"/uploads/images/{filename}"
    elif image_url:
        category.image_url = image_url

    db.commit()
    db.refresh(category)
    return {"message": "✅ Cập nhật danh mục thành công.", "data": category}

# Xóa danh mục
@router.delete("/categories/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy danh mục.")
    
    db.delete(category)
    db.commit()
    return {"message": "✅ Đã xóa danh mục thành công."}
