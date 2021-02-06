import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { GiphyFetch } from '@giphy/js-fetch-api'
import SEO from '../components/atoms/SEO'
import Button from '../components/atoms/Button'
import styles from './404.module.css'

// Famous last words:
// "It's just the 404 page so why not expose the dev API key"
const giphyClient = new GiphyFetch('LfXRwufRyt6PK414G2kKJBv3L8NdnxyR')
const tag = 'cat'

async function getRandomGif() {
  try {
    let response = await giphyClient.random({ tag })
    const gif = response.data.images.original.mp4
    return gif
  } catch (error) {
    console.error(error.message)
  }
}

export default function NotFound() {
  const [gif, setGif] = useState('')

  async function handleClick(e) {
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
    <>
      <SEO />

      <article className={styles.content}>
        <h1>Shenanigans, page not found.</h1>
        <p>
          You might want to check the url, or{' '}
          <Link to={'/'}>go back to the homepage</Link>. Or just check out some{' '}
          {tag} gifs, entirely your choice.
        </p>

        <video className="gif" src={gif} autoPlay loop />

        <div>
          <Button onClick={handleClick}>{`Get another '${tag}' gif`}</Button>
        </div>
      </article>
    </>
  )
}
