import React from 'react'
import { render, screen, act } from '@testing-library/react'
import App from '.'

describe('App', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(<App>Hello App</App>)
    })
    await screen.findByText('Hello App')
    await screen.findAllByText('Lisbon')
  })
})
