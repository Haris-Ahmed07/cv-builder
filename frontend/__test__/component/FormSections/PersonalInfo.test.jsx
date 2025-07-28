import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import PersonalInfo from '../../../src/components/FormSections/PersonalInfo'
import useCVStore from '../../../src/store/cvStore'

jest.mock('../../../src/store/cvStore')

describe('PersonalInfo Component', () => {
  const mockUpdatePersonalInfo = jest.fn()

  beforeEach(() => {
    useCVStore.mockReturnValue({
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        github: '',
      },
      updatePersonalInfo: mockUpdatePersonalInfo
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders all personal info input fields', () => {
    render(<PersonalInfo />)

    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('GitHub')).toBeInTheDocument()
  })

  it('updates name and validates correctly', async () => {
    render(<PersonalInfo />)

    const nameInput = screen.getByPlaceholderText('Full Name')
    fireEvent.change(nameInput, { target: { value: 'John123' } })
    fireEvent.blur(nameInput)

    expect(mockUpdatePersonalInfo).toHaveBeenCalledWith({ name: 'John' })

    const error = await screen.findByText('Name should contain only alphabets and spaces')
    expect(error).toBeInTheDocument()
  })
})
