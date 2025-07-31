import React from 'react'

// Layout component for the CV builder with two columns: form and preview
const BuilderLayout = ({ form, preview }) => {
  return (
    <div className="w-full h-full">
      {/* Use flex to create a responsive layout, switches to row on md screens */}
      <div className="flex flex-col md:flex-row h-full w-full gap-4 overflow-hidden">
        {/* Left side: Form section with scroll enabled */}
        <div className="flex-1 h-full overflow-auto shadow-2xl shadow-gray-800/40 rounded-xl bg-white/30 border-1 border-gray-300">
          {form}
        </div>
        {/* Divider with shadow */}
        <div className="hidden md:block w-2 h-full bg-transparent shadow-2xl shadow-gray-900/60 rounded-full mx-1"></div>
        {/* Right side: Preview section with scroll enabled */}
        <div className="flex-1 h-full overflow-auto shadow-2xl shadow-gray-800/40 rounded-xl bg-white/30 border-1 border-gray-300">
          {preview}
        </div>
      </div>
    </div>
  )
}

export default BuilderLayout
