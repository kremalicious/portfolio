import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import ReactMarkdown from 'react-markdown'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content from '../components/atoms/Content'
import FullWidth from '../components/atoms/FullWidth'
import ProjectImage from '../components/atoms/ProjectImage'
import ProjectTechstack from '../components/molecules/ProjectTechstack'
import ProjectLinks from '../components/molecules/ProjectLinks'
import ProjectNav from '../components/molecules/ProjectNav'
import SEO from '../components/atoms/SEO'

import styles from './Project.module.scss'

const ProjectMeta = ({ links, techstack }) => (
  <footer className={styles.project__meta}>
    {!!links && <ProjectLinks links={links} />}
    {!!techstack && <ProjectTechstack techstack={techstack} />}
  </footer>
)

const ProjectImages = ({ projectImages, title }) => (
  <FullWidth>
    {projectImages.map(({ node }) => (
      <div className={styles.spacer} key={node.id}>
        <ProjectImage fluid={node.fluid} alt={title} />
      </div>
    ))}
  </FullWidth>
)

const Project = ({ data, location }) => {
  const meta = data.dataYaml
  const project = data.projectsYaml
  const projectImages = data.projectImages.edges
  const { title, links, techstack } = project
  const description = data.projectsYaml.description
  const descriptionWithLineBreaks = description.split('\n').join('\n\n')

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <SEO project={project} meta={meta} />

      <article className={styles.project}>
        <Content>
          <h1 className={styles.project__title}>{title}</h1>
          <ReactMarkdown
            source={descriptionWithLineBreaks}
            className={styles.project__description}
          />
          <ProjectImages projectImages={projectImages} title={title} />
          <ProjectMeta links={links} techstack={techstack} />
        </Content>
      </article>

      <ProjectNav slug={project.slug} />
    </Layout>
  )
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
  location: PropTypes.object.isRequired
}

export default Project

export const projectAndProjectsQuery = graphql`
  query($slug: String!) {
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
      img {
        childImageSharp {
          resize(width: 980) {
            src
          }
        }
      }
    }

    projectImages: allImageSharp(
      filter: { fluid: { originalName: { regex: $slug } } }
      sort: { fields: [id], order: ASC }
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
