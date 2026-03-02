Backend Deployment Link - https://book-club-backend-5.onrender.com

📚 Book Club Platform — Backend
🌟 Overview

The Book Club Platform backend is built using Express.js and PostgreSQL.
It provides a secure REST API that supports book suggestions, voting, discussions, reviews, reading progress tracking, meetings, notifications, and gamification features.

The backend follows a modular architecture with role-based access control and relational data integrity.

🏗️ Tech Stack

Node.js

Express.js

PostgreSQL

pg (raw SQL queries)

JWT Authentication

bcrypt (password hashing)

UUID (uuid-ossp extension)

🗄️ Database Design

The system uses a relational PostgreSQL database with strong constraints and normalization.

Core Tables
👤 Users

Authentication & roles

role → member | admin

📖 Books

Official approved books

Linked to users (created_by)

🗳️ Book Suggestions

User-submitted book proposals

Status → open | approved | rejected

Community voting system

👍 Suggestion Votes

Prevents duplicate voting

UNIQUE(user_id, suggestion_id)

⭐ Reviews

One review per user per book

Rating (1–5)

Review likes supported

💬 Threads & Comments

Book-based discussion system

Nested comments via parent_id

📊 Reading Progress

Tracks user reading percentage per book

🎯 Goals

Reading targets (books/pages)

Progress tracking

📚 Library

Personal book organization

Status → reading | completed | to_read

📅 Meetings

Virtual book club meetings

RSVP support

🔔 Notifications

Real-time event tracking

Read/unread state

🏆 Achievements

Gamification system

🔐 Authentication & Authorization

Authentication is handled using JWT.

Flow:

User logs in

Server generates JWT

Token stored in frontend (localStorage)

Protected routes use verifyToken middleware

req.user contains:

id

role

👥 Role-Based Access
Role	Permissions
Member	Suggest books, vote, review, comment
Admin	Approve suggestions, manage books

Example admin-only check:

if (req.user.role !== "admin") {
  return res.status(403).json({ message: "Admin only" });
}
🚀 API Endpoints
🔐 Auth
POST   /api/auth/register
POST   /api/auth/login
GET    /api/users/me
📖 Books
GET    /api/books
GET    /api/books/:id
POST   /api/books           (admin only)
DELETE /api/books/:id       (admin only)
💡 Book Suggestions
POST   /api/suggestions              (member)
GET    /api/suggestions
POST   /api/suggestions/:id/vote     (member)
PATCH  /api/suggestions/:id/approve  (admin)

Flow:

Member suggests

Members vote

Admin approves

Approved suggestion becomes official book

⭐ Reviews
POST   /api/reviews
GET    /api/reviews/:bookId
POST   /api/reviews/:id/like
💬 Discussions
POST   /api/threads
GET    /api/threads/:bookId
POST   /api/comments
📊 Reading Progress
POST   /api/progress
GET    /api/progress/:bookId
🎯 Goals
POST   /api/goals
GET    /api/goals
📚 Library
POST   /api/library
GET    /api/library
📅 Meetings
POST   /api/meetings
GET    /api/meetings
POST   /api/meetings/:id/rsvp
🧠 Key Architectural Decisions
1️⃣ Suggestion System Separation

Suggestions are NOT directly added as books.

Instead:

Stored in book_suggestions

Voted via suggestion_votes

Approved by admin

Then inserted into books

This matches the project requirement of a community-driven voting system.

2️⃣ Data Integrity

Foreign keys with ON DELETE CASCADE

UNIQUE constraints for:

Votes

Reviews

Library entries

Goal periods

CHECK constraints for roles and ratings

3️⃣ Transaction Usage

Voting and approval use:

BEGIN
COMMIT
ROLLBACK

To ensure atomic operations.

🖥️ Setup Instructions
1️⃣ Clone repository
git clone <your-backend-repo-url>
cd backend
2️⃣ Install dependencies
npm install
3️⃣ Create .env
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/bookclub
JWT_SECRET=your_secret_key
4️⃣ Enable PostgreSQL Extension

Inside psql:

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
5️⃣ Run database schema

Execute your SQL schema file.

6️⃣ Start server
npm run dev

Server runs on:

http://localhost:5000
🛡️ Security Features

Password hashing with bcrypt

JWT authentication

Role-based route protection

SQL parameterized queries (prevents SQL injection)

Token blacklist for logout security

📈 Scalability Considerations

Indexed email lookup

Indexed voting constraints

Normalized relational structure

Modular controller-based architecture

🎓 Academic Strength

This backend demonstrates:

REST API design

Relational database modeling

Transaction management

Role-based access control

Complex multi-table relationships

Community voting logic

Gamification integration

👩‍💻 Author

Poojitha Thadiboyina
