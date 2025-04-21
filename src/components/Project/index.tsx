'use client'

import type { ImageType, ProjectType } from '@/types'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import ProjectImage from '../ProjectImage'
import { getAnimationProps, moveInBottom } from '../Transitions'
import ProjectLinks from './Links'
import ProjectTechstack from './Techstack'
import styles from './index.module.css'

const containerVariants = {
  enter: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function Project({
  project
}: {
  project: Partial<ProjectType>
}) {
  const { title, descriptionHtml, images, links, techstack } = project
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
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{ __html: descriptionHtml ?? '' }}
          />
        </m.header>
      </LazyMotion>

      {images?.map((image: ImageType, i: number) => (
        <ProjectImage
          className={styles.fullContainer}
          image={image}
          alt={`Showcase image no. ${i + 1} for ${title}`}
          key={image.src}
          sizes="100vw"
        />
      ))}

      <footer className={styles.meta}>
        {links && <ProjectLinks links={links} />}
        {techstack && <ProjectTechstack techstack={techstack} />}
      </footer>
    </article>
  )
}
