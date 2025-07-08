from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.ingredients import Ingredient
from app.schemas.ingredients import IngredientCreate, IngredientUpdate, IngredientOut
from typing import List

router = APIRouter(tags=["Ingredients"])

# ===== DB Session =====
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#  Thêm mới nguyên liệu
@router.post("/", response_model=IngredientOut)
def create_ingredient(ingredient: IngredientCreate, db: Session = Depends(get_db)):
    new_ingredient = Ingredient(**ingredient.dict())
    db.add(new_ingredient)
    db.commit()
    db.refresh(new_ingredient)
    return new_ingredient

#  Cập nhật thông tin nguyên liệu
@router.put("/{ingredient_id}")
def update_ingredient(ingredient_id: int, update_data: IngredientUpdate, db: Session = Depends(get_db)):
    ingredient = db.query(Ingredient).filter(Ingredient.id == ingredient_id).first()
    if not ingredient:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy nguyên liệu.")

    if update_data.name:
        ingredient.name = update_data.name
    if update_data.stock_quantity is not None:
        ingredient.stock_quantity = update_data.stock_quantity

    db.commit()
    return {"message": "✅ Cập nhật nguyên liệu thành công."}

#  Theo dõi tồn kho nguyên liệu (Danh sách tất cả nguyên liệu)
@router.get("/", response_model=List[IngredientOut])
def list_ingredients(db: Session = Depends(get_db)):
    return db.query(Ingredient).all()

#  (Mở rộng) Liên kết nguyên liệu với món ăn => Phụ thuộc bảng product_ingredients => Bạn đã có bảng này chưa? Nếu cần tôi viết tiếp.

#  Cảnh báo nguyên liệu sắp hết (Ngưỡng cảnh báo dưới 10 đơn vị)
@router.get("/low-stock", response_model=List[IngredientOut])
def low_stock_ingredients(db: Session = Depends(get_db)):
    return db.query(Ingredient).filter(Ingredient.stock_quantity < 10).all()

#Xóa nguyên liệu
@router.delete("/{ingredient_id}")
def delete_ingredient(ingredient_id: int, db: Session = Depends(get_db)):
    ingredient = db.query(Ingredient).filter(Ingredient.id == ingredient_id).first()
    if not ingredient:
        raise HTTPException(status_code=404, detail="❌ Không tìm thấy nguyên liệu.")

    db.delete(ingredient)
    db.commit()
    return {"message": "✅ Đã xóa nguyên liệu thành công."}