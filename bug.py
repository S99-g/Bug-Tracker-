from sqlalchemy import Column, Integer, String, ForeignKey
from database.connection import Base

class Bug(Base):
    __tablename__ = "bugs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    status = Column(String)
    project_id = Column(Integer, ForeignKey("projects.id"))