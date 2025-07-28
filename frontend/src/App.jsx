import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ResumeProvider } from './contexts/ResumeContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import LandingPage from './pages/LandingPage'
import Header from './components/Header'
import Footer from './components/Footer'

const AppContent = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-200 via-white to-indigo-100 text-gray-900">
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/60 shadow border-b border-white/30">
        <Header />
      </div>

      {/* Main content area */}
      <main className="flex-1 w-full py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto ">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
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
      <Footer />
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