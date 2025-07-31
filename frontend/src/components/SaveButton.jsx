import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useCVStore from '../store/cvStore';
import { authHeader } from '../utils/api';
import { getEnv } from '../utils/env';

const SaveButton = ({ className = '', children = 'Save CV' }) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Grab the current state of the CV from Zustand store
      const state = useCVStore.getState();
      const cvData = {
        personalInfo: state.personalInfo,
        summary: state.summary,
        education: state.education,
        workExperience: state.workExperience,
        skills: state.skills,
        achievements: state.achievements,
        projects: state.projects,
        certifications: state.certifications,
        languages: state.languages,
        sectionOrder: state.sectionOrder,
      };

      // Send a POST request to backend to save the resume
      const response = await fetch(`${getEnv('VITE_BACKEND_API_BASE_URL')}/resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify(cvData)
      });

      // If failed, show error message
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to save resume');
      }

      // Success
      await response.json();
      toast.success('CV saved successfully!');
    } catch (error) {
      // Handle and show any error to the user
      toast.error(error.message || 'Failed to save CV. Please try again.');
    } finally {
      // Always reset saving state
      setIsSaving(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isSaving}
      className={`
        bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:ring-2 focus:ring-green-300/60 shadow-xl text-white font-bold rounded-2xl w-full h-full transition-all duration-200 transform hover:scale-[1.04] active:scale-95 flex items-center justify-center gap-2 px-6 py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed glassy-button ${className}
      `}
    >
      {isSaving ? (
        // Show loading spinner while saving
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="whitespace-nowrap text-sm sm:text-base">Saving...</span>
        </>
      ) : (
        // Default button text
        <span className="whitespace-nowrap text-sm sm:text-base">{children}</span>
      )}
    </button>
  );
};

export default SaveButton;
