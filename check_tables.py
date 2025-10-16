#!/usr/bin/env python3
"""
Script to check all database tables and their structure.
"""

import sqlite3
import os

def check_database():
    """Check all tables in the database."""
    db_path = "bugtracker.db"
    
    if not os.path.exists(db_path):
        print(f"❌ Database file '{db_path}' not found!")
        return
    
    try:
        # Connect to the database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        print("🔍 DATABASE TABLES CHECK")
        print("=" * 50)
        
        # Get all table names
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        if not tables:
            print("❌ No tables found in the database!")
            return
        
        print(f"📊 Found {len(tables)} table(s):")
        for table in tables:
            print(f"   - {table[0]}")
        print()
        
        # Check each table structure
        for table in tables:
            table_name = table[0]
            print(f"📋 TABLE: {table_name.upper()}")
            print("-" * 30)
            
            # Get table schema
            cursor.execute(f"PRAGMA table_info({table_name})")
            columns = cursor.fetchall()
            
            if not columns:
                print("   ❌ No columns found!")
                continue
            
            print("   Columns:")
            for col in columns:
                print(f"     - {col[1]} ({col[2]})")
            
            # Get row count
            cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
            count = cursor.fetchone()[0]
            print(f"   Rows: {count}")
            
            # Show sample data
            if count > 0:
                cursor.execute(f"SELECT * FROM {table_name} LIMIT 3")
                rows = cursor.fetchall()
                print("   Sample data:")
                for row in rows:
                    print(f"     {row}")
            
            print()
        
        conn.close()
        print("✅ Database check completed!")
        
    except sqlite3.Error as e:
        print(f"❌ Database error: {e}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    check_database() 