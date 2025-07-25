
import React from 'react'
import BuilderLayout from '../components/Builder/BuilderLayout'
import BuilderForm from '../components/Builder/BuilderForm'
import CVPreview from '../components/CVPreview'
import DownloadButton from '../components/DownloadButton'

const Home = () => {
  return (
    <BuilderLayout
      // Left side: Form for entering CV data
      form={<BuilderForm />}
      // Right side: Live preview section
      preview={
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* Preview container with scrollable content */}
          <div className="bg-white rounded-2xl shadow-xl p-6 h-full overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Preview</h2>
            {/* Renders the CV preview component */}
            <CVPreview />
          </div>
          {/* Download button for the CV */}
          <DownloadButton />
        </div>
      }
    />
  )
}

export default Home
