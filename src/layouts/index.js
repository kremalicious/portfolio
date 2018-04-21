import React from 'react'
import PropTypes from 'prop-types'
import WebFont from 'webfontloader'
import Head from '../components/atoms/Head'
import Header from '../components/organisms/Header'
import Footer from '../components/organisms/Footer'
import './index.scss'

const TemplateWrapper = ({ data, location, children }) => {
  const meta = data.dataJson
  const isHomepage = location.pathname === '/'

  return (
    <div className="app">
      <Head meta={meta} />
      {WebFont.load({ typekit: { id: meta.typekit } })}

      <Header meta={meta} isHomepage={isHomepage} />

      {children()}

      <Footer meta={meta} />
    </div>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default TemplateWrapper

export const query = graphql`
  query metaQuery {
    dataJson {
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
`
