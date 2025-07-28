import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '../../src/components/ProtectedRoute'
import { AuthContext } from '../../src/contexts/AuthContext'

const TestComponent = () => <div>Protected Content</div>

describe('ProtectedRoute', () => {
  const renderWithAuth = (isAuthenticated) => {
    return render(
      <AuthContext.Provider value={{ isAuthenticated }}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <TestComponent />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<div>Sign In Page</div>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )
  }

  it('renders children when authenticated', () => {
    renderWithAuth(true)
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('redirects to /signin when not authenticated', () => {
    renderWithAuth(false)
    expect(screen.getByText('Sign In Page')).toBeInTheDocument()
  })
})
