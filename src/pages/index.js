import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/molecules/Header'
import Projects from '../components/organisms/Projects'

const Home = ({ data }) => (
  <div>
    <Header />
    <main className="screen screen--home">
      <Projects data={data} />
    </main>
  </div>
)

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
