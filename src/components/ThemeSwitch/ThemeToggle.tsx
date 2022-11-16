import Icon from '../Icon'
import styles from './index.module.css'

export const ThemeToggle = () => (
  <span id="toggle" className={styles.checkboxContainer} aria-live="assertive">
    <Icon name="Sun" />
    <span className={styles.checkboxFake} />
    <Icon name="Moon" />
  </span>
)
