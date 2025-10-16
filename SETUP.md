# Bug Tracker Application Setup

This is a full-stack bug tracking application with a React frontend and FastAPI backend.

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend-python
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

The backend will be available at `http://localhost:8000`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Usage

1. Open your browser and go to `http://localhost:5173`
2. Register a new account (you can choose admin or developer role)
3. Login with your credentials
4. Based on your role, you'll be redirected to either:
   - Admin Dashboard: For managing all bugs and projects
   - Developer Dashboard: For viewing assigned bugs

## Features

### Admin Features:
- View all bugs in the system
- Create new bugs
- Delete bugs
- View statistics dashboard
- Manage bug assignments

### Developer Features:
- View assigned bugs
- Update bug status
- Mark bugs as complete
- View personal statistics

## API Endpoints

The backend provides the following endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /bugs/` - Get all bugs
- `POST /bugs/` - Create new bug
- `PUT /bugs/{id}` - Update bug
- `DELETE /bugs/{id}` - Delete bug
- `GET /projects/` - Get all projects
- `POST /projects/` - Create new project
- `POST /assign/` - Assign bug to user

## Database

The application uses SQLite as the database. The database file (`bugtracker.db`) will be created automatically when you first run the backend.

## Troubleshooting

1. **CORS Issues**: Make sure the backend is running on port 8000 and frontend on port 5173
2. **Database Issues**: Delete the `bugtracker.db` file and restart the backend to reset the database
3. **Import Errors**: Make sure all dependencies are installed in both frontend and backend

## Development

- Backend: FastAPI with SQLAlchemy ORM
- Frontend: React with React Router and Tailwind CSS
- Authentication: JWT tokens
- Database: SQLite (can be easily changed to PostgreSQL or MySQL) 