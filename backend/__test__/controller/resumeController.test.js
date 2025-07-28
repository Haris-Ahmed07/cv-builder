import { getResume, saveResume, deleteResume } from '../../controllers/resumeController.js'
import Resume from '../../models/Resume.js'
import ErrorResponse from '../../utils/errorResponse.js'

jest.mock('../../models/Resume.js')

const mockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
})

describe('Resume Controller', () => {
  let req, res, next
  const userId = '507f1f77bcf86cd799439011'

  beforeEach(() => {
    jest.clearAllMocks()
    req = { user: { id: userId }, body: {} }
    res = mockRes()
    next = jest.fn()
  })

  describe('getResume', () => {
    it('returns default structure when no resume', async () => {
      Resume.findOne.mockResolvedValue(null)

      await getResume(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        data: expect.objectContaining({
          sectionOrder: expect.any(Array)
        })
      }))
    })

    it('returns existing resume', async () => {
      const mockResume = { personalInfo: { name: 'Test' }, summary: '' }
      Resume.findOne.mockResolvedValue(mockResume)

      await getResume(req, res, next)

      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockResume })
    })
  })

  describe('saveResume', () => {
    it('creates new resume', async () => {
      const resumeData = { summary: 'test' }
      req.body = resumeData

      Resume.findOne.mockResolvedValue(null)
      Resume.create.mockResolvedValue({ ...resumeData, user: userId })

      await saveResume(req, res, next)

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.objectContaining(resumeData)
      })
    })

    it('updates existing resume', async () => {
      const resume = { summary: '', save: jest.fn(), personalInfo: {} }
      Resume.findOne.mockResolvedValue(resume)
      req.body = { summary: 'updated', personalInfo: { name: 'Haris' } }

      await saveResume(req, res, next)

      expect(resume.summary).toBe('updated')
      expect(resume.personalInfo).toEqual({ name: 'Haris' })
      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('deleteResume', () => {
    it('deletes user resume', async () => {
      const resume = { user: userId, deleteOne: jest.fn() }
      Resume.findOne.mockResolvedValue(resume)

      await deleteResume(req, res, next)

      expect(resume.deleteOne).toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(200)
    })

    it('returns 404 if resume not found', async () => {
      Resume.findOne.mockResolvedValue(null)

      await deleteResume(req, res, next)

      expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse))
    })

    it('returns 401 if user not owner', async () => {
      Resume.findOne.mockResolvedValue({ user: 'someone-else', deleteOne: jest.fn() })

      await deleteResume(req, res, next)

      expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse))
    })
  })
})
