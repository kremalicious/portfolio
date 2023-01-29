import { LazyMotion, domAnimation, m } from 'framer-motion'
import Icon from '../Icon'
import { moveInTop } from '../Transitions'
import styles from './index.module.css'

export const NetworkLink = ({ name, url }: { name: string; url: string }) => {
  const linkClasses =
    name === 'Mail' ? `u-email ${styles.link}` : `u-url ${styles.link}`

  return (
    <LazyMotion features={domAnimation}>
      <m.a
        aria-label={name}
        variants={moveInTop}
        className={linkClasses}
        href={url}
        rel="me"
      >
        <Icon name={name} />
        <span className={styles.title}>{name}</span>
      </m.a>
    </LazyMotion>
  )
}
