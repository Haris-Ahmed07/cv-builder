import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../../src/pages/Home'

// Mocking auth context to simulate login state
import { useAuth } from '../../src/contexts/AuthContext'
jest.mock('../../src/contexts/AuthContext')

// Mocking resume context to avoid import.meta.env errors
const mockFetchResume = jest.fn()
const mockResetResume = jest.fn()

jest.mock('../../src/contexts/ResumeContext', () => ({
  useResume: () => ({
    resume: { id: '123', name: 'Test Resume' },
    loading: false,
    error: null,
    fetchResume: mockFetchResume,
    resetResume: mockResetResume,
  }),
}))

// Mock navigation so we can track redirects
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

// Mock components used inside Home so test focuses only on logic, not layout
jest.mock('../../src/components/Builder/BuilderLayout', () => () => (
  <div data-testid="builder-layout">Builder Layout</div>
))

jest.mock('../../src/components/Builder/BuilderForm', () => () => (
  <div>Builder Form</div>
))

jest.mock('../../src/components/CVPreview', () => () => (
  <div>CV Preview</div>
))

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // By default, assume user is logged in
    useAuth.mockReturnValue({
      user: { id: 'user123', name: 'Haris' },
      isAuthenticated: true,
    })
  })

  it('redirects to SignIn page if user is not logged in', () => {
    // Mock user as not authenticated
    useAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
    })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    // Should navigate to signin route
    expect(mockNavigate).toHaveBeenCalledWith('/signin', { state: { from: '/home' } })
  })

  it('shows loading spinner when resume is loading', () => {
    // Override default resume context for this test
    jest.spyOn(require('../../src/contexts/ResumeContext'), 'useResume').mockReturnValue({
      resume: null,
      loading: true,
      error: null,
      fetchResume: mockFetchResume,
      resetResume: mockResetResume,
    })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    // Look for spinner element by class name
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('fetches resume on mount', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(mockFetchResume).toHaveBeenCalledTimes(1)
  })
})
