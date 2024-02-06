'use client'

import { createRef, useEffect } from 'react'
import ProjectType from '@/types/project'
import { Project } from './Project'
import styles from './index.module.css'

type Props = {
  projects: ProjectType[]
  currentSlug: string
}

export default function ProjectNav({ projects, currentSlug }: Props) {
  // Always keep the scroll position centered
  // to currently viewed project on mount.
  const scrollContainer = createRef<HTMLDivElement>()
  const currentItem = createRef<HTMLAnchorElement>()

  useEffect(() => {
    function scrollToCurrent() {
      if (!scrollContainer.current || !currentItem.current) return

      const activeItem = currentItem.current
      const scrollRect = scrollContainer.current.getBoundingClientRect()
      const activeRect = activeItem && activeItem.getBoundingClientRect()
      if (!activeItem || !scrollRect || !activeRect) return

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
