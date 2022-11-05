import React from 'react'
import { render, screen } from '@testing-library/react'
import { createHistory, createMemorySource } from '@reach/router'
import Project from '../src/pages/{ProjectsYaml.slug}'
import project from './__fixtures__/project.json'

describe('Project', () => {
  const history = createHistory(createMemorySource('/oceanprotocol'))

  it('renders correctly from data file values', async () => {
    render(<Project data={project} location={history.location} />)

    const item = await screen.findByText('Ocean Protocol v1')
    expect(item).toBeInTheDocument()
  })
})
