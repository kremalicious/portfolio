'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  LazyMotion,
  domAnimation,
  m,
  useAnimation,
  useReducedMotion
} from 'framer-motion'
import ImageType from '../../types/image'
import { getAnimationProps } from '../Transitions'
import styles from './index.module.css'

const animationVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 }
}

export default function ProjectImage({
  image,
  alt,
  sizes,
  className,
  priority = false
}: {
  image: ImageType
  alt: string
  sizes: string
  className?: string
  priority?: boolean
}) {
  const [loaded, setLoaded] = useState(false)
  const animationControls = useAnimation()
  const shouldReduceMotion = useReducedMotion()
  const animationProps = getAnimationProps(shouldReduceMotion)

  useEffect(() => {
    if (loaded && animationControls) {
      animationControls.start('enter')
    }
  }, [loaded, animationControls])

  return image ? (
    <LazyMotion features={domAnimation}>
      <m.figure
        variants={animationVariants}
        {...animationProps}
        transition={{ ease: 'easeOut', duration: 1 }}
        className={`${styles.imageWrap} ${className || null}`}
      >
        <Image
          className={styles.image}
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          quality={85}
          priority={priority}
          placeholder="empty"
          // blurDataURL={image.blurDataURL}
          onLoad={() => setLoaded(true)}
        />
      </m.figure>
    </LazyMotion>
  ) : null
}
