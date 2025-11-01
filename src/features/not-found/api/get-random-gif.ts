import { GiphyFetch } from '@giphy/js-fetch-api'

export async function getRandomGif(tag: string) {
  try {
    // Famous last words:
    // "It's just the 404 page so why not expose the dev API key"
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
