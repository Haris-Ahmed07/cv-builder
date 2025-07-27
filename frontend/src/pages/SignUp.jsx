import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password
        }),
      })
      
      const data = await res.json()
      
      if (res.status === 201) {
        // Log in the user immediately after successful signup
        login({
          token: data.token,
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email
          }
        })
        // Redirect to home page after successful signup
        navigate('/')
      } else if (res.status === 400) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm relative border border-gray-200">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute left-4 top-4 flex items-center justify-center px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 hover:bg-blue-100 hover:border-blue-400 hover:text-blue-900 font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Back"
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h2 className="text-3xl font-extrabold text-center mb-6 mt-8 text-blue-700">Create Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              required
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <p className="text-center text-sm text-gray-600 pt-2">
            Already have an account?{' '}
            <Link 
              to="/signin" 
              className="text-blue-600 hover:underline font-medium"
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
