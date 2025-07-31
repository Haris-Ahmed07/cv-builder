import { useState } from 'react'
import { Link } from 'react-router-dom'
import SaveButton from './SaveButton'
import DownloadButton from './DownloadButton'
import { useAuth } from '../contexts/AuthContext'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const { user, logout } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="backdrop-blur-md bg-white/30 border-b border-white/20 w-full z-50 shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo */}
          <Link
            to={user ? '/home' : '/'}
            className="text-lg sm:text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
          >
            CV Builder
          </Link>

          {/* Hamburger menu icon for mobile */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Buttons for desktop view */}
          <div className="hidden sm:flex items-center space-x-3">
            {user ? (
              <>
                {/* Save and download buttons when logged in */}
                <SaveButton className="px-6 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-base font-bold rounded-2xl shadow-lg transition-all duration-200" />
                <DownloadButton className="px-6 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-base font-bold rounded-2xl shadow-lg transition-all duration-200" />

                {/* User profile dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center bg-white/70 px-2 py-1 rounded-full hover:bg-white/90 transition-colors"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    {/* profile circle with first letter of name */}
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-bold text-xl">
                        {(user.name && user.name[0].toUpperCase()) || 'U'}
                      </span>
                    </div>
                    {/* first name */}
                  </button>

                  {/* dropdown logout button */}
                  {isProfileOpen && (
                    <>
                      {/* overlay to close dropdown on outside click */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileOpen(false)}
                      ></div>

                      {/* actual dropdown */}
                      <div className="absolute right-0 mt-4 mr-12 min-w-[260px] max-w-xs bg-white/90 rounded-2xl shadow-2xl border border-gray-100 z-50 p-6 flex flex-col items-center gap-3 transition-all duration-200">
                        {/* Avatar with ring */}
                        <div className="relative mb-2">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-100 to-indigo-50 flex items-center justify-center shadow ring-4 ring-indigo-300">
                            <span className="text-indigo-700 font-bold text-3xl">
                              {(user.name && user.name[0].toUpperCase()) || 'U'}
                            </span>
                          </div>
                        </div>
                        {/* Name and email */}
                        <div className="text-lg font-bold text-gray-800 text-center w-full truncate">{user.name}</div>
                        <div className="text-xs text-gray-500 text-center w-full truncate mb-1">{user.email}</div>
                        <div className="w-full border-t border-gray-200 my-2"></div>
                        {/* Logout button */}
                        <button
                          onClick={() => {
                            logout()
                            setIsProfileOpen(false)
                          }}
                          className="flex items-center justify-center gap-2 w-full px-4 py-2 text-base font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 focus:ring-2 focus:ring-red-300 rounded-xl shadow-lg transition-all duration-150"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H9m0 0l3-3m-3 3l3 3" />
                          </svg>
                          <span>Sign out</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* buttons when not logged in */}
                <Link
                  to="/signin"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Buttons for mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 pb-4 flex flex-col gap-3">
            {user ? (
              <>
                <SaveButton className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-base font-bold px-6 py-3 rounded-2xl shadow-lg transition-all duration-200" />
                <DownloadButton className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-base font-bold px-6 py-3 rounded-2xl shadow-lg transition-all duration-200" />
                <button
                  onClick={() => logout()}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white text-base font-bold px-6 py-3 rounded-2xl shadow-lg transition-all duration-200"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
