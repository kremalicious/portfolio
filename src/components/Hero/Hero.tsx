import Availability from '../Availability'
import { Location } from '../Location'
import LogoUnit from '../LogoUnit'
import Networks from '../Networks'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <header className={styles.hero} data-testid="header">
      <LogoUnit />
      <Networks label="Networks" />
      <div className={styles.meta}>
        <Location />
        <Availability />
      </div>
    </header>
  )
}
