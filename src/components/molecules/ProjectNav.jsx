import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import shortid from 'shortid'
import ProjectImage from '../atoms/ProjectImage'
import { item, link, title, projectNav } from './ProjectNav.module.css'

const query = graphql`
  query {
    allProjectsYaml {
      edges {
        node {
          title
          slug
          img {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 500, quality: 85)
            }
          }
        }
      }
    }
  }
`

const Project = ({ node, refCurrentItem }) => (
  <div className={item} ref={refCurrentItem}>
    <Link className={link} to={node.slug}>
      <ProjectImage
        image={node.img.childImageSharp.gatsbyImageData}
        alt={node.title}
      />
      <h1 className={title}>{node.title}</h1>
    </Link>
  </div>
)

Project.propTypes = {
  node: PropTypes.any.isRequired,
  refCurrentItem: PropTypes.any
}

export default class ProjectNav extends PureComponent {
  static propTypes = {
    currentSlug: PropTypes.string.isRequired
  }

  state = {
    scrollLeftPosition: 0
  }

  scrollContainer = React.createRef()
  currentItem = React.createRef()

  componentDidMount() {
    this.scrollToCurrent()
  }

  componentDidUpdate() {
    this.scrollToCurrent()
  }

  scrollToCurrent = () => {
    const scrollContainer = this.scrollContainer.current
    const activeItem = this.currentItem.current
    const scrollRect = scrollContainer.getBoundingClientRect()
    const activeRect = activeItem && activeItem.getBoundingClientRect()
    const scrollLeftPosition =
      activeRect &&
      activeRect.left -
        scrollRect.left -
        scrollRect.width / 2 +
        activeRect.width / 2

    scrollContainer.scrollLeft += this.state.scrollLeftPosition
    this.setState({ scrollLeftPosition })
  }

  render() {
    const { currentSlug } = this.props
    return (
      <StaticQuery
        query={query}
        render={(data) => {
          const projects = data.allProjectsYaml.edges

          return (
            <nav className={projectNav} ref={this.scrollContainer}>
              {projects.map(({ node }) => {
                const isCurrent = node.slug === currentSlug

                return (
                  <Project
                    key={shortid.generate()}
                    node={node}
                    refCurrentItem={isCurrent ? this.currentItem : null}
                  />
                )
              })}
            </nav>
          )
        }}
      />
    )
  }
}
