import styles from './index.module.css'

const Button = ({ children, ...props }) => (
  <a className={styles.button} {...props}>
    {children}
  </a>
)

export default Button
