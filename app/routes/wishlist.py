from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.wishlist import Wishlist
from app.models.user import User
from app.models.product import Product
from app.schemas.wishlist import WishlistCreate, WishlistOut
from typing import List

router = APIRouter(tags=["Wishlist"])

# Lấy danh sách wishlist của user
@router.get("/wishlist", response_model=List[WishlistOut])
def get_wishlist(user_id: int, db: Session = Depends(get_db)):
    return db.query(Wishlist).filter(Wishlist.user_id == user_id).all()

# Thêm món vào wishlist
@router.post("/wishlist", response_model=WishlistOut)
def add_to_wishlist(data: WishlistCreate, user_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.product_id == data.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại")

    existing = db.query(Wishlist).filter(Wishlist.user_id == user_id, Wishlist.product_id == data.product_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Sản phẩm đã nằm trong danh sách yêu thích")

    new_item = Wishlist(user_id=user_id, product_id=data.product_id)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

# Xóa món khỏi wishlist
@router.delete("/wishlist/{product_id}")
def remove_from_wishlist(product_id: int, user_id: int, db: Session = Depends(get_db)):
    item = db.query(Wishlist).filter(Wishlist.user_id == user_id, Wishlist.product_id == product_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Món này không nằm trong danh sách yêu thích")

    db.delete(item)
    db.commit()
    return {"message": "Đã xóa khỏi danh sách yêu thích"}
