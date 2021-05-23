import React from 'react'
import { render, screen } from '@testing-library/react'
import { createHistory, createMemorySource } from '@reach/router'
import Layout from './Layout'

describe('Layout', () => {
  const history = createHistory(createMemorySource('/oceanprotocol'))

  it('renders correctly', () => {
    render(<Layout location={history.location}>Hello Layout</Layout>)
    const element = screen.getByText('Hello Layout')
    expect(element).toBeInTheDocument()
  })
})
