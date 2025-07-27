import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setLoading(false);
      return null;
    }

    try {
      console.log('Fetching user data...');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include' // Important for cookies if using them
      });

      console.log('Auth response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('User data received:', data);
        
        if (data.success && data.data) {
          const userData = data.data;
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          setLoading(false);
          return userData;
        }
      }
      
      // If token is invalid or expired, clear it
      console.log('Invalid or expired token, logging out...');
      logout();
      return null;
      
    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      // Don't log out on network errors, just set loading to false
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken) {
          setToken(storedToken);
          // If we have a stored user, use it initially for better UX
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
          // Always try to fetch fresh user data
          await getCurrentUser();
        } else {
          if (isMounted) {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error in auth initialization:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const login = (responseData) => {
    const { token, user } = responseData;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
    navigate('/home');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/signin');
  };

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
