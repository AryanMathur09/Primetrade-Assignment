# TaskSphere: Full-Stack Task Management System

A robust, secure Task Management application built for the Primetrade internship assignment. Features a Spring Boot backend with JWT security and a modern React frontend.

##  Live Demo & Testing
- **Backend API:** `http://localhost:8080`
- **Frontend UI:** `http://localhost:3000`
- **Swagger UI:** `http://localhost:8080/swagger-ui/index.html`

## Features
- **JWT Authentication:** Secure login and registration.
- **Role-Based Access Control (RBAC):** - **USER:** Create, view, and edit their own tasks.
    - **ADMIN:** Full access, including task deletion.
- **Stateful Management:** React-based dashboard with instant UI updates.
- **RESTful API:** Clean API design with proper HTTP status codes.

## Tech Stack
- **Backend:** Java 17, Spring Boot 3.x, Spring Security, JWT (io.jsonwebtoken), Hibernate/JPA.
- **Frontend:** React.js, Axios, React Router.
- **Database:** H2 In-Memory Database (for easy evaluation).

## How to Run Locally

### 1. Prerequisites
- Java 17 or higher
- Node.js (v16+)
- Maven

### 2. Backend Setup
```bash
cd assignment
mvn spring-boot:run

3. Frontend Setup 
cd assignment-frontend
npm install
npm start

🧪 Testing with Swagger
Navigate to the Swagger URL.

Use /api/v1/auth/register to create a user.

Use /api/v1/auth/login to get a JWT token.

Click "Authorize" at the top right and enter: Bearer <YOUR_TOKEN>.

You can now test the Task endpoints.

 Scalability & Architecture
Detailed analysis on system scaling, Redis caching, and database optimization is available in SCALABILITY.md.

##  API Documentation & Testing (Swagger)

The backend is fully documented with Swagger UI. Below are the testing results:

### 1. API Endpoints Overview

### 2. Successful JWT Authentication

### 3. Authorized Task Retrieval

---
## 👤 Contact & Resume
- **Name:** Aryan Mathur
- **Resume:** [Click here to view my Resume](https://drive.google.com/file/d/1dqZEc3a8JL0iRkjRi0hQpme1N77kZZSZ/view?usp=drive_link)
- **LinkedIn:** [https://www.linkedin.com/in/mathuraryan/]
- **Email:** [aryanmathur0987@gmail.com]
