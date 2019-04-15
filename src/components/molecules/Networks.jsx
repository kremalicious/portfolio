import React from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import classNames from 'classnames'
import { moveInTop } from '../atoms/Transitions'
import LinkIcon from '../atoms/LinkIcon'
import { useMeta } from '../../hooks/use-meta'
import icons from '../atoms/Icons.module.scss'
import styles from './Networks.module.scss'

const Animation = posed.aside(moveInTop)

const linkClasses = key =>
  classNames({
    'u-url': key !== 'Email',
    'u-email': key === 'Email',
    [styles.link]: true
  })

const Networks = ({ small, hide }) => {
  const { social } = useMeta()

  const wrapClasses = classNames([styles.networks], {
    [styles.small]: small
  })

  return (
    !hide && (
      <Animation className={wrapClasses}>
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
  )
}

Networks.propTypes = {
  small: PropTypes.bool,
  hide: PropTypes.bool
}

export default Networks
