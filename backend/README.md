# CV Builder Backend – Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [Detailed File & Folder Explanations](#detailed-file--folder-explanations)
4. [Environment Variables (.env)](#environment-variables-env)
5. [Application Lifecycle](#application-lifecycle)
6. [Core Concepts](#core-concepts)
7. [Scripts & Tooling](#scripts--tooling)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Troubleshooting & FAQ](#troubleshooting--faq)
11. [License](#license)

---

## Project Overview
This backend serves as the core API and business logic for the CV Builder application. It is built with **Node.js** and **Express**, uses **MongoDB** (via Mongoose) for data persistence, and implements secure authentication with **JWT**. The codebase is modular, scalable, and thoroughly documented for easy onboarding and maintenance.

---

## Directory Structure

```
backend/
├── .env                # Environment variables (never commit this!)
├── .gitignore          # Git ignore rules
├── README.md           # This documentation
├── app.js              # Express app initialization and middleware
├── babel.config.js     # Babel configuration for ES6+ support
├── config/
│   └── db.js           # MongoDB connection logic
├── controllers/
│   ├── authController.js    # Auth logic (signup, signin, profile)
│   └── resumeController.js  # Resume CRUD logic
├── coverage/           # Jest test coverage reports (auto-generated)
├── jest.config.mjs     # Jest configuration
├── middleware/
│   ├── auth.js         # JWT auth & role-based middleware
│   └── error.js        # Centralized error handler
├── middlewares/
│   └── errorHandler.js # Simple error handler (legacy/compatibility)
├── models/
│   ├── Resume.js       # Resume schema/model
│   └── User.js         # User schema/model
├── node_modules/       # Dependencies (auto-generated)
├── package.json        # Project metadata, dependencies, scripts
├── package-lock.json   # Exact dependency versions
├── routes/
│   ├── authRoutes.js   # Auth endpoints
│   └── resumeRoutes.js # Resume endpoints
├── server.js           # Server entry point (starts app)
├── utils/
│   └── errorResponse.js# Custom error class
└── __test__/
    ├── api/            # API integration tests
    │   ├── auth.test.js
    │   └── resume.test.js
    └── controller/     # Controller unit tests
        ├── authController.test.js
        └── resumeController.test.js
```

---

## Detailed File & Folder Explanations

### Root Files
- **.env**: Stores sensitive config (see below).
- **.gitignore**: Prevents sensitive or unnecessary files from being committed.
- **README.md**: This documentation.
- **app.js**: Sets up the Express app, applies global middleware, and mounts routes. Handles CORS, JSON parsing, cookies, and error handling.
- **server.js**: Entry point. Connects to MongoDB, starts the server, and gracefully handles process errors (uncaught exceptions, rejections, SIGTERM).
- **babel.config.js**: Enables ES6+ syntax in Node.js using Babel.
- **jest.config.mjs**: Configures Jest for modern JS, coverage, and test patterns.

### config/
- **db.js**: Connects to MongoDB using Mongoose, handles connection errors, and exports the connection logic.

### controllers/
- **authController.js**: Handles user registration, login, and profile retrieval. Validates input, hashes passwords, generates JWTs, and structures responses.
- **resumeController.js**: Manages resume CRUD for authenticated users. Handles default structures, updates, deletions, and permission checks.

### middleware/
- **auth.js**: Protects routes by verifying JWTs. Adds user info to requests. Provides role-based access control via `authorize` middleware.
- **error.js**: Centralized error handling for Express and Mongoose errors. Formats error responses based on environment.

### middlewares/
- **errorHandler.js**: Additional error handling middleware (legacy or for compatibility).

### models/
- **User.js**: Mongoose schema for users. Handles password hashing, JWT generation, and password comparison. Fields: name, email, password, createdAt.
- **Resume.js**: Mongoose schema for resumes. Includes personal info, education, work, skills, achievements, and more. Supports timestamps and section ordering.

### routes/
- **authRoutes.js**: Defines `/api/auth` endpoints: `/signup`, `/signin`, `/me`. All routes are documented and use middleware as needed.
- **resumeRoutes.js**: Defines `/api/resume` endpoints: GET, POST, DELETE for resume CRUD. All routes are protected by authentication middleware.

### utils/
- **errorResponse.js**: Custom error class for consistent error responses with HTTP status codes.

### __test__/
- **api/**: Integration tests for API endpoints using supertest and mocked dependencies. Covers signup, signin, resume CRUD, and auth-protected routes.
- **controller/**: Unit tests for controller logic, mocking models and Express request/response objects.

### Other
- **coverage/**: Auto-generated by Jest for code coverage reports.
- **node_modules/**: Installed dependencies (auto-generated).

---

## Environment Variables (.env)

Create a `.env` file in the backend root with the following variables:

```
NODE_ENV=development           # Environment: development, production, or test
PORT=5000                     # Port for backend server
MONGO_URI=mongodb://localhost:27017/cvbuilder # MongoDB connection string
JWT_SECRET=your_jwt_secret    # Secret for signing JWT tokens
JWT_EXPIRE=30d                # JWT token expiration (e.g., 30d, 1h)
FRONTEND_URL=http://localhost:5173 # Frontend URL for CORS
```

- **NODE_ENV**: Controls environment-specific logic (e.g., error messages, logging).
- **PORT**: Backend server port (default 5000).
- **MONGO_URI**: MongoDB connection string (local or Atlas).
- **JWT_SECRET**: Secret for signing JWT tokens. Use a strong, random string.
- **JWT_EXPIRE**: Expiration for JWT tokens (e.g., `30d` for 30 days).
- **FRONTEND_URL**: URL of your frontend for CORS.

**Never commit your .env file!**

---

## Application Lifecycle

1. **Startup**: `server.js` loads environment variables, connects to MongoDB, and starts the Express server.
2. **Request Handling**: `app.js` sets up middleware for CORS, JSON, cookies, and error handling. Routes are mounted for `/api/auth` and `/api/resume`.
3. **Authentication**: JWT-based auth middleware (`auth.js`) protects sensitive routes and attaches user info to requests.
4. **Controllers**: Handle business logic for authentication and resume management.
5. **Error Handling**: Centralized error middleware catches and formats errors for the client.
6. **Shutdown**: Handles uncaught exceptions, unhandled promise rejections, and SIGTERM for graceful shutdown.

---

## Core Concepts

### Authentication
- **JWT-based**: Users receive a token on login/signup, which must be sent in the `Authorization` header for protected routes.
- **Password Security**: Passwords are hashed using bcrypt before storage. Never stored in plaintext.
- **Role-based Access**: Middleware can restrict routes to certain user roles (e.g., admin).

### Resume Management
- **CRUD**: Authenticated users can create, read, update, and delete their resumes.
- **Schema**: Resume supports sections like personal info, education, work, skills, projects, etc.
- **Default Structure**: If a user has no resume, a default structure is returned for easy frontend integration.

### Error Handling
- **Centralized**: All errors are caught and formatted by middleware. Mongoose and custom errors are supported.
- **Custom ErrorResponse**: Used for consistent error responses with status codes.

### Testing
- **Unit Tests**: Controllers are tested in isolation with mocked models and Express objects.
- **Integration Tests**: API endpoints are tested using supertest, with mocked database and auth middleware.
- **Coverage**: Jest generates coverage reports in the `coverage/` directory.

---

## Scripts & Tooling

### Scripts (from `package.json`)
- `npm install` — Install all dependencies.
- `npm run dev` — Start server in development mode (with nodemon for auto-reload).
- `npm start` — Start server in production mode.
- `npm test` — Run all tests with Jest.
- `npm run test:watch` — Run tests in watch mode for TDD.

### Key Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT auth
- **bcryptjs**: Password hashing
- **cors**: CORS support
- **dotenv**: Environment variable management
- **cookie-parser**: Cookie parsing
- **jest**, **supertest**: Testing
- **babel**: Modern JS support

---

## Testing

- All tests are in `__test__/`.
- **api/**: Integration tests for endpoints (mocked DB/auth).
- **controller/**: Unit tests for business logic.
- Run `npm test` to execute all tests.
- Coverage is output to `coverage/`.
- Uses Babel for ES6+ compatibility in tests.
- Jest configures test environment, coverage, and test file patterns.

---

## Deployment

1. **Set up `.env`**: Ensure all environment variables are set for production.
2. **Install dependencies**:
   ```bash
   npm install --production
   ```
3. **Start the server**:
   ```bash
   npm start
   ```
4. **Production Notes**:
   - Static frontend assets (if any) are served from `../frontend/build`.
   - Ensure MongoDB is accessible from your deployment environment.
   - Use a process manager (e.g., PM2) for reliability.
   - Set `NODE_ENV=production` for optimized performance.

---

## Troubleshooting & FAQ

- **MongoDB connection fails?**
  - Check `MONGO_URI` in your `.env` file.
  - Ensure MongoDB is running and accessible.
- **CORS errors?**
  - Confirm `FRONTEND_URL` matches your frontend's deployed URL.
- **JWT errors?**
  - Make sure `JWT_SECRET` is set and not empty.
- **Tests not running?**
  - Ensure dev dependencies are installed. Run `npm install`.
  - Check Jest config in `jest.config.mjs`.
- **App crashes on start?**
  - Check `.env` values and MongoDB connectivity.
  - Review logs for detailed error messages.

---


## Features

- User authentication (signup, login)
- JWT-based authentication
- Protected routes
- CRUD operations for resumes
- Error handling and validation
- Test coverage for API endpoints

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Haris-Ahmed07/cv-builder.git
   cd cv-builder/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the values with your configuration

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000` by default.

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Resume

- `GET /api/resume` - Get user's resume (protected)
- `POST /api/resume` - Create or update resume (protected)
- `DELETE /api/resume` - Delete resume (protected)

## Testing

To run tests:

```bash
npm test
```

For development with watch mode:

```bash
npm run test:watch
```

## Environment Variables

- `NODE_ENV` - Environment (development, production, test)
- `PORT` - Port to run the server on
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT
- `JWT_EXPIRE` - JWT expiration time
- `FRONTEND_URL` - URL of the frontend for CORS

## Deployment

1. Set up your production environment variables in `.env`
2. Install dependencies with `--production` flag:
   ```bash
   npm install --production
   ```
3. Start the server:
   ```bash
   npm start
   ```


## License

MIT


This is the backend for the CV Builder application, built with Node.js, Express, and MongoDB.
