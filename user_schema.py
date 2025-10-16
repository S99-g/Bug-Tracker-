from pydantic import BaseModel, validator
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    DEVELOPER = "developer"

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role: str

    @validator('role')
    def validate_role(cls, v):
        # Normalize role to lowercase
        normalized_role = v.lower()
        if normalized_role not in [role.value for role in UserRole]:
            raise ValueError('Role must be either "admin" or "developer"')
        return normalized_role

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    role: str
    class Config:
        from_attributes = True