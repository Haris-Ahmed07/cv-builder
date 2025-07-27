import React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Button to download the CV preview as a PDF
const DownloadButton = ({ className = '' }) => {
  // Handles the download process
  const handleDownload = async () => {
    const cv = document.getElementById('cv-preview') // Get the CV element
    if (!cv) return

    try {
      // Store original styles
      const originalOverflow = cv.style.overflow
      const originalTransform = cv.style.transform
      const originalBorder = cv.style.border
      
      // Ensure clean capture
      cv.style.overflow = 'visible'
      cv.style.transform = 'none'
      cv.style.border = 'none'  // Remove any borders

      // Convert the CV to a canvas with optimized settings
      const canvas = await html2canvas(cv, {
        backgroundColor: '#ffffff',
        useCORS: true,
        scale: 8, 
        logging: false,
        width: cv.offsetWidth,
        height: cv.offsetHeight,
        windowWidth: cv.scrollWidth,
        windowHeight: cv.scrollHeight,
        // Optimize quality vs size
        imageTimeout: 0,
        removeContainer: true,
        onclone: (clonedDoc) => {
          // Ensure no transforms or animations during capture
          clonedDoc.getElementById('cv-preview').style.transform = 'none';
        }
      })

      // Restore original styles
      cv.style.overflow = originalOverflow
      cv.style.transform = originalTransform
      cv.style.border = originalBorder

      // Define A4 dimensions in pixels at 96 DPI
      const a4Width = 794 // 210mm in pixels at 96 DPI
      const a4Height = 1123 // 297mm in pixels at 96 DPI
      
      // Calculate aspect ratio
      const aspectRatio = canvas.width / canvas.height
      
      // Calculate dimensions to fit A4
      let imgWidth = a4Width - 20 // Add some margin
      let imgHeight = imgWidth / aspectRatio
      
      // If height is too large, scale to fit height instead
      if (imgHeight > a4Height - 20) {
        imgHeight = a4Height - 20
        imgWidth = imgHeight * aspectRatio
      }

      // Center the image on the page
      const xOffset = (a4Width - imgWidth) / 2
      const yOffset = (a4Height - imgHeight) / 2

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [a4Width, a4Height]
      })

      // Convert canvas to image with quality settings
      const imgData = canvas.toDataURL('image/jpeg', 0.8) // Using JPEG with 0.8 quality for better compression
      
      // Add image to PDF with calculated dimensions and position
      pdf.addImage(imgData, 'JPEG', xOffset, yOffset, imgWidth, imgHeight, undefined, 'FAST')
      
      // Further optimize the PDF
      pdf.setCreationDate(new Date())
      pdf.setLanguage('en-US')
      
      // Save with optimized compression
      pdf.save('cv.pdf', { returnPromise: true })
        .then(() => {
          console.log('PDF saved with optimized size')
        })
    } catch (err) {
      console.error('Download error:', err)
    }
  }

  return (
    <button
      onClick={handleDownload}
      className={`
        bg-blue-600 hover:bg-blue-700 
        text-white font-semibold 
        rounded-lg w-full h-full 
        transition-all duration-200 
        transform hover:scale-[1.02] active:scale-[0.98]
        flex items-center justify-center
        ${className}
      `}
    >
      <span className="whitespace-nowrap">Download CV as PDF</span>
    </button>
  )
}

export default DownloadButton
