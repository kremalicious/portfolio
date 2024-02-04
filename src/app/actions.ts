'use server'

import { revalidatePath } from 'next/cache'
import { GiphyFetch } from '@giphy/js-fetch-api'

export async function getLocation() {
  try {
    const response = await fetch('https://location.kretschmann.io', {
      cache: 'no-store'
    })
    if (!response.ok)
      throw new Error('Network response for location was not ok.')

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error.message)
  }
}

export async function getRandomGif(tag: string, pathname?: string) {
  try {
    // Famous last words:
    // "It's just the 404 page so why not expose the dev API key"
    const giphyClient = new GiphyFetch('LfXRwufRyt6PK414G2kKJBv3L8NdnxyR')
    const { data } = await giphyClient.random({ tag })
    const gif = data.images.original.mp4
    return gif
  } catch (error) {
    console.error(error.message)
  }

  if (pathname) revalidatePath(pathname)
}
