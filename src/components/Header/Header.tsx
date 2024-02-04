import LogoUnit from '../LogoUnit'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header} data-testid="header">
      <LogoUnit small />
    </header>
  )
}
