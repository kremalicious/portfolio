import { render, screen } from '@testing-library/react'
import Header from '.'
import { dataLocation } from '../../../tests/__fixtures__/location'

describe('Header', () => {
  it('renders correctly', async () => {
    render(<Header location={dataLocation} />)

    await screen.findByText('matthias kretschmann')
    await screen.findAllByText(dataLocation.now.city)
  })

  it('renders small', async () => {
    render(<Header isSmall />)

    expect(await screen.findByTestId('header')).toHaveClass('small')
  })
})
