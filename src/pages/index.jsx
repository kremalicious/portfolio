import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import shortid from 'shortid'
import SEO from '../components/atoms/SEO'
import ProjectImage from '../components/atoms/ProjectImage'
import styles from './index.module.scss'
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
    <article className={styles.project} key={slug}>
      <Link to={slug}>
        <h1 className={styles.title}>{title}</h1>
        <ProjectImage fluid={img.childImageSharp.fluid} alt={title} />

        {imageCount > 1 && (
          <small
            className={styles.imageCount}
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

function Home({ data, pageContext }) {
  const projects = data.allProjectsYaml.edges
  const images = data.projectImageFiles.edges

  return (
    <>
      <SEO />

      <div className={styles.projects}>
        {projects.map(({ node }) => (
          <Project key={shortid.generate()} node={node} images={images} />
        ))}
      </div>

      <Repositories repos={pageContext.repos} />
    </>
  )
}

export default memo(Home)

export const IndexQuery = graphql`
  query {
    allProjectsYaml {
      edges {
        node {
          title
          slug
          img {
            childImageSharp {
              fluid(maxWidth: 980, quality: 85) {
                ...GatsbyImageSharpFluid_withWebp
              }
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
