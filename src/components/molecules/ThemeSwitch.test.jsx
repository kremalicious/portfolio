import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Context from '../../store/createContext'
import ThemeSwitch from './ThemeSwitch'

describe('ThemeSwitch', () => {
  afterEach(cleanup)
  const toggleDark = jest.fn()

  it('renders correctly', () => {
    const { container } = render(
      <Context.Provider
        value={{ darkMode: false, toggleDark: () => toggleDark }}
      >
        <ThemeSwitch />
      </Context.Provider>
    )

    const switchContainer = container.querySelector('aside')

    expect(switchContainer).toBeInTheDocument()
  })

  it('switches when it is dark', () => {
    const { container } = render(
      <Context.Provider
        value={{ darkMode: true, toggleDark: () => toggleDark }}
      >
        <ThemeSwitch />
      </Context.Provider>
    )

    const toggle = container.querySelector('input')
    expect(toggle).toHaveAttribute('checked')
  })

  it('checkbox can be changed', () => {
    const { container } = render(
      <Context.Provider
        value={{ darkMode: false, toggleDark: () => toggleDark }}
      >
        <ThemeSwitch />
      </Context.Provider>
    )

    const toggle = container.querySelector('input')
    const label = container.querySelector('label')
    expect(toggle.checked).toBeFalsy()
    fireEvent.click(label)
    fireEvent.change(toggle, { target: { checked: true } })
    expect(toggle.checked).toBeTruthy()
  })
})
