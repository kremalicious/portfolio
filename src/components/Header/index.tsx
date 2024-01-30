'use client'

import Availability from '../Availability'
import LogoUnit from '../LogoUnit'
import Networks from '../Networks'
import Location from '../Location'
import styles from './index.module.css'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const small = pathname !== '/'

  return (
    <header className={`${styles.header} ${small ? styles.small : ''}`}>
      <LogoUnit small={small} />
      {!small ? <Networks label="Networks" /> : null}
      <div className={styles.meta}>
        {!small ? (
            <Location />
        ) : null}
        {!small ? <Availability /> : null}
      </div>
    </header>
  )
}
