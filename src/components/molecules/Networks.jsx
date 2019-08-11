import React from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import { moveInTop } from '../atoms/Transitions'
import Icon from '../atoms/Icon'
import { useMeta } from '../../hooks/use-meta'
import { useResume } from '../../hooks/use-resume'
import styles from './Networks.module.scss'

const NetworkLink = ({ name, url }) => (
  <a
    className={linkClasses(name)}
    href={url}
    data-testid={`network-${name.toLowerCase()}`}
  >
    <Icon name={name} />
    <span className={styles.title}>{name}</span>
  </a>
)

NetworkLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default function Networks({ small, hide }) {
  const { social } = useMeta()
  if (hide) return null

  const Animation = posed.aside(moveInTop)

  const linkClasses = key =>
    key === 'Email' ? `u-email ${styles.link}` : `u-url ${styles.link}`

  return (
    <Animation className={small ? styles.small : styles.networks}>
      <NetworkLink name={'Email'} url={`mailto:${basics.email}`} />

        {profiles.map(profile => (
          <NetworkLink
            key={profile.network}
            name={profile.network}
            url={profile.url}
          />
        ))}
    </Animation>
  )
}

Networks.propTypes = {
  small: PropTypes.bool,
  hide: PropTypes.bool
}
