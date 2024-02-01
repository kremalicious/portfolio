import Repo from '../../types/repo'
import Repository from '../Repository'
import styles from './index.module.css'

export default function Repositories({ repos }: { repos: Repo[] }) {
  if (!repos) return null

  return (
    <>
      <h2 className={styles.sectionTitle}>Open Source Projects</h2>
      <div className={styles.repos}>
        {repos.map((repo) => (
          <Repository key={repo.name} repo={repo} />
        ))}
      </div>
    </>
  )
}
