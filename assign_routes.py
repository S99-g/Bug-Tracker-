from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db
from models.bug_assignment import BugAssignment
from models.bug import Bug
from models.user import User
from schemas.assignment_schema import AssignmentCreate, AssignmentOut
from typing import List

router = APIRouter(tags=["assignments"])

@router.post("/", response_model=AssignmentOut)
def assign_bug(data: AssignmentCreate, db: Session = Depends(get_db)):
    assignment = BugAssignment(**data.dict())
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return assignment

@router.get("/", response_model=List[AssignmentOut])
def list_assignments(db: Session = Depends(get_db)):
    return db.query(BugAssignment).all()

@router.get("/with-details")
def get_assignments_with_details(db: Session = Depends(get_db)):
    """Get all assignments with bug and developer details for admin dashboard"""
    assignments = db.query(BugAssignment).all()
    
    result = []
    for assignment in assignments:
        bug = db.query(Bug).filter(Bug.id == assignment.bug_id).first()
        developer = db.query(User).filter(User.id == assignment.user_id).first()
        
        if bug and developer:
            result.append({
                "assignment_id": assignment.id,
                "bug_id": bug.id,
                "bug_title": bug.title,
                "bug_description": bug.description,
                "bug_status": bug.status,
                "developer_id": developer.id,
                "developer_name": developer.username,
                "developer_email": developer.email
            })
    
    return result

@router.get("/developer/{developer_id}")
def get_assignments_by_developer(developer_id: int, db: Session = Depends(get_db)):
    """Get all assignments for a specific developer with bug details"""
    assignments = db.query(BugAssignment).filter(BugAssignment.user_id == developer_id).all()
    
    # Get bug details for each assignment
    result = []
    for assignment in assignments:
        bug = db.query(Bug).filter(Bug.id == assignment.bug_id).first()
        if bug:
            result.append({
                "assignment_id": assignment.id,
                "bug_id": bug.id,
                "title": bug.title,
                "description": bug.description,
                "status": bug.status,
                "project_id": bug.project_id
            })
    
    return result

@router.delete("/{assignment_id}")
def delete_assignment(assignment_id: int, db: Session = Depends(get_db)):
    assignment = db.query(BugAssignment).filter(BugAssignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    
    db.delete(assignment)
    db.commit()
    return {"message": "Assignment deleted successfully"}

@router.delete("/bug/{bug_id}")
def delete_assignment_by_bug(bug_id: int, db: Session = Depends(get_db)):
    assignment = db.query(BugAssignment).filter(BugAssignment.bug_id == bug_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found for this bug")
    
    db.delete(assignment)
    db.commit()
    return {"message": "Assignment deleted successfully"}