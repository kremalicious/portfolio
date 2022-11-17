import { render, screen, act } from '@testing-library/react'
import Site from '.'
import { dataLocation } from '../../../tests/__fixtures__/location'
;(global.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(dataLocation)
  })
)

describe('Site', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(<Site>Hello Site</Site>)
    })
    await screen.findByText('Hello Site')
    await screen.findAllByText('Lisbon')
  })
})
