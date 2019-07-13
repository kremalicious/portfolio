import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { Provider } from '../../store/createContext'
import ThemeSwitch from './ThemeSwitch'

describe('ThemeSwitch', () => {
  afterEach(cleanup)
  const toggleDark = jest.fn()

  it('renders correctly', () => {
    const { container } = render(
      <Provider value={{ dark: false, toggleDark: () => toggleDark }}>
        <ThemeSwitch />
      </Provider>
    )

    const switchContainer = container.querySelector('aside')

    expect(switchContainer).toBeInTheDocument()
  })

  it('switches when it is dark', () => {
    const { container } = render(
      <Provider value={{ dark: true, toggleDark: () => toggleDark }}>
        <ThemeSwitch />
      </Provider>
    )

    const toggle = container.querySelector('input')
    expect(toggle).toHaveAttribute('checked')
  })

  it('checkbox can be changed', () => {
    const { container } = render(
      <Provider value={{ dark: false, toggleDark: () => toggleDark }}>
        <ThemeSwitch />
      </Provider>
    )

    const toggle = container.querySelector('input')
    const label = container.querySelector('label')
    expect(toggle.checked).toBeFalsy()
    fireEvent.click(label)
    fireEvent.change(toggle, { target: { checked: true } })
    expect(toggle.checked).toBeTruthy()
  })
})
