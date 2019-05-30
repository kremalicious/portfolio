import React from 'react'
import { render } from '@testing-library/react'
import { StaticQuery, useStaticQuery } from 'gatsby'
import Footer from './Footer'
import data from '../../../jest/__fixtures__/meta.json'

describe('Header', () => {
  beforeEach(() => {
    StaticQuery.mockImplementation(({ render }) =>
      render({
        ...data,
        portfolioJson: { bugs: '' }
      })
    )
    useStaticQuery.mockImplementation(() => ({ ...data }))
  })

  it('renders correctly', () => {
    const { container } = render(<Footer />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
