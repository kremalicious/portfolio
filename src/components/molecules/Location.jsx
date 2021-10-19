import React from 'react'
import PropTypes from 'prop-types'
import { motion, useReducedMotion } from 'framer-motion'
import { moveInTop, getAnimationProps } from '../atoms/Transitions'
import {
  location as styleLocation,
  emoji as styleEmoji,
  next as styleNext
} from './Location.module.css'
import { useLocation } from '../../hooks/useLocation'
import RelativeTime from '@yaireo/relative-time'

function Flag({ countryCode }) {
  if (!countryCode) return null
  // offset between uppercase ascii and regional indicator symbols
  const OFFSET = 127397

  const emoji = countryCode.replace(/./g, (char) =>
    String.fromCodePoint(char.charCodeAt(0) + OFFSET)
  )

  return (
    <span role="img" className={styleEmoji}>
      {emoji}
    </span>
  )
}

Flag.propTypes = {
  countryCode: PropTypes.string
}

export default function Location({ hide }) {
  const { now, next } = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const isSSr = typeof window === 'undefined'
  const isDifferentCountry = now?.country !== next?.country
  const relativeTime = new RelativeTime({ locale: 'en' })

  return !hide && now ? (
    <motion.aside
      variants={moveInTop}
      className={styleLocation}
      {...getAnimationProps(shouldReduceMotion, isSSr)}
    >
      <Flag countryCode={now?.country_code} />
      {now?.city} <span>Now</span>
      <div className={styleNext}>
        {next?.city && (
          <>
            {isDifferentCountry && <Flag countryCode={next.country_code} />}
            {next.city}{' '}
            <span>{relativeTime.from(new Date(next.date_start))}</span>
          </>
        )}
      </div>
    </motion.aside>
  ) : null
}

Location.propTypes = {
  hide: PropTypes.bool
}
