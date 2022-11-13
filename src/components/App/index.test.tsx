import React from 'react'
import { render, screen, act } from '@testing-library/react'
import App from '.'
import { dataLocation } from '../../__tests__/__fixtures__/location'

jest.mock('@socialgouv/matomo-next')
;(global.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(dataLocation)
  })
)

describe('App', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(<App>Hello App</App>)
    })
    await screen.findByText('Hello App')
    await screen.findAllByText('Lisbon')
  })
})
