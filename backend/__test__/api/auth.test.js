import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from '../../routes/authRoutes.js';
import User from '../../models/User.js';
import { connectDB } from '../../config/db.js';

// Mock the User model and database connection
jest.mock('../../models/User.js');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

// Mock the database connection
jest.mock('../../config/db.js', () => ({
  connectDB: jest.fn().mockResolvedValue(true)
}));

// Mock the JWT verification
jest.mock('../../middleware/auth.js', () => ({
  protect: (req, res, next) => {
    // For testing the /me endpoint with token
    if (req.headers.authorization) {
      req.user = { id: '507f1f77bcf86cd799439011' };
      return next();
    }
    // For testing unauthorized access - send response directly
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
}));

describe('Auth Routes', () => {
  // Test data
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpassword123'
  };

  const loginCredentials = {
    email: 'test@example.com',
    password: 'testpassword123'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // Close any open connections
    await mongoose.connection.close();
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user and return 201 status', async () => {
      // Mock User.findOne to return null (user doesn't exist)
      User.findOne.mockResolvedValue(null);
      
      // Mock User.create to return the created user
      const createdUser = {
        _id: '507f1f77bcf86cd799439011',
        ...testUser,
        getSignedJwtToken: jest.fn().mockReturnValue('mock-jwt-token')
      };
      User.create.mockResolvedValue(createdUser);

      const res = await request(app)
        .post('/api/auth/signup')
        .send(testUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user).toHaveProperty('name', testUser.name);
      expect(res.body.user).toHaveProperty('email', testUser.email);
    });

    it('should return 400 if user already exists', async () => {
      // Mock User.findOne to return a user (user already exists)
      User.findOne.mockResolvedValue(testUser);

      const res = await request(app)
        .post('/api/auth/signup')
        .send(testUser);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'User already exists with this email');
    });
  });

  describe('POST /api/auth/signin', () => {
    it('should authenticate user and return token', async () => {
      // Mock User.findOne with select to return a user
      const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        ...testUser,
        matchPassword: jest.fn().mockResolvedValue(true),
        getSignedJwtToken: jest.fn().mockReturnValue('mock-jwt-token')
      };
      
      // Mock the query chain
      User.findOne = jest.fn().mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockUser)
      }));

      const res = await request(app)
        .post('/api/auth/signin')
        .send(loginCredentials);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
    });

    it('should return 401 for invalid credentials', async () => {
      // Mock User.findOne with select to return null (user not found)
      User.findOne = jest.fn().mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(null)
      }));

      const res = await request(app)
        .post('/api/auth/signin')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword'
        });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });
  });

  describe('GET /api/auth/me', () => {
    it('should return user data for authenticated user', async () => {
      // Mock User.findById with select chain
      const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        name: 'Test User',
        email: 'test@example.com',
        createdAt: '2023-01-01T00:00:00.000Z'
      };
      
      // Mock the query chain: User.findById().select('-password')
      const mockUserData = {
        _id: '507f1f77bcf86cd799439011',
        name: 'Test User',
        email: 'test@example.com',
        createdAt: '2023-01-01T00:00:00.000Z'
      };

      User.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUserData)
      });

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer mock-jwt-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
      // The API returns _id but the test was checking for id
      expect(res.body.data).toHaveProperty('_id', mockUserData._id);
      expect(res.body.data).toHaveProperty('name', mockUserData.name);
      expect(res.body.data).toHaveProperty('email', mockUserData.email);
    });

    it('should return 401 if no token provided', async () => {
      const res = await request(app)
        .get('/api/auth/me');

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });
});
