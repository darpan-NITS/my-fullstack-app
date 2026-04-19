# Verdant — Full-Stack Authentication Web App

> Built as part of an internship selection process (Round 2)

![Tech Stack](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🔗 Live Demo

- **Frontend:** [your-frontend.vercel.app]([https://your-frontend.vercel.app](https://my-fullstack-app-g5av.vercel.app/login))
- **Backend API:** [your-backend.vercel.app]([https://your-backend.vercel.app](https://my-fullstack-app-kappa.vercel.app/))
- **GitHub Repo:** [github.com/darpan-NITS/my-fullstack-app](https://github.com/darpan-NITS/my-fullstack-app)

---

## 📌 Project Overview

**Verdant** is a production-ready full-stack web application featuring real user authentication, a RESTful backend API, and cloud database integration. The project demonstrates end-to-end software development — from backend API design to frontend UI, database management, and live deployment.

---

## ✨ Features

- **User Signup & Login** — Real authentication with form validation and error handling
- **JWT Authentication** — Stateless, token-based session management (industry standard)
- **Password Security** — Passwords hashed with bcrypt before storing (never stored in plain text)
- **Protected Routes** — Dashboard accessible only to authenticated users
- **PostgreSQL Database** — User data persisted in Supabase (cloud-hosted PostgreSQL)
- **Responsive UI** — Works across desktop and mobile screens
- **Modern Design** — Glassmorphism, split-panel layout, animated micro-interactions

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React.js | UI and client-side routing |
| Backend | Node.js + Express | REST API server |
| Database | Supabase (PostgreSQL) | Cloud database for user storage |
| Authentication | JWT + bcrypt | Secure token auth + password hashing |
| Deployment | Vercel | Frontend + Backend hosting |
| Version Control | Git + GitHub | Source code management |

---

## 🏗️ Project Structure

```
my-fullstack-app/
├── backend/
│   ├── api/
│   │   └── index.js          # Express app entry point (Vercel serverless)
│   ├── routes/
│   │   └── auth.js           # Signup & Login route handlers
│   ├── .env                  # Environment variables (not committed)
│   ├── vercel.json           # Vercel deployment config
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js      # Login page component
│   │   │   ├── Signup.js     # Signup page component
│   │   │   └── Dashboard.js  # Protected dashboard component
│   │   ├── App.js            # Route definitions
│   │   └── index.js
│   ├── .env                  # Frontend env variables (not committed)
│   └── package.json
│
└── .gitignore
```

---

## 🔐 Authentication Flow

```
User fills Signup form
        ↓
Frontend sends POST /api/auth/signup
        ↓
Backend checks if email already exists in Supabase
        ↓
Password is hashed using bcrypt (salt rounds: 10)
        ↓
User record saved to Supabase PostgreSQL
        ↓
JWT token generated and returned to frontend
        ↓
Token stored in localStorage → user redirected to Dashboard
```

For Login, the flow verifies the email exists and uses `bcrypt.compare()` to validate the password against the stored hash — the actual password is never stored or compared in plain text.

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- A Supabase account (free tier)

### 1. Clone the repository
```bash
git clone https://github.com/darpan-NITS/my-fullstack-app.git
cd my-fullstack-app
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
JWT_SECRET=your_secret_key
```

```bash
npm run dev   # Runs on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

Create a `.env` file in `/frontend`:
```
REACT_APP_API_URL=http://localhost:5000
```

```bash
npm start     # Runs on http://localhost:3000
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE users (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,        -- bcrypt hashed, never plain text
  created_at  TIMESTAMP DEFAULT NOW()
);
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/` | Health check | No |
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login existing user | No |

### Request Body — Signup
```json
{
  "name": "Darpan Goswami",
  "email": "darpan@example.com",
  "password": "securepassword"
}
```

### Response — Success
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "8ac4f22f-ec9d-4193-86a0-4f58bca6f683",
    "name": "Darpan Goswami",
    "email": "darpan@example.com"
  }
}
```

---

## 🔒 Security Practices

- Passwords are **never stored in plain text** — bcrypt hashing with 10 salt rounds
- JWT tokens expire after **24 hours**
- `.env` files are **gitignored** — secrets never committed to version control
- CORS configured to allow only the frontend origin

---

## 👨‍💻 Author

**Darpan Jyoti Goswami**
B.Tech — Electronics & Instrumentation Engineering (EIE), 2nd Year
National Institute of Technology Silchar (NIT Silchar)

---

*Submitted for Internship Selection — Round 2*
