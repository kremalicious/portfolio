import { render, screen, act } from '@testing-library/react'
import Site from '.'

describe('Site', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(<Site>Hello Site</Site>)
    })
    await screen.findByText('Hello Site')
    await screen.findAllByText('Lisbon')
  })
})
