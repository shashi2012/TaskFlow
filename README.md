# 🚀 TaskFlow - Smart Task Management App

TaskFlow is a full-stack task management web application designed to help users organize, track, and complete their daily tasks efficiently. It provides a clean, modern UI with powerful features like authentication, filtering, search, and pagination.

Built using the MERN stack, TaskFlow demonstrates real-world full-stack development concepts including authentication, REST APIs, database design, and responsive UI development.

---

## ✨ Features

### 🔐 Authentication System
- User Registration (Name, Email, Password)
- Secure Login using JWT (JSON Web Token)
- Protected routes (only logged-in users can access tasks)
- Persistent login using localStorage token

---

### 📝 Task Management
- Create new tasks with title and description
- Mark tasks as **Completed / Pending**
- Delete tasks permanently
- Real-time UI updates after actions

---

### 🔍 Smart Features
- Search tasks by title
- Filter tasks by status:
  - All
  - Pending
  - Completed
- Pagination support for better performance

---

### 🎨 Modern UI/UX
- Beautiful gradient backgrounds
- Glassmorphism design (blur effects)
- Fully responsive (mobile + desktop)
- Clean task cards with modern layout
- Smooth hover and transition effects

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- CORS Middleware

---
### .env
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/shashi2012/TaskFlow.git
cd Task_manager

Backend Setup

cd server
npm install
npm run dev

Frontend Setup
cd client
npm install
npm run dev


