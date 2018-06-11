import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import FullWidth from '../atoms/FullWidth'
import styles from './ProjectNav.module.scss'

const ProjectItem = ({ title, slug, img, current }) => (
  <div className={styles.item} id={current ? 'current' : null}>
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

class ProjectNav extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    this.scrollToCurrent()
  }

  scrollToCurrent = () => {
    const container = window.document.getElementById('scrollContainer')
    const current = window.document.getElementById('current')
    const currentLeft = current.getBoundingClientRect().left
    const currentWidth = current.clientWidth
    const finalPosition = currentLeft - window.innerWidth / 2 + currentWidth / 2

    container.scrollLeft = finalPosition
  }

  render() {
    const { projects, project } = this.props

    return (
      <FullWidth>
        <nav className={styles.projectNav} id="scrollContainer">
          {projects.map(({ node }) => {
            const current = node.slug === project.slug

            return (
              <ProjectItem
                key={node.slug}
                title={node.title}
                current={current}
                slug={node.slug}
                img={node.img}
              />
            )
          })}
        </nav>
      </FullWidth>
    )
  }
}

ProjectItem.propTypes = {
  current: PropTypes.bool,
  title: PropTypes.string,
  slug: PropTypes.string,
  img: PropTypes.object
}

ProjectNav.propTypes = {
  projects: PropTypes.array,
  project: PropTypes.object
}

export default ProjectNav
