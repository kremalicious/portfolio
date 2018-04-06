import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import FadeIn from '../components/atoms/FadeIn'
import Footer from '../components/molecules/Footer'
import meta from '../data/meta.json'
import './index.scss'

const Head = () => (
  <Helmet
    defaultTitle={`${meta.title.toLowerCase()} { ${meta.tagline.toLowerCase()} }`}
    titleTemplate={`%s // ${meta.title.toLowerCase()} { ${meta.tagline.toLowerCase()} }`}
  >
    <link rel="stylesheet" href="https://use.typekit.net/dtg3zui.css" />
  </Helmet>
)

const TemplateWrapper = ({ children }) => (
  <div className="app">
    <Head />
    <FadeIn>{children()}</FadeIn>
    <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
