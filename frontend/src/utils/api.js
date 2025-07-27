// Helper function to get auth header with JWT token
export const authHeader = () => {
  const token = localStorage.getItem('token');
  
  if (token) {
    return { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }
  
  return { 'Content-Type': 'application/json' };
};

// Wrapper for fetch with auth header
export const fetchWithAuth = async (url, options = {}) => {
  const headers = {
    ...authHeader(),
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  // If unauthorized, clear token and redirect to login
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/signin';
    return Promise.reject('Unauthorized');
  }

  return response;
};

// Handle API responses consistently
export const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  
  return data;
};

// Example API functions
export const api = {
  get: (url) => fetchWithAuth(url).then(handleResponse),
  post: (url, body) => 
    fetchWithAuth(url, {
      method: 'POST',
      body: JSON.stringify(body)
    }).then(handleResponse),
  put: (url, body) => 
    fetchWithAuth(url, {
      method: 'PUT',
      body: JSON.stringify(body)
    }).then(handleResponse),
  delete: (url) => 
    fetchWithAuth(url, {
      method: 'DELETE'
    }).then(handleResponse)
};
