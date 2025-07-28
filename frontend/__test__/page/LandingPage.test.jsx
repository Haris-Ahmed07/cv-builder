import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useAuth } from '../../src/contexts/AuthContext'
import Landing from '../../src/pages/LandingPage'

// Mocking react-router-dom and useNavigate so it doesn't actually redirect in tests
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')
  return {
    ...actual,
    useNavigate: jest.fn(() => jest.fn()),
  }
})

// Mocking the useAuth hook to control login state in tests
jest.mock('../../src/contexts/AuthContext')

describe('LandingPage', () => {
  // Clear mocks before every test to avoid leftover values
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test to check if the right text and buttons show when user is not logged in
  it('shows texts and buttons when user not logged in', () => {
    useAuth.mockReturnValue({ isAuthenticated: false })

    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    )

    // Check for main heading, subtext, and call-to-action buttons
    expect(screen.getByText(/Create Professional CVs/i)).toBeInTheDocument()
    expect(screen.getByText(/Effortlessly/i)).toBeInTheDocument()
    expect(screen.getByText(/Get Started Free/i)).toBeInTheDocument()
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument()
    expect(screen.getByText(/Build modern, clean, and ATS-friendly resumes/i)).toBeInTheDocument()
  })

  // If user is already logged in, they should be redirected to /home
  it('redirects to /home if user is logged in', () => {
    useAuth.mockReturnValue({ isAuthenticated: true })

    const { container } = render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    )

    // Page shouldn't show anything because of redirect
    expect(container.firstChild).toBeNull()
  })

  // Test to make sure all feature cards show up
  it('shows all feature cards', () => {
    useAuth.mockReturnValue({ isAuthenticated: false })

    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    )

    expect(screen.getByText(/ATS Friendly/i)).toBeInTheDocument()
    expect(screen.getByText(/Live Preview/i)).toBeInTheDocument()
    expect(screen.getByText(/Instant PDF Download/i)).toBeInTheDocument()
  })

  // Test if the "Get Started Free" button links to signup page
  it('Get Started Free button goes to signup', () => {
    useAuth.mockReturnValue({ isAuthenticated: false })

    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    )

    const signupLink = screen.getByText(/Get Started Free/i).closest('a')
    expect(signupLink).toHaveAttribute('href', '/signup')
  })

  // Test if the "Sign In" button links to signin page
  it('Sign In button goes to signin', () => {
    useAuth.mockReturnValue({ isAuthenticated: false })

    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    )

    const signinLink = screen.getByText(/Sign In/i).closest('a')
    expect(signinLink).toHaveAttribute('href', '/signin')
  })
})
