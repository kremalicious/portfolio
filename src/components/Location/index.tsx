import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { moveInBottom, getAnimationProps, moveInTop } from '../Transitions'
import styles from './index.module.css'
import { useLocation } from '../../hooks/useLocation'
import RelativeTime from '@yaireo/relative-time'

function Flag({ countryCode }: { countryCode: string }) {
  if (!countryCode) return null
  // offset between uppercase ascii and regional indicator symbols
  const OFFSET = 127397

  const emoji = countryCode.replace(/./g, (char) =>
    String.fromCodePoint(char.charCodeAt(0) + OFFSET)
  )

  return (
    <span role="img" className={styles.emoji}>
      {emoji}
    </span>
  )
}

export default function Location() {
  const { now, next } = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const isDifferentCountry = now?.country !== next?.country
  const relativeTime = new RelativeTime({ locale: 'en' })

  return now?.city ? (
    <LazyMotion features={domAnimation}>
      <m.aside
        variants={moveInTop}
        className={styles.location}
        {...getAnimationProps(shouldReduceMotion)}
      >
        <Flag countryCode={now?.country_code} />
        {now?.city} <span>Now</span>
        <div className={styles.next}>
          {next?.city && (
            <>
              {isDifferentCountry && <Flag countryCode={next.country_code} />}
              {next.city}{' '}
              <span>{relativeTime.from(new Date(next.date_start))}</span>
            </>
          )}
        </div>
      </m.aside>
    </LazyMotion>
  ) : null
}
