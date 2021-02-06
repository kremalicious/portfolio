import React from 'react'
import { render } from '@testing-library/react'
import Resume from '../src/pages/resume'

describe('Resume', () => {
  it('renders correctly from data file values', () => {
    const { container } = render(<Resume />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
