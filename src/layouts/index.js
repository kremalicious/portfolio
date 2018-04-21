import React from 'react'
import PropTypes from 'prop-types'
import Head from '../components/atoms/Head'
import FadeIn from '../components/atoms/FadeIn'
import Header from '../components/molecules/Header'
import Footer from '../components/molecules/Footer'
import './index.scss'

const TemplateWrapper = ({ data, location, children }) => {
  const meta = data.allDataJson.edges[0].node
  const isHomepage = location.pathname === '/'

  return (
    <div className="app">
      <Head meta={meta} />
      <Header meta={meta} isHomepage={isHomepage} />
      <FadeIn>{children()}</FadeIn>
      <Footer meta={meta} />
    </div>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object,
  location: PropTypes.object,
}

export default TemplateWrapper

export const query = graphql`
  query metaQuery {
    allDataJson {
      edges {
        node {
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
          availability
          typekit
          googleanalytics
        }
      }
    }
  }
`
