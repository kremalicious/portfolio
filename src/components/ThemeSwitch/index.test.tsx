import { render, fireEvent, cleanup, waitFor } from '@testing-library/react'
import ThemeSwitch from '.'

describe('ThemeSwitch', () => {
  afterEach(cleanup)

  it('renders correctly', async () => {
    const { container } = render(<ThemeSwitch />)
    await waitFor(() => container.querySelector('aside'))
    expect(container.querySelector('aside')).toBeInTheDocument()
  })

  it('checkbox can be changed', async () => {
    const { container } = render(<ThemeSwitch />)

    const toggle = container.querySelector('input')
    const label = container.querySelector('label')
    fireEvent.click(label)
    fireEvent.change(toggle, { target: { checked: true } })
  })
})
