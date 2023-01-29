import { ForwardedRef, forwardRef } from 'react'
import Link from 'next/link'
import ProjectType from '../../interfaces/project'
import ProjectImage from '../ProjectImage'
import styles from './index.module.css'

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
