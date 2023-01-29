import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Availability from '../Availability'
import LogoUnit from '../LogoUnit'
import Networks from '../Networks'
import styles from './index.module.css'

const DynamicLocation = dynamic(() => import('../Location'), {
  suspense: true
})

type Props = {
  small?: boolean
}

export default function Header({ small }: Props) {
  return (
    <header className={`${styles.header} ${small ? styles.small : ''}`}>
      <LogoUnit small={small} />
      {!small ? <Networks label="Networks" /> : null}
      <div className={styles.meta}>
        {!small ? (
          <Suspense>
            <DynamicLocation />
          </Suspense>
        ) : null}
        {!small ? <Availability /> : null}
      </div>
    </header>
  )
}
