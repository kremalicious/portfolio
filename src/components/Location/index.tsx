'use client'

import RelativeTime from '@yaireo/relative-time'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { useLocation } from '../../hooks/useLocation'
import { getAnimationProps, moveInTop } from '../Transitions'
import { Flag } from './Flag'
import styles from './index.module.css'

export default function Location() {
  const { now, next } = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const isDifferentCountry = now?.country !== next?.country
  const relativeTime = new RelativeTime({ locale: 'en' })

  return now?.city ? (
    <LazyMotion features={domAnimation}>
      <m.section
        aria-label="Location"
        variants={moveInTop}
        className={styles.location}
        {...getAnimationProps(shouldReduceMotion)}
      >
        <Flag country={{ code: now.country_code, name: now.country }} />
        {now?.city} <span>Now</span>
        <div className={styles.next}>
          {next?.city && (
            <>
              {isDifferentCountry && (
                <Flag
                  country={{ code: next.country_code, name: next.country }}
                />
              )}
              {next.city}{' '}
              <span>{relativeTime.from(new Date(next.date_start))}</span>
            </>
          )}
        </div>
      </m.section>
    </LazyMotion>
  ) : null
}
