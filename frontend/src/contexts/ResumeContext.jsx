import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import useCVStore from '../store/cvStore';

const ResumeContext = createContext();

// In-memory cache to store the current fetch promise
let activeFetch = null;

// Cleanup function to reset the active fetch
const cleanupFetch = () => {
  activeFetch = null;
};

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState({
    personalInfo: {},
    summary: '',
    education: [],
    workExperience: [],
    skills: [],
    achievements: [],
    projects: [],
    certifications: [],
    languages: [],
    sectionOrder: [
      'PersonalInfo',
      'Summary',
      'WorkExperience',
      'Education',
      'Skills',
      'Projects',
      'Certifications',
      'Achievements',
      'Languages'
    ]
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, logout } = useAuth();
  const abortControllerRef = useRef(null);
  const isMounted = useRef(true);

  const fetchResume = useCallback(async (options = {}) => {
    const { force = false } = options;
    
    // If we already have a fetch in progress, return that promise
    if (activeFetch && !force) {

      return activeFetch;
    }

    const currentToken = token; // Capture the current token value
    if (!currentToken) {
      const error = new Error('No authentication token found');
      setError(error.message);
      setLoading(false);
      throw error;
    }


    setLoading(true);
    setError(null);

    // Create new AbortController for this request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const fetchPromise = (async () => {
      try {
        const startTime = Date.now();
        const apiUrl = `${import.meta.env.VITE_BACKEND_API_BASE_URL}/resume`;

        
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${currentToken}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          signal: abortControllerRef.current?.signal,
        });

        const responseTime = Date.now() - startTime;


        if (response.status === 401) {
          // Token expired, log out

          if (isMounted.current) {
            logout();
          }
          throw new Error('Your session has expired. Please log in again.');
        }

        if (response.status === 204) {

          if (isMounted.current) {
            setResume(prev => ({ ...prev })); // Keep existing structure but trigger update
          }
          return null;
        }

        if (response.status === 404) {

          if (isMounted.current) {
            setResume(prev => ({ ...prev })); // Keep existing structure but trigger update
          }
          return null;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.message || response.statusText;
          throw new Error(`Failed to fetch resume: ${errorMessage}`);
        }

        const data = await response.json();

        
        if (isMounted.current) {
          const resumeData = data.data || data;
          setResume(prev => ({
            ...prev,
            ...resumeData
          }));
          
          // Update CV store with the fetched resume data
          const { updateCVStore } = useCVStore.getState();
          updateCVStore(resumeData);
        }
        
        return data.data || data;
      } catch (err) {
        // Don't set error for aborted requests
        if (err.name !== 'AbortError') {

          if (isMounted.current) {
            setError(err.message || 'Failed to fetch resume data');
          }
        }
        throw err;
      } finally {
        // Only clear loading state if this is the most recent request
        if (activeFetch === fetchPromise && isMounted.current) {
          setLoading(false);
          cleanupFetch();
        }
      }
    })();

    // Store the fetch promise
    activeFetch = fetchPromise;
    return fetchPromise;
  }, [token, logout]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      cleanupFetch();
    };
  }, []);

  // Function to update the CV store with resume data
  const updateCVStoreWithResumeData = useCallback((resumeData) => {
    if (!resumeData) return;
    
    console.log('Updating CV store with resume data:', resumeData);
    const { updateCVStore } = useCVStore.getState();
    
    // Ensure all arrays are properly initialized
    const processedData = {
      ...resumeData,
      education: Array.isArray(resumeData.education) ? resumeData.education : [],
      workExperience: Array.isArray(resumeData.workExperience) ? resumeData.workExperience : [],
      skills: Array.isArray(resumeData.skills) ? resumeData.skills : [],
      achievements: Array.isArray(resumeData.achievements) ? resumeData.achievements : [],
      projects: Array.isArray(resumeData.projects) ? resumeData.projects : [],
      certifications: Array.isArray(resumeData.certifications) ? resumeData.certifications : [],
      languages: Array.isArray(resumeData.languages) ? resumeData.languages : [],
    };
    
    updateCVStore(processedData);
  }, []);

  // Initial fetch when component mounts or token changes
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const loadResume = async () => {
      try {
        const resumeData = await fetchResume();
        if (resumeData) {
          updateCVStoreWithResumeData(resumeData);
        }
      } catch (error) {
        console.error('Error in resume loading:', error);
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    loadResume();
  }, [token, fetchResume, updateCVStoreWithResumeData]);

  const value = {
    resume,
    loading,
    error,
    fetchResume: useCallback((options) => fetchResume(options), [fetchResume]),
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
