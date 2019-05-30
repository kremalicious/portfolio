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
    const { container, getByTestId } = render(<LogoUnit />)

    expect(container.firstChild).toBeInTheDocument()
    expect(getByTestId('logo-title')).toHaveTextContent(title.toLowerCase())
    expect(getByTestId('logo-tagline')).toHaveTextContent(tagline.toLowerCase())
  })

  it('renders in minimal variant', () => {
    const { container } = render(<LogoUnit minimal={true} />)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild.className).toMatch(/logounit minimal/)
  })
})
