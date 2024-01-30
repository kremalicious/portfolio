'use client'

import Availability from '../Availability'
import LogoUnit from '../LogoUnit'
import Networks from '../Networks'
import Location from '../Location'
import styles from './index.module.css'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isSmall = pathname !== '/'

  return (
    <header
      className={`${styles.header} ${isSmall ? styles.small : ''}`}
      data-testid="header"
    >
      <LogoUnit small={isSmall} />
      {!isSmall ? <Networks label="Networks" /> : null}
      <div className={styles.meta}>
        {!isSmall ? <Location /> : null}
        {!isSmall ? <Availability /> : null}
      </div>
    </header>
  )
}
