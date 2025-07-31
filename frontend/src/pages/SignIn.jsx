import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getEnv } from '../utils/env'
import { toast } from 'react-toastify'

const SignIn = () => {
  // Form state for user input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Get redirect path after login (if any)
  const from = location.state?.from?.pathname || '/home'

  // Basic email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Check if both fields are filled
    if (!email || !password) {
      setError('Please enter both email and password')
      setLoading(false)
      return
    }

    // Check email format
    if (!validateEmail(email.trim().toLowerCase())) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      // Make API call to backend to sign in
      const res = await fetch(`${getEnv('VITE_BACKEND_API_BASE_URL')}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      })

      const data = await res.json()

      if (res.ok) {
        // If sign-in is successful and token is returned
        if (data.success && data.token) {
          // Save token and user to context
          login({
            token: data.token,
            user: data.user
          })
          // Show welcome toast before redirect
          toast.success(`Welcome, ${data.user?.name || 'User'}!`, {
            position: 'bottom-center',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
          // Redirect user
          navigate(from, { replace: true })
        } else {
          throw new Error('Invalid response format from server')
        }
      } else {
        // Handle known server error cases
        if (res.status === 400) {
          setError('Missing email or password')
        } else if (res.status === 401) {
          setError('Invalid credentials')
        } else {
          setError(data.message || 'Sign in failed. Please try again.')
        }
      }
    } catch (err) {
      // Handle any other issues like network failures
      setError('Network error. Please try again.')
      console.error('Sign in error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] sm:h-[calc(100vh-9rem)] justify-center px-4 sm:px-6 lg:px-8">
      <div className="backdrop-blur-lg rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.4)] w-full max-w-xs sm:max-w-sm md:max-w-[310px] lg:max-w-[340px] mx-auto p-4 sm:p-6 md:p-3 lg:p-4 bg-white/20 border border-white/30">

        {/* Go back to landing page */}
        <button
          onClick={() => navigate('/')}
          className="absolute left-3 sm:left-4 top-3 sm:top-4 flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/30 border border-white/50 rounded-full text-indigo-700 hover:bg-white/50 hover:border-white/70 hover:text-indigo-900 font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-300"
          aria-label="Back"
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page title */}
        <h2 className="text-2xl sm:text-3xl md:text-[1.2rem] lg:text-[1.3rem] font-extrabold text-center mb-3 sm:mb-4 md:mb-2 lg:mb-2 mt-8 sm:mt-10 md:mt-4 lg:mt-5 text-indigo-600">
          Welcome Back
        </h2>

        {/* Show error if any */}
        {error && (
          <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-red-50 text-red-700 rounded-lg text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Sign in form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 sm:py-3 md:py-2 lg:py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mt-3 sm:mt-4 md:mt-2 lg:mt-2 text-sm sm:text-base md:text-[0.85rem] lg:text-[0.92rem]"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Link to Sign Up */}
          <p className="text-center text-sm sm:text-base md:text-[0.85rem] lg:text-[0.92rem] text-gray-800 pt-2">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-indigo-600 hover:underline font-medium"
              state={{ from: location.state?.from }}
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignIn
