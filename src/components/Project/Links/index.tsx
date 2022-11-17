import Button from '../../Button'
import Icon from '../../Icon'
import styles from './index.module.css'

export default function ProjectLinks({
  links
}: {
  links: { title: string; url: string; icon: string }[]
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
