import React, { useState, useEffect, useRef } from 'react'
import {
  A4_WIDTH,
  A4_HEIGHT,
  CV_FONT_FAMILY,
  CV_FONT_SIZE,
  CV_TEXT_COLOR,
  CV_LINE_HEIGHT,
  CV_PADDING,
  PDF_SCALE
} from '../constants/cvDimensions'
import CVSections from './CVSections.jsx'

const CVPreview = ({ isPreview = true, className }) => {
  const [scale, setScale] = useState(1)
  const containerRef = useRef(null)

  useEffect(() => {
    // adjust scale based on container size
    const calculateScale = () => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()

      const availableWidth = containerRect.width - 40
      const availableHeight = containerRect.height - 40

      const scaleByWidth = availableWidth / A4_WIDTH
      const scaleByHeight = availableHeight / A4_HEIGHT

      const optimalScale = Math.min(scaleByWidth, scaleByHeight, 1)
      const finalScale = Math.max(optimalScale, 0.3)

      setScale(finalScale)
    }

    calculateScale()
    window.addEventListener('resize', calculateScale)

    // recalculate on container resize
    const resizeObserver = new ResizeObserver(calculateScale)
    resizeObserver.observe(containerRef.current)

    return () => {
      window.removeEventListener('resize', calculateScale)
      resizeObserver.disconnect()
    }
  }, [])

  // shared styles for the CV container
  const cvStyles = {
    width: `${A4_WIDTH}px`,
    height: `${A4_HEIGHT}px`,
    fontFamily: CV_FONT_FAMILY,
    fontSize: CV_FONT_SIZE,
    color: CV_TEXT_COLOR,
    lineHeight: CV_LINE_HEIGHT,
    padding: CV_PADDING,
    boxSizing: 'border-box',
    backgroundColor: 'white',
    ...(isPreview && {
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    })
  }

  // preview mode (responsive scaling)
  if (isPreview) {
    return (
      <div
        ref={containerRef}
        className={`flex justify-center items-center w-full h-full ${className || ''}`}
        style={{ padding: '20px', overflow: 'hidden' }}
      >
        <div
          id="cv-preview"
          style={{
            ...cvStyles,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease-out',
            flexShrink: 0
          }}
        >
          <CVSections />
        </div>
      </div>
    )
  }

  // static mode (PDF export or download)
  return (
    <div className={`flex justify-center items-center ${className || ''}`}>
      <div
        id="cv-preview"
        style={{
          ...cvStyles,
          transform: `scale(${PDF_SCALE})`,
          transformOrigin: 'top center'
        }}
      >
        <CVSections />
      </div>
    </div>
  )
}

export default CVPreview
