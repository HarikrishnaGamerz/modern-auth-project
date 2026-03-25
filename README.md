# modern-auth-project
A sleek, secure, and responsive Login and Signup system built with the modern web stack. This project features a "Glassmorphism" UI design, secure password hashing, and a MySQL backend

1. Features
1. Modern UI: Glassmorphism design using Tailwind CSS.
2. Secure: Passwords are encrypted using bcrypt before being stored.
3.  Single-Page UX: Seamless switching between Login and Signup without page reloads.
4.  MySQL Database: Robust data management using mysql2 with connection pooling.
5. Responsive: Fully optimized for Mobile, Tablet, and Desktop.
 6. Environment Safety: Uses .env to protect sensitive database credentials.
    
2. Tech Stack
Frontend: HTML5, Tailwind CSS (CDN), JavaScript (ES6+)
Backend: Node.js, Express.js
Database: MySQL
Security: Bcrypt (Password Hashing)
Environment Management: Dotenv

3. Prerequisites
Before running this project, ensure you have the following installed:
Node.js (v14 or higher)
MySQL Server
A code editor like VS Code

4. Project Structure
modern-auth-project/
├── public/
│   └── index.html      # Frontend UI (Login/Signup)
├── .env                # Database Credentials (Private)
├── server.js           # Express Backend & API Routes
├── package.json        # Project Dependencies & Scripts
└── README.md           # Documentation

5.Security Features Implemented
Password Hashing: We use bcrypt with a salt round of 10. Even if the database is compromised, user passwords remain unreadable.
SQL Injection Prevention: We use prepared statements (parameterized queries) via mysql2 to prevent attackers from manipulating database queries.
Environment Isolation: Sensitive data like DB passwords are kept out of the source code using .env.

