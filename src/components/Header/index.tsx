import Availability from '../Availability'
import Location from '../Location'
import { UseLocation } from '../Location/types'
import LogoUnit from '../LogoUnit'
import Networks from '../Networks'
import styles from './index.module.css'

export default function Header({
  location,
  isSmall
}: {
  location?: UseLocation
  isSmall?: boolean
}) {
  return (
    <header
      className={`${styles.header} ${isSmall ? styles.small : ''}`}
      data-testid="header"
    >
      <LogoUnit small={isSmall} />
      {!isSmall ? <Networks label="Networks" /> : null}
      <div className={styles.meta}>
        {location ? <Location location={location} /> : null}
        {!isSmall ? <Availability /> : null}
      </div>
    </header>
  )
}
