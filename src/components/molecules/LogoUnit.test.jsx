import React from 'react'
import { render } from '@testing-library/react'
import LogoUnit from './LogoUnit'
import data from '../../../tests/__fixtures__/meta.json'

describe('LogoUnit', () => {
  it('renders correctly from data file values', () => {
    const { title, tagline } = data.metaYaml
    const { container } = render(<LogoUnit />)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.querySelector('.title')).toHaveTextContent(
      title.toLowerCase()
    )
    expect(container.querySelector('.description')).toHaveTextContent(
      tagline.toLowerCase()
    )
  })

  it('renders in minimal variant', () => {
    const { container } = render(<LogoUnit minimal={true} />)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.querySelector('.minimal')).toBeInTheDocument()
  })
})
