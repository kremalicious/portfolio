import { render } from '@testing-library/react'
import Repository from '../Repository'
import repos from '../../../tests/__fixtures__/repos.json'
import Repo from '../../interfaces/repo'

describe('Repository', () => {
  it('renders correctly', () => {
    const { container } = render(<Repository repo={repos[0]} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('uses html_url as main link for portfolio & blog', () => {
    const repo1 = {
      name: 'portfolio',
      full_name: 'kremalicious/portfolio',
      html_url: 'html_url'
    }

    const { container } = render(<Repository repo={repo1 as Repo} />)
    expect(container.querySelector('h3 > a').getAttribute('href')).toBe(
      repo1.html_url
    )
  })

  it('renders homepage link when provided', () => {
    const repo = {
      name: 'Hello',
      full_name: 'kremalicious/hello',
      homepage: 'hello'
    }

    const { container } = render(<Repository repo={repo as Repo} />)
    expect(container.querySelectorAll('p:last-child a').length).toBe(3)
  })

  it('renders no link without homepage', () => {
    const repo = { name: 'Hello', full_name: 'repo/hello' }

    const { container } = render(<Repository repo={repo as Repo} />)
    expect(container.querySelectorAll('p:last-child a').length).toBe(2)
  })
})
