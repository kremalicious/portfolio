import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import styles from './ProjectNav.module.scss'

const ProjectLink = ({ node }) => (
  <Link className={styles.link} to={node.slug}>
    <Img
      className={styles.image}
      fluid={node.img.childImageSharp.fluid}
      alt={node.title}
    />
    <h1 className={styles.title}>{node.title}</h1>
  </Link>
)

class ProjectNav extends Component {
  constructor(props) {
    super(props)

    this.scrollToCurrent = this.scrollToCurrent.bind(this)
  }

  componentDidMount() {
    this.scrollToCurrent()
  }

  componentDidUpdate() {
    this.scrollToCurrent()
  }

  scrollToCurrent = () => {
    const current = this.currentItem
    const currentLeft = current.getBoundingClientRect().left
    const currentWidth = current.clientWidth
    const finalPosition = currentLeft - window.innerWidth / 2 + currentWidth / 2

    this.scrollContainer.scrollLeft = finalPosition
  }

  render() {
    const { projects, project } = this.props

    return (
      <nav
        className={styles.projectNav}
        ref={node => {
          this.scrollContainer = node
        }}
      >
        {projects.map(({ node }) => {
          const current = node.slug === project.slug

          return (
            <div
              className={styles.item}
              key={node.slug}
              ref={node => {
                if (current) this.currentItem = node
              }}
            >
              <ProjectLink node={node} />
            </div>
          )
        })}
      </nav>
    )
  }
}

ProjectLink.propTypes = {
  node: PropTypes.object
}

ProjectNav.propTypes = {
  projects: PropTypes.array,
  project: PropTypes.object
}

export default ProjectNav
