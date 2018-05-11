import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import Head from '../components/atoms/Head'
import Header from '../components/organisms/Header'
import Footer from '../components/organisms/Footer'
import { FadeIn } from '../components/atoms/Animations'
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

const Main = ({ children }) => <main className="screen">{children}</main>

const TemplateWrapper = ({ data, location, children }) => {
  const meta = data.dataYaml
  const isHomepage = location.pathname === '/'

  return (
    <Fragment>
      <Head meta={meta} location={location} />
      <Header meta={meta} isHomepage={isHomepage} />

      <TransitionGroup component={Main} appear={true}>
        <FadeIn
          key={location.pathname}
          timeout={{ enter: 200, exit: 150, appear: 200 }}
        >
          <TransitionHandler location={location}>
            {children()}
          </TransitionHandler>
        </FadeIn>
      </TransitionGroup>

      <Footer meta={meta} />
    </Fragment>
  )
}

TransitionHandler.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object.isRequired,
}

Main.propTypes = {
  children: PropTypes.any,
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(TemplateWrapper)

export const query = graphql`
  query metaQuery {
    dataYaml {
      title
      tagline
      description
      url
      email
      avatar {
        childImageSharp {
          original: resize {
            src
          }
          small: resize(width: 256) {
            src
          }
        }
      }
      img {
        childImageSharp {
          resize(width: 980) {
            src
          }
        }
      }
      social {
        Email
        Blog
        Twitter
        GitHub
        Dribbble
      }
      availability {
        status
        available
        unavailable
      }
      gpg
      addressbook
      typekit
      googleanalytics
      avatarBase64
    }
  }
`
