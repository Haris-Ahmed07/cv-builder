import React from 'react'
import BuilderLayout from '../components/Builder/BuilderLayout'
import BuilderForm from '../components/Builder/BuilderForm'
import CVPreview from '../components/CVPreview'
import DownloadButton from '../components/DownloadButton'

const Home = () => {
  return (
    <BuilderLayout
      form={<BuilderForm className="lg:overflow-y-auto lg:max-h-[90vh] lg:sticky lg:top-6" />}
      preview={
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 h-full min-h-[90vh] max-h-[90vh] overflow-y-auto sticky top-6">
            {/* Top bar inside preview container */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Live Preview</h2>
              <DownloadButton />
            </div>
            <CVPreview className="h-[calc(100%-3rem)]" />
          </div>
        </div>
      }
    />
  )
}

export default Home
