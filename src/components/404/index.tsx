'use client'

import { MouseEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '../Button'
import styles from './index.module.css'
import { getRandomGif } from '../../app/actions'
import { usePathname } from 'next/navigation'

const tag = 'cat'

export default function NotFound() {
  const pathname = usePathname()
  const [gif, setGif] = useState<string>()

  async function handleClick(e: MouseEvent) {
    e.preventDefault()
    const gif = await getRandomGif(tag, pathname)
    setGif(gif)
  }

  useEffect(() => {
    async function init() {
      const gif = await getRandomGif(tag)
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

      <video
        className="gif"
        src={gif}
        data-testid={gif || null}
        autoPlay
        loop
      />

      <div>
        <Button onClick={handleClick}>{`Get another '${tag}' gif`}</Button>
      </div>
    </article>
  )
}
