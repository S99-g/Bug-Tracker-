#!/usr/bin/env python3
"""
Script to test all API endpoints and check if they're working properly.
"""

import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_endpoints():
    """Test all API endpoints."""
    print("🧪 TESTING API ENDPOINTS")
    print("=" * 50)
    
    # Test endpoints
    endpoints = [
        # GET endpoints
        ("GET", "/", "Root endpoint"),
        ("GET", "/auth/users", "Get all users"),
        ("GET", "/bugs/", "Get all bugs"),
        ("GET", "/projects/", "Get all projects"),
        ("GET", "/assignments/", "Get all assignments"),
        ("GET", "/assignments/with-details", "Get assignments with details"),
        
        # POST endpoints
        ("POST", "/auth/register", "Register user"),
        ("POST", "/auth/login", "Login user"),
        ("POST", "/bugs/", "Create bug"),
        ("POST", "/projects/", "Create project"),
        ("POST", "/assignments/", "Assign bug"),
        
        # PUT endpoints
        ("PUT", "/bugs/1", "Update bug"),
        ("PUT", "/projects/1", "Update project"),
        
        # DELETE endpoints
        ("DELETE", "/bugs/1", "Delete bug"),
        ("DELETE", "/projects/1", "Delete project"),
        ("DELETE", "/assignments/1", "Delete assignment"),
        ("DELETE", "/auth/users/1", "Delete user"),
    ]
    
    for method, endpoint, description in endpoints:
        try:
            url = f"{BASE_URL}{endpoint}"
            headers = {"Content-Type": "application/json"}
            
            # Add sample data for POST requests
            data = None
            if method == "POST":
                if "register" in endpoint:
                    data = {"username": "test", "email": "test@test.com", "password": "test123", "role": "developer"}
                elif "login" in endpoint:
                    data = {"username": "test", "password": "test123"}
                elif "bugs" in endpoint:
                    data = {"title": "Test Bug", "description": "Test Description", "status": "open", "project_id": 1}
                elif "projects" in endpoint:
                    data = {"title": "Test Project", "description": "Test Description"}
                elif "assignments" in endpoint:
                    data = {"bug_id": 1, "user_id": 1}
            
            if method == "GET":
                response = requests.get(url, headers=headers)
            elif method == "POST":
                response = requests.post(url, headers=headers, json=data)
            elif method == "PUT":
                response = requests.put(url, headers=headers, json=data)
            elif method == "DELETE":
                response = requests.delete(url, headers=headers)
            
            status = "✅" if response.status_code < 400 else "❌"
            print(f"{status} {method} {endpoint} - {description}")
            print(f"   Status: {response.status_code}")
            
            if response.status_code >= 400:
                print(f"   Error: {response.text}")
            
        except requests.exceptions.ConnectionError:
            print(f"❌ {method} {endpoint} - {description}")
            print("   Error: Connection refused (server not running)")
        except Exception as e:
            print(f"❌ {method} {endpoint} - {description}")
            print(f"   Error: {str(e)}")
        
        print()

if __name__ == "__main__":
    test_endpoints() 