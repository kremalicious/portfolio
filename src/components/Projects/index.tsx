import ProjectType from '../../types/project'
import ProjectPreview from '../ProjectPreview'
import styles from './index.module.css'

type Props = {
  projects: Partial<ProjectType>[]
}

export default function Projects({ projects }: Props) {
  return (
    <nav className={styles.projects}>
      {projects.length > 0 &&
        projects.map((project, i) => (
          <ProjectPreview
            key={project.slug}
            title={project.title}
            image={project.images[0]}
            // give priority for the first 2 images
            imagePriority={i == 0 || i === 1}
            slug={project.slug}
          />
        ))}
    </nav>
  )
}
