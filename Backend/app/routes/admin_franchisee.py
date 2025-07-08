from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.franchisee import Franchisee
from app.schemas.franchisee import FranchiseeCreate, FranchiseeUpdate, FranchiseeOut
from typing import List

router = APIRouter(tags=["Admin - Franchisee"])

@router.post("", response_model=FranchiseeOut)
def create_franchisee(payload: FranchiseeCreate, db: Session = Depends(get_db)):
    new_franchisee = Franchisee(**payload.dict())
    db.add(new_franchisee)
    db.commit()
    db.refresh(new_franchisee)
    return new_franchisee

@router.get("", response_model=List[FranchiseeOut])
def get_all_franchisees(db: Session = Depends(get_db)):
    return db.query(Franchisee).all()

@router.get("/{franchisee_id}", response_model=FranchiseeOut)
def get_franchisee_by_id(franchisee_id: int, db: Session = Depends(get_db)):
    franchisee = db.query(Franchisee).filter(Franchisee.id == franchisee_id).first()
    if not franchisee:
        raise HTTPException(status_code=404, detail="Không tìm thấy Franchisee.")
    return franchisee

@router.put("/{franchisee_id}")
def update_franchisee(franchisee_id: int, payload: FranchiseeUpdate, db: Session = Depends(get_db)):
    franchisee = db.query(Franchisee).filter(Franchisee.id == franchisee_id).first()
    if not franchisee:
        raise HTTPException(status_code=404, detail="Không tìm thấy Franchisee.")
    
    for key, value in payload.dict(exclude_unset=True).items():
        setattr(franchisee, key, value)
    
    db.commit()
    return {"message": "Cập nhật thành công."}

@router.delete("/{franchisee_id}")
def delete_franchisee(franchisee_id: int, db: Session = Depends(get_db)):
    franchisee = db.query(Franchisee).filter(Franchisee.id == franchisee_id).first()
    if not franchisee:
        raise HTTPException(status_code=404, detail="Không tìm thấy Franchisee.")
    
    db.delete(franchisee)
    db.commit()
    return {"message": "Đã xóa thành công."}
