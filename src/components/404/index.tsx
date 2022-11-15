import { useEffect, useState, MouseEvent } from 'react'
import Link from 'next/link'
import Button from '../Button'
import styles from './index.module.css'

const tag = 'cat'

async function getRandomGif() {
  const Giphy = await import('@giphy/js-fetch-api')

  try {
    // Famous last words:
    // "It's just the 404 page so why not expose the dev API key"
    const giphyClient = new Giphy.GiphyFetch('LfXRwufRyt6PK414G2kKJBv3L8NdnxyR')
    let response = await giphyClient.random({ tag })
    const gif = response.data.images.original.mp4
    return gif
  } catch (error) {
    console.error(error.message)
  }
}

export default function NotFound() {
  const [gif, setGif] = useState<string>()

  async function handleClick(e: MouseEvent) {
    e.preventDefault()
    const gif = await getRandomGif()
    setGif(gif)
  }

  useEffect(() => {
    async function init() {
      const gif = await getRandomGif()
      setGif(gif)
    }
    init()
  }, [])

  return (
    <article className={styles.content}>
      <h1>Shenanigans, page not found.</h1>
      <p>
        You might want to check the url, or{' '}
        <Link href={'/'}>go back to the homepage</Link>. Or just check out some{' '}
        {tag} gifs, entirely your choice.
      </p>

      <video className="gif" src={gif} autoPlay loop />

      <div>
        <Button onClick={handleClick}>{`Get another '${tag}' gif`}</Button>
      </div>
    </article>
  )
}
