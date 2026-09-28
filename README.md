# 📝 Blog Management System

A full-stack **MERN Blog Management System** where users can register, log in, create blogs, view blogs, edit their own blogs, and delete them.

The application includes JWT-based authentication, protected routes, responsive UI, and a RESTful backend API.

## 🚀 Features

* User Registration & Login
* JWT Authentication
* Protected Routes
* Create Blog
* View Blogs
* View Blog Details
* Edit Blog
* Delete Blog
* Author Information
* Category-based Blog Data
* Responsive Design
* Modern React UI
* REST API
* MongoDB Database

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* JavaScript (ES6+)
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* CORS
* dotenv

## 📁 Project Structure

```text
blog-management-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/kuldeepbhaber7-ux/blog-management-system.git
```

```bash
cd blog-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on the Vite development server.

## 🔐 Authentication

The application uses **JWT (JSON Web Token)** for authentication.

* User registers an account.
* User logs in with email and password.
* Backend generates a JWT token.
* Protected routes require a valid token.
* Passwords are securely hashed using bcryptjs.

## 📌 Main API Routes

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Blogs

```text
GET    /api/blogs
GET    /api/blogs/:id
POST   /api/blogs
PUT    /api/blogs/:id
DELETE /api/blogs/:id
```

## 📱 Responsive Design

The frontend is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

## 🔮 Future Improvements

* Search and filter blogs
* Blog image upload
* Pagination
* Comments and likes
* Admin dashboard
* Rich text editor
* User profile management

## 👨‍💻 Author

**Kuldeep Bhabhar**

Frontend Developer | React.js | MERN Stack

GitHub:
https://github.com/kuldeepbhaber7-ux

## 📄 License

This project is created for learning and portfolio purposes.
