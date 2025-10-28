import { render, screen } from '@testing-library/react'
import projects from '../../../tests/__fixtures__/projects.json'
import Projects from '.'

describe('Projects', () => {
  it('renders correctly from data file values', async () => {
    render(<Projects projects={projects} />)
    const item = await screen.findByText(projects[0].title)
    expect(item).toBeInTheDocument()
  })
})
