import React from 'react'
import { render } from 'react-testing-library'
import AppProvider from '../../store/provider'
import ThemeSwitch from './ThemeSwitch'

describe('ThemeSwitch', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <AppProvider>
        <ThemeSwitch />
      </AppProvider>
    )

    expect(getByTestId('theme-switch')).toBeInTheDocument()
    expect(getByTestId('theme-switch').nodeName).toBe('ASIDE')
  })
})
