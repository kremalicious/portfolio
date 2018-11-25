import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import FullWidth from '../components/atoms/FullWidth'
import ProjectImage from '../components/molecules/ProjectImage'
import ProjectTechstack from '../components/molecules/ProjectTechstack'
import ProjectLinks from '../components/molecules/ProjectLinks'
import ProjectNav from '../components/molecules/ProjectNav'
import SEO from '../components/atoms/SEO'
import styles from './Project.module.scss'

class ProjectMeta extends PureComponent {
  static propTypes = {
    links: PropTypes.array,
    techstack: PropTypes.array
  }

  render() {
    const { links, techstack } = this.props

    return (
      <footer className={styles.meta}>
        {!!links && <ProjectLinks links={links} />}
        {!!techstack && <ProjectTechstack techstack={techstack} />}
      </footer>
    )
  }
}

const ProjectImages = ({ projectImages, title }) => (
  <FullWidth>
    {projectImages.map(({ node }) => (
      <div className={styles.imageWrap} key={node.id}>
        <ProjectImage fluid={node.fluid} alt={title} />
      </div>
    ))}
  </FullWidth>
)

ProjectImages.propTypes = {
  projectImages: PropTypes.array,
  title: PropTypes.string
}

export default class Project extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const project = this.props.data.projectsYaml
    const projectImages = this.props.data.projectImages.edges
    const descriptionHtml = this.props.data.projectsYaml.fields.descriptionHtml
    const { title, links, techstack } = project

    return (
      <>
        <SEO project={project} />

        <article>
          <header>
            <h1 className={styles.title}>{title}</h1>
          </header>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
          <ProjectImages projectImages={projectImages} title={title} />
          <ProjectMeta links={links} techstack={techstack} />
        </article>

        <ProjectNav slug={project.slug} />
      </>
    )
  }
}

export const projectAndProjectsQuery = graphql`
  query($slug: String!) {
    projectsYaml(slug: { eq: $slug }) {
      title
      slug
      description
      fields {
        descriptionHtml
      }
      links {
        title
        url
        type
      }
      techstack
      img {
        childImageSharp {
          twitterImage: resize(width: 980) {
            src
          }
        }
      }
    }

    projectImages: allImageSharp(
      filter: { fluid: { originalName: { regex: $slug } } }
      sort: { fields: [fluid___originalName], order: ASC }
    ) {
      edges {
        node {
          id
          ...ProjectImageFluid
        }
      }
    }
  }
`
