import request from 'supertest'
import express from 'express'
import authRoutes from '../../routes/authRoutes.js'
import User from '../../models/User.js'

jest.mock('../../models/User.js')
jest.mock('../../middleware/auth.js', () => ({
  protect: (req, res, next) => {
    if (req.headers.authorization) {
      req.user = { id: 'user123' }
      return next()
    }
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }
}))

const app = express()
app.use(express.json())
app.use('/api/auth', authRoutes)

const testUser = {
  name: 'Test',
  email: 'test@email.com',
  password: 'password'
}

describe('Auth Routes', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('POST /signup', () => {
    it('creates user if not exists', async () => {
      User.findOne.mockResolvedValue(null)
      User.create.mockResolvedValue({
        ...testUser,
        _id: 'user123',
        getSignedJwtToken: () => 'token'
      })

      const res = await request(app).post('/api/auth/signup').send(testUser)
      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('token')
    })

    it('fails if user exists', async () => {
      User.findOne.mockResolvedValue(testUser)
      const res = await request(app).post('/api/auth/signup').send(testUser)
      expect(res.status).toBe(400)
    })
  })

  describe('POST /signin', () => {
    it('logs in valid user', async () => {
      const mockUser = {
        ...testUser,
        matchPassword: jest.fn().mockResolvedValue(true),
        getSignedJwtToken: () => 'token'
      }

      User.findOne = jest.fn(() => ({
        select: jest.fn().mockResolvedValue(mockUser)
      }))

      const res = await request(app).post('/api/auth/signin').send(testUser)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('token')
    })

    it('fails for invalid creds', async () => {
      User.findOne = jest.fn(() => ({
        select: jest.fn().mockResolvedValue(null)
      }))
      const res = await request(app).post('/api/auth/signin').send(testUser)
      expect(res.status).toBe(401)
    })
  })

  describe('GET /me', () => {
    it('returns user if authed', async () => {
      User.findById = jest.fn(() => ({
        select: jest.fn().mockResolvedValue({
          _id: 'user123',
          name: testUser.name,
          email: testUser.email
        })
      }))

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer token')

      expect(res.status).toBe(200)
      expect(res.body.data).toHaveProperty('email', testUser.email)
    })

    it('rejects if no token', async () => {
      const res = await request(app).get('/api/auth/me')
      expect(res.status).toBe(401)
    })
  })
})
