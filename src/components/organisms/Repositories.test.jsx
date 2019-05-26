import React from 'react'
import { render } from 'react-testing-library'
import Repositories from './Repositories'
import repos from '../../../jest/__fixtures__/repos.json'

describe('Repositories', () => {
  it('renders correctly', () => {
    const { container } = render(<Repositories repos={repos} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
