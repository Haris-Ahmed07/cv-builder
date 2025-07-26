import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BuilderLayout from '../components/Builder/BuilderLayout';
import BuilderForm from '../components/Builder/BuilderForm';
import CVPreview from '../components/CVPreview';
import DownloadButton from '../components/DownloadButton';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: '/home' } });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
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
