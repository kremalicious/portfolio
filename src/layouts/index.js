import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import Head from '../components/atoms/Head'
import Header from '../components/organisms/Header'
import Footer from '../components/organisms/Footer'
import { FadeIn } from  '../components/atoms/Animations'
import './index.scss'

class TransitionHandler extends Component {
  shouldComponentUpdate() {
    return this.props.location.pathname === window.location.pathname
  }

  render() {
    const { children } = this.props
    return <div className="transition-container">{children}</div>
  }
}

const TemplateWrapper = ({ data, location, children }) => {
  const meta = data.dataJson
  const isHomepage = location.pathname === '/'

  return (
    <div className="app">
      <Head meta={meta} />
      <Header meta={meta} isHomepage={isHomepage} />

      <TransitionGroup appear={true}>
        <FadeIn
          key={location.pathname}
          timeout={{ enter: 300, exit: 200, appear: 300 }}>
          <TransitionHandler location={location}>
            {children()}
          </TransitionHandler>
        </FadeIn>
      </TransitionGroup>

      <Footer meta={meta} />
    </div>
  )
}

TransitionHandler.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object.isRequired,
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(TemplateWrapper)

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
