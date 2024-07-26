import Button from '@/components/Button'
import Icon from '@/components/Icon'
import type { ProjectLink } from '@/types'
import styles from './index.module.css'

export default function ProjectLinks({
  links
}: {
  links: ProjectLink[]
}) {
  return (
    <div className={styles.projectLinks}>
      <h2 className={styles.title}>
        Links <span>Learn more on the interwebz.</span>
      </h2>

      <ul>
        {links.map(({ title, url, icon }) => (
          <li key={title}>
            <Button href={url} data-testid="link">
              <Icon name={icon ? icon : title} />
              {title}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
