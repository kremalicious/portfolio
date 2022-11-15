import ProjectTechstack from './Techstack'
import ProjectLinks from './Links'
import type ImageType from '../../interfaces/image'
import type ProjectType from '../../interfaces/project'
import ProjectImage from '../ProjectImage'
import styles from './index.module.css'

export default function Project({ project }: { project: ProjectType }) {
  const { title, descriptionHtml, images, links, techstack } = project

  return (
    <article className={styles.project}>
      <header className={styles.intro}>
        <h1 className={styles.headerTitle}>{title}</h1>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      </header>

      {images.map((image: ImageType, i: number) => (
        <ProjectImage
          className={styles.fullContainer}
          image={image}
          alt={title}
          key={i}
          sizes="100vw"
        />
      ))}

      <footer className={styles.meta}>
        {links && <ProjectLinks links={links} />}
        {techstack && <ProjectTechstack techstack={techstack} />}
      </footer>
    </article>
  )
}
