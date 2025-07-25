import React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Button to download the CV preview as a PDF
const DownloadButton = () => {
  // Handles the download process
  const handleDownload = async () => {
    const cv = document.getElementById('cv-preview') // Get the CV element
    if (!cv) return

    try {
      // Convert the CV to a canvas
      const canvas = await html2canvas(cv, {
        backgroundColor: '#ffffff',
        useCORS: true,
        scale: 2
      })
      // Get image data from canvas
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      // Add image to PDF and save
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save('cv-preview.pdf')
    } catch (err) {
      console.error('Download error:', err)
    }
  }

  return (
    <div className="text-center mt-6">
      <button
        onClick={handleDownload}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download CV as PDF
      </button>
    </div>
  )
}

export default DownloadButton
