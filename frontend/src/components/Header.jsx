import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Menu, X } from 'lucide-react'
import SaveButton from './SaveButton';
import DownloadButton from './DownloadButton';

const Header = () => {
  const { user, logout } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false)

  return (
    <header className="backdrop-blur-md bg-white/30 border-b border-white/20 w-full z-50 shadow-[0_4px_15px_rgba(0,0,0,0.4)] ">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Left Side */}
          <div>
            {/* Logo */}
            <Link
              to={user ? '/home' : '/'}
              className="text-lg sm:text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
            >
              CV Builder
            </Link>
          </div>

          {/* Right Side */}
          <div>
            {/* Mobile menu button for auth dropdown */}
            {!user && (
              <div className="sm:hidden">
                <button
                  onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
                  aria-expanded={authDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open auth menu</span>
                  {authDropdownOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            )}

            {/* Header buttons and profile */}
            <div className="flex items-center space-x-3">
              {/* Save and Download buttons - shown on sm and up when logged in */}
              {user && (
                <div className="hidden sm:flex space-x-2">
                  <SaveButton className="px-4 py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-sm font-bold rounded-lg shadow-lg transition-all duration-200" />
                  <DownloadButton className="px-4 py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-sm font-bold rounded-lg shadow-lg transition-all duration-200" />
                </div>
              )}

              {/* User profile dropdown */}
              {user ? (
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
                  </button>

                  {/* dropdown logout button */}
                  {isProfileOpen && (
                    <>
                      {/* overlay to close dropdown on outside click */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileOpen(false)}
                      ></div>

                      {/* actual dropdown - responsive sizing */}
                      <div className="fixed sm:absolute right-4 left-4 sm:left-auto sm:right-0 sm:mr-3 mt-2 bg-white/95 sm:bg-white/90 rounded-2xl shadow-2xl border border-gray-100 z-50 p-4 sm:p-6 flex flex-col items-center gap-3 transition-all duration-200 max-w-[calc(100vw-2rem)] sm:max-w-xs">
                        {/* Avatar with ring - responsive sizing */}
                        <div className="relative mb-2 w-full flex justify-center">
                          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-100 to-indigo-50 flex items-center justify-center shadow ring-2 sm:ring-4 ring-indigo-300">
                            <span className="text-indigo-700 font-bold text-2xl sm:text-3xl">
                              {(user.name && user.name[0].toUpperCase()) || 'U'}
                            </span>
                          </div>
                        </div>
                        {/* Name and email - responsive text */}
                        <div className="text-base sm:text-lg font-bold text-gray-800 text-center w-full truncate px-2">{user.name}</div>
                        <div className="text-xs text-gray-500 text-center w-full truncate px-2 mb-1">{user.email}</div>
                        <div className="w-full border-t border-gray-200 my-1 sm:my-2"></div>
                        {/* Logout button */}
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 focus:ring-2 focus:ring-red-300 rounded-lg sm:rounded-xl shadow-lg transition-all duration-150"
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
              ) : (
                <>
                  {/* Desktop auth buttons */}
                  <div className="hidden sm:flex items-center space-x-3">
                    <Link
                      to="/signin"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-600 text-sm font-medium px-4 py-2 rounded-md transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>

                  {/* Mobile auth dropdown - improved styling */}
                  {authDropdownOpen && (
                    <>
                      {/* Overlay for mobile dropdown */}
                      <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden transition-opacity duration-200"
                        onClick={() => setAuthDropdownOpen(false)}
                      ></div>

                      {/* Mobile auth dropdown with improved styling */}
                      <div className="fixed right-4 left-4 top-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 z-50 p-6 sm:hidden transition-all duration-200 transform">
                        <div className="flex flex-col space-y-4">
                          {/* Header */}
                          <div className="text-center mb-2">
                            <h3 className="text-lg font-bold text-gray-800">Get Started</h3>
                            <p className="text-sm text-gray-600">Join CV Builder today</p>
                          </div>

                          {/* Divider */}
                          <div className="border-t border-gray-200"></div>

                          {/* Sign In Button */}
                          <Link
                            to="/signin"
                            className="flex items-center justify-center gap-2 w-full px-6 py-3 text-white bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                            onClick={() => setAuthDropdownOpen(false)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            Sign In
                          </Link>

                          {/* Sign Up Button */}
                          <Link
                            to="/signup"
                            className="flex items-center justify-center gap-2 w-full px-6 py-3 text-indigo-700 bg-white/80 hover:bg-white border-2 border-indigo-200 hover:border-indigo-300 font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                            onClick={() => setAuthDropdownOpen(false)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                            Sign Up
                          </Link>

                          {/* Footer text */}
                          <p className="text-xs text-gray-500 text-center mt-4">
                            Build professional resumes in minutes
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header