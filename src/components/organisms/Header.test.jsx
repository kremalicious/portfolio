import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  afterEach(cleanup)

  it('renders correctly', async () => {
    const { container } = render(<Header />)
    await waitFor(() => container.firstChild)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('Availability can be hidden', async () => {
    const { container } = render(<Header minimal={true} />)
    await waitFor(() => container.querySelector('.availability'))
    expect(container.querySelector('.availability')).not.toBeInTheDocument()
  })
})
