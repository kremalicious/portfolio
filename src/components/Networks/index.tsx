import styles from './index.module.css'
import resume from '../../../_content/resume.json'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { getAnimationProps } from '../Transitions'
import { NetworkLink } from './NetworkLink'

type Props = {
  label: string
  small?: boolean
}

const containerVariants = {
  enter: {
    transition: {
      delay: 0.2,
      staggerChildren: 0.1
    }
  }
}

export default function Networks({ label, small }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const animationProps = getAnimationProps(shouldReduceMotion)

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        aria-label={label}
        variants={containerVariants}
        {...animationProps}
        className={small ? styles.small : styles.networks}
      >
        <NetworkLink
          name="Mail"
          key="Mail"
          url={`mailto:${resume.basics.email}`}
        />

        {resume.basics.profiles.map((profile) => (
          <NetworkLink
            key={profile.network}
            name={profile.network}
            url={profile.url}
          />
        ))}
      </m.section>
    </LazyMotion>
  )
}
