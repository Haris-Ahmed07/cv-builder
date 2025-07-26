# CV Builder - Backend

This is the backend for the CV Builder application, built with Node.js, Express, and MongoDB.

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
   git clone https://github.com/yourusername/cv-builder.git
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
