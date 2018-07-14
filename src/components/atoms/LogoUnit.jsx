import React from 'react'
import PropTypes from 'prop-types'
import Logo from '../svg/Logo'
import styles from './LogoUnit.module.scss'

const LogoUnit = ({ meta, minimal }) => {
  const classes = minimal
    ? `${styles.logounit} ${styles.minimal}`
    : styles.logounit

  return (
    <div className={classes}>
      <Logo className={styles.logounit__logo} />
      <h1 className={styles.logounit__title}>{meta.title.toLowerCase()}</h1>
      <p className={styles.logounit__description}>
        <span>{'{ '}</span> {meta.tagline.toLowerCase()} <span>{' }'}</span>
      </p>
    </div>
  )
}

LogoUnit.propTypes = {
  meta: PropTypes.object.isRequired,
  minimal: PropTypes.bool
}

export default LogoUnit
