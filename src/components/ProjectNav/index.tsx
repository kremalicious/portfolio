import React, { useEffect, createRef } from 'react'
import styles from './index.module.css'
import ProjectType from '../../interfaces/project'
import { Project } from './Project'

type Props = {
  projects: { slug: string }[]
  currentSlug: string
}

export default function ProjectNav({ projects, currentSlug }: Props) {
  // Always keep the scroll position centered
  // to currently viewed project on mount.
  const scrollContainer = createRef<HTMLDivElement>()
  const currentItem = createRef<HTMLAnchorElement>()

  useEffect(() => {
    function scrollToCurrent() {
      const activeItem = currentItem.current
      const scrollRect = scrollContainer.current.getBoundingClientRect()
      const activeRect = activeItem && activeItem.getBoundingClientRect()
      const newScrollLeftPosition =
        activeRect &&
        activeRect.left -
          scrollRect.left -
          scrollRect.width / 2 +
          activeRect.width / 2

      scrollContainer.current.scrollLeft += newScrollLeftPosition
    }
    scrollToCurrent()
  }, [scrollContainer, currentItem])

  return (
    <nav className={styles.projectNav} ref={scrollContainer}>
      {projects.map((project: ProjectType) => {
        const isCurrent = project.slug === currentSlug

        return (
          <Project
            key={project.slug}
            project={project}
            ref={isCurrent ? currentItem : null}
          />
        )
      })}
    </nav>
  )
}
