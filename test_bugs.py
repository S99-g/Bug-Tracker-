def test_create_and_get_bug(client):
    # Login
    login = client.post("/auth/login", data={"username": "testuser", "password": "testpass"})
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
 
    # Create project
    project = client.post("/projects/", json={"name": "BugTest"}, headers=headers).json()
 
    # Create bug
    response = client.post("/bugs/", json={
        "title": "Sample bug",
        "description": "This is a bug",
        "status": "open",
        "project_id": project["id"]
    }, headers=headers)
    assert response.status_code == 200
    assert response.json()["title"] == "Sample bug"
 
    # Get bugs
    response = client.get("/bugs/", headers=headers)
    assert response.status_code == 200
    assert any(b["title"] == "Sample bug" for b in response.json())