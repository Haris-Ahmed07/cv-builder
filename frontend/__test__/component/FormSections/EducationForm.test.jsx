import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import EducationForm from '../../../src/components/FormSections/Education'
import useCVStore from '../../../src/store/cvStore'

jest.mock('../../../src/store/cvStore')

describe('EducationForm Component', () => {
  const mockAddEducation = jest.fn()
  const mockRemoveEducation = jest.fn()

  beforeEach(() => {
    useCVStore.mockReturnValue({
      education: [
        {
          school: 'Harvard',
          degree: 'BSc',
          field: 'Computer Science',
          startDate: '2020-01',
          endDate: '2024-01',
          grade: '3.9',
          description: 'Studied CS fundamentals and ML'
        }
      ],
      addEducation: mockAddEducation,
      removeEducation: mockRemoveEducation
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders all input fields and existing education', () => {
    render(<EducationForm />)

    expect(screen.getByPlaceholderText('School / University *')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Degree *')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Field of Study *')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Grade / GPA *')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Start Date *')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('End Date *')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Description (optional)')).toBeInTheDocument()

    expect(screen.getByText('Harvard — BSc')).toBeInTheDocument()
    expect(screen.getByText(/Computer Science.*2020-01.*2024-01/)).toBeInTheDocument()
    expect(screen.getByText(/GPA: 3.9/)).toBeInTheDocument()
    expect(screen.getByText(/Studied CS fundamentals and ML/)).toBeInTheDocument()
  })

  it('adds new education entry with valid data', () => {
    render(<EducationForm />)

    fireEvent.change(screen.getByPlaceholderText('School / University *'), {
      target: { value: 'MIT' }
    })
    fireEvent.change(screen.getByPlaceholderText('Degree *'), {
      target: { value: 'MSc' }
    })
    fireEvent.change(screen.getByPlaceholderText('Field of Study *'), {
      target: { value: 'AI' }
    })
    fireEvent.change(screen.getByPlaceholderText('Grade / GPA *'), {
      target: { value: '4.0' }
    })
    fireEvent.change(screen.getByPlaceholderText('Start Date *'), {
      target: { value: '2022-01' }
    })
    fireEvent.change(screen.getByPlaceholderText('End Date *'), {
      target: { value: '2024-01' }
    })
    fireEvent.change(screen.getByPlaceholderText('Description (optional)'), {
      target: { value: 'Focused on Artificial Intelligence and Deep Learning' }
    })

    fireEvent.click(screen.getByText('Add Education'))

    expect(mockAddEducation).toHaveBeenCalledWith({
      school: 'MIT',
      degree: 'MSc',
      field: 'AI',
      grade: '4.0',
      startDate: '2022-01',
      endDate: '2024-01',
      description: 'Focused on Artificial Intelligence and Deep Learning'
    })
  })

  it('does not submit if required fields are missing', () => {
    render(<EducationForm />)

    fireEvent.change(screen.getByPlaceholderText('School / University *'), {
      target: { value: '' }
    })
    fireEvent.change(screen.getByPlaceholderText('Degree *'), {
      target: { value: '' }
    })

    fireEvent.click(screen.getByText('Add Education'))

    expect(mockAddEducation).not.toHaveBeenCalled()
  })

  it('removes an education entry on remove button click', () => {
    render(<EducationForm />)

    fireEvent.click(screen.getByText('Remove'))

    expect(mockRemoveEducation).toHaveBeenCalledWith(0)
  })
})
