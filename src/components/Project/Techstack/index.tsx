import styles from './index.module.css'

const ProjectTechstack = ({ techstack }: { techstack: string[] }) => (
  <div className={styles.projectTechstack}>
    <h3 className={styles.title}>
      Tools & Technologies <span>The tech stack I was involved with.</span>
    </h3>
    <ul>
      {techstack.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  </div>
)

export default ProjectTechstack
