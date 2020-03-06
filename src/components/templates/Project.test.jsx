import React from 'react'
import { render } from '@testing-library/react'
import { createHistory, createMemorySource } from '@reach/router'
import Project from './Project'
import project from '../../jest/__fixtures__/project.json'

describe('Project', () => {
  const history = createHistory(createMemorySource('/oceanprotocol'))

  it('renders correctly from data file values', async () => {
    const { container } = render(
      <Project data={project} location={history.location} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
