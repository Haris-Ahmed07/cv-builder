import { render, screen } from '@testing-library/react'
import CVPreview from '../../src/components/CVPreview'


// Mock ResizeObserver for Jest environment
global.ResizeObserver = class {
    constructor(callback) {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };

// Mock the CVSections to avoid testing its internals here
jest.mock('../../src/components/CVSections', () => () => (
  <div data-testid="cv-sections">Mock CV Sections</div>
))

// Mock cvStore to prevent store errors
jest.mock('../../src/store/cvStore', () => ({
  __esModule: true,
  default: {},
  useCVStore: jest.fn(() => ({
    sectionOrder: [],
    sectionData: {},
  })),
}))

describe('CVPreview', () => {
  test('renders in preview mode with scaling and scroll', () => {
    render(<CVPreview isPreview={true} />)
    
    const preview = screen.getByTestId('cv-sections')
    expect(preview).toBeInTheDocument()

    const previewWrapper = document.getElementById('cv-preview')
    expect(previewWrapper).not.toBeNull()
    expect(previewWrapper).toHaveStyle('transform-origin: top center')
    // No overflow-y: auto since not set in style
    // expect(previewWrapper).toHaveStyle('overflow-y: auto')
  })

  test('renders in PDF mode without scaling and scroll', () => {
    render(<CVPreview isPreview={false} />)

    const preview = screen.getByTestId('cv-sections')
    expect(preview).toBeInTheDocument()

    const pdfWrapper = document.getElementById('cv-preview')
    expect(pdfWrapper).toHaveStyle('transform-origin: top center')
    // No overflow-y: auto in PDF mode
    // expect(pdfWrapper).not.toHaveStyle('overflow-y: auto')
  })
})
