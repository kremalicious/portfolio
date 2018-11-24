import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import ProjectImage from '../components/molecules/ProjectImage'
import { ReactComponent as Images } from '../images/images.svg'
import styles from './index.module.scss'

const getImageCount = (imageEdges, slug) => {
  let array = []

  imageEdges.map(({ node }) => {
    if (node.name.includes(slug.replace(/\//g, ''))) {
      array.push(node)
    }
  })

  return array
}

const Home = ({ data }) => {
  const projects = data.allProjectsYaml.edges
  const imageEdges = data.projectImageFiles.edges

  return (
    <div className={styles.projects}>
      {projects.map(({ node }) => {
        const { slug, title, img } = node
        const imageCount = getImageCount(imageEdges, slug).length

        return (
          <article className={styles.project} key={slug}>
            <Link to={slug}>
              <h1 className={styles.title}>{title}</h1>
              <ProjectImage fluid={img.childImageSharp.fluid} alt={title} />

              {imageCount > 0 && (
                <small
                  className={styles.imageCount}
                  title={`${imageCount} project images`}
                >
                  <Images /> {imageCount}
                </small>
              )}
            </Link>
          </article>
        )
      })}
    </div>
  )
}

Home.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object
}

export default Home

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

    projectImageFiles: allFile(filter: { name: { regex: "/portfolio/" } }) {
      edges {
        node {
          name
        }
      }
    }
  }
`
