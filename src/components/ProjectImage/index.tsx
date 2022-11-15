import {
  domAnimation,
  LazyMotion,
  m,
  useAnimation,
  useReducedMotion
} from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import ImageType from '../../interfaces/image'
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
  className
}: {
  image: ImageType
  alt: string
  sizes: string
  className?: string
}) {
  const [loaded, setLoaded] = useState(false)
  const animationControls = useAnimation()
  const shouldReduceMotion = useReducedMotion()
  const animationProps = getAnimationProps(shouldReduceMotion)

  useEffect(() => {
    if (loaded && animationControls) {
      animationControls.start('visible')
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
          placeholder="empty"
          // blurDataURL={image.blurDataURL}
          onLoadingComplete={() => setLoaded(true)}
        />
      </m.figure>
    </LazyMotion>
  ) : null
}
