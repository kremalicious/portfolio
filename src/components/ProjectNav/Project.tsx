import { forwardRef, ForwardedRef } from 'react'
import Link from 'next/link'
import ProjectImage from '../ProjectImage'
import styles from './index.module.css'
import ProjectType from '../../interfaces/project'

export const Project = forwardRef(
  (
    { project }: { project: ProjectType },
    ref: ForwardedRef<HTMLAnchorElement>
  ) => (
    <Link
      className={`${styles.item} ${ref ? styles.current : null}`}
      href={`/${project.slug}`}
      title={project.title}
      ref={ref}
    >
      <ProjectImage
        image={project.images[0]}
        alt={project.title}
        sizes="(max-width: 30rem) 66vw, 33vw"
      />
    </Link>
  )
)

Project.displayName = 'Project'
