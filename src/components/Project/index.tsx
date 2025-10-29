import { domAnimation, LazyMotion, m, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import type { ProjectType } from '@/types'
import { getAnimationProps, moveInBottom } from '../Transitions'
import styles from './index.module.css'
import ProjectLinks from './Links'
import ProjectTechstack from './Techstack'

const containerVariants = {
  enter: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function Project({
  project,
  children
}: {
  project: Partial<ProjectType>
  children?: ReactNode
}) {
  const { title, descriptionHtml, links, techstack } = project
  const shouldReduceMotion = useReducedMotion()
  const animationProps = getAnimationProps(shouldReduceMotion || false)

  return (
    <article className={styles.project}>
      <LazyMotion features={domAnimation}>
        <m.header
          variants={containerVariants}
          {...animationProps}
          className={styles.intro}
        >
          <m.h1 variants={moveInBottom} className={styles.headerTitle}>
            {title}
          </m.h1>

          <m.div
            variants={moveInBottom}
            className={styles.description}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Ignored for markdown content
            dangerouslySetInnerHTML={{ __html: descriptionHtml ?? '' }}
          />
        </m.header>
      </LazyMotion>

      {children}

      <footer className={styles.meta}>
        {links && <ProjectLinks links={links} />}
        {techstack && <ProjectTechstack techstack={techstack} />}
      </footer>
    </article>
  )
}
