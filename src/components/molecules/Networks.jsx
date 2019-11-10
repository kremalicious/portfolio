import React from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import { moveInTop } from '../atoms/Transitions'
import LinkIcon from '../atoms/LinkIcon'
import { useMeta } from '../../hooks/use-meta'
import icons from '../atoms/Icons.module.scss'
import styles from './Networks.module.scss'

export default function Networks({ small, hide }) {
  const { social } = useMeta()
  if (hide) return null

  const Animation = posed.aside(moveInTop)

  const linkClasses = key =>
    key === 'Email' ? `u-email ${styles.link}` : `u-url ${styles.link}`

  return (
    <Animation className={small ? styles.small : styles.networks}>
      {Object.keys(social).map((key, i) => (
        <a
          className={linkClasses(key)}
          href={social[key]}
          key={i}
          data-testid={`network-${key.toLowerCase()}`}
        >
          <LinkIcon title={key} className={icons.icon} />
          <span className={styles.title}>{key}</span>
        </a>
      ))}
    </Animation>
  )
}

Networks.propTypes = {
  small: PropTypes.bool,
  hide: PropTypes.bool
}
