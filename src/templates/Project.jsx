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

class Project extends Component {
  constructor(props) {
    super(props)

    const description = this.props.data.projectsYaml.description

    this.state = {
      descriptionWithLineBreaks: description.split('\n').join('\n\n'),
    }
  }

  render() {
    const meta = this.props.data.dataYaml
    const project = this.props.data.projectsYaml
    const projectImages = this.props.data.projectImages.edges
    const pathContext = this.props.pathContext

    const { title, links, techstack } = project
    const { next, previous } = pathContext

    return (
      <Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <SEO project={project} meta={meta} />

        <article className="project">
          <Content>
            <h1 className="project__title">{title}</h1>
            <ReactMarkdown
              source={this.state.descriptionWithLineBreaks}
              className="project__description"
            />

            <FullWidth>
              {projectImages.map(({ node }) => (
                <ProjectImage key={node.id} sizes={node.sizes} alt={title} />
              ))}
            </FullWidth>

            <footer className="project__meta">
              {!!links && <ProjectLinks links={links} />}
              {!!techstack && <ProjectTechstack techstack={techstack} />}
            </footer>
          </Content>
        </article>

        <ProjectNav previous={previous} next={next} />
      </Fragment>
    )
  }
}

Project.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object.isRequired,
}

export default Project

export const projectQuery = graphql`
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
  }
`
