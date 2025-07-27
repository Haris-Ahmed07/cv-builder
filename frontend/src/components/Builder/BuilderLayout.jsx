import React from 'react'

const BuilderLayout = ({ form, preview }) => {
  return (
    <div className="w-full h-full ">
      <div className="h-full w-full flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2 h-full">
          {form}
        </div>
        <div className="w-full lg:w-1/2 h-full">
          {preview}
        </div>
      </div>
    </div>
  )
}

export default BuilderLayout
