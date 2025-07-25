import React from 'react'

const BuilderLayout = ({ form, preview }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-6 lg:p-10 overflow-hidden">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-6">
        {form}
        {preview}
      </div>
    </div>
  )
}

export default BuilderLayout
