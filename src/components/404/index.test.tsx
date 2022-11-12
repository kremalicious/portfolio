import { fireEvent, render, screen } from '@testing-library/react'
import NotFound from '.'
import * as Giphy from '@giphy/js-fetch-api'

const giphyResponse = {
  data: {
    images: {
      original: { mp4: 'hello.gif', url: 'hello.gif', width: 100, height: 100 }
    }
  }
} as Giphy.GifResult

jest.mock('@giphy/js-fetch-api')
;(Giphy.GiphyFetch as jest.Mock).mockImplementation(() => ({
  random: jest.fn().mockImplementationOnce(() => giphyResponse)
}))

describe('404', () => {
  it('renders correctly', async () => {
    render(<NotFound />)
    const button = await screen.findByText(`Get another 'cat' gif`)
    fireEvent.click(button)
  })
})
