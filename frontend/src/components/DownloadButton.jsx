import React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { A4_WIDTH, A4_HEIGHT, PDF_PADDING, PDF_CONTENT_WIDTH } from '../constants/cvDimensions'

const DownloadButton = ({ className = '' }) => {
  // Download icon SVG
  const DownloadIcon = (
    <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l4-4m-4 4l-4-4m8 8H8a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2z"/></svg>
  );
  const handleDownload = async () => {
    const cv = document.getElementById('cv-preview')
    if (!cv) return

    try {
      // save the current styles to restore later
      const originalStyles = {
        overflow: cv.style.overflow,
        transform: cv.style.transform,
        border: cv.style.border,
        width: cv.style.width,
        maxWidth: cv.style.maxWidth,
        display: cv.style.display,
        padding: cv.style.padding,
        margin: cv.style.margin,
      }

      // apply temporary clean styles for a good capture
      cv.style.overflow = 'visible'
      cv.style.transform = 'none'
      cv.style.border = 'none'
      cv.style.width = `${A4_WIDTH}px`
      cv.style.maxWidth = `${A4_WIDTH}px`
      cv.style.display = 'block'
      cv.style.padding = PDF_PADDING
      cv.style.margin = '0px'

      // capture the element as canvas
      const canvas = await html2canvas(cv, {
        backgroundColor: '#ffffff',
        useCORS: true,
        scale: 2,
        logging: true,
        width: A4_WIDTH,
        height: A4_HEIGHT,
        windowWidth: A4_WIDTH,
        windowHeight: A4_HEIGHT,
        imageTimeout: 0,
        removeContainer: true,
        onclone: (clonedDoc) => {
          // ensure cloned element also looks clean
          const clonedCV = clonedDoc.getElementById('cv-preview')
          if (clonedCV) {
            clonedCV.style.transform = 'none'
            clonedCV.style.width = `${A4_WIDTH}px`
            clonedCV.style.maxWidth = `${A4_WIDTH}px`
            clonedCV.style.minWidth = `${A4_WIDTH}px`
            clonedCV.style.display = 'block'
            clonedCV.style.padding = PDF_PADDING
            clonedCV.style.margin = '0px'
            clonedCV.style.boxSizing = 'border-box'

            // remove any extra paddings/margins from inside
            const allElements = clonedDoc.querySelectorAll('div, p, span, h1, h2, ul, li, a')
            allElements.forEach((el) => {
              el.style.margin = '0px'
              el.style.paddingLeft = '0px'
              el.style.paddingRight = '0px'
              el.style.boxSizing = 'border-box'
            })
          }
        },
      })

      // revert all styles back to how they were
      cv.style.overflow = originalStyles.overflow
      cv.style.transform = originalStyles.transform
      cv.style.border = originalStyles.border
      cv.style.width = originalStyles.width
      cv.style.maxWidth = originalStyles.maxWidth
      cv.style.display = originalStyles.display
      cv.style.padding = originalStyles.padding
      cv.style.margin = originalStyles.margin

      // create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [A4_WIDTH, A4_HEIGHT],
      })

      const imgData = canvas.toDataURL('image/jpeg', 0.8)

      // draw the image on the pdf with some padding
      pdf.addImage(imgData, 'JPEG', 20, 20, PDF_CONTENT_WIDTH, A4_HEIGHT - 40, undefined, 'FAST')

      // set extra metadata and save
      pdf.setCreationDate(new Date())
      pdf.setLanguage('en-US')
      pdf.save('cv.pdf')
    } catch (err) {
      console.error('Download error:', err)
    }
  }

  return (
    <button
      onClick={handleDownload}
      className={`bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-300/60 shadow-xl text-white font-bold rounded-2xl w-full h-full transition-all duration-200 transform hover:scale-[1.04] active:scale-95 flex items-center justify-center gap-2 px-6 py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed glassy-button ${className}`}
    >
      {DownloadIcon}
      <span className="whitespace-nowrap text-base font-semibold">Download CV</span>
    </button>
  )
}

export default DownloadButton
