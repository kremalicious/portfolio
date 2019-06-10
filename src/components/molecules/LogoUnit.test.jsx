import React from 'react'
import { render } from '@testing-library/react'
import { StaticQuery } from 'gatsby'
import LogoUnit from './LogoUnit'
import data from '../../../jest/__fixtures__/meta.json'

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) => render({ ...data }))
})

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
    expect(container.querySelector('.logounit').className).toMatch(
      /logounit minimal/
    )
  })
})
