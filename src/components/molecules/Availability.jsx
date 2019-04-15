import React from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import { fadeIn } from '../atoms/Transitions'
import { useMeta } from '../../hooks/use-meta'
import styles from './Availability.module.scss'

const Animation = posed.aside(fadeIn)

const Availability = ({ hide }) => {
  const { availability } = useMeta()
  const { status, available, unavailable } = availability
  const className = status
    ? `${styles.availability} ${styles.available}`
    : `${styles.availability}`
  const html = status ? available : unavailable

  return (
    !hide && (
      <Animation className={className}>
        <p dangerouslySetInnerHTML={{ __html: html }} />
      </Animation>
    )
  )
}

Availability.propTypes = {
  hide: PropTypes.bool
}

export default Availability
