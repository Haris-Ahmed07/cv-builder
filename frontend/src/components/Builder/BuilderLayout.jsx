import React from 'react'

// Layout component for the CV builder with two columns: form and preview
const BuilderLayout = ({ form, preview }) => {
  return (
    <div className="w-full h-full">
      {/* Use flex to create a responsive layout, switches to row on md screens */}
      <div className="flex flex-col md:flex-row h-full w-full gap-4 overflow-hidden">
        {/* Left side: Form section with scroll enabled */}
        <div className="flex-1 h-full overflow-auto">
          {form}
        </div>
        {/* Right side: Preview section with scroll enabled */}
        <div className="flex-1 h-full overflow-auto">
          {preview}
        </div>
      </div>
    </div>
  )
}

export default BuilderLayout
