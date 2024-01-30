'use client'

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import type ImageType from '../../interfaces/image'
import type ProjectType from '../../interfaces/project'
import ProjectImage from '../ProjectImage'
import { getAnimationProps, moveInBottom } from '../Transitions'
import ProjectLinks from './Links'
import ProjectTechstack from './Techstack'
import styles from './index.module.css'

const containerVariants = {
  enter: {
    transition: {
      delay: 0.3,
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
  const animationProps = getAnimationProps(shouldReduceMotion)

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
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </m.header>
      </LazyMotion>

      {images?.map((image: ImageType, i: number) => (
        <ProjectImage
          className={styles.fullContainer}
          image={image}
          alt={`Showcase image no. ${i + 1} for ${title}`}
          key={i}
          sizes="100vw"
          // give priority to the first image
          priority={i === 0}
        />
      ))}

      <footer className={styles.meta}>
        {links && <ProjectLinks links={links} />}
        {techstack && <ProjectTechstack techstack={techstack} />}
      </footer>
    </article>
  )
}
