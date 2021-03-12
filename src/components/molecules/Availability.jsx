import React from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import { fadeIn } from '../atoms/Transitions'
import { useMeta } from '../../hooks/use-meta'
import {
  availability as styleAvailability,
  available as styleAvailable
} from './Availability.module.css'

const Animation = posed.aside(fadeIn)

const Availability = ({ hide }) => {
  const { availability } = useMeta()
  const { status, available, unavailable } = availability
  const className = status
    ? `${styleAvailability} ${styleAvailable}`
    : `${styleAvailability}`
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
