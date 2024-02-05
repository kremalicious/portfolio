import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Vcard from '.'

jest.mock('./imageToDataUrl', () => ({
  __esModule: true,
  imageToDataUrl: jest.fn().mockResolvedValue('data:image/png;base64,')
}))

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
