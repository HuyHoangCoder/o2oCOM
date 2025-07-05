from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.product_ingredients import ProductIngredient
from app.models.product import Product
from app.models.ingredients import Ingredient
from app.schemas.product_ingredients import ProductIngredientCreate, ProductIngredientOut, ProductIngredientUpdate
from typing import List

router = APIRouter(tags=["Product Ingredients"])

# Danh sách nguyên liệu của 1 sản phẩm
@router.get("/product/{product_id}/ingredients", response_model=List[ProductIngredientOut])
def get_ingredients_of_product(product_id: int, db: Session = Depends(get_db)):
    return db.query(ProductIngredient).filter(ProductIngredient.product_id == product_id).all()

# Thêm nguyên liệu vào sản phẩm
@router.post("/product/{product_id}/ingredients", response_model=ProductIngredientOut)
def add_ingredient_to_product(product_id: int, data: ProductIngredientCreate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại.")

    ingredient = db.query(Ingredient).filter(Ingredient.ingredient_id == data.ingredient_id).first()
    if not ingredient:
        raise HTTPException(status_code=404, detail="Nguyên liệu không tồn tại.")

    new_item = ProductIngredient(
        product_id=product_id,
        ingredient_id=data.ingredient_id,
        quantity=data.quantity,
        unit=data.unit
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

# Cập nhật nguyên liệu trong sản phẩm
@router.put("/product/ingredients/{id}", response_model=ProductIngredientOut)
def update_product_ingredient(id: int, data: ProductIngredientUpdate, db: Session = Depends(get_db)):
    item = db.query(ProductIngredient).filter(ProductIngredient.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Thông tin nguyên liệu không tồn tại.")

    for field, value in data.dict(exclude_unset=True).items():
        setattr(item, field, value)

    db.commit()
    db.refresh(item)
    return item

# Xóa nguyên liệu khỏi sản phẩm
@router.delete("/product/ingredients/{id}")
def delete_product_ingredient(id: int, db: Session = Depends(get_db)):
    item = db.query(ProductIngredient).filter(ProductIngredient.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Thông tin nguyên liệu không tồn tại.")

    db.delete(item)
    db.commit()
    return {"message": "Xóa nguyên liệu khỏi sản phẩm thành công"}
