import { render, screen } from '@testing-library/react'
import projects from '../../../tests/__fixtures__/projects.json'
import ProjectNav from '.'

describe('ProjectNav', () => {
  it('renders correctly', async () => {
    render(
      <ProjectNav projects={projects} currentSlug="oceanprotocol-market" />
    )
    const item = await screen.findByAltText(projects[0].title)
    expect(item).toBeInTheDocument()
  })
})
