import React from 'react'
import { render, screen } from '@testing-library/react'
import ProjectNav from '.'
import projects from '../../__tests__/__fixtures__/projects.json'

describe('ProjectNav', () => {
  it('renders correctly', async () => {
    render(
      <ProjectNav projects={projects} currentSlug="oceanprotocol-market" />
    )
    const item = await screen.findByAltText(projects[0].title)
    expect(item).toBeInTheDocument()
  })
})
