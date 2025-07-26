import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null; // or a loading spinner
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 shadow-md bg-white">
        <h1 className="text-2xl font-bold text-gray-800">CV Builder Pro</h1>
        <div className="space-x-4">
          <Link to="/signin" className="text-blue-600 font-medium hover:underline">
            Sign In
          </Link>
          <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Create Professional CVs Effortlessly
        </h2>
        <p className="text-lg text-gray-700 max-w-xl">
          Build modern, clean, and ATS-friendly resumes in minutes. No design skills needed. Live preview. Instant PDF download.
        </p>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} CV Builder Pro. All rights reserved.
      </footer>
    </div>
  )
}

export default Landing
