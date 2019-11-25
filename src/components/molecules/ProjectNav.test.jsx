import React from 'react'
import { render } from '@testing-library/react'
import ProjectNav from './ProjectNav'

describe('ProjectNav', () => {
  it('renders correctly', () => {
    const { container } = render(<ProjectNav currentSlug="oceanprotocol" />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
