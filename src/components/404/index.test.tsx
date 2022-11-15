import { act, fireEvent, render, screen } from '@testing-library/react'
import NotFound from '.'

describe('404', () => {
  it('renders correctly', async () => {
    render(<NotFound />)
    expect(screen.getByText(/Shenanigans, page not found./)).toBeInTheDocument()

    await act(async () => {
      const button = await screen.findByText(`Get another 'cat' gif`)
      fireEvent.click(button)
    })
  })
})
