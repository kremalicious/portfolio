import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { fullContainer } from '../components/Layout.module.css'
import ProjectImage from '../components/atoms/ProjectImage'
import ProjectTechstack from '../components/molecules/ProjectTechstack'
import ProjectLinks from '../components/molecules/ProjectLinks'
import ProjectNav from '../components/molecules/ProjectNav'
import SEO from '../components/atoms/SEO'
import {
  meta,
  headerTitle,
  description
} from './{ProjectsYaml.slug}.module.css'

function ProjectMeta({ links, techstack }) {
  return (
    <footer className={meta}>
      {!!links && <ProjectLinks links={links} />}
      {!!techstack && <ProjectTechstack techstack={techstack} />}
    </footer>
  )
}

ProjectMeta.propTypes = {
  links: PropTypes.array,
  techstack: PropTypes.array
}

function ProjectImages({ projectImages, title }) {
  return projectImages.map(({ node }) => (
    <ProjectImage
      image={node.gatsbyImageData}
      alt={title}
      key={node.id}
      className={fullContainer}
    />
  ))
}

ProjectImages.propTypes = {
  projectImages: PropTypes.array,
  title: PropTypes.string
}

export default function Project({ data }) {
  const project = data.projectsYaml
  const projectImages = data.projectImages.edges
  const descriptionHtml = data.projectsYaml.fields.descriptionHtml
  const { title, links, techstack } = project

  return (
    <>
      <SEO project={project} />

      <article>
        <header>
          <h1 className={headerTitle}>{title}</h1>
        </header>
        <div
          className={description}
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
        <ProjectImages projectImages={projectImages} title={title} />
        <ProjectMeta links={links} techstack={techstack} />
      </article>

      <ProjectNav currentSlug={project.slug} />
    </>
  )
}

Project.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export const projectQuery = graphql`
  query ($slug: String!, $imageRegex: String!) {
    projectsYaml(slug: { eq: $slug }) {
      title
      slug
      fields {
        descriptionHtml
        excerpt
      }
      links {
        title
        url
        icon
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
      filter: { original: { src: { regex: $imageRegex } } }
      sort: { fields: [original___src], order: ASC }
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
