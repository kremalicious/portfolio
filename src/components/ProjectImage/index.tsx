import Image from 'next/image'
import ImageType from '../../types/image'
import styles from './index.module.css'

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
  return image ? (
    <figure className={`${styles.imageWrap} ${className || null}`}>
      <Image
        className={styles.image}
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        quality={85}
        priority={priority}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
      />
    </figure>
  ) : null
}
