import RelativeTime from '@yaireo/relative-time'
import { Flag } from './Flag'
import styles from './index.module.css'
import { UseLocation } from './types'

export default function Location({ location }: { location: UseLocation }) {
  const isDifferentCountry = location?.now?.country !== location?.next?.country
  const relativeTime = new RelativeTime({ locale: 'en' })

  return (
    <div className={styles.wrapper}>
      {location?.now?.city ? (
        <section aria-label="Location" className={styles.location}>
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
        </section>
      ) : null}
    </div>
  )
}
