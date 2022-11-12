import Image from 'next/image'
import ImageType from '../../interfaces/image'
import styles from './index.module.css'

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
  if (!image) return null

  return (
    <figure className={`${styles.imageWrap} ${className || null}`}>
      <Image
        className={styles.image}
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        quality={85}
      />
    </figure>
  )
}
