import React from 'react'

// Import all the form sections
import PersonalInfo from '../components/FormSections/PersonalInfo'
import CVPreview from '../components/CVPreview'
import DownloadButton from '../components/DownloadButton'
import EducationForm from '../components/FormSections/Education'
import WorkExperience from '../components/FormSections/WorkExperience'
import Skills from '../components/FormSections/Skills'
import Achievements from '../components/FormSections/Achievements'
import Projects from '../components/FormSections/Projects'
import Certifications from '../components/FormSections/Certifications'

const Home = () => {
  return (
    // Main container with flex layout for responsiveness
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-gray-100 min-h-screen">
      
      {/* Left side: Form inputs */}
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-xl font-bold">CV Form</h2>
        
        {/* Each section collects data for a specific part of the CV */}
        <PersonalInfo />
        <EducationForm />
        <WorkExperience />
        <Skills />
        <Achievements />
        <Projects />
        <Certifications />
      </div>

      {/* Right side: CV live preview and download */}
      <div className="w-full md:w-1/2 space-y-4 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold">Preview</h2>
        <CVPreview />
        <DownloadButton />
      </div>
    </div>
  )
}

export default Home
