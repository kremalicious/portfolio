import React from 'react'
import { render } from '@testing-library/react'
import Repositories from '.'
import repos from '../../__tests__/__fixtures__/repos.json'
import Repo from '../../interfaces/repo'

describe('Repositories', () => {
  it('renders correctly', () => {
    const { container } = render(<Repositories repos={repos as Repo[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('return nothing when no repos are passed', () => {
    const { container } = render(<Repositories repos={null} />)
    expect(container.firstChild).not.toBeInTheDocument()
  })
})
