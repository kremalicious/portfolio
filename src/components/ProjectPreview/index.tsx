import type { ImageType } from '@/types'
import ProjectImage from '../ProjectImage/index.astro'
import styles from './index.module.css'

type Props = {
  title: string
  slug: string
  image: ImageType
}

export default function ProjectPreview({ title, slug, image }: Props) {
  return (
    <a href={`/${slug}`} className={styles.project} key={slug}>
      <ProjectImage
        image={image}
        alt={`Showcase image for ${title}`}
        sizes="(max-width: 1090px) 100vw, 40vw"
      />

      <footer className={styles.meta}>
        <h2 className={styles.title}>{title}</h2>
      </footer>
    </a>
  )
}
