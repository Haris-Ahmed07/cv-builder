# CV Builder

A full-stack web application for creating, editing, and downloading professional CVs. Built with modern technologies and best practices for scalability and user experience.

## 🚀 Overview

CV Builder is a comprehensive resume creation platform that allows users to:
- Create professional CVs with an intuitive interface
- Edit and manage multiple resume sections
- Secure user authentication and data management
- Responsive design for all devices

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Context** - State management
- **Axios** - HTTP client for API requests
- **React Testing Library & Jest** - Testing framework

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Jest & Supertest** - Testing framework

## 📁 Project Structure

```
cv-builder/
├── frontend/                   # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Builder/        # CV builder components
│   │   │   ├── FormSections/   # Form input components
│   │   │   ├── CVPreview.jsx   # CV preview component
│   │   │   ├── Header.jsx      # Navigation component
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── contexts/           # React contexts
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components
│   │   ├── store/              # State management
│   │   ├── utils/              # Utility functions
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── __test__/               # Test files
│   │   ├── component/          # Component tests
│   │   └── page/               # Page tests
│   ├── .env                    # Environment variables
│   ├── package.json
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # Tailwind configuration
│   └── jest.config.js          # Jest configuration
├── backend/                    # Node.js backend API
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   └── resumeController.js # Resume CRUD logic
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication
│   │   └── error.js            # Error handling
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Resume.js           # Resume schema
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   └── resumeRoutes.js     # Resume endpoints
│   ├── utils/
│   │   └── errorResponse.js    # Custom error class
│   ├── __test__/               # Test files
│   │   ├── api/                # API integration tests
│   │   └── controller/         # Controller unit tests
│   ├── .env                    # Environment variables
│   ├── app.js                  # Express app setup
│   ├── server.js               # Server entry point
│   └── package.json
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Haris-Ahmed07/cv-builder.git
   cd cv-builder
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables** (see [Environment Setup](#-environment-setup))

4. **Start the development servers**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:5000`
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```
   Application runs on `http://localhost:5173`

## ⚙️ Environment Setup

### Backend Environment Variables
Create a `.env` file in the `backend/` directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI="mongodb+srv://<username>:<password>@fyp.ipn3b.mongodb.net/" # MongoDB connection string
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment Variables
Create a `.env` file in the `frontend/` directory:

```env
VITE_BACKEND_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=CV Builder
```

### Test Environment Variables
Create `.env.test` files in both directories for testing:

**Backend `.env.test`:**
```env
NODE_ENV=test
MONGO_URI=mongodb://localhost:27017/cv-builder-test
JWT_SECRET=test_jwt_secret
JWT_EXPIRE=1d
FRONTEND_URL=http://localhost:3000
```

**Frontend `.env.test`:**
```env
VITE_BACKEND_API_BASE_URL=http://localhost:5000/api
NODE_ENV=test
```

## 🖥️ Frontend Details

### Key Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Rich Text Editing**: Intuitive CV building interface
- **Real-time Preview**: See changes as you type
- **JWT Authentication**: Secure user sessions
- **Protected Routes**: Route-level access control

### Available Scripts
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Component Architecture
- **Presentational Components**: Focus on UI rendering
- **Container Components**: Manage state and data flow
- **Layout Components**: Define page structure
- **Protected Routes**: Handle authentication

### State Management
- **React Context**: Global state for auth and CV data
- **Custom Hooks**: Reusable stateful logic
- **Local State**: Component-specific state

## 🔧 Backend Details

### API Endpoints

#### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - User login
- `GET /api/auth/me` - Get current user profile (protected)

#### Resume Management
- `GET /api/resume` - Get user's resume (protected)
- `POST /api/resume` - Create or update resume (protected)
- `DELETE /api/resume` - Delete resume (protected)

### Available Scripts
```bash
# Development server with auto-reload
npm run dev

# Production server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Authentication Flow
1. User submits credentials via auth endpoints
2. Server validates and returns JWT token
3. Token stored in localStorage on frontend
4. Token sent in Authorization header for protected routes
5. Middleware verifies token and attaches user to request

### Database Schema
- **User Model**: name, email, hashed password, timestamps
- **Resume Model**: personal info, education, work experience, skills, projects, achievements

## 🧪 Testing

Both frontend and backend have comprehensive test suites.

### Frontend Testing
```bash
cd frontend

# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- CVPreview.test.jsx
```

**Test Structure:**
- **Component Tests**: Individual UI component testing
- **Page Tests**: Full page component integration tests
- **Mock Strategy**: External dependencies and APIs are mocked

### Backend Testing
```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

**Test Structure:**
- **Unit Tests**: Controller logic testing with mocked dependencies
- **Integration Tests**: API endpoint testing with supertest
- **Coverage Reports**: Generated in `coverage/` directory

## 🏗️ Build & Deployment

### Frontend Production Build
```bash
cd frontend
npm run build
```
- Outputs to `dist/` directory
- Deploy to any static hosting service (Vercel, Netlify, etc.)

### Backend Deployment
```bash
cd backend

# Install production dependencies
npm install --production

# Start production server
npm start
```

### Production Considerations
- Set `NODE_ENV=production` for backend
- Use process manager like PM2 for reliability
- Ensure MongoDB is accessible from deployment environment
- Configure CORS for production frontend URL
- Use HTTPS in production
- Set secure JWT secrets

## 🔍 Development Workflow

### Adding New Features
1. **Backend**: Create route → controller → model (if needed) → tests
2. **Frontend**: Create component → integrate with API → add tests
3. **Testing**: Write tests for both unit and integration levels
4. **Documentation**: Update relevant README sections

### Code Quality
- **ESLint**: Configured for both frontend and backend
- **Prettier**: Code formatting (if configured)
- **Jest**: Comprehensive test coverage
- **Git Hooks**: Pre-commit testing (if configured)

## 📚 Key Concepts

### Authentication
- **JWT-based**: Stateless authentication with JSON Web Tokens
- **Password Security**: bcrypt hashing with salt rounds
- **Token Expiration**: Configurable token lifetime
- **Route Protection**: Middleware-based access control

### Resume Management
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Schema Flexibility**: Supports multiple CV sections and formats
- **User Ownership**: Resumes are tied to authenticated users
- **Default Structure**: Provides template structure for new users

### Error Handling
- **Centralized**: Consistent error handling across the application
- **Custom Errors**: Structured error responses with status codes
- **Validation**: Input validation on both client and server
- **User Feedback**: Clear error messages for better UX

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Fails:**
- Verify `MONGO_URI` in backend `.env`
- Ensure MongoDB service is running
- Check network connectivity for Atlas

**CORS Errors:**
- Confirm `FRONTEND_URL` matches your frontend URL
- Check CORS configuration in `app.js`

**JWT Authentication Issues:**
- Verify `JWT_SECRET` is set and consistent
- Check token expiration settings
- Clear localStorage and re-authenticate

**Build Failures:**
- Run `npm install` to ensure all dependencies are installed
- Check for syntax errors in recent changes
- Verify Node.js version compatibility

**API Connection Issues:**
- Ensure backend server is running on correct port
- Verify `VITE_BACKEND_API_BASE_URL` in frontend `.env`
- Check network/firewall settings

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Write tests for new features
- Follow existing code style
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.