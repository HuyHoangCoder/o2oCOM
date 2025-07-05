from fastapi import APIRouter, Depends, HTTPException
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

# Lấy tất cả danh mục
@router.get("/categories", response_model=List[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()

# Tạo danh mục
@router.post("/categories", response_model=CategoryOut)
def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    new_category = Category(**category.dict())
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
def update_category(category_id: int, update_data: CategoryUpdate, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy danh mục.")
    
    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(category, key, value)

    db.commit()
    return {"message": "✅ Cập nhật danh mục thành công."}

# Xóa danh mục
@router.delete("/categories/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy danh mục.")
    
    db.delete(category)
    db.commit()
    return {"message": "✅ Đã xóa danh mục thành công."}
