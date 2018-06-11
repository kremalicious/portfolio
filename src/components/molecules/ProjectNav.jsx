import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import FullWidth from '../atoms/FullWidth'
import styles from './ProjectNav.module.scss'

const ProjectItem = ({ title, slug, img }) => {
  return (
    <div className={styles.item}>
      <Link className={styles.link} to={slug}>
        <Img
          className={styles.image}
          sizes={img.childImageSharp.sizes}
          alt={title}
        />
        <h1 className={styles.title}>{title}</h1>
      </Link>
    </div>
  )
}

const ProjectNav = ({ projects }) => (
  <FullWidth>
    <nav className={styles.projectNav}>
      {projects.map(({ node }) => (
        <ProjectItem
          key={node.slug}
          title={node.title}
          slug={node.slug}
          img={node.img}
        />
      ))}
    </nav>
  </FullWidth>
)

ProjectItem.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  img: PropTypes.object
}

ProjectNav.propTypes = {
  projects: PropTypes.object
}

export default ProjectNav
