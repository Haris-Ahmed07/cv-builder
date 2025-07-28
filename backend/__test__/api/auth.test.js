import request from 'supertest'
import express from 'express'
import authRoutes from '../../routes/authRoutes.js'
import User from '../../models/User.js'

// Mock User model to isolate route behavior
jest.mock('../../models/User.js')

// Mock auth middleware to simulate auth behavior
jest.mock('../../middleware/auth.js', () => ({
  protect: (req, res, next) => {
    if (req.headers.authorization) {
      req.user = { id: 'user123' }
      return next()
    }
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }
}))

// Setup test app instance with JSON middleware and auth routes
const app = express()
app.use(express.json())
app.use('/api/auth', authRoutes)

// Sample test user object
const testUser = {
  name: 'Test',
  email: 'test@email.com',
  password: 'password'
}

// Group tests related to Auth Routes
describe('Auth Routes', () => {
  beforeEach(() => jest.clearAllMocks())

  // ==============================
  // SIGNUP ROUTE TESTS
  // ==============================
  describe('POST /signup', () => {
    it('creates user if not exists', async () => {
      // Simulate user not found and successful creation
      User.findOne.mockResolvedValue(null)
      User.create.mockResolvedValue({
        ...testUser,
        _id: 'user123',
        getSignedJwtToken: () => 'token'
      })

      const res = await request(app).post('/api/auth/signup').send(testUser)

      // Should return 201 with token
      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('token')
    })

    it('fails if user exists', async () => {
      // Simulate user already exists
      User.findOne.mockResolvedValue(testUser)

      const res = await request(app).post('/api/auth/signup').send(testUser)

      // Should return 400 error
      expect(res.status).toBe(400)
    })
  })

  // ==============================
  // SIGNIN ROUTE TESTS
  // ==============================
  describe('POST /signin', () => {
    it('logs in valid user', async () => {
      // Mock a user that matches password and returns token
      const mockUser = {
        ...testUser,
        matchPassword: jest.fn().mockResolvedValue(true),
        getSignedJwtToken: () => 'token'
      }

      // Simulate DB lookup and match
      User.findOne = jest.fn(() => ({
        select: jest.fn().mockResolvedValue(mockUser)
      }))

      const res = await request(app).post('/api/auth/signin').send(testUser)

      // Should return 200 with token
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('token')
    })

    it('fails for invalid creds', async () => {
      // Simulate no user found
      User.findOne = jest.fn(() => ({
        select: jest.fn().mockResolvedValue(null)
      }))

      const res = await request(app).post('/api/auth/signin').send(testUser)

      // Should return 401
      expect(res.status).toBe(401)
    })
  })

  // ==============================
  // GET /me ROUTE TESTS
  // ==============================
  describe('GET /me', () => {
    it('returns user if authed', async () => {
      // Simulate user found from DB
      User.findById = jest.fn(() => ({
        select: jest.fn().mockResolvedValue({
          _id: 'user123',
          name: testUser.name,
          email: testUser.email
        })
      }))

      // Call /me with auth header
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer token')

      // Should return user data
      expect(res.status).toBe(200)
      expect(res.body.data).toHaveProperty('email', testUser.email)
    })

    it('rejects if no token', async () => {
      // No Authorization header
      const res = await request(app).get('/api/auth/me')

      // Should return 401
      expect(res.status).toBe(401)
    })
  })
})
