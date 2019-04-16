import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { StaticQuery, graphql } from 'gatsby'
import { fadeIn } from './atoms/Transitions'
import Typekit from './atoms/Typekit'
import HostnameCheck from './atoms/HostnameCheck'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import styles from './Layout.module.scss'

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }

const timeout = 250
const RoutesContainer = posed.div(fadeIn)

const query = graphql`
  query {
    contentYaml {
      allowedHosts
    }
  }
`

const LayoutMarkup = ({ children, data, location }) => {
  const { allowedHosts } = data.contentYaml
  const isHomepage = location.pathname === '/'

  return (
    <>
      <Typekit />
      <HostnameCheck allowedHosts={allowedHosts} />

      <PoseGroup animateOnMount={true}>
        <RoutesContainer
          key={location.pathname}
          delay={timeout}
          delayChildren={timeout}
        >
          <Header minimal={!isHomepage} />
          <main className={styles.screen}>{children}</main>
        </RoutesContainer>
      </PoseGroup>

      <Footer />
    </>
  )
}

LayoutMarkup.propTypes = {
  children: PropTypes.any.isRequired,
  data: PropTypes.shape({
    contentYaml: PropTypes.shape({
      allowedHosts: PropTypes.array.isRequired
    }).isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    const { children, location } = this.props

    return (
      <StaticQuery
        query={query}
        render={data => (
          <LayoutMarkup data={data} location={location}>
            {children}
          </LayoutMarkup>
        )}
      />
    )
  }
}
