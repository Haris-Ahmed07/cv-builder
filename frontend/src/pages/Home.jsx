import React from 'react'
import PersonalInfo from '../components/FormSections/PersonalInfo'
import CVPreview from '../components/CVPreview'
import DownloadButton from '../components/DownloadButton'
import EducationForm from '../components/FormSections/Education'
import WorkExperience from '../components/FormSections/WorkExperience'
import Skills from '../components/FormSections/Skills'

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-gray-100 min-h-screen">
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-xl font-bold">CV Form</h2>
        <PersonalInfo />
        <EducationForm />
        <WorkExperience />
        <Skills />
        {/* Add more components like Summary, Education here later */}
      </div>
      <div className="w-full md:w-1/2 space-y-4 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold">Preview</h2>
        <CVPreview />
        <DownloadButton />
      </div>
    </div>
  )
}

export default Home
