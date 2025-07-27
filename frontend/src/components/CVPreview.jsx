import React from 'react'
import {
  CV_WIDTH,
  CV_HEIGHT,
  PREVIEW_MAX_WIDTH,
  PREVIEW_MAX_HEIGHT,
  PREVIEW_SCALE,
  SCALE,
  PREVIEW_BACKGROUND,
  CV_FONT_FAMILY,
  CV_FONT_SIZE,
  CV_TEXT_COLOR,
  CV_LINE_HEIGHT,
  CV_PADDING
} from '../constants/cvDimensions'
import CVSections from './CVSections.jsx'

const CVPreview = ({ isPreview = true, className }) => {
  if (isPreview) {
    // For preview mode, use responsive sizing
    return (
      <div
        className={`flex justify-center items-center w-full h-full ${className || ''}`}
        style={{
          background: PREVIEW_BACKGROUND,
          overflow: 'hidden',
          position: 'relative',
          maxWidth: PREVIEW_MAX_WIDTH,
          maxHeight: PREVIEW_MAX_HEIGHT
        }}
      >
        <div
          id="cv-preview"
          className="bg-white border border-black rounded"
          style={{
            transform: `scale(${PREVIEW_SCALE})`,
            transformOrigin: 'center',
            width: `${CV_WIDTH}px`,
            height: `${CV_HEIGHT}px`,
            fontFamily: CV_FONT_FAMILY,
            fontSize: CV_FONT_SIZE,
            color: CV_TEXT_COLOR,
            lineHeight: CV_LINE_HEIGHT,
            padding: CV_PADDING,
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}
        >
          <CVSections />
        </div>
      </div>
    )
  }

  // For PDF download mode, use original dimensions
  return (
    <div
      className={`flex justify-center items-center ${className || ''}`}
      style={{
        width: `${CV_WIDTH}px`,
        height: `${CV_HEIGHT}px`,
        background: PREVIEW_BACKGROUND,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div
        id="cv-preview"
        className="bg-white border border-black rounded"
        style={{
          transform: `scale(${SCALE})`,
          transformOrigin: 'center',
          width: `${CV_WIDTH}px`,
          height: `${CV_HEIGHT}px`,
          fontFamily: CV_FONT_FAMILY,
          fontSize: CV_FONT_SIZE,
          color: CV_TEXT_COLOR,
          lineHeight: CV_LINE_HEIGHT,
          padding: CV_PADDING,
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