import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DownloadButton from '../../src/components/DownloadButton'

// Mock html2canvas
jest.mock('html2canvas', () => jest.fn())

// Rename variables with mock prefix to fix ReferenceError
const mockSave = jest.fn()
const mockAddImage = jest.fn()
const mockSetCreationDate = jest.fn()
const mockSetLanguage = jest.fn()

jest.mock('jspdf', () => {
  return jest.fn().mockImplementation(() => ({
    addImage: mockAddImage,
    save: mockSave,
    setCreationDate: mockSetCreationDate,
    setLanguage: mockSetLanguage,
  }))
})

describe('DownloadButton', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="cv-preview" style="width: 800px; height: 1120px;">CV Content</div>
    `
    const fakeCanvas = document.createElement('canvas')
    fakeCanvas.width = 800
    fakeCanvas.height = 1120
    fakeCanvas.toDataURL = () => 'data:image/jpeg;base64,mockimage'
    require('html2canvas').mockResolvedValue(fakeCanvas)
  })

  it('renders the button and triggers download', async () => {
    render(<DownloadButton />)
    const button = screen.getByText('Download CV')
    fireEvent.click(button)

    await new Promise((res) => setTimeout(res, 100))

    expect(require('html2canvas')).toHaveBeenCalled()
    expect(mockAddImage).toHaveBeenCalled()
    expect(mockSave).toHaveBeenCalledWith('cv.pdf')
  })
})
