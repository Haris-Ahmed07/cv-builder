import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import WorkExperience from '../../../src/components/FormSections/WorkExperience'

const mockAddWorkExperience = jest.fn()
const mockRemoveWorkExperience = jest.fn()

jest.mock('../../../src/store/cvStore', () => ({
  __esModule: true,
  default: () => ({
    workExperience: [
      {
        title: 'Frontend Developer',
        company: 'Tech Co',
        startDate: '2022-01',
        endDate: '2023-01',
        description: 'Built UI components and pages',
      },
    ],
    addWorkExperience: mockAddWorkExperience,
    removeWorkExperience: mockRemoveWorkExperience,
  }),
}))

describe('WorkExperience Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders existing work experience', () => {
    render(<WorkExperience />)

    expect(screen.getByText('Frontend Developer at Tech Co')).toBeInTheDocument()
    expect(screen.getByText('2022-01 - 2023-01')).toBeInTheDocument()
    expect(screen.getByText('Built UI components and pages')).toBeInTheDocument()
  })

  it('calls removeWorkExperience on remove button click', () => {
    render(<WorkExperience />)

    fireEvent.click(screen.getByText('Remove'))
    expect(mockRemoveWorkExperience).toHaveBeenCalledWith(0)
  })

  it('adds new experience when form is filled and submitted', () => {
    render(<WorkExperience />)

    fireEvent.change(screen.getByPlaceholderText('Job Title'), {
      target: { value: 'Backend Developer' },
    })
    fireEvent.change(screen.getByPlaceholderText('Company'), {
      target: { value: 'Server Inc' },
    })
    fireEvent.change(screen.getByPlaceholderText('Start Date *'), {
      target: { value: '2021-05' },
    })
    fireEvent.change(screen.getByPlaceholderText('End Date *'), {
      target: { value: '2022-05' },
    })
    fireEvent.change(screen.getByPlaceholderText('Description *'), {
      target: { value: 'Worked on APIs and backend logic' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Add Experience' }))

    expect(mockAddWorkExperience).toHaveBeenCalledWith({
      title: 'Backend Developer',
      company: 'Server Inc',
      startDate: '2021-05',
      endDate: '2022-05',
      description: 'Worked on APIs and backend logic',
    })
  })

  it('prevents adding experience if form is incomplete', () => {
    render(<WorkExperience />)

    fireEvent.change(screen.getByPlaceholderText('Job Title'), {
      target: { value: '' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add Experience' }))

    expect(mockAddWorkExperience).not.toHaveBeenCalled()
  })

  it('limits description character count to 400', () => {
    render(<WorkExperience />)

    const textarea = screen.getByPlaceholderText('Description *')
    const longText = 'a'.repeat(401)

    fireEvent.change(textarea, { target: { value: longText } })

    expect(textarea.value.length).toBeLessThanOrEqual(400)
  })
})
