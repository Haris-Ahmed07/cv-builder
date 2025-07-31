import { render, screen, fireEvent } from '@testing-library/react'
import SectionWrapper from '../../../src/components/Builder/SectionWrapper'

// mock useSortable
jest.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null
  })
}))

describe('SectionWrapper', () => {
  test('toggles section content', () => {
    render(
      <SectionWrapper id="Summary">
        <div data-testid="child">Child Content</div>
      </SectionWrapper>
    )

    // Child should not be visible initially
    expect(screen.queryByTestId('child')).not.toBeInTheDocument()

    // Click the section header (chevron/title area) to expand
    const headerDiv = screen.getByText('Summary').closest('div.cursor-pointer')
    fireEvent.click(headerDiv)

    // Child should now be visible
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
