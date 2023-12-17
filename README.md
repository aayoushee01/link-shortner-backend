# Link Shortener Backend

This repository contains the backend for a link shortening application built using Node.js, Express.js, and PostgreSQL. The backend handles user authentication, URL shortening, link analytics, and more.

## Project Structure

- `package-lock.json` and `package.json`: Dependency management and scripts for running the backend.
- `src/`: Directory containing the backend source code.
  - `app.js`: Entry point of the application, initializes the Express server and sets up middleware.
  - `config.js`: Configuration file containing environment variables and database settings.
  - `controllers/`: Directory containing controller files for different functionalities:
    - `authController.js`: Manages user authentication and authorization logic.
    - `shortLinkController.js`: Handles URL shortening, link creation, and retrieval.
    - `userController.js`: Manages user-related operations.
  - `models/`: Directory with model definitions for the database:
    - `Link.js`: Model definition for links, including their schema.
    - `User.js`: Model definition for users, including their schema.
  - `routes/`: Contains route files for different API endpoints:
    - `authRoutes.js`: Handles user authentication, login, and registration.
    - `shortLinkRoutes.js`: Routes for URL shortening and managing links.
    - `userRoutes.js`: Routes for user-related operations like profile management.
    - `authMiddleware.js`: Middlewares for authentication and authorization.

## Installation and Setup

1. Clone this repository:
   `bash
   git clone <repository_url>
   cd link-shortener-backend
   `
2. Install dependencies:
  `npm install
  `
3. Set up environment variables:
Create a .env file based on .env.example.
Set the necessary variables like DB_URL, JWT_SECRET, etc.

4. Start the server:
   `npm start`

## API Endpoints
The backend exposes various API endpoints for user authentication, link shortening, analytics, etc. Some example endpoints include:

POST /auth/register: Register a new user.
POST /auth/login: Login with user credentials.
POST /links/shorten: Shorten a long URL and get a shortened link.
GET /user/urls: Retrieve analytics for a shortened link.
GET /user/userdetail: Retrieve User Details for a authorised user.






