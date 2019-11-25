import React from 'react'
import { render } from '@testing-library/react'
import { createHistory, createMemorySource } from '@reach/router'
import Layout from './Layout'

describe('Layout', () => {
  const history = createHistory(createMemorySource('/oceanprotocol'))

  it('renders correctly', () => {
    const { container } = render(
      <Layout location={history.location}>Hello</Layout>
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
