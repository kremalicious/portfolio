'use client'

import RelativeTime from '@yaireo/relative-time'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { getAnimationProps, moveInTop } from '../Transitions'
import { Flag } from './Flag'
import styles from './index.module.css'
import { useEffect, useState } from 'react'
import { getLocation } from '../../app/actions'
import { UseLocation } from './types'

export default function Location() {
  const shouldReduceMotion = useReducedMotion()

  const [location, setLocation] = useState<UseLocation>()

  const isDifferentCountry = location?.now?.country !== location?.next?.country
  const relativeTime = new RelativeTime({ locale: 'en' })

  useEffect(() => {
    async function fetchData() {
      const location = await getLocation()
      if (!location) return
      setLocation(location)
    }
    fetchData()
  }, [])

  return (
    <div className={styles.wrapper}>
      {location?.now?.city ? (
        <LazyMotion features={domAnimation}>
          <m.section
            aria-label="Location"
            variants={moveInTop}
            className={styles.location}
            {...getAnimationProps(shouldReduceMotion)}
          >
            <Flag
              country={{
                code: location.now.country_code,
                name: location.now.country
              }}
            />
            {location.now.city} <span>Now</span>
            <div className={styles.next}>
              {location?.next?.city && (
                <>
                  {isDifferentCountry && (
                    <Flag
                      country={{
                        code: location.next.country_code,
                        name: location.next.country
                      }}
                    />
                  )}
                  {location.next.city}{' '}
                  <span>
                    {relativeTime.from(new Date(location.next.date_start))}
                  </span>
                </>
              )}
            </div>
          </m.section>
        </LazyMotion>
      ) : null}
    </div>
  )
}
