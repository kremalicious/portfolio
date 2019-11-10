import React from 'react'
import { render } from '@testing-library/react'
import { StaticQuery, useStaticQuery } from 'gatsby'
import Header from './Header'
import Context from '../../store/createContext'
import data from '../../../jest/__fixtures__/meta.json'

describe('Header', () => {
  beforeEach(() => {
    StaticQuery.mockImplementation(({ render }) => render({ ...data }))
    useStaticQuery.mockImplementation(() => ({ ...data }))
  })

  it('renders correctly', () => {
    const { container } = render(
      <Context.Provider value={{ darkMode: false, toggleDark: () => null }}>
        <Header />
      </Context.Provider>
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('Availability can be hidden', () => {
    const { container } = render(
      <Context.Provider value={{ darkMode: false, toggleDark: () => null }}>
        <Header minimal={true} />
      </Context.Provider>
    )
    expect(container.querySelector('.availability')).not.toBeInTheDocument()
  })
})
