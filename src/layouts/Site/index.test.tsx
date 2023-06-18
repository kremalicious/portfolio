import { render, screen } from '@testing-library/react'
import Site from '.'

describe('Site', () => {
  it('renders without crashing', async () => {
    render(<Site>Hello Site</Site>)

    await screen.findByText('Hello Site')
    await screen.findAllByText('Lisbon')
  })
})
