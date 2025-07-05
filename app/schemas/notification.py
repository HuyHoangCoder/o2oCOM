from pydantic import BaseModel

class NotificationCreate(BaseModel):
    title: str
    content: str

class NotificationOut(BaseModel):
    id: int
    title: str
    content: str
    created_at: str

    class Config:
        orm_mode = True
