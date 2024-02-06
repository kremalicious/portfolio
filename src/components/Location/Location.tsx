'use client'

import { useEffect, useState, useTransition } from 'react'
import RelativeTime from '@yaireo/relative-time'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { getLocation } from '@/lib/getLocation'
import { fadeIn, getAnimationProps } from '../Transitions'
import { Flag } from './Flag'
import styles from './Location.module.css'
import { UseLocation } from './types'

function Animation({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        aria-label="Location"
        variants={fadeIn}
        className={styles.location}
        {...getAnimationProps(shouldReduceMotion || false)}
      >
        {children}
      </m.section>
    </LazyMotion>
  )
}

export default function Location() {
  const [isPending, startTransition] = useTransition()
  const [location, setLocation] = useState<UseLocation | null>(null)

  const isDifferentCountry = location?.now?.country !== location?.next?.country
  const relativeTime = new RelativeTime({ locale: 'en' })

  useEffect(() => {
    startTransition(async () => {
      const location = await getLocation()
      setLocation(location)
    })
  }, [])

  return (
    <div className={styles.wrapper}>
      {!isPending && location?.now?.city ? (
        <Animation>
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
        </Animation>
      ) : null}
    </div>
  )
}
