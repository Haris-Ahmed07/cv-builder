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
                    <span className="ml-2 text-xl font-bold text-gray-700 whitespace-nowrap">
                      {(user.name && user.name.split(' ')[0]) || 'User'}
                    </span>
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
                      <div className="absolute right-0 mt-4 mr-12 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-2 flex flex-col items-stretch">
                        <div className="h-2"></div>
                        <button
                          onClick={() => {
                            logout()
                            setIsProfileOpen(false)
                          }}
                          className="block w-full text-left px-3 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors shadow"
                        >
                          Sign out
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
