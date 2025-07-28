import { signupUser, signinUser } from '../../controllers/authController.js'
import User from '../../models/User.js'

jest.mock('../../models/User.js')

const mockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
})

describe('Auth Controller', () => {
  let req, res, next

  beforeEach(() => {
    jest.clearAllMocks()
    res = mockRes()
    next = jest.fn()
  })

  describe('signupUser', () => {
    it('creates a user and returns token', async () => {
      req = {
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        }
      }

      User.findOne.mockResolvedValue(null)
      const mockUser = {
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
        getSignedJwtToken: jest.fn().mockReturnValue('mockToken123')
      }
      User.create.mockResolvedValue(mockUser)

      await signupUser(req, res, next)

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
          createdAt: undefined
        }
      })
    })
  })

  describe('signinUser', () => {
    it('logs in with valid credentials', async () => {
      req = {
        body: {
          email: 'test@example.com',
          password: 'testpassword'
        }
      }

      const mockUser = {
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
        createdAt: '2025-07-28T10:00:00.000Z',
        matchPassword: jest.fn().mockResolvedValue(true),
        getSignedJwtToken: jest.fn().mockReturnValue('mock.jwt.token')
      }

      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      })

      await signinUser(req, res, next)

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
      req = {
        body: {
          email: 'test@example.com',
          password: 'wrong'
        }
      }

      const mockUser = {
        matchPassword: jest.fn().mockResolvedValue(false)
      }

      User.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      })

      await signinUser(req, res, next)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid credentials'
      })
    })
  })
})
