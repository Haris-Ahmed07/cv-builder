import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEnv } from '../utils/env';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the logged-in user object
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Grab token from localStorage if available
  const [loading, setLoading] = useState(true); // Control loading state during auth check
  const navigate = useNavigate();

  // Fetch user data using token from backend
  const getCurrentUser = async () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setLoading(false);
      return null;
    }

    try {
      const response = await fetch(`${getEnv('VITE_BACKEND_API_BASE_URL')}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include' // Optional if using cookies with your backend
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success && data.data) {
          const userData = data.data;
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          setLoading(false);
          return userData;
        }
      }

      // If token is invalid/expired, force logout
      logout();
      return null;

    } catch (error) {
      // Network error or backend down, don't log out — just skip
      setLoading(false);
      return null;
    }
  };

  // Run once when app mounts to check auth status
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken) {
          setToken(storedToken);

          // Temporarily use stored user for fast load
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }

          // But still get fresh user data
          await getCurrentUser();
        } else {
          if (isMounted) {
            setLoading(false);
          }
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Cleanup on unmount
    return () => {
      isMounted = false;
    };
  }, []);

  // Called after successful sign in
  const login = (responseData) => {
    const { token, user } = responseData;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
    navigate('/home');
  };

  // Clear all user data and redirect to login
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/signin');
  };

  // All shared auth values/functions here
  const value = {
    user,
    token,
    loading,
    login,
    logout,
    getCurrentUser,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to access auth context from any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
