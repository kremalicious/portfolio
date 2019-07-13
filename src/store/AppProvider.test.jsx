import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { LocalStorageMock } from '@react-mock/localstorage'
import AppProvider from './AppProvider.jsx'
import { Consumer } from './createContext.jsx'

describe('AppProvider', () => {
  it('renders correctly', () => {
    const { container } = render(<AppProvider>Hello</AppProvider>)

    expect(container.firstChild.textContent).toBe('Hello')
  })

  it('renders with dark detected in localStorage', () => {
    const { getByTestId } = render(
      <LocalStorageMock items={{ dark: 'true' }}>
        <AppProvider>
          <Consumer>
            {state => (
              <button data-testid="toggle" onClick={() => state.toggleDark()}>
                Toggle
              </button>
            )}
          </Consumer>
        </AppProvider>
      </LocalStorageMock>
    )
    fireEvent.click(getByTestId('toggle'))
  })

  it('renders with light detected in localStorage', () => {
    render(
      <LocalStorageMock items={{ dark: 'false' }}>
        <AppProvider>Hello</AppProvider>
      </LocalStorageMock>
    )
  })
})
