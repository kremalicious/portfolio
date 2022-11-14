import { render, screen, act } from '@testing-library/react'
import Header from '.'
import { dataLocation } from '../../../tests/__fixtures__/location'
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

  it('renders small', async () => {
    render(<Header small />)
  })
})
