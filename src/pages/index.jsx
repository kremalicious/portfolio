import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import shortid from 'shortid'
import SEO from '../components/atoms/SEO'
import ProjectImage from '../components/atoms/ProjectImage'
import {
  project as styleProject,
  projects as styleProjects,
  title as styleTitle,
  imageCount as styleImageCount
} from './index.module.css'
import Repositories from '../components/organisms/Repositories'
import Icon from '../components/atoms/Icon'

function getImageCount(images, slug) {
  let array = []
  let slugWithoutSlashes = slug.replace(/\//g, '')

  images.map(
    ({ node }) => node.name.includes(slugWithoutSlashes) && array.push(node)
  )

  return array.length
}

Project.propTypes = {
  node: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.object.isRequired
  }),
  images: PropTypes.array.isRequired
}

function Project({ node, images }) {
  const { slug, title, img } = node
  const imageCount = getImageCount(images, slug)

  return (
    <article className={styleProject} key={slug}>
      <Link to={slug}>
        <h1 className={styleTitle}>{title}</h1>
        <ProjectImage image={img.childImageSharp.gatsbyImageData} alt={title} />

        {imageCount > 1 && (
          <small
            className={styleImageCount}
            title={`${imageCount} project images`}
          >
            <Icon name="Image" /> {imageCount}
          </small>
        )}
      </Link>
    </article>
  )
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
}

export default function Home({ data, pageContext }) {
  const projects = data.allProjectsYaml.edges
  const images = data.projectImageFiles.edges

  return (
    <>
      <SEO />

      <div className={styleProjects}>
        {projects.map(({ node }) => (
          <Project key={shortid.generate()} node={node} images={images} />
        ))}
      </div>

      <Repositories repos={pageContext.repos} />
    </>
  )
}

export const IndexQuery = graphql`
  query {
    allProjectsYaml {
      edges {
        node {
          title
          slug
          img {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 980, quality: 85)
            }
          }
        }
      }
    }

    projectImageFiles: allFile(
      filter: { absolutePath: { regex: "/portfolio/" } }
    ) {
      edges {
        node {
          name
        }
      }
    }
  }
`
