#!/usr/bin/env python3
"""
Script to initialize a fresh database with proper tables.
"""

from sqlalchemy import create_engine, text
from database.connection import engine
from models.user import Base

def init_database():
    """Initialize a fresh database with all tables."""
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        print("✅ Database initialized successfully!")
        print("📊 Tables created:")
        
        # List all tables
        with engine.connect() as conn:
            result = conn.execute(text("SELECT name FROM sqlite_master WHERE type='table';"))
            tables = result.fetchall()
            
            for table in tables:
                print(f"   - {table[0]}")
        
        print("\n🎉 Your database is ready to use!")
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")

if __name__ == "__main__":
    init_database() 