import React from 'react'
import { render } from 'react-testing-library'
import AppProvider from './AppProvider.jsx'

describe('AppProvider', () => {
  it('renders correctly', () => {
    const { container } = render(<AppProvider>Hello</AppProvider>)

    expect(container.firstChild.textContent).toBe('Hello')
  })
})
