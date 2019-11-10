import React from 'react'
import { render } from '@testing-library/react'
import { useStaticQuery } from 'gatsby'
import Footer from './Footer'
import data from '../../../jest/__fixtures__/meta.json'

describe('Footer', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => {
      return {
        ...data,
        portfolioJson: { bugs: '' }
      }
    })
  })

  it('renders correctly', () => {
    const { container } = render(<Footer />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
