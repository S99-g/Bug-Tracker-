const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Auth endpoints
  async login(credentials) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(credentials)
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  }

  async register(userData) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    return response.json();
  }

  // Bug endpoints
  async getBugs() {
    const response = await fetch(`${this.baseURL}/bugs/`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch bugs');
    }
    
    return response.json();
  }

  async createBug(bugData) {
    const response = await fetch(`${this.baseURL}/bugs/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(bugData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create bug');
    }
    
    return response.json();
  }

  async updateBug(id, bugData) {
    const response = await fetch(`${this.baseURL}/bugs/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(bugData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update bug');
    }
    
    return response.json();
  }

  async deleteBug(id) {
    const response = await fetch(`${this.baseURL}/bugs/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete bug');
    }
    
    return response.json();
  }

  // Project endpoints
  async getProjects() {
    const response = await fetch(`${this.baseURL}/projects/`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    return response.json();
  }

  async createProject(projectData) {
    const response = await fetch(`${this.baseURL}/projects/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(projectData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    
    return response.json();
  }

  // Assignment endpoints
  async assignBug(assignmentData) {
    const response = await fetch(`${this.baseURL}/assignments/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(assignmentData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to assign bug');
    }
    
    return response.json();
  }

  async getAssignedBugs(developerId) {
    const response = await fetch(`${this.baseURL}/assignments/developer/${developerId}`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch assigned bugs');
    }
    
    return response.json();
  }

  async getAllAssignments() {
    const response = await fetch(`${this.baseURL}/assignments/`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch assignments');
    }
    
    return response.json();
  }

  async getAssignmentsWithDetails() {
    const response = await fetch(`${this.baseURL}/assignments/with-details`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch assignments with details');
    }
    
    return response.json();
  }

  async getUsers() {
    const response = await fetch(`${this.baseURL}/auth/users`, {
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }

  async deleteUser(userId) {
    const response = await fetch(`${this.baseURL}/auth/users/${userId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return response.json();
  }

  async deleteAssignment(assignmentId) {
    const response = await fetch(`${this.baseURL}/assignments/${assignmentId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to delete assignment');
    }
    return response.json();
  }

  async deleteAssignmentByBug(bugId) {
    const response = await fetch(`${this.baseURL}/assignments/bug/${bugId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to delete assignment');
    }
    return response.json();
  }
}

export default new ApiService(); 