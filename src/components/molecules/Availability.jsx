import React from 'react'
import PropTypes from 'prop-types'
import { motion, useReducedMotion } from 'framer-motion'
import { moveInTop, getAnimationProps } from '../atoms/Transitions'
import { useMeta } from '../../hooks/use-meta'
import {
  availability as styleAvailability,
  available as styleAvailable
} from './Availability.module.css'

export default function Availability({ hide }) {
  const { availability } = useMeta()
  const shouldReduceMotion = useReducedMotion()
  const { status, available, unavailable } = availability
  const className = status
    ? `${styleAvailability} ${styleAvailable}`
    : `${styleAvailability}`
  const html = status ? available : unavailable

  return (
    !hide && (
      <motion.aside
        variants={moveInTop}
        className={className}
        {...getAnimationProps(shouldReduceMotion)}
      >
        <p dangerouslySetInnerHTML={{ __html: html }} />
      </motion.aside>
    )
  )
}

Availability.propTypes = {
  hide: PropTypes.bool
}
