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
        width={image.width / 2}
        height={image.height / 2}
        sizes={sizes}
        placeholder="empty"
        blurDataURL={image.blurDataURL}
        quality={85}
      />
    </figure>
  )
}
