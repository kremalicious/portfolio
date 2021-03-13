import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, useStaticQuery } from 'gatsby'
import ProjectImage from '../atoms/ProjectImage'
import { item, projectNav } from './ProjectNav.module.css'

const query = graphql`
  query {
    allProjectsYaml {
      edges {
        node {
          title
          slug
          img {
            childImageSharp {
              ...ProjectImageNav
            }
          }
        }
      }
    }
  }
`

const Project = ({ node, refCurrentItem }) => (
  <Link className={item} to={node.slug} title={node.title} ref={refCurrentItem}>
    <ProjectImage
      image={node.img.childImageSharp.gatsbyImageData}
      alt={node.title}
    />
  </Link>
)

Project.propTypes = {
  node: PropTypes.any.isRequired,
  refCurrentItem: PropTypes.any
}

export default function ProjectNav({ currentSlug }) {
  const data = useStaticQuery(query)
  const projects = data.allProjectsYaml.edges

  // Always keep the scroll position centered
  // to currently viewed project on mount.
  const scrollContainer = React.createRef()
  const currentItem = React.createRef()

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

  useEffect(() => {
    scrollToCurrent()
  }, [])

  return (
    <nav className={projectNav} ref={scrollContainer}>
      {projects.map(({ node }) => {
        const isCurrent = node.slug === currentSlug

        return (
          <Project
            key={node.slug}
            node={node}
            refCurrentItem={isCurrent ? currentItem : null}
          />
        )
      })}
    </nav>
  )
}

ProjectNav.propTypes = {
  currentSlug: PropTypes.string.isRequired
}
