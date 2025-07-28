import { signupUser, signinUser } from '../../controllers/authController.js'
import User from '../../models/User.js'

// Mock the User model to isolate controller logic
jest.mock('../../models/User.js')

// Helper to mock Express response object
const mockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
})

// Group all tests for the Auth Controller
describe('Auth Controller', () => {
  let req, res, next

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks()
    res = mockRes()
    next = jest.fn()
  })

  // ==============================
  // SIGNUP USER TESTS
  // ==============================
  describe('signupUser', () => {
    it('creates a user and returns token', async () => {
      // Setup request body
      req = {
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        }
      }

      // Simulate no existing user and mock creation
      User.findOne.mockResolvedValue(null)
      const mockUser = {
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
        getSignedJwtToken: jest.fn().mockReturnValue('mockToken123')
      }
      User.create.mockResolvedValue(mockUser)

      // Call signup controller
      await signupUser(req, res, next)

      // Should create user and return token
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' })
      expect(User.create).toHaveBeenCalledWith(req.body)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: 'mockToken123',
        user: {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
          createdAt: undefined // not included in mock
        }
      })
    })
  })

  // ==============================
  // SIGNIN USER TESTS
  // ==============================
  describe('signinUser', () => {
    it('logs in with valid credentials', async () => {
      // Setup request body
      req = {
        body: {
          email: 'test@example.com',
          password: 'testpassword'
        }
      }

      // Mock user with valid password match
      const mockUser = {
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
        createdAt: '2025-07-28T10:00:00.000Z',
        matchPassword: jest.fn().mockResolvedValue(true),
        getSignedJwtToken: jest.fn().mockReturnValue('mock.jwt.token')
      }

      // Mock DB call with select
      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      })

      // Call signin controller
      await signinUser(req, res, next)

      // Should return token and user data
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: 'mock.jwt.token',
        user: {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
          createdAt: '2025-07-28T10:00:00.000Z'
        }
      })
    })

    it('returns 401 for wrong password', async () => {
      // Setup request body
      req = {
        body: {
          email: 'test@example.com',
          password: 'wrong'
        }
      }

      // Simulate user with invalid password match
      const mockUser = {
        matchPassword: jest.fn().mockResolvedValue(false)
      }

      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      })

      // Call signin controller
      await signinUser(req, res, next)

      // Should return 401 and error message
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid credentials'
      })
    })
  })
})
