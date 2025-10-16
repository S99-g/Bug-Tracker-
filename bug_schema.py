from pydantic import BaseModel
from typing import Optional

class BugCreate(BaseModel):
    title: str
    description: str
    status: str
    project_id: int

class BugUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    project_id: Optional[int] = None

class BugOut(BugCreate):
    id: int
    class Config:
        from_attributes = True