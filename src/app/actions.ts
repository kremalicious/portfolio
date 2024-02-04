'use server'

import { cache } from 'react'
import { revalidatePath } from 'next/cache'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { getGithubRepos } from '../lib/github'

export const preloadLocation = () => {
  void getLocation()
}

export const getLocation = cache(async () => {
  try {
    const response = await fetch('https://location.kretschmann.io')
    if (!response.ok)
      throw new Error('Network response for location was not ok.')

    const data = await response.json()
    return data
  } catch (error: unknown) {
    console.error((error as Error).message)
  }
})

export const getRepos = cache(async () => {
  try {
    const repos = await getGithubRepos()
    return repos
  } catch (error: unknown) {
    console.error((error as Error).message)
  }
})

export async function getRandomGif(tag: string, pathname?: string) {
  try {
    // Famous last words:
    // "It's just the 404 page so why not expose the dev API key"
    const giphyClient = new GiphyFetch('LfXRwufRyt6PK414G2kKJBv3L8NdnxyR')
    const { data } = await giphyClient.random({ tag })
    const gif = data.images.original.mp4
    return gif
  } catch (error: unknown) {
    console.error((error as Error).message)
  }

  if (pathname) revalidatePath(pathname)
}
