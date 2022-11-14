import { render, screen } from '@testing-library/react'
import Project from '.'
import project from '../../../tests/__fixtures__/project.json'

describe('Project', () => {
  it('renders correctly from data file values', async () => {
    render(<Project project={project} />)
    const item = await screen.findByText(project.title)
    expect(item).toBeInTheDocument()
  })
})
