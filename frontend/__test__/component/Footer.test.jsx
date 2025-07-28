import { render, screen } from '@testing-library/react'
import Footer from '../../src/components/Footer'

describe('Footer Component', () => {
  it('renders without crashing', () => {
    render(<Footer />)
    expect(screen.getByText(/CV Builder Pro/)).toBeInTheDocument()
  })

  it('displays the current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })
})
