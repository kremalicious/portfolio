import meta from '@content/meta.json'
import styles from './index.module.css'

export default function Availability() {
  const { status, available, unavailable } = meta.availability
  const className = status
    ? `${styles.availability} ${styles.available}`
    : `${styles.availability}`
  const html = status ? available : unavailable

  return (
    <section className={className}>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: nothing injected on run time */}
      <p dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  )
}
