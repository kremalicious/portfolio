'use client'

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import meta from '../../../_content/meta.json'
import { getAnimationProps, moveInBottom } from '../Transitions'
import styles from './index.module.css'

export default function Availability() {
  const shouldReduceMotion = useReducedMotion()
  const { status, available, unavailable } = meta.availability
  const className = status
    ? `${styles.availability} ${styles.available}`
    : `${styles.availability}`
  const html = status ? available : unavailable

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        variants={moveInBottom}
        className={className}
        {...getAnimationProps(shouldReduceMotion)}
      >
        <p dangerouslySetInnerHTML={{ __html: html }} />
      </m.section>
    </LazyMotion>
  )
}
