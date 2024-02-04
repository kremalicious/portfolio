import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders correctly', async () => {
    render(<Header />)

    await screen.findByText('matthias kretschmann')
  })
})
