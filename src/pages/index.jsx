import React from 'react'
import PropTypes from 'prop-types'
import Projects from '../components/organisms/Projects'

const Home = ({ data }) => <Projects data={data} />

Home.propTypes = {
  data: PropTypes.object,
}

export default Home

export const query = graphql`
  query IndexQuery {
    allProjectsJson {
      totalCount
      edges {
        node {
          title
          slug
          img
        }
      }
    }
  }
`
