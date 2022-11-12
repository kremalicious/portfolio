import { motion, useReducedMotion } from 'framer-motion'
import { moveInTop, getAnimationProps } from '../Transitions'
import styles from './index.module.css'
import meta from '../../../_content/meta.json'

export default function Availability() {
  const shouldReduceMotion = useReducedMotion()
  const isSSr = typeof window === 'undefined'
  const { status, available, unavailable } = meta.availability
  const className = status
    ? `${styles.availability} ${styles.available}`
    : `${styles.availability}`
  const html = status ? available : unavailable

  return (
    <motion.aside
      variants={moveInTop}
      className={className}
      {...getAnimationProps(shouldReduceMotion, isSSr)}
    >
      <p dangerouslySetInnerHTML={{ __html: html }} />
    </motion.aside>
  )
}
