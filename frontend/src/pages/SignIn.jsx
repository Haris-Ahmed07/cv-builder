import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getEnv } from '../utils/env'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/home'

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Client-side validation
    if (!email || !password) {
      setError('Please enter both email and password')
      setLoading(false)
      return
    }
    if (!validateEmail(email.trim().toLowerCase())) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${getEnv('VITE_BACKEND_API_BASE_URL')}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      })

      const data = await res.json()

      if (res.ok) {
        if (data.success && data.token) {
          login({
            token: data.token,
            user: data.user
          })
          navigate(from, { replace: true })
        } else {
          throw new Error('Invalid response format from server')
        }
      } else {
        if (res.status === 400) {
          setError('Missing email or password')
        } else if (res.status === 401) {
          setError('Invalid credentials')
        } else {
          setError(data.message || 'Sign in failed. Please try again.')
        }
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Sign in error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] sm:h-[calc(100vh-9rem)] justify-center px-4 sm:px-6 lg:px-8">
      <div className="backdrop-blur-lg rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.4)] w-full max-w-xs sm:max-w-sm md:max-w-[310px] lg:max-w-[340px] mx-auto p-4 sm:p-6 md:p-3 lg:p-4 bg-white/20 border border-white/30">
        {/* Back Button */}
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

        <h2 className="text-2xl sm:text-3xl md:text-[1.2rem] lg:text-[1.3rem] font-extrabold text-center mb-3 sm:mb-4 md:mb-2 lg:mb-2 mt-8 sm:mt-10 md:mt-4 lg:mt-5 text-indigo-600">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-red-50 text-red-700 rounded-lg text-sm sm:text-base">
            {error}
          </div>
        )}

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
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 sm:px-5 md:px-3 lg:px-3 py-2.5 sm:py-3 md:py-2 lg:py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent text-sm sm:text-base md:text-[0.85rem] lg:text-[0.92rem]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 sm:py-3 md:py-2 lg:py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mt-3 sm:mt-4 md:mt-2 lg:mt-2 text-sm sm:text-base md:text-[0.85rem] lg:text-[0.92rem]"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

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