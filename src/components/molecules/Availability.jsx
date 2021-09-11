import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { moveInTop } from '../atoms/Transitions'
import { useMeta } from '../../hooks/use-meta'
import {
  availability as styleAvailability,
  available as styleAvailable
} from './Availability.module.css'

export default function Availability({ hide }) {
  const { availability } = useMeta()
  const { status, available, unavailable } = availability
  const className = status
    ? `${styleAvailability} ${styleAvailable}`
    : `${styleAvailability}`
  const html = status ? available : unavailable

  return (
    !hide && (
      <motion.aside
        variants={moveInTop}
        initial="initial"
        animate="enter"
        exit="exit"
        className={className}
      >
        <p dangerouslySetInnerHTML={{ __html: html }} />
      </motion.aside>
    )
  )
}

Availability.propTypes = {
  hide: PropTypes.bool
}
