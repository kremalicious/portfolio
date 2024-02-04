import { render, screen } from '@testing-library/react'
import Page from '../page'

describe('app: /page', () => {
  it('renders correctly', async () => {
    render(await Page())

    const location = await screen.findByText('Lisbon')
    expect(location).toBeInTheDocument()
  })
})
