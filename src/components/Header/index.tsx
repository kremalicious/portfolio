'use client'

import { usePathname } from 'next/navigation'
import Availability from '../Availability'
import Location from '../Location'
import LogoUnit from '../LogoUnit'
import Networks from '../Networks'
import styles from './index.module.css'

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
