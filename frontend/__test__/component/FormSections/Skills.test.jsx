import { render, screen, fireEvent } from '@testing-library/react'
import Skills from '../../../src/components/FormSections/Skills'

const mockAddSkill = jest.fn()
const mockRemoveSkill = jest.fn()

jest.mock('../../../src/store/cvStore', () => ({
  __esModule: true,
  default: () => ({
    skills: ['React', 'Node.js'],
    addSkill: mockAddSkill,
    removeSkill: mockRemoveSkill,
  }),
}))

describe('Skills Component', () => {
  beforeEach(() => {
    mockAddSkill.mockClear()
    mockRemoveSkill.mockClear()
  })

  it('renders input and existing skills', () => {
    render(<Skills />)

    expect(screen.getByPlaceholderText('Enter a skill')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('adds a new skill when form is submitted', () => {
    render(<Skills />)

    fireEvent.change(screen.getByPlaceholderText('Enter a skill'), {
      target: { value: 'TypeScript' },
    })
    fireEvent.click(screen.getByText('Add'))

    expect(mockAddSkill).toHaveBeenCalledWith('TypeScript')
  })

  it('does not add skill if input is empty', () => {
    render(<Skills />)

    fireEvent.click(screen.getByText('Add'))

    expect(mockAddSkill).not.toHaveBeenCalled()
  })

  it('removes a skill when ✕ button is clicked', () => {
    render(<Skills />)

    fireEvent.click(screen.getByLabelText('Remove skill React'))

    expect(mockRemoveSkill).toHaveBeenCalledWith(0)
  })
})
