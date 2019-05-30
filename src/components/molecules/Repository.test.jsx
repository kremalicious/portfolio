import React from 'react'
import { render } from '@testing-library/react'
import Repository from './Repository'
import repos from '../../../jest/__fixtures__/repos.json'

describe('Repository', () => {
  it('renders correctly', () => {
    const { container } = render(<Repository repo={repos[0]} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('uses html_url as main link for portfolio & blog', () => {
    const repo1 = {
      name: 'portfolio',
      html_url: 'html_url'
    }

    const { container } = render(<Repository repo={repo1} />)
    expect(container.querySelector('h1 > a').getAttribute('href')).toBe(
      repo1.html_url
    )
  })

  it('renders homepage link when provided', () => {
    const repo = {
      name: 'Hello',
      homepage: 'hello'
    }

    const { container } = render(<Repository repo={repo} />)
    expect(container.querySelectorAll('p:last-child a').length).toBe(3)
  })

  it('renders no link without homepage', () => {
    const repo = { name: 'Hello' }

    const { container } = render(<Repository repo={repo} />)
    expect(container.querySelectorAll('p:last-child a').length).toBe(2)
  })
})
