import { describe, it } from 'bun:test'
import { fireEvent, render, screen } from '@testing-library/react'
import mockData from '@tests/__fixtures__/giphy.json'
import NotFoundPage from '@/features/not-found/components/404'

describe('NotFoundPage', () => {
  it('renders correctly', async () => {
    render(<NotFoundPage />)
    await screen.findByText(/Shenanigans, page not found./)
    await screen.findByTestId(mockData.data.images.original.mp4)

    const button = await screen.findByText(`Get another 'cat' gif`)
    fireEvent.click(button)
    await screen.findByTestId(mockData.data.images.original.mp4)
  })
})
