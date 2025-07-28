import { render, screen, fireEvent } from '@testing-library/react'
import Summary from '../../../src/components/FormSections/Summary'

const mockSetSummary = jest.fn()

jest.mock('../../../src/store/cvStore', () => ({
    __esModule: true,
    default: () => ({
        summary: 'Existing summary text',
        setSummary: mockSetSummary,
    }),
}))

describe('Summary Component', () => {
    beforeEach(() => {
        mockSetSummary.mockClear()
    })

    it('renders textarea with existing summary and character count', () => {
        render(<Summary />)

        expect(screen.getByPlaceholderText('Write a short summary about yourself...')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Existing summary text')).toBeInTheDocument()
        const initialSummary = 'Existing summary text'
        jest.mock('../../../src/store/cvStore', () => ({
            __esModule: true,
            default: () => ({
                summary: initialSummary,
                setSummary: mockSetSummary,
            }),
        }))

        expect(screen.getByText(/characters/)).toHaveTextContent(`${initialSummary.length}/600 characters`)

  })

it('updates summary when user types', () => {
    render(<Summary />)

    const textarea = screen.getByPlaceholderText('Write a short summary about yourself...')
    fireEvent.change(textarea, { target: { value: 'New summary content' } })

    expect(mockSetSummary).toHaveBeenCalledWith('New summary content')
})

it('does not allow more than 600 characters', () => {
    render(<Summary />)

    const longText = 'a'.repeat(601)
    const textarea = screen.getByPlaceholderText('Write a short summary about yourself...')
    fireEvent.change(textarea, { target: { value: longText } })

    expect(mockSetSummary).not.toHaveBeenCalled()
})
})
