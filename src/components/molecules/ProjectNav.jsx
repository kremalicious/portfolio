import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import styles from './ProjectNav.module.scss'

const query = graphql`
  query {
    allProjectsYaml {
      edges {
        node {
          title
          slug
          img {
            childImageSharp {
              fluid(maxWidth: 500, quality: 85) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`

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

export default class ProjectNav extends Component {
  state = {
    scrolledToCurrent: false
  }

  componentDidMount() {
    this.scrollToCurrent()
    this.setState({ scrolledToCurrent: true })
  }

  componentDidUpdate() {
    this.scrollToCurrent()
  }

  componentWillUnmount() {
    this.setState({ scrolledToCurrent: false })
  }

  scrollToCurrent = () => {
    const current = this.currentItem
    const currentLeft = current.getBoundingClientRect().left
    const currentWidth = current.clientWidth
    const finalPosition = currentLeft - window.innerWidth / 2 + currentWidth / 2

    this.scrollContainer.scrollLeft += finalPosition
  }

  render() {
    const { slug } = this.props

    return (
      <StaticQuery
        query={query}
        render={data => {
          const projects = data.allProjectsYaml.edges

          return (
            <nav
              className={styles.projectNav}
              ref={node => (this.scrollContainer = node)}
            >
              {projects.map(({ node }) => {
                const current = node.slug === slug

                return (
                  <div
                    className={styles.item}
                    key={node.slug}
                    ref={node => current && (this.currentItem = node)}
                  >
                    <ProjectLink node={node} />
                  </div>
                )
              })}
            </nav>
          )
        }}
      />
    )
  }
}

ProjectLink.propTypes = {
  node: PropTypes.object
}

ProjectNav.propTypes = {
  slug: PropTypes.string
}
