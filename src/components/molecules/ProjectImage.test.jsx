import React from 'react'
import { render } from 'react-testing-library'
import ProjectImage from './ProjectImage'
import data from '../../../jest/__fixtures__/projects.json'

describe('ProjectImage', () => {
  it('renders correctly', () => {
    const { node } = data.allProjectsYaml.edges[0]
    const { fluid } = node.img.childImageSharp

    const { container } = render(
      <ProjectImage fluid={fluid} alt={node.title} />
    )

    expect(container.firstChild).toBeInTheDocument()
  })
})
