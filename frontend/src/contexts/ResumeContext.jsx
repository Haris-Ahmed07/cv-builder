import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import useCVStore from '../store/cvStore';
import { getEnv } from '../utils/env';

const ResumeContext = createContext();

// This holds the currently active fetch to prevent duplicate API calls
let activeFetch = null;

// Reset the fetch tracker
const cleanupFetch = () => {
  activeFetch = null;
};

export function ResumeProvider({ children }) {
  // Default structure of the resume object
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

  const [loading, setLoading] = useState(true); // Controls global loading state
  const [error, setError] = useState(null); // Stores any errors from fetching
  const { token, logout } = useAuth(); // Grab token and logout from auth context
  const abortControllerRef = useRef(null); // Allows us to cancel requests
  const isMounted = useRef(true); // Used to avoid setting state after unmount

  // Core logic to fetch resume data from backend
  const fetchResume = useCallback(async (options = {}) => {
    const { force = false } = options;

    // Prevent refetch if a fetch is already happening unless forced
    if (activeFetch && !force) {
      return activeFetch;
    }

    const currentToken = token;
    if (!currentToken) {
      const error = new Error('No authentication token found');
      setError(error.message);
      setLoading(false);
      throw error;
    }

    setLoading(true);
    setError(null);

    // Abort previous fetch if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new abort controller for this request
    abortControllerRef.current = new AbortController();

    const fetchPromise = (async () => {
      try {
        const startTime = Date.now();
        const apiUrl = `${getEnv('VITE_BACKEND_API_BASE_URL')}/resume`;

        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${currentToken}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          signal: abortControllerRef.current?.signal,
        });

        const responseTime = Date.now() - startTime;

        // Handle session expiration
        if (response.status === 401) {
          if (isMounted.current) logout();
          throw new Error('Your session has expired. Please log in again.');
        }

        // Handle no content (empty resume)
        if (response.status === 204 || response.status === 404) {
          if (isMounted.current) {
            setResume(prev => ({ ...prev }));
          }
          return null;
        }

        // Any other failed response
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.message || response.statusText;
          throw new Error(`Failed to fetch resume: ${errorMessage}`);
        }

        const data = await response.json();

        // On success, update both local and global (store) state
        if (isMounted.current) {
          const resumeData = data.data || data;

          setResume(prev => ({
            ...prev,
            ...resumeData
          }));

          const { updateCVStore } = useCVStore.getState();
          updateCVStore(resumeData);
        }

        return data.data || data;
      } catch (err) {
        // Ignore abort errors
        if (err.name !== 'AbortError' && isMounted.current) {
          setError(err.message || 'Failed to fetch resume data');
        }
        throw err;
      } finally {
        // Only clear loading if this is the latest fetch
        if (activeFetch === fetchPromise && isMounted.current) {
          setLoading(false);
          cleanupFetch();
        }
      }
    })();

    activeFetch = fetchPromise;
    return fetchPromise;
  }, [token, logout]);

  // Cleanup when provider unmounts
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      cleanupFetch();
    };
  }, []);

  // Helper to update global CV store from resume data
  const updateCVStoreWithResumeData = useCallback((resumeData) => {
    if (!resumeData) return;

    console.log('Updating CV store with resume data:', resumeData);

    const { updateCVStore } = useCVStore.getState();

    // Normalize missing arrays to empty arrays to avoid frontend crashes
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

  // Fetch resume once on mount or when token changes
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

  // Expose everything needed via context
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

// Hook to use resume context in any component
export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
