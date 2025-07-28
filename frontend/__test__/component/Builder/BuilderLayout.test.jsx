import { render, screen } from '@testing-library/react'
import BuilderLayout from '../../../src/components/Builder/BuilderLayout'

describe('BuilderLayout', () => {
  test('renders form and preview props', () => {
    render(
      <BuilderLayout
        form={<div data-testid="form">Form Content</div>}
        preview={<div data-testid="preview">Preview Content</div>}
      />
    )

    expect(screen.getByTestId('form')).toBeInTheDocument()
    expect(screen.getByTestId('preview')).toBeInTheDocument()
  })
})
