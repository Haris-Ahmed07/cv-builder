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
      // Convert the CV to a high-res canvas
      const canvas = await html2canvas(cv, {
        backgroundColor: '#ffffff',
        useCORS: true,
        scale: 4 // Increase scale for higher quality
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width, canvas.height] // Match canvas size
      })

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save('cv-preview.pdf')
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
