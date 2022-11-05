import React from 'react'
import { render, screen } from '@testing-library/react'
import { createHistory, createMemorySource } from '@reach/router'
import Layout from './Layout'

describe('Layout', () => {
  const history = createHistory(createMemorySource('/oceanprotocol'))

  it('renders correctly', async () => {
    render(<Layout location={history.location}>Hello Layout</Layout>)
    const element = await screen.findByText('Hello Layout')
    expect(element).toBeInTheDocument()
  })
})
