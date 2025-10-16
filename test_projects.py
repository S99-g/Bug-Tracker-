def test_create_project(client):
    # Login and get token
    login = client.post("/auth/login", data={"username": "testuser", "password": "testpass"})
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
 
    # Create project
    response = client.post("/projects/", json={"name": "Bug Tracker"}, headers=headers)
    assert response.status_code == 200
    assert response.json()["name"] == "Bug Tracker"
 
    # List projects
    response = client.get("/projects/", headers=headers)
    assert response.status_code == 200
    assert any(p["name"] == "Bug Tracker" for p in response.json())