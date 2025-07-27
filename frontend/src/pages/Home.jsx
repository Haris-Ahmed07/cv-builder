import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useResume } from '../contexts/ResumeContext';
import { toast } from 'react-toastify';
import BuilderLayout from '../components/Builder/BuilderLayout';
import BuilderForm from '../components/Builder/BuilderForm';
import CVPreview from '../components/CVPreview';
import DownloadButton from '../components/DownloadButton';
import SaveButton from '../components/SaveButton';

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { resume, loading, error, fetchResume, resetResume } = useResume();
  const [retryCount, setRetryCount] = useState(0);
  const [lastError, setLastError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: '/home' } });
      return;
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (lastError === null || retryCount < 3) {
      const loadResume = async () => {
        try {
          await fetchResume();
          if (lastError !== null) setLastError(null);
        } catch (err) {
          const newError = err.message || 'Failed to load resume';
          setLastError(newError);

          if (retryCount === 0) {
            toast.error('Having trouble loading your resume. Will retry...');
          }

          if (retryCount < 2) {
            const delay = Math.min(1000 * Math.pow(2, retryCount), 8000);
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
  }, [isAuthenticated, fetchResume, retryCount, lastError]);

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
    <div className="w-full h-screen flex flex-col overflow-hidden backdrop-blur-lg bg-white/20 border border-white/30 rounded-lg shadow-lg p-4">
      <BuilderLayout
        form={
          <div className="h-full w-full overflow-y-auto">
            <BuilderForm className="h-full" />
          </div>
        }
        preview={
          <div className="w-full h-full flex flex-col bg-white rounded-lg shadow">
            {/* Top bar inside preview container */}
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Live Preview</h2>
            </div>

            {/* CV Preview Container with fixed height */}
            <div className="flex-1 min-h-0 overflow-auto p-4">
              <div className="flex justify-center items-center h-full">
                <CVPreview isPreview={true} />
              </div>
            </div>

            {/* Bottom buttons */}
            <div className="border-t border-gray-200 bg-gray-50 min-h-[100px]">
              <div className="h-full grid grid-cols-2 gap-4 p-4">
                <div className="h-full">
                  <SaveButton className="w-full h-full text-2xl font-bold rounded-lg flex items-center justify-center p-4" />
                </div>
                <div className="h-full">
                  <DownloadButton className="w-full h-full text-2xl font-bold rounded-lg flex items-center justify-center p-4" />
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Home;
