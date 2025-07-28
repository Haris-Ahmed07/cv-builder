import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useResume } from '../contexts/ResumeContext';
import { toast } from 'react-toastify';
import BuilderLayout from '../components/Builder/BuilderLayout';
import BuilderForm from '../components/Builder/BuilderForm';
import CVPreview from '../components/CVPreview';

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { resume, loading, error, fetchResume, resetResume } = useResume();
  const [retryCount, setRetryCount] = useState(0); // Tracks how many times we retried
  const [lastError, setLastError] = useState(null); // Stores the last error

  // Redirect to sign-in if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: '/home' } });
      return;
    }
  }, [isAuthenticated, navigate]);

  // Tries to load resume, retries up to 3 times if it fails
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (lastError === null || retryCount < 3) {
      const loadResume = async () => {
        try {
          await fetchResume();
          if (lastError !== null) setLastError(null); // Clear error if successful
        } catch (err) {
          const newError = err.message || 'Failed to load resume';
          setLastError(newError);

          if (retryCount === 0) {
            toast.error('Having trouble loading your resume. Will retry...');
          }

          // Retry logic with exponential backoff (1s, 2s, 4s)
          if (retryCount < 2) {
            const delay = Math.min(1000 * Math.pow(2, retryCount), 8000);
            const timer = setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, delay);
            return () => clearTimeout(timer); // Clear timer if unmounted or re-run
          } else if (retryCount === 2) {
            toast.error('Failed to load resume after multiple attempts. Please check your connection and refresh the page.');
          }
        }
      };

      loadResume();
    }
  }, [isAuthenticated, fetchResume, retryCount, lastError]);

  // Loading screen with spinner and retry info
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

  // If all retries failed, show error screen with retry/refresh options
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
                setRetryCount(0); // Reset and try again
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

  // Main builder layout with form and live preview
  return (
    <div className="w-full flex flex-col overflow-hidden backdrop-blur-lg bg-white/20 border border-white/30 rounded-lg shadow-lg px-2 py-4 md:px-4 md:py-6 lg:px-6 lg:py-4 max-w-[1300px] mx-auto min-h-[100dvh]">

      <BuilderLayout
        form={
          // Left side - builder form
          <div className="h-full w-full overflow-y-auto">
            <BuilderForm className="h-full" />
          </div>
        }
        preview={
          // Right side - CV preview panel
          <div className="w-full h-fit flex flex-col bg-white rounded-lg shadow md:max-w-[540px] lg:max-w-[620px] mx-auto ">

            {/* Header inside the preview box */}
            <div className="p-4 md:p-2 lg:p-3 border-b border-gray-200">
              <h2 className="text-2xl md:text-[1.15rem] lg:text-[1.25rem] font-bold text-gray-800">Live Preview</h2>
            </div>

            {/* CV preview itself, scaled for responsiveness */}
            <div className="w-full px-4 py-4 flex justify-center items-start max-h-[600px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[750px] xl:max-h-[900px] 2xl:max-h-[900px]">
              <div className="w-full max-w-[720px] scale-95 md:scale-100 lg:scale-[1.05] xl:scale-[1.05] 2xl:scale-[1.05] origin-top max-h-[600px] sm:max-h-[900px] md:max-h-[500px] lg:max-h-[750px] xl:max-h-[900px] 2xl:max-h-[850px]">
                <CVPreview isPreview={true} />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Home;
