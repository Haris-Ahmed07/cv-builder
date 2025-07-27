import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { A4_WIDTH, A4_HEIGHT, PDF_PADDING, PDF_CONTENT_WIDTH } from '../constants/cvDimensions';

const DownloadButton = ({ className = '' }) => {
  const handleDownload = async () => {
    const cv = document.getElementById('cv-preview');
    if (!cv) return;

    try {
      // Store original styles
      const originalStyles = {
        overflow: cv.style.overflow,
        transform: cv.style.transform,
        border: cv.style.border,
        width: cv.style.width,
        maxWidth: cv.style.maxWidth,
        display: cv.style.display,
        padding: cv.style.padding,
        margin: cv.style.margin,
      };

      // Set styles for clean capture
      cv.style.overflow = 'visible';
      cv.style.transform = 'none';
      cv.style.border = 'none';
      cv.style.width = `${A4_WIDTH}px`;
      cv.style.maxWidth = `${A4_WIDTH}px`;
      cv.style.display = 'block';
      cv.style.padding = PDF_PADDING;
      cv.style.margin = '0px';

      // Convert the CV to a canvas
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
          const clonedCV = clonedDoc.getElementById('cv-preview');
          if (clonedCV) {
            clonedCV.style.transform = 'none';
            clonedCV.style.width = `${A4_WIDTH}px`;
            clonedCV.style.maxWidth = `${A4_WIDTH}px`;
            clonedCV.style.minWidth = `${A4_WIDTH}px`;
            clonedCV.style.display = 'block';
            clonedCV.style.padding = PDF_PADDING;
            clonedCV.style.margin = '0px';
            clonedCV.style.boxSizing = 'border-box';
            // Reset all margins and paddings for child elements
            const allElements = clonedDoc.querySelectorAll('div, p, span, h1, h2, ul, li, a');
            allElements.forEach((el) => {
              el.style.margin = '0px';
              el.style.paddingLeft = '0px';
              el.style.paddingRight = '0px';
              el.style.boxSizing = 'border-box';
            });
          }
        },
      });

      // Log canvas size for debugging
      console.log('Canvas size:', canvas.width, 'x', canvas.height);

      // Restore original styles
      cv.style.overflow = originalStyles.overflow;
      cv.style.transform = originalStyles.transform;
      cv.style.border = originalStyles.border;
      cv.style.width = originalStyles.width;
      cv.style.maxWidth = originalStyles.maxWidth;
      cv.style.display = originalStyles.display;
      cv.style.padding = originalStyles.padding;
      cv.style.margin = originalStyles.margin;

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [A4_WIDTH, A4_HEIGHT],
      });

      // Convert canvas to image
      const imgData = canvas.toDataURL('image/jpeg', 0.8);

      // Add image to PDF with equal margins
      pdf.addImage(imgData, 'JPEG', 20, 20, PDF_CONTENT_WIDTH, A4_HEIGHT - 40, undefined, 'FAST');

      // Optimize and save PDF
      pdf.setCreationDate(new Date());
      pdf.setLanguage('en-US');
      pdf.save('cv.pdf');
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={`
        bg-indigo-600 hover:bg-indigo-700 
        text-white font-semibold 
        rounded-lg w-full h-full 
        transition-all duration-200 
        transform hover:scale-[1.02] active:scale-[0.98]
        flex items-center justify-center
        disabled:opacity-70 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <span className="whitespace-nowrap">Download CV as PDF</span>
    </button>
  );
};

export default DownloadButton;