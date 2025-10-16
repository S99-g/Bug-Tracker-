def test_assign_bug(client):
    login = client.post("/auth/login", data={"username": "testuser", "password": "testpass"})
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
 
    # Create project
    project = client.post("/projects/", json={"name": "BugProj"}, headers=headers).json()
 
    # Create bug
    bug = client.post("/bugs/", json={
        "title": "Assign Bug",
        "description": "Test assign",
        "status": "open",
        "project_id": project["id"]
    }, headers=headers).json()
 
    # Assign bug to testuser (ID=1)
    response = client.post("/assignments/", json={
        "bug_id": bug["id"],
        "user_id": 1
    }, headers=headers)
    assert response.status_code == 200
    assert response.json()["bug_id"] == bug["id"]