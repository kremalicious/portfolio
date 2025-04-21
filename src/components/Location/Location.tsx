'use client'

import { getLocation } from '@/lib/getLocation'
import RelativeTime from '@yaireo/relative-time'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import { useEffect, useState, useTransition } from 'react'
import { fadeIn, getAnimationProps } from '../Transitions'
import { Flag } from './Flag'
import styles from './Location.module.css'
import type { UseLocation } from './types'

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
  const [nowLocalTime, setNowLocalTime] = useState<string>('')

  const isDifferentCountry = location?.now?.country !== location?.next?.country
  const relativeTime = new RelativeTime({ locale: 'en' })

  useEffect(() => {
    if (!location?.now?.city) return

    const updateLocalTime = () => {
      const userLocale = navigator.language || 'en-US'
      const formatter = new Intl.DateTimeFormat(userLocale, {
        hour: 'numeric',
        minute: 'numeric',
        timeZone:
          Intl.supportedValuesOf('timeZone').find(
            (tz) =>
              tz.includes(location.now.city) ||
              tz.includes(location.now.country)
          ) || undefined
      })
      setNowLocalTime(formatter.format(new Date()))
    }

    updateLocalTime()
    const interval = setInterval(updateLocalTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [location])

  useEffect(() => {
    startTransition(async () => {
      const location = await getLocation()
      setLocation(location)
    })
  }, [])

  return (
    <div className={styles.wrapper}>
      {!isPending ? (
        <Animation>
          {location?.now?.city ? (
            <>
              <Flag
                country={{
                  code: location.now.country_code,
                  name: location.now.country
                }}
              />
              {location.now.city} <span>Now, </span>{' '}
              <span className={styles.localTime}>
                {nowLocalTime} local time
              </span>
            </>
          ) : null}

          {location?.next?.city && (
            <div className={styles.next}>
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
            </div>
          )}
        </Animation>
      ) : null}
    </div>
  )
}
