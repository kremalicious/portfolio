import ProjectPreview from '../ProjectPreview'
import ProjectType from '../../interfaces/project'
import styles from './index.module.css'

type Props = {
  projects: ProjectType[]
}

export default function Projects({ projects }: Props) {
  return (
    <section className={styles.projects}>
      {projects.length > 0 &&
        projects.map((project) => (
          <ProjectPreview
            key={project.slug}
            title={project.title}
            images={project.images}
            slug={project.slug}
          />
        ))}
    </section>
  )
}
