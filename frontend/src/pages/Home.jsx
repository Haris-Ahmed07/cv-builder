import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useResume } from '../contexts/ResumeContext';
import BuilderLayout from '../components/Builder/BuilderLayout';
import BuilderForm from '../components/Builder/BuilderForm';
import CVPreview from '../components/CVPreview';
import DownloadButton from '../components/DownloadButton';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const { resume, loading, error, fetchResume } = useResume();
  const [retryCount, setRetryCount] = useState(0);
  const [lastError, setLastError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: '/home' } });
      return;
    }

    // Only attempt to load resume if we don't have an error or we're retrying
    if (lastError === null || retryCount < 3) {
      const loadResume = async () => {
        try {
          console.log('[Home] Attempting to load resume, attempt:', retryCount + 1);
          await fetchResume();
          // If successful, reset error state
          if (lastError !== null) {
            setLastError(null);
          }
        } catch (err) {
          console.error('[Home] Failed to load resume:', err);
          const newError = err.message || 'Failed to load resume';
          setLastError(newError);
          
          // Only show error toast on the first failure
          if (retryCount === 0) {
            toast.error('Having trouble loading your resume. Will retry...');
          }
          
          // Auto-retry with exponential backoff (max 3 retries)
          if (retryCount < 2) {
            const delay = Math.min(1000 * Math.pow(2, retryCount), 8000);
            console.log(`[Home] Will retry in ${delay}ms`);
            const timer = setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, delay);
            return () => clearTimeout(timer);
          } else if (retryCount === 2) {
            toast.error('Failed to load resume after multiple attempts. Please check your connection and refresh the page.');
          }
        }
      };

      loadResume();
    }
  }, [isAuthenticated, navigate, fetchResume, retryCount, lastError]);

  // Show loading state while checking authentication or loading resume
  if (!isAuthenticated || (loading && retryCount === 0)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        {retryCount > 0 && (
          <p className="mt-4 text-gray-600">Attempting to load... (Attempt {retryCount + 1}/3)</p>
        )}
      </div>
    );
  }

  // Show error state if all retries failed
  if (lastError && retryCount >= 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 mb-6 max-w-2xl w-full rounded">
          <h2 className="text-xl font-bold mb-2">Couldn't load your resume</h2>
          <p className="mb-4">We encountered an error while trying to load your resume data.</p>
          <div className="bg-red-100 p-3 rounded mb-4">
            <p className="text-sm font-mono">{lastError}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setRetryCount(0);
                setLastError(null);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <BuilderLayout
      form={<BuilderForm />}
      preview={
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 h-full overflow-hidden max-h-[90vh] relative">
            {/* Top bar inside preview container */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Live Preview</h2>
              <DownloadButton />
            </div>
            <CVPreview />
          </div>
        </div>
      }
    />
  )
}

export default Home
