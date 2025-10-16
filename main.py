from fastapi import FastAPI
from routes import auth_routes, bug_routes, project_routes, assign_routes
from database.connection import Base, engine
from fastapi.middleware.cors import CORSMiddleware

# Create all database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Bug Tracker API",
    description="API for Bug Tracking System with Auth, CRUD operations, and SQLite DB",
    version="1.0.0"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to the Bug Tracker API"}

# Include routers
app.include_router(auth_routes.router, prefix="/auth", tags=["Authentication"])
app.include_router(bug_routes.router, prefix="/bugs", tags=["Bugs"])
app.include_router(project_routes.router, prefix="/projects", tags=["Projects"])
app.include_router(assign_routes.router, prefix="/assignments", tags=["Assignments"])
