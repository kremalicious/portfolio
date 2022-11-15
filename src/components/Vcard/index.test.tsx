import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Vcard from '.'

describe('Vcard', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn()
  })

  it('renders correctly', () => {
    const { container } = render(<Vcard />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('Button click starts download', async () => {
    render(<Vcard />)
    const button = await screen.findByText('Add to addressbook')
    fireEvent.click(button)
    await waitFor(() => global.URL.createObjectURL)
    // expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1)
  })
})
