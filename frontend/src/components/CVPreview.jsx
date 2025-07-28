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
  
  // Calculate responsive scale based on container size
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return
      
      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      
      // Get available space (with some padding for better UX)
      const availableWidth = containerRect.width - 40 // 20px padding on each side
      const availableHeight = containerRect.height - 40 // 20px padding on top/bottom
      
      // Calculate scale based on both width and height constraints
      const scaleByWidth = availableWidth / A4_WIDTH
      const scaleByHeight = availableHeight / A4_HEIGHT
      
      // Use the smaller scale to ensure CV fits completely
      const optimalScale = Math.min(scaleByWidth, scaleByHeight, 1) // Max scale of 1
      
      // Set minimum scale to prevent CV from becoming too small
      const finalScale = Math.max(optimalScale, 0.3)
      
      setScale(finalScale)
    }
    
    // Calculate initial scale
    calculateScale()
    
    // Recalculate on window resize
    const handleResize = () => {
      calculateScale()
    }
    
    window.addEventListener('resize', handleResize)
    
    // Use ResizeObserver for more accurate container size changes
    const resizeObserver = new ResizeObserver(calculateScale)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }
    
    return () => {
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()
    }
  }, [])

  // Common styles for both preview and PDF modes
  const cvStyles = {
    width: `${A4_WIDTH}px`,
    minHeight: `${A4_HEIGHT}px`, // Changed to minHeight to allow content expansion
    fontFamily: CV_FONT_FAMILY,
    fontSize: CV_FONT_SIZE,
    color: CV_TEXT_COLOR,
    lineHeight: CV_LINE_HEIGHT,
    padding: CV_PADDING,
    boxSizing: 'border-box',
    backgroundColor: 'white',
    ...(isPreview && { // Only add border and scroll in preview mode
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      maxHeight: `${A4_HEIGHT}px`, // Maintain A4 height constraint
      overflowY: 'auto', // Add vertical scroll when content exceeds height
      overflowX: 'hidden' // Hide horizontal scroll
    }),
    ...(!isPreview && {
      overflow: 'visible' // For PDF mode, allow content to flow naturally
    })
  }

  if (isPreview) {
    // For preview mode, apply responsive scaling
    return (
      <div 
        ref={containerRef}
        className={`flex justify-center items-center w-full xs:h-content md:h-full min-h-0 ${className || ''}`}
        style={{ 
          padding: '20px',
          overflow: 'hidden'
        }}
      >
        <div
          id="cv-preview"
          style={{
            ...cvStyles,
            transform: `scale(${scale})`,
            transformOrigin: 'center',
            transition: 'transform 0.2s ease-out',
            flexShrink: 0
          }}
          className="custom-scrollbar " // Add custom scrollbar styling
        >
          <CVSections />
        </div>
      </div>
    )
  }

  // For PDF download mode, use original dimensions with PDF scale
  return (
    <div className={`flex justify-center items-center  ${className || ''}`}>
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