import Networks from '../Networks'
import Availability from '../Availability'
import Location from '../Location'
import LogoUnit from '../LogoUnit'
import styles from './index.module.css'

type Props = {
  minimal?: boolean
}

export default function Header({ minimal }: Props) {
  return (
    <header className={`${styles.header} ${minimal ? styles.minimal : null}`}>
      <LogoUnit minimal={minimal} />
      {!minimal ? <Networks /> : null}
      <div className={styles.meta}>
        {!minimal ? <Location /> : null}
        {!minimal ? <Availability /> : null}
      </div>
    </header>
  )
}
