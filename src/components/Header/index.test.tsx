import { render, screen, act } from '@testing-library/react'
import Header from '.'

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
