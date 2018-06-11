import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import ReactMarkdown from 'react-markdown'
import Content from '../components/atoms/Content'
import FullWidth from '../components/atoms/FullWidth'
import ProjectImage from '../components/atoms/ProjectImage'
import ProjectTechstack from '../components/molecules/ProjectTechstack'
import ProjectLinks from '../components/molecules/ProjectLinks'
import ProjectNav from '../components/molecules/ProjectNav'
import SEO from '../components/atoms/SEO'
import './Project.scss'

const ProjectMeta = props => {
  const { links, techstack } = props

  return (
    <footer className="project__meta">
      {!!links && <ProjectLinks links={links} />}
      {!!techstack && <ProjectTechstack techstack={techstack} />}
    </footer>
  )
}

const ProjectImages = props => (
  <FullWidth>
    {props.projectImages.map(({ node }) => (
      <ProjectImage key={node.id} sizes={node.sizes} alt={props.title} />
    ))}
  </FullWidth>
)

class Project extends Component {
  constructor(props) {
    super(props)

    const description = this.props.data.projectsYaml.description

    this.state = {
      descriptionWithLineBreaks: description.split('\n').join('\n\n')
    }
  }

  render() {
    const meta = this.props.data.dataYaml
    const projects = this.props.data.allProjectsYaml.edges
    const project = this.props.data.projectsYaml
    const projectImages = this.props.data.projectImages.edges
    const { title, links, techstack } = project

    return (
      <Fragment>
        <Helmet title={title} />

        <SEO project={project} meta={meta} />

        <article className="project">
          <Content>
            <h1 className="project__title">{title}</h1>
            <ReactMarkdown
              source={this.state.descriptionWithLineBreaks}
              className="project__description"
            />
            <ProjectImages projectImages={projectImages} title={title} />
            <ProjectMeta links={links} techstack={techstack} />
          </Content>
        </article>

        <ProjectNav projects={projects} />
      </Fragment>
    )
  }
}

ProjectMeta.propTypes = {
  links: PropTypes.array,
  techstack: PropTypes.array
}

ProjectImages.propTypes = {
  projectImages: PropTypes.array,
  title: PropTypes.string
}

Project.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object.isRequired
}

export default Project

export const projectAndProjectsQuery = graphql`
  query ProjectBySlug($slug: String!) {
    projectsYaml(slug: { eq: $slug }) {
      title
      slug
      description
      links {
        title
        url
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

    # the data/meta.yml file
    dataYaml {
      title
      tagline
      description
      url
      social {
        Email
        Blog
        Twitter
        GitHub
        Dribbble
      }
      availability {
        status
        available
        unavailable
      }
      img {
        childImageSharp {
          resize(width: 980) {
            src
          }
        }
      }
    }

    projectImages: allImageSharp(
      filter: { id: { regex: $slug } }
      sort: { fields: [id], order: ASC }
    ) {
      edges {
        node {
          id
          ...ProjectImageSizes
        }
      }
    }

    allProjectsYaml {
      edges {
        node {
          title
          slug
          img {
            childImageSharp {
              ...ProjectImageSizes
            }
          }
        }
      }
    }
  }
`
