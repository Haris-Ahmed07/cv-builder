import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getEnv } from '../utils/env';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  const request = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      };

      const response = await fetch(`${getEnv('VITE_BACKEND_API_BASE_URL')}${endpoint}`, {
        ...options,
        headers
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          logout();
          window.location.href = '/signin';
          throw new Error('Session expired. Please sign in again.');
        }
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [logout]);

  return { request, loading, error };
};

export default useApi;
