# 📚 Book Club Management Platform – Backend

## Project Overview

The **Book Club Management Platform Backend** provides the core server-side functionality for the Book Club web application. It handles user authentication, book libraries, discussions, achievements, and dashboard statistics through RESTful APIs.

The backend is built using **Node.js and Express.js** with **PostgreSQL** as the database. It follows a modular architecture separating routes, controllers, middleware, and database queries to maintain clean code structure and scalability.

This backend enables secure communication between the frontend application and the database while ensuring authentication, authorization, and efficient data management.

---

# 🚀 Tech Stack

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Authentication
- JSON Web Tokens (JWT)

### API Communication
- RESTful APIs

### Middleware
- CORS
- Authentication Middleware
- Error Handling Middleware

### Database Client
- pg (PostgreSQL client for Node.js)
- Raw SQL queries

---

# 📡 API Documentation

## Authentication APIs

### Register User
POST /api/auth/signup

Creates a new user account.

Request Body:
{
"name": "User Name",
"email": "user@email.com",
"password": "password"
}


---

### Login User
POST /api/auth/login

Authenticates a user and returns a JWT token.

---

## Library APIs

### Add Book to Library
POST /api/library

Authorization: Required

Adds a book to the user's personal library.

---

### Remove Book from Library
DELETE /api/library

Authorization: Required

Removes a book from the user's library.

---

### Get User Library
GET /api/library

Authorization: Required

Returns all books in the user's personal library.

---

## Discussions APIs

### Get Discussions
GET /api/discussions

Returns all discussion threads.

---

### Create Discussion
POST /api/discussions

Creates a new discussion thread.

---

## Achievements APIs

### Get User Achievements
GET /api/achievements

Returns the achievements unlocked by the user.

---

## Dashboard APIs

### Get Dashboard Statistics
GET /api/dashboard

Returns aggregated user statistics used in the dashboard.

---

# 🗄 Database Schema Explanation

The application uses **PostgreSQL** to manage relational data.

---

## Users Table

Stores user account information.

| Column | Type | Description |
|------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | User name |
| email | VARCHAR | Unique email |
| password | TEXT | Hashed password |
| avatar_url | TEXT | Profile image |
| role | VARCHAR | User role |

---

## Books Table

Stores available books on the platform.

| Column | Type |
|------|------|
| id | UUID |
| title | VARCHAR |
| author | VARCHAR |
| genre | VARCHAR |
| description | TEXT |

---

## Library Table

Stores books added to a user's personal library.

| Column | Type |
|------|------|
| id | UUID |
| user_id | UUID |
| book_id | UUID |
| status | VARCHAR |
| progress | INTEGER |

---

## Discussions Table

Stores discussion threads created by users.

| Column | Type |
|------|------|
| id | UUID |
| user_id | UUID |
| title | VARCHAR |
| content | TEXT |
| created_at | TIMESTAMP |

---

## Achievements Table

Stores achievement definitions.

| Column | Type |
|------|------|
| id | UUID |
| name | VARCHAR |
| description | TEXT |
| criteria | TEXT |

---

## User Achievements Table

Tracks achievements unlocked by users.

| Column | Type |
|------|------|
| id | UUID |
| user_id | UUID |
| achievement_id | UUID |
| unlocked_at | TIMESTAMP |

---

# ⚙ Installation Steps

### 1. Clone the Repository

---

### 2. Navigate to Project Folder

---

### 3. Install Dependencies

---

### 4. Setup Environment Variables

Create a `.env` file in the root directory.

---

### 5. Run the Server

Server will run on:

---

# 🌐 Deployment Link

Backend API Base URL:
https://book-club-backend-5.onrender.com

---

# 📂 Project Structure
src
│
├── routes
├── controllers
├── middleware
├── config
├── database
└── server.js


---

# 🔐 Security Features

- JWT-based authentication
- Protected API routes
- Password hashing
- Middleware-based authorization

---

# 📊 Future Improvements

- Real-time notifications
- Advanced search functionality
- Book recommendation system
- Pagination and filtering improvements
- Performance optimizations

---

# 👩‍💻 Author

Developed as part of a full-stack project to build an interactive online book community platform.
