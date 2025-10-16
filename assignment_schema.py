from pydantic import BaseModel

class AssignmentCreate(BaseModel):
    bug_id: int
    user_id: int

class AssignmentOut(AssignmentCreate):
    id: int
    class Config:
        from_attributes = True