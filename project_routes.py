from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db
from crud.project import create_project, get_projects, get_project, update_project, delete_project
from schemas.project_schema import ProjectCreate, ProjectUpdate, ProjectOut
from typing import List

router = APIRouter(tags=["projects"])

@router.post("/", response_model=ProjectOut)
def add_project(project: ProjectCreate, db: Session = Depends(get_db)):
    return create_project(db, project)

@router.get("/", response_model=List[ProjectOut])
def list_projects(db: Session = Depends(get_db)):
    return get_projects(db)

@router.get("/{project_id}", response_model=ProjectOut)
def get_project_by_id(project_id: int, db: Session = Depends(get_db)):
    project = get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.put("/{project_id}", response_model=ProjectOut)
def update_project_by_id(project_id: int, project: ProjectUpdate, db: Session = Depends(get_db)):
    return update_project(db, project_id, project)

@router.delete("/{project_id}")
def delete_project_by_id(project_id: int, db: Session = Depends(get_db)):
    return delete_project(db, project_id)