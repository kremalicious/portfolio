import Link from 'next/link'
import styles from './index.module.css'
import Icon from '../Icon'
import ProjectImage from '../ProjectImage'
import ImageType from '../../interfaces/image'

type Props = {
  title: string
  slug: string
  images: ImageType[]
}

export default function ProjectPreview({ title, slug, images }: Props) {
  const imageCount = images?.length

  return (
    <Link href={`/${slug}`} className={styles.project} key={slug}>
      <h1 className={styles.title}>{title}</h1>
      <ProjectImage
        image={images[0]}
        alt={title}
        sizes="(max-width: 1090px) 100vw, 40vw"
      />

      {imageCount > 1 && (
        <small
          className={styles.imageCount}
          title={`${imageCount} project images`}
        >
          <Icon name="Image" /> {imageCount}
        </small>
      )}
    </Link>
  )
}
