#!/usr/bin/env python3
"""
Script to fix inconsistent role values in the database.
This script normalizes all role values to lowercase.
"""

from sqlalchemy.orm import Session
from database.connection import engine, get_db
from models.user import User

def fix_roles():
    """Fix inconsistent role values in the database."""
    with Session(engine) as db:
        # Get all users
        users = db.query(User).all()
        
        print(f"Found {len(users)} users in database")
        
        for user in users:
            old_role = user.role
            # Normalize role to lowercase
            if user.role:
                normalized_role = user.role.lower()
                if normalized_role in ['admin', 'developer']:
                    user.role = normalized_role
                    print(f"Fixed user {user.username}: '{old_role}' -> '{normalized_role}'")
                else:
                    # Default to admin for invalid roles
                    user.role = 'admin'
                    print(f"Fixed user {user.username}: '{old_role}' -> 'admin' (invalid role)")
            else:
                # Set default role for null roles
                user.role = 'admin'
                print(f"Fixed user {user.username}: None -> 'admin' (null role)")
        
        # Commit changes
        db.commit()
        print("Database roles have been normalized!")

if __name__ == "__main__":
    fix_roles() 