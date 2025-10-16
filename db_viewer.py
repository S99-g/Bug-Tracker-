#!/usr/bin/env python3
"""
Beautiful Database Viewer - Shows data in readable tabular format.
"""

import sqlite3
import os
from datetime import datetime

def print_header(title):
    """Print a beautiful header."""
    print("\n" + "="*60)
    print(f"📊 {title}")
    print("="*60)

def print_table(headers, rows, title):
    """Print data in a beautiful table format."""
    if not rows:
        print(f"   📭 No data found in {title}")
        return
    
    # Calculate column widths
    col_widths = []
    for i, header in enumerate(headers):
        max_width = len(str(header))
        for row in rows:
            max_width = max(max_width, len(str(row[i])))
        col_widths.append(max_width + 2)
    
    # Print table
    print(f"\n   📋 {title} ({len(rows)} row(s)):")
    print()
    
    # Top border
    border = "   +" + "+".join("-" * width for width in col_widths) + "+"
    print(border)
    
    # Header
    header_row = "   |"
    for i, header in enumerate(headers):
        header_row += f" {str(header):<{col_widths[i]-1}}|"
    print(header_row)
    
    # Separator
    print(border)
    
    # Data rows
    for row in rows:
        data_row = "   |"
        for i, cell in enumerate(row):
            data_row += f" {str(cell):<{col_widths[i]-1}}|"
        print(data_row)
    
    # Bottom border
    print(border)

def view_database():
    """View all tables and their contents in a beautiful format."""
    db_path = "bugtracker.db"
    
    if not os.path.exists(db_path):
        print("❌ Database file not found!")
        print("💡 Please run the application first to create the database.")
        return
    
    try:
        # Connect to the database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        print_header("BUGTRACKER DATABASE VIEWER")
        print(f"📅 Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"🗄️  Database: {db_path}")
        
        # Get all table names
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        if not tables:
            print("\n❌ No tables found in the database!")
            return
        
        print(f"\n📋 Found {len(tables)} table(s):")
        for table in tables:
            print(f"   - {table[0]}")
        
        # View each table
        for table in tables:
            table_name = table[0]
            
            # Get column information
            cursor.execute(f"PRAGMA table_info({table_name});")
            columns = cursor.fetchall()
            headers = [col[1] for col in columns]
            
            # Get data
            cursor.execute(f"SELECT * FROM {table_name};")
            rows = cursor.fetchall()
            
            print_table(headers, rows, table_name.upper())
        
        conn.close()
        print("\n✅ Database viewing completed!")
        
    except Exception as e:
        print(f"❌ Error viewing database: {e}")

if __name__ == "__main__":
    view_database() 