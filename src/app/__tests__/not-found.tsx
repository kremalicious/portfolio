import { render, screen } from '@testing-library/react'
import mockData from '../../../tests/__fixtures__/giphy.json'
import Page from '../not-found'

describe('app: /not-found', () => {
  it('renders correctly', async () => {
    render(<Page />)

    await screen.findByTestId(mockData.data.images.original.mp4)
  })
})
