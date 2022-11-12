import React from 'react'
import Icon from '../Icon'
import styles from './index.module.css'
import resume from '../../../_content/resume.json'

const linkClasses = (key) =>
  key === 'Mail' ? `u-email ${styles.link}` : `u-url ${styles.link}`

const NetworkLink = ({ name, url }: { name: string; url: string }) => (
  <a
    className={linkClasses(name)}
    href={url}
    data-testid={`network-${name.toLowerCase()}`}
  >
    <Icon name={name} />
    <span className={styles.title}>{name}</span>
  </a>
)

type Props = {
  small?: boolean
}

export default function Networks({ small }: Props) {
  return (
    <aside className={small ? styles.small : styles.networks}>
      <NetworkLink name="Mail" url={`mailto:${resume.basics.email}`} />

      {resume.basics.profiles.map((profile) => (
        <NetworkLink
          key={profile.network}
          name={profile.network}
          url={profile.url}
        />
      ))}
    </aside>
  )
}
