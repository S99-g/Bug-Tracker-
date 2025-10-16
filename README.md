# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🐞 BugTrackerApp

A modern **Full-Stack Bug Tracking System** built using **FastAPI (Python)** and **React.js**.  
It enables teams to **report, assign, and manage software bugs** efficiently, featuring authentication, project tracking, and a beautiful responsive UI.

---

## 🌟 Key Features

- 🔐 **JWT Authentication** — secure user login and registration.
- 🧩 **Role-Based Access** — Admin, Developer, and Tester roles.
- ⚙️ **Full CRUD Functionality** — for bugs, projects, and users.
- 📦 **PostgreSQL Database** with SQLAlchemy ORM.
- ⚡ **FastAPI Backend** — high-performance REST API with Pydantic models.
- 🪶 **React Frontend (Vite + Tailwind)** — fast, minimal, and responsive.
- 🧱 **Modular Architecture** — clean folder structure for scalability.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React.js • Vite • Tailwind CSS • Axios • React Router DOM |
| **Backend** | FastAPI • SQLAlchemy • PostgreSQL • JWT Auth • Pydantic • Uvicorn |
| **Dev Tools** | Docker • Postman • Git • VS Code |

---

## 🧩 Folder Structure

BugTrackerApp/
│
├── backend-python/
│ ├── main.py
│ ├── models/
│ ├── routes/
│ ├── schemas/
│ ├── database.py
│ ├── utils/
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── App.jsx
│ ├── public/
│ └── package.json
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/S99-g/BugTrackerApp.git
cd BugTrackerApp

**Backend Setup**
cd backend-python
python -m venv venv
source venv/bin/activate     # (Windows: venv\Scripts\activate)
pip install -r requirements.txt

reate a .env file inside backend-python:

DATABASE_URL=postgresql://username:password@localhost:5432/bugtracker
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173

Run the FastAPI server:

uvicorn main:app --reload

Frontend Setup
cd ../frontend
npm install
npm run dev

API Endpoints Overview
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login existing user
GET	/api/bugs	Retrieve all bugs
POST	/api/bugs	Create a new bug
PUT	/api/bugs/{id}	Update an existing bug
DELETE	/api/bugs/{id}	Delete a bug
GET	/api/projects	Retrieve all projects
POST	/api/projects	Create a new project

🧠 Database Models
🧍 User
Field	Type	Description
id	Integer	Unique user ID
username	String	User’s name
email	String	Unique email address
password	String	Hashed password
role	Enum	Admin / Developer / Tester
🧱 Project
Field	Type	Description
id	Integer	Project ID
name	String	Project title
description	Text	Project summary
created_at	DateTime	Timestamp
🐛 Bug
Field	Type	Description
id	Integer	Bug ID
title	String	Bug title
description	Text	Detailed bug description
status	Enum	Open / In Progress / Resolved / Closed
priority	Enum	Low / Medium / High / Critical
project_id	FK	Linked project
assigned_to	FK	Assigned developer
created_by	FK	Creator (tester/admin)
🧰 Future Enhancements

📬 Email notifications for new bug assignments

📊 Analytics dashboard (open vs resolved bugs)

🧾 File upload support for screenshots and logs

🔍 Advanced filtering and search functionality

🌙 Dark mode UI

👩‍💻 Author

Sarvani Guttikonda
📧 sarvaniguttikonda@gmail.com

🔗 LinkedIn

💻 GitHub


