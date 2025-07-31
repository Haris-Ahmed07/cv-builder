import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, send them straight to /home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  // If already authenticated, don’t show the landing page at all
  if (isAuthenticated) return null;
  
  return (
    // Background and outer container
    <div className="bg-[url('/bg-pattern.png')] bg-cover bg-no-repeat bg-center flex flex-col min-h-content ">

      {/* Main section */}
      <main className="flex-1 flex flex-col justify-start items-center text-center px-2 py-3 sm:py-4 md:py-6 lg:py-8">
        <div className="backdrop-blur-xl bg-white/30 border border-white/20 shadow-2xl rounded-2xl p-4 sm:p-6 md:p-7 lg:p-8 w-full max-w-screen-lg">

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Create Professional CVs
            <span className="text-indigo-600 block text-xl sm:text-2xl md:text-3xl lg:text-3xl">Effortlessly</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-xl mx-auto mb-4 sm:mb-5 leading-relaxed">
            Build modern, clean, and ATS-friendly resumes in minutes. No design skills needed. Live preview and instant PDF download.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center mb-6 sm:mb-8">
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-md text-sm sm:text-base font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
            >
              Get Started Free
            </Link>
            <Link
              to="/signin"
              className="text-indigo-600 font-semibold text-sm sm:text-base hover:text-indigo-800 transition-colors border-2 border-indigo-600 px-4 py-2 sm:px-6 sm:py-2.5 rounded-md hover:bg-indigo-50 w-full sm:w-auto"
            >
              Sign In
            </Link>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-5 sm:mt-6">

            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-indigo-100 w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-sm sm:text-base">Create your CV in minutes with our intuitive builder</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">ATS Friendly</h3>
              <p className="text-gray-600 text-sm sm:text-base">Optimized for applicant tracking systems</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">PDF Export</h3>
              <p className="text-gray-600 text-sm sm:text-base">Download your professional CV instantly</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
