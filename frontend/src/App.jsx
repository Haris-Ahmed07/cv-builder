import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ResumeProvider } from './contexts/ResumeContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import LandingPage from './pages/LandingPage'
import Header from './components/Header'

const AppContent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Always at top with full width */}
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      
      {/* Main content with gap from header */}
      <main className="pt-6 pb-6 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-10xl min-w-7xl mx-auto">
          <Routes>
            <Route 
              path="/" 
              element={<LandingPage />} 
            />
            <Route 
              path="/signup" 
              element={<SignUp />} 
            />
            <Route 
              path="/signin" 
              element={<SignIn />} 
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <ResumeProvider>
        <AppContent />
      </ResumeProvider>
    </AuthProvider>
  )
}

export default App