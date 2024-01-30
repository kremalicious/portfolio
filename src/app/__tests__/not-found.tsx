import { render, screen } from '@testing-library/react'
import Page from '../not-found'
import mockData from '../../../tests/__fixtures__/giphy.json'

describe('app: /not-found', () => {
  it('renders correctly', async () => {
    render(<Page />)

    await screen.findByTestId(mockData.data.images.original.mp4)
  })
})
