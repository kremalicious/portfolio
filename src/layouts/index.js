import React from 'react'
import PropTypes from 'prop-types'
import Head from '../components/molecules/Head'
import FadeIn from '../components/atoms/FadeIn'
import Header from '../components/molecules/Header'
import Footer from '../components/molecules/Footer'
import './index.scss'

const TemplateWrapper = props => {
  const meta = props.data.allDataJson.edges[0].node

  return <div className="app">
      <Head meta={meta} />
      <Header meta={meta} />
      <FadeIn>{props.children()}</FadeIn>
      <Footer meta={meta} />
    </div>
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object,
}

export default TemplateWrapper

export const query = graphql`
         query pageLayoutQueryAndMetaQuery {
           allDataJson {
             edges {
               node {
                 title
                 tagline
                 description
                 url
                 social {
                   Twitter
                   GitHub
                   Facebook
                 }
               }
             }
           }
           sitePage {
             jsonName
           }
         }
       `
