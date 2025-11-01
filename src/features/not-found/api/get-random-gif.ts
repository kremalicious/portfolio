import { GiphyFetch } from '@giphy/js-fetch-api'

export async function getRandomGif(tag: string) {
  try {
    const giphyClient = new GiphyFetch(
      import.meta.env.PUBLIC_GIPHY_API_KEY || ''
    )
    const { data } = await giphyClient.random({ tag })
    const gif = data.images.original.mp4
    return gif
  } catch (error: unknown) {
    console.error((error as Error).message)
  }
}
