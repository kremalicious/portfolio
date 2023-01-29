import Link from 'next/link'
import ImageType from '../../interfaces/image'
import ProjectImage from '../ProjectImage'
import styles from './index.module.css'

type Props = {
  title: string
  slug: string
  image: ImageType
  imagePriority: boolean
}

export default function ProjectPreview({
  title,
  slug,
  image,
  imagePriority
}: Props) {
  return (
    <Link href={`/${slug}`} className={styles.project} key={slug}>
      <ProjectImage
        image={image}
        alt={`Showcase image for ${title}`}
        sizes="(max-width: 1090px) 100vw, 40vw"
        priority={imagePriority}
      />

      <footer className={styles.meta}>
        <h2 className={styles.title}>{title}</h2>
      </footer>
    </Link>
  )
}
