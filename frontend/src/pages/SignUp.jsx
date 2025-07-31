import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getEnv } from '../utils/env'
import { toast } from 'react-toastify'

const SignUp = () => {
  // Form state for all input fields
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // UI state
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Auth context and router
  const { login } = useAuth()
  const navigate = useNavigate()

  // Basic email format check
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Allow only letters and spaces for full name
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/
    return nameRegex.test(name)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Client-side validations
    if (!validateName(name.trim())) {
      setError('Name can only contain letters and spaces')
      return
    }
    if (!validateEmail(email.trim().toLowerCase())) {
      setError('Please enter a valid email address')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // All good, proceed to send request
    setLoading(true)
    try {
      const res = await fetch(`${getEnv('VITE_BACKEND_API_BASE_URL')}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password
        }),
      })

      const data = await res.json()

      // If signup success, log in user and redirect
      if (res.status === 201) {
        login({
          token: data.token,
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email
          }
        })
        toast.success(`Account created! Welcome, ${data.user?.name || 'User'}!`, {
          position: 'bottom-center',
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
        navigate('/')
      }
      // Handle known error cases
      else if (res.status === 400) {
        setError('A user with this email already exists')
      } else if (res.status === 500) {
        setError('Server error. Please try again later.')
      } else {
        setError(data.message || 'Sign up failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
      console.error('Sign up error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] sm:h-[calc(100vh-9rem)] justify-center px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="backdrop-blur-lg rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.18)] w-full max-w-xs sm:max-w-sm md:max-w-[280px] lg:max-w-[300px] mx-auto p-3 sm:p-4 md:p-3 lg:p-3 bg-white/20 border border-white/30">
        
        {/* Go back to landing */}
        <button
          onClick={() => navigate('/')}
          className="absolute left-2 top-2 sm:left-3 sm:top-3 flex items-center justify-center px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/30 border border-white/50 rounded-full text-blue-700 hover:bg-white/50 hover:border-white/70 hover:text-blue-900 font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 text-[10px] sm:text-xs z-10"
          aria-label="Back"
          disabled={loading}
        >
          {/* Left arrow icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-lg lg:text-lg font-extrabold text-center mb-2 sm:mb-3 md:mb-1 lg:mb-1 mt-6 sm:mt-7 md:mt-3 lg:mt-3 text-indigo-600">
          Create Account
        </h2>

        {/* Show error if there's any */}
        {error && (
          <div className="mb-2 sm:mb-3 p-2 sm:p-3 bg-red-50 text-red-700 rounded-lg text-xs sm:text-sm">
            {error}
          </div>
        )}

        {/* Signup form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Full name field */}
          <div>
            <label htmlFor="name" className="block text-sm sm:text-base md:text-[0.85rem] lg:text-[0.92rem] font-medium text-gray-800 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="Enter your full name"
              className="w-full px-4 sm:px-5 md:px-3 lg:px-3 py-2.5 sm:py-3 md:py-2 lg:py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent text-sm sm:text-base md:text-[0.85rem] lg:text-[0.92rem]"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                setName(value);
                if (value.trim() !== '' && !validateName(value.trim())) {
                  setError('Name can only contain letters and spaces');
                } else {
                  setError('');
                }
              }}
              disabled={loading}
            />
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm sm:text-base md:text-[0.85rem] lg:text-[0.92rem] font-medium text-gray-800 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full px-4 sm:px-5 md:px-3 lg:px-3 py-2.5 sm:py-3 md:py-2 lg:py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent text-sm sm:text-base md:text-[0.85rem] lg:text-[0.92rem]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-sm sm:text-base md:text-[0.85rem] lg:text-[0.92rem] font-medium text-gray-800 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full px-4 sm:px-5 md:px-3 lg:px-3 py-2.5 sm:py-3 md:py-2 lg:py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent text-sm sm:text-base md:text-[0.85rem] lg:text-[0.92rem] pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  // Eye-off SVG
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4.03-9-7 0-1.306.835-2.417 2.22-3.283m2.212-1.19A9.978 9.978 0 0112 5c5 0 9 4.03 9 7 0 1.306-.835 2.417-2.22 3.283M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9.53 7.53l15-15" />
                  </svg>
                ) : (
                  // Eye SVG
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 2.97-4 7-9 7s-9-4.03-9-7 4-7 9-7 9 4.03 9 7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm password field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm sm:text-base md:text-[0.85rem] lg:text-[0.92rem] font-medium text-gray-800 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full px-4 sm:px-5 md:px-3 lg:px-3 py-2.5 sm:py-3 md:py-2 lg:py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent text-sm sm:text-base md:text-[0.85rem] lg:text-[0.92rem] pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                tabIndex={-1}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
                  // Eye-off SVG
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4.03-9-7 0-1.306.835-2.417 2.22-3.283m2.212-1.19A9.978 9.978 0 0112 5c5 0 9 4.03 9 7 0 1.306-.835 2.417-2.22 3.283M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9.53 7.53l15-15" />
                  </svg>
                ) : (
                  // Eye SVG
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 2.97-4 7-9 7s-9-4.03-9-7 4-7 9-7 9 4.03 9 7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 sm:py-3 md:py-2 lg:py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mt-3 sm:mt-4 md:mt-2 lg:mt-2 text-sm sm:text-base md:text-[0.85rem] lg:text-[0.92rem]"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Link to login if user already has an account */}
          <p className="text-center text-sm sm:text-base md:text-[0.85rem] lg:text-[0.92rem] text-gray-800 pt-2">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="text-indigo-600 hover:underline font-medium"
              state={{ from: { pathname: '/home' } }}
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp