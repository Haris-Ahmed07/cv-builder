import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Achievements from '../../../src/components/FormSections/Achievements'
import useCVStore from '../../../src/store/cvStore'

jest.mock('../../../src/store/cvStore')

describe('Achievements Component', () => {
  const mockAddAchievement = jest.fn()
  const mockRemoveAchievement = jest.fn()

  beforeEach(() => {
    useCVStore.mockReturnValue({
      achievements: ['Won coding competition'],
      addAchievement: mockAddAchievement,
      removeAchievement: mockRemoveAchievement
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the form and existing achievements', () => {
    render(<Achievements />)

    expect(screen.getByPlaceholderText('Add an achievement *')).toBeInTheDocument()
    expect(screen.getByText('Add Achievement')).toBeInTheDocument()
    expect(screen.getByText('Won coding competition')).toBeInTheDocument()
    expect(screen.getByLabelText('Remove achievement')).toBeInTheDocument()
  })

  it('adds a new achievement on submit', () => {
    render(<Achievements />)

    const input = screen.getByPlaceholderText('Add an achievement *')
    const button = screen.getByText('Add Achievement')

    fireEvent.change(input, { target: { value: 'Built a CV builder app' } })
    fireEvent.click(button)

    expect(mockAddAchievement).toHaveBeenCalledWith('Built a CV builder app')
  })

  it('does not add empty or too long achievement', () => {
    render(<Achievements />)

    const input = screen.getByPlaceholderText('Add an achievement *')
    const button = screen.getByText('Add Achievement')

    fireEvent.change(input, { target: { value: ' ' } })
    fireEvent.click(button)
    expect(mockAddAchievement).not.toHaveBeenCalled()

    const longText = 'a'.repeat(201)
    fireEvent.change(input, { target: { value: longText } })
    fireEvent.click(button)
    expect(mockAddAchievement).not.toHaveBeenCalled()
  })

  it('removes an achievement on clicking remove button', () => {
    render(<Achievements />)

    const removeBtn = screen.getByLabelText('Remove achievement')
    fireEvent.click(removeBtn)

    expect(mockRemoveAchievement).toHaveBeenCalledWith(0)
  })
})
