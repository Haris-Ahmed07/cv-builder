import { render, screen, fireEvent } from '@testing-library/react'
import Projects from '../../../src/components/FormSections/Projects'

// mock Zustand store with factory pattern
const mockAddProject = jest.fn()
const mockRemoveProject = jest.fn()

jest.mock('../../../src/store/cvStore', () => ({
  __esModule: true,
  default: () => ({
    projects: [
      {
        title: 'Test Project',
        description: 'This is a test project',
        techStack: 'React, Node.js',
        link: 'https://example.com',
      },
    ],
    addProject: mockAddProject,
    removeProject: mockRemoveProject,
  }),
}))

describe('Projects Component', () => {
  beforeEach(() => {
    mockAddProject.mockClear()
    mockRemoveProject.mockClear()
  })

  it('renders all input fields and existing project', () => {
    render(<Projects />)

    expect(screen.getByPlaceholderText('Project Title')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tech Stack (e.g., React, Node.js) *')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Project Link (optional)')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Project Description *')).toBeInTheDocument()

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('React, Node.js')).toBeInTheDocument()
    expect(screen.getByText('This is a test project')).toBeInTheDocument()
  })

  it('adds new project on valid form submission', () => {
    render(<Projects />)

    fireEvent.change(screen.getByPlaceholderText('Project Title'), {
      target: { value: 'New Project' },
    })
    fireEvent.change(screen.getByPlaceholderText('Tech Stack (e.g., React, Node.js) *'), {
      target: { value: 'Vue, Firebase' },
    })
    fireEvent.change(screen.getByPlaceholderText('Project Description *'), {
      target: { value: 'Some description here' },
    })
    fireEvent.click(screen.getByText('Add Project'))

    expect(mockAddProject).toHaveBeenCalledWith({
      title: 'New Project',
      techStack: 'Vue, Firebase',
      description: 'Some description here',
      link: '',
    })
  })

  it('does not submit if required fields are missing', () => {
    render(<Projects />)

    fireEvent.click(screen.getByText('Add Project'))
    expect(mockAddProject).not.toHaveBeenCalled()
  })

  it('removes a project when remove button is clicked', () => {
    render(<Projects />)

    fireEvent.click(screen.getByText('Remove'))
    expect(mockRemoveProject).toHaveBeenCalledWith(0)
  })

  it('updates character count while typing description', () => {
    render(<Projects />)

    const descInput = screen.getByPlaceholderText('Project Description *')
    fireEvent.change(descInput, { target: { value: '12345' } })

    expect(screen.getByText('5/300 characters')).toBeInTheDocument()
  })
})
