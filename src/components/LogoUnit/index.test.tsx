import React from 'react'
import { render } from '@testing-library/react'
import LogoUnit from '.'
import data from '../../../_content/resume.json'

describe('LogoUnit', () => {
  it('renders correctly from data file values', () => {
    const { basics } = data
    const { container } = render(<LogoUnit />)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.querySelector('.title')).toHaveTextContent(
      basics.name.toLowerCase()
    )
    expect(container.querySelector('.description')).toHaveTextContent(
      basics.label.toLowerCase()
    )
  })

  it('renders in minimal variant', () => {
    const { container } = render(<LogoUnit minimal={true} />)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.querySelector('.minimal')).toBeInTheDocument()
  })
})
