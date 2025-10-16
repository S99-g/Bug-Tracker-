from sqlalchemy import Column, Integer, ForeignKey
from database.connection import Base

class BugAssignment(Base):
    __tablename__ = "bug_assignments"
    id = Column(Integer, primary_key=True, index=True)
    bug_id = Column(Integer, ForeignKey("bugs.id"))
    user_id = Column(Integer, ForeignKey("users.id"))