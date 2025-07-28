import React from 'react'
import { render, screen } from '@testing-library/react'
import BuilderForm from '../../../src/components/Builder/BuilderForm'
import * as cvStore from '../../../src/store/cvStore'

// Mock sectionMap and SectionWrapper
jest.mock('../../../src/components/Builder/sectionMap', () => ({
  section1: () => <div data-testid="section1">Section 1</div>,
  section2: () => <div data-testid="section2">Section 2</div>
}))
jest.mock('../../../src/components/Builder/SectionWrapper', () => ({ children, id }) => (
  <div data-testid={`wrapper-${id}`}>{children}</div>
))

describe('BuilderForm', () => {
  const setSectionOrder = jest.fn()

  beforeEach(() => {
    jest.spyOn(cvStore, 'default').mockReturnValue({
      sectionOrder: ['section1', 'section2'],
      setSectionOrder
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
    setSectionOrder.mockClear()
  })

  test('renders BuilderForm with sections', () => {
    render(<BuilderForm />)
    expect(screen.getByText('Build Your CV')).toBeInTheDocument()
    expect(screen.getByTestId('section1')).toBeInTheDocument()
    expect(screen.getByTestId('section2')).toBeInTheDocument()
  })
})
