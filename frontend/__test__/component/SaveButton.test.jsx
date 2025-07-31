process.env.VITE_BACKEND_API_BASE_URL = 'http://mock-api.com';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SaveButton from '../../src/components/SaveButton'
import { toast } from 'react-toastify'
import useCVStore from '../../src/store/cvStore'

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

jest.mock('../../src/store/cvStore', () => ({
  __esModule: true,
  default: {
    getState: jest.fn()
  }
}))

jest.mock('../../src/utils/api', () => ({
  authHeader: () => ({ Authorization: 'Bearer mockToken' })
}))

jest.mock('../../src/utils/env', () => ({
  getEnv: () => 'http://mock-api.com'
}))

describe('SaveButton', () => {
  const mockState = {
    personalInfo: { name: 'Test' },
    summary: 'Summary',
    education: [],
    workExperience: [],
    skills: [],
    achievements: [],
    projects: [],
    certifications: [],
    languages: [],
    sectionOrder: []
  }

  beforeEach(() => {
    useCVStore.getState.mockReturnValue(mockState)
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the button with default text', () => {
    render(<SaveButton />)
    expect(screen.getByText('Save CV')).toBeInTheDocument()
  })

  it('calls fetch and shows success toast on successful save', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true })
    })

    render(<SaveButton />)
    fireEvent.click(screen.getByText('Save CV'))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://mock-api.com/resume',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer mockToken'
          }),
          body: JSON.stringify(mockState)
        })
      )
      expect(toast.success).toHaveBeenCalledWith('CV saved successfully!')
    })
  })

  it('shows error toast when save fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      text: jest.fn().mockResolvedValue('Error saving')
    })

    render(<SaveButton />)
    fireEvent.click(screen.getByText('Save CV'))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error saving')
    })
  })
})
