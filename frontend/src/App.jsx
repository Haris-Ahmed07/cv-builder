import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { ResumeProvider } from './contexts/ResumeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import LandingPage from './pages/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';

// Handles the layout and routes of the app
const AppContent = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-200 via-white to-indigo-100 text-gray-900">
      {/* Sticky header at top */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/60 shadow border-b border-white/30">
        <Header />
      </div>

      {/* Main content area that holds all page routes */}
      <main className="flex-1 w-full py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />

            {/* Protected route for authenticated users */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* Fallback for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
};

// Wrap entire app with auth and resume context providers
const App = () => {
  return (
    <AuthProvider>
      <ResumeProvider>
        <ToastContainer position="bottom-center" autoClose={3500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
        <AppContent />
      </ResumeProvider>
    </AuthProvider>
  );
};

export default App;
