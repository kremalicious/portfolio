import React from 'react'
import { render } from '@testing-library/react'
import { StaticQuery } from 'gatsby'
import Home from '../index'
import meta from '../../../jest/__fixtures__/meta.json'
import projects from '../../../jest/__fixtures__/projects.json'
import projectImageFiles from '../../../jest/__fixtures__/projectImageFiles.json'

beforeEach(() => {
  StaticQuery.mockImplementation(({ render }) => render({ ...meta }))
})

describe('Home', () => {
  const data = {
    ...projects,
    ...projectImageFiles
  }

  const pageContext = {
    repos: [
      {
        name: 'Hello'
      }
    ]
  }

  it('renders correctly from data file values', () => {
    const { container } = render(<Home data={data} pageContext={pageContext} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
