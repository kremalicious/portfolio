import type { ImageType } from '@/types'
import { render, screen } from '@testing-library/react'
import project from '@tests/__fixtures__/project.json'
import ProjectImage from '.'

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
    render(
      <ProjectImage
        image={null as unknown as ImageType}
        alt={project.title}
        sizes="100vw"
      />
    )
  })
})
