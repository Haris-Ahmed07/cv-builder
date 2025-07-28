import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getEnv } from '../utils/env';

// Custom hook for making authenticated API requests with built-in error handling and loading state
const useApi = () => {
  const [loading, setLoading] = useState(false); // Tracks loading state of request
  const [error, setError] = useState(null); // Holds any error message
  const { logout } = useAuth(); // Used to force logout on token failure

  // request: a wrapper for fetch that auto-handles token, headers, errors, etc.
  const request = useCallback(async (endpoint, options = {}) => {
    setLoading(true); // Start loading before API call
    setError(null); // Clear previous errors

    try {
      const token = localStorage.getItem('token');

      // Build headers, including auth token if available
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers // Allow custom headers override
      };

      // Perform fetch call to full backend URL
      const response = await fetch(`${getEnv('VITE_BACKEND_API_BASE_URL')}${endpoint}`, {
        ...options,
        headers
      });

      const data = await response.json();

      // Handle non-2xx responses
      if (!response.ok) {
        if (response.status === 401) {
          // Auto logout and redirect if token is invalid/expired
          logout();
          window.location.href = '/signin';
          throw new Error('Session expired. Please sign in again.');
        }
        // Throw the backend error message or a generic one
        throw new Error(data.message || 'Something went wrong');
      }

      // All good, return response data
      return data;
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Something went wrong');
      throw err;
    } finally {
      // Stop loading regardless of success/failure
      setLoading(false);
    }
  }, [logout]);

  // Expose the request function along with current loading/error states
  return { request, loading, error };
};

export default useApi;
