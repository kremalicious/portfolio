import { render, fireEvent, waitFor } from '@testing-library/react'
import Vcard from '.'

describe('Vcard', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn()
  })

  it('renders correctly', () => {
    const { container } = render(<Vcard />)
    expect(container.firstChild).toBeInTheDocument()
  })

  // it('Button click starts download', async () => {
  //   const { container } = render(<Vcard />)
  //   fireEvent.click(container.firstChild)
  //   await waitFor(() => global.URL.createObjectURL)
  //   expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1)
  // })
})
