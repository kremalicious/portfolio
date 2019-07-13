import React from 'react'
import { render } from '@testing-library/react'
import Repositories from './Repositories'
import repos from '../../../jest/__fixtures__/repos.json'

describe('Repositories', () => {
  it('renders correctly', () => {
    const { container } = render(<Repositories repos={repos} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('return nothing when no repos are passed', () => {
    const { container } = render(<Repositories />)
    expect(container.firstChild).not.toBeInTheDocument()
  })
})
