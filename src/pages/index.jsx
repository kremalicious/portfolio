import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import SEO from '../components/atoms/SEO'
import ProjectImage from '../components/atoms/ProjectImage'
import { grid } from '../components/Layout.module.css'
import {
  project as styleProject,
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
    <Link to={slug} className={styleProject} key={slug}>
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

      <div className={grid}>
        {projects.map(({ node }, i) => (
          <Project key={i} node={node} images={images} />
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
              ...ProjectImageTeaser
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
