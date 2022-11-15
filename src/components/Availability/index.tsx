import { useReducedMotion, LazyMotion, domAnimation, m } from 'framer-motion'
import { moveInBottom, getAnimationProps } from '../Transitions'
import styles from './index.module.css'
import meta from '../../../_content/meta.json'

export default function Availability() {
  const shouldReduceMotion = useReducedMotion()
  const { status, available, unavailable } = meta.availability
  const className = status
    ? `${styles.availability} ${styles.available}`
    : `${styles.availability}`
  const html = status ? available : unavailable

  return (
    <LazyMotion features={domAnimation}>
      <m.aside
        variants={moveInBottom}
        className={className}
        {...getAnimationProps(shouldReduceMotion)}
      >
        <p dangerouslySetInnerHTML={{ __html: html }} />
      </m.aside>
    </LazyMotion>
  )
}
