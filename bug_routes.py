from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db
from crud.bug import create_bug, get_bugs, get_bug, update_bug, delete_bug
from schemas.bug_schema import BugCreate, BugUpdate, BugOut
from typing import List

router = APIRouter(tags=["bugs"])

@router.post("/", response_model=BugOut)
def add_bug(bug: BugCreate, db: Session = Depends(get_db)):
    return create_bug(db, bug)

@router.get("/", response_model=List[BugOut])
def list_bugs(db: Session = Depends(get_db)):
    return get_bugs(db)

@router.get("/{bug_id}", response_model=BugOut)
def get_bug_by_id(bug_id: int, db: Session = Depends(get_db)):
    bug = get_bug(db, bug_id)
    if not bug:
        raise HTTPException(status_code=404, detail="Bug not found")
    return bug

@router.put("/{bug_id}", response_model=BugOut)
def update_bug_by_id(bug_id: int, bug: BugUpdate, db: Session = Depends(get_db)):
    return update_bug(db, bug_id, bug)

@router.delete("/{bug_id}")
def delete_bug_by_id(bug_id: int, db: Session = Depends(get_db)):
    return delete_bug(db, bug_id)