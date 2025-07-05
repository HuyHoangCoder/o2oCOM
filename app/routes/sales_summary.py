from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.sales_summary import SalesSummary
from app.schemas.sales_summary import SalesSummaryCreate, SalesSummaryUpdate, SalesSummaryOut

router = APIRouter(tags=["Sales Summary"])

@router.post("", response_model=SalesSummaryOut)
def create_summary(summary: SalesSummaryCreate, db: Session = Depends(get_db)):
    new_summary = SalesSummary(**summary.dict())
    db.add(new_summary)
    db.commit()
    db.refresh(new_summary)
    return new_summary

@router.get("", response_model=List[SalesSummaryOut])
def get_all_summaries(db: Session = Depends(get_db)):
    return db.query(SalesSummary).all()

@router.get("/{summary_id}", response_model=SalesSummaryOut)
def get_summary_by_id(summary_id: int, db: Session = Depends(get_db)):
    summary = db.query(SalesSummary).filter(SalesSummary.id == summary_id).first()
    if not summary:
        raise HTTPException(status_code=404, detail="Không tìm thấy báo cáo")
    return summary

@router.put("/{summary_id}", response_model=SalesSummaryOut)
def update_summary(summary_id: int, summary_update: SalesSummaryUpdate, db: Session = Depends(get_db)):
    summary = db.query(SalesSummary).filter(SalesSummary.id == summary_id).first()
    if not summary:
        raise HTTPException(status_code=404, detail="Không tìm thấy báo cáo")
    
    for key, value in summary_update.dict().items():
        setattr(summary, key, value)

    db.commit()
    db.refresh(summary)
    return summary

@router.delete("/{summary_id}")
def delete_summary(summary_id: int, db: Session = Depends(get_db)):
    summary = db.query(SalesSummary).filter(SalesSummary.id == summary_id).first()
    if not summary:
        raise HTTPException(status_code=404, detail="Không tìm thấy báo cáo")
    
    db.delete(summary)
    db.commit()
    return {"message": "Đã xóa báo cáo thành công"}
