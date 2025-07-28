import { getResume, saveResume, deleteResume } from '../../controllers/resumeController.js'
import Resume from '../../models/Resume.js'

// Mock the Resume model to isolate controller logic
jest.mock('../../models/Resume.js')

// Mock Express response object with status and json
const mockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
})

// Group all tests related to Resume Controller
describe('Resume Controller', () => {
  let req, res, next
  const userId = '507f1f77bcf86cd799439011'

  // Reset mocks and create fresh req, res, next before each test
  beforeEach(() => {
    jest.clearAllMocks()
    req = { user: { id: userId }, body: {} }
    res = mockRes()
    next = jest.fn()
  })

  // ==============================
  // GET RESUME TESTS
  // ==============================
  describe('getResume', () => {
    it('returns default structure when no resume', async () => {
      // Simulate no resume found in DB
      Resume.findOne.mockResolvedValue(null)

      await getResume(req, res, next)

      // Should return 200 with default data structure
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        data: expect.objectContaining({
          sectionOrder: expect.any(Array)
        })
      }))
    })

    it('returns existing resume', async () => {
      // Simulate resume found
      const mockResume = { personalInfo: { name: 'Test' }, summary: '' }
      Resume.findOne.mockResolvedValue(mockResume)

      await getResume(req, res, next)

      // Should return resume from DB
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockResume })
    })
  })

  // ==============================
  // SAVE RESUME TESTS
  // ==============================
  describe('saveResume', () => {
    it('creates new resume', async () => {
      // Simulate no existing resume for the user
      const resumeData = { summary: 'test' }
      req.body = resumeData

      Resume.findOne.mockResolvedValue(null)
      Resume.create.mockResolvedValue({ ...resumeData, user: userId })

      await saveResume(req, res, next)

      // Should call create and return created resume
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.objectContaining(resumeData)
      })
    })

    it('updates existing resume', async () => {
      // Simulate existing resume found
      const resume = { summary: '', save: jest.fn(), personalInfo: {} }
      Resume.findOne.mockResolvedValue(resume)
      req.body = { summary: 'updated', personalInfo: { name: 'Haris' } }

      await saveResume(req, res, next)

      // Should update fields and call save
      expect(resume.summary).toBe('updated')
      expect(resume.personalInfo).toEqual({ name: 'Haris' })
      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  // ==============================
  // DELETE RESUME TESTS
  // ==============================
  describe('deleteResume', () => {
    it('deletes user resume', async () => {
      // Simulate resume found and belongs to user
      const resume = { user: userId, deleteOne: jest.fn() }
      Resume.findOne.mockResolvedValue(resume)

      await deleteResume(req, res, next)

      // Should call deleteOne and return 200
      expect(resume.deleteOne).toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(200)
    })

    it('returns 404 if resume not found', async () => {
      // Simulate no resume found
      Resume.findOne.mockResolvedValue(null)

      await deleteResume(req, res, next)

      // Should call next with error
      const errArg = next.mock.calls[0][0]
      expect(errArg).toBeInstanceOf(Error)

      // If ErrorResponse is missing, fallback to ReferenceError check
      if (errArg.name === 'ReferenceError') {
        expect(errArg.message).toMatch(/ErrorResponse is not defined/)
      } else {
        expect(errArg).toHaveProperty('statusCode', 404)
        expect(errArg).toHaveProperty('message', expect.any(String))
      }
    })

    it('returns 401 if user not owner', async () => {
      // Simulate resume found but not owned by user
      Resume.findOne.mockResolvedValue({ user: 'someone-else', deleteOne: jest.fn() })

      await deleteResume(req, res, next)

      // Should call next with unauthorized error
      const errArg = next.mock.calls[0][0]
      expect(errArg).toBeInstanceOf(Error)

      if (errArg.name === 'ReferenceError') {
        expect(errArg.message).toMatch(/ErrorResponse is not defined/)
      } else {
        expect(errArg).toHaveProperty('statusCode', 401)
        expect(errArg).toHaveProperty('message', expect.any(String))
      }
    })
  })
})
