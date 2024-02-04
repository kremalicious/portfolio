'use client'

import { useEffect, useState } from 'react'
import { getLocation } from '@/src/app/actions'
import RelativeTime from '@yaireo/relative-time'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { fadeIn, getAnimationProps } from '../Transitions'
import { Flag } from './Flag'
import styles from './Location.module.css'
import { UseLocation } from './types'

export default function Location() {
  const shouldReduceMotion = useReducedMotion()
  const [location, setLocation] = useState<UseLocation | null>(null)

  const isDifferentCountry = location?.now?.country !== location?.next?.country
  const relativeTime = new RelativeTime({ locale: 'en' })

  useEffect(() => {
    const updateLocation = async () => {
      const location = await getLocation()
      setLocation(location)
    }
    updateLocation()
  }, [])

  return (
    <div className={styles.wrapper}>
      {location?.now?.city ? (
        <LazyMotion features={domAnimation}>
          <m.section
            aria-label="Location"
            variants={fadeIn}
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
