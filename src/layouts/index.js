import React from 'react'
import PropTypes from 'prop-types'
import Head from '../components/atoms/Head'
import FadeIn from '../components/atoms/FadeIn'
import Header from '../components/molecules/Header'
import Footer from '../components/molecules/Footer'
import './index.scss'

const TemplateWrapper = props => {
  const meta = props.data.allDataJson.edges[0].node
  const isHomepage = props.location.pathname === '/'

  return (
    <div className="app">
      <Head meta={meta} />
      <Header meta={meta} isHomepage={isHomepage} />
      <FadeIn>{props.children()}</FadeIn>
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
        }
      }
    }
  }
`
