import React from 'react'
import { render } from '@testing-library/react'
import ProjectTechstack from './ProjectTechstack'

describe('ProjectTechstack', () => {
  const techstack = ['CSS']

  it('renders correctly', () => {
    const { container } = render(<ProjectTechstack techstack={techstack} />)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.querySelector('li').textContent).toBe('CSS')
  })
})
