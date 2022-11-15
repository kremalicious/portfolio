import Icon from '../Icon'
import styles from './index.module.css'
import { LazyMotion, m, domAnimation, useReducedMotion } from 'framer-motion'
import { moveInTop } from '../Transitions'

export const NetworkLink = ({ name, url }: { name: string; url: string }) => {
  const linkClasses =
    name === 'Mail' ? `u-email ${styles.link}` : `u-url ${styles.link}`

  return (
    <LazyMotion features={domAnimation}>
      <m.a variants={moveInTop} className={linkClasses} href={url}>
        <Icon name={name} />
        <span className={styles.title}>{name}</span>
      </m.a>
    </LazyMotion>
  )
}
