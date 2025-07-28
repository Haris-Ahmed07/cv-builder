import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Certifications from '../../../src/components/FormSections/Certifications'
import useCVStore from '../../../src/store/cvStore'

jest.mock('../../../src/store/cvStore')

describe('Certifications Component', () => {
  const mockAddCertification = jest.fn()
  const mockRemoveCertification = jest.fn()

  beforeEach(() => {
    useCVStore.mockReturnValue({
      certifications: [
        { name: 'React Course', issuer: 'Coursera', date: '2023-05-20' }
      ],
      addCertification: mockAddCertification,
      removeCertification: mockRemoveCertification
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders form fields and existing certifications', () => {
    render(<Certifications />)

    expect(screen.getByPlaceholderText('Certification Name *')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Issued By *')).toBeInTheDocument()
    expect(screen.getByText('2023-05-20')).toBeInTheDocument()

    expect(screen.getByText('React Course')).toBeInTheDocument()
    expect(screen.getByText('Coursera')).toBeInTheDocument()
    expect(screen.getByLabelText('Remove certification')).toBeInTheDocument()
  })

  it('submits valid certification data', () => {
    render(<Certifications />)

    fireEvent.change(screen.getByPlaceholderText('Certification Name *'), {
      target: { value: 'Next.js Bootcamp' }
    })
    fireEvent.change(screen.getByPlaceholderText('Issued By *'), {
      target: { value: 'Udemy' }
    })

    // target the input of type date directly
    fireEvent.change(screen.getByDisplayValue(''), {
      target: { value: '2024-01-01' }
    })

    fireEvent.click(screen.getByText('Add Certification'))

    expect(mockAddCertification).toHaveBeenCalledWith({
      name: 'Next.js Bootcamp',
      issuer: 'Udemy',
      date: '2024-01-01'
    })
  })

  it('does not submit if fields are incomplete', () => {
    render(<Certifications />)

    fireEvent.change(screen.getByPlaceholderText('Certification Name *'), {
      target: { value: 'Only Name' }
    })

    fireEvent.click(screen.getByText('Add Certification'))

    expect(mockAddCertification).not.toHaveBeenCalled()
  })

  it('removes certification when remove button is clicked', () => {
    render(<Certifications />)

    fireEvent.click(screen.getByLabelText('Remove certification'))

    expect(mockRemoveCertification).toHaveBeenCalledWith(0)
  })
})
