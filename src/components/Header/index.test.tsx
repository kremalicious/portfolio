import React from 'react'
import { render, screen, act } from '@testing-library/react'
import Header from '.'
import { dataLocation } from '../../__tests__/__fixtures__/location'
;(global.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(dataLocation)
  })
)

describe('Header', () => {
  it('renders correctly', async () => {
    await act(async () => {
      render(<Header />)
    })

    await screen.findByText('matthias kretschmann')
    await screen.findAllByText('Lisbon')
  })

  it('renders minimal', async () => {
    render(<Header minimal />)
  })
})
