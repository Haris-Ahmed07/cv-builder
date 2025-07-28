import React from 'react'

const BuilderLayout = ({ form, preview }) => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col md:flex-row h-full w-full gap-4 overflow-hidden">
        <div className="flex-1 h-full overflow-auto">
          {form}
        </div>
        <div className="flex-1 h-full overflow-auto">
          {preview}
        </div>
      </div>
    </div>
  )
}

export default BuilderLayout
