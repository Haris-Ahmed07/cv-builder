import React from 'react'
import BuilderLayout from '../components/Builder/BuilderLayout'
import BuilderForm from '../components/Builder/BuilderForm'
import CVPreview from '../components/CVPreview'
import DownloadButton from '../components/DownloadButton'
import SaveButton from '../components/SaveButton'

const Home = () => {
  return (
    <BuilderLayout
      form={<BuilderForm className="lg:overflow-y-auto lg:max-h-[90vh] lg:sticky lg:top-6" />}
      preview={
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 h-full min-h-[90vh] max-h-[90vh] flex flex-col sticky top-6">
            {/* Top bar inside preview container */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Live Preview</h2>
            </div>
            <div className="flex-1 overflow-y-auto mb-4">
              <CVPreview className="h-full" />
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="w-full h-16">
                  <SaveButton className="w-full h-full text-base" />
                </div>
                <div className="w-full h-16">
                  <DownloadButton className="w-full h-full text-base" />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default Home