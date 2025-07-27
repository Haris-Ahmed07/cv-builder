import React from 'react'
import {
  A4_WIDTH,
  A4_HEIGHT,
  CV_FONT_FAMILY,
  CV_FONT_SIZE,
  CV_TEXT_COLOR,
  CV_LINE_HEIGHT,
  CV_PADDING,
  PREVIEW_SCALE,
  PDF_SCALE
} from '../constants/cvDimensions'
import CVSections from './CVSections.jsx'

const CVPreview = ({ isPreview = true, className }) => {
  // Common styles for both preview and PDF modes
  const cvStyles = {
    width: `${A4_WIDTH}px`,
    height: `${A4_HEIGHT}px`,
    fontFamily: CV_FONT_FAMILY,
    fontSize: CV_FONT_SIZE,
    color: CV_TEXT_COLOR,
    lineHeight: CV_LINE_HEIGHT,
    padding: CV_PADDING,
    boxSizing: 'border-box',
    overflow: 'hidden',
    backgroundColor: 'white',
    ...(isPreview && { // Only add border in preview mode
      border: '1px solid #000',
      borderRadius: '4px'
    })
  };

  if (isPreview) {
    // For preview mode, apply scaling
    return (
      <div className={`flex justify-center items-center w-full h-full ${className || ''}`}>
        <div
          id="cv-preview"
          style={{
            ...cvStyles,
            transform: `scale(${PREVIEW_SCALE})`,
            transformOrigin: 'center',
          }}
        >
          <CVSections />
        </div>
      </div>
    );
  }

  // For PDF download mode, use original dimensions
  return (
    <div className={`flex justify-center items-center ${className || ''}`}>
      <div
        id="cv-preview"
        style={{
          ...cvStyles,
          transform: `scale(${PDF_SCALE})`,
          transformOrigin: 'center',
        }}
      >
        <CVSections />
      </div>
    </div>
  )
}

export default CVPreview
