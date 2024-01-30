import { render, screen } from '@testing-library/react'
import Header from '.'

describe('Header', () => {
  it('renders correctly', async () => {
    render(<Header />)

    await screen.findByText('matthias kretschmann')
    await screen.findAllByText('Lisbon')
  })

  it('renders small', async () => {
    jest.mock('next/navigation', () => ({
      usePathname: jest.fn().mockImplementation(() => '/something')
    }))

    render(<Header />)

    expect(await screen.findByTestId('header')).toHaveClass('small')
  })
})
