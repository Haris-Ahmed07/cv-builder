import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../../src/components/Header'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../src/contexts/AuthContext'

const renderWithAuth = (user = null, logout = jest.fn()) => {
  return render(
    <AuthContext.Provider value={{ user, logout }}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </AuthContext.Provider>
  )
}

describe('Header Component', () => {
  it('shows Sign In and Sign Up when user is not logged in', () => {
    renderWithAuth()

    expect(screen.getByText('CV Builder')).toBeInTheDocument()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })

  it('shows user name and hides Sign In/Up when logged in', () => {
    renderWithAuth({ name: 'Haris' })

    expect(screen.getByText('Haris')).toBeInTheDocument()
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument()
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument()
  })

  it('shows and hides profile dropdown', () => {
    renderWithAuth({ name: 'Haris' })

    const profileBtn = screen.getByText('Haris').closest('button')
    fireEvent.click(profileBtn)
    expect(screen.getByText('Sign out')).toBeInTheDocument()

    // Try to select the backdrop by class name since data-testid is not present
    const backdrop = document.querySelector('.fixed.inset-0.z-40');
    fireEvent.click(backdrop);

    expect(screen.queryByText('Sign out')).not.toBeInTheDocument()
  })

  it('calls logout when Sign out is clicked', () => {
    const mockLogout = jest.fn()
    renderWithAuth({ name: 'Haris' }, mockLogout)

    const profileBtn = screen.getByText('Haris').closest('button')
    fireEvent.click(profileBtn)

    fireEvent.click(screen.getByText('Sign out'))
    expect(mockLogout).toHaveBeenCalled()
  })
})
