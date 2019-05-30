import React from 'react'
import { render } from '@testing-library/react'
import { StaticQuery, useStaticQuery } from 'gatsby'
import Header from './Header'
import { Provider } from '../../store/createContext'
import data from '../../../jest/__fixtures__/meta.json'

describe('Header', () => {
  beforeEach(() => {
    StaticQuery.mockImplementation(({ render }) => render({ ...data }))
    useStaticQuery.mockImplementation(() => ({ ...data }))
  })

  it('renders correctly', () => {
    const { container } = render(
      <Provider value={{ dark: false, toggleDark: () => null }}>
        <Header />
      </Provider>
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('Availability can be hidden', () => {
    const { container } = render(
      <Provider value={{ dark: false, toggleDark: () => null }}>
        <Header minimal={true} />
      </Provider>
    )
    expect(container.querySelector('.availability')).not.toBeInTheDocument()
  })
})
