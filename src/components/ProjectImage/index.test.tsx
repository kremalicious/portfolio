import React from 'react'
import { render, screen } from '@testing-library/react'
import ProjectImage from '.'
import project from '../../__tests__/__fixtures__/project.json'

describe('ProjectImage', () => {
  it('renders correctly', async () => {
    render(
      <ProjectImage
        image={project.images[0]}
        alt={project.title}
        sizes="100vw"
      />
    )
    const item = await screen.findByAltText(project.title)
    expect(item).toBeInTheDocument()
  })

  it('returns without errors without image', async () => {
    render(<ProjectImage image={null} alt={project.title} sizes="100vw" />)
  })
})
