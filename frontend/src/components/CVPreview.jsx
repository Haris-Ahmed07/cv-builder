import React from 'react'
import {
  CV_WIDTH,
  CV_HEIGHT,
  CONTAINER_WIDTH,
  CONTAINER_HEIGHT,
  SCALE
} from '../constants/cvDimensions'
import CVSections from './CVSections.jsx'

const CVPreview = () => {
  return (
    <div
      className="flex justify-center items-center"
      style={{
        width: `${CONTAINER_WIDTH}px`,
        height: `${CONTAINER_HEIGHT}px`,
        background: '#f5f5f5',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div
        id="cv-preview"
        className="bg-white border border-black rounded absolute top-0 left-0 origin-top-left"
        style={{
          transform: `scale(${SCALE})`,
          transformOrigin: 'top left',
          width: `${CV_WIDTH}px`,
          height: `${CV_HEIGHT}px`,
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '9px',
          color: '#000',
          lineHeight: '1.2',
          padding: '24px',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        <CVSections />
      </div>
    </div>
  )
}

export default CVPreview
