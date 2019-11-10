import React from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { graphql, useStaticQuery } from 'gatsby'
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

const query = graphql`
  query {
    metaYaml {
      allowedHosts
    }
  }
`

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default function Layout({ children, location }) {
  const { metaYaml } = useStaticQuery(query)
  const timeout = 200
  const RoutesContainer = posed.div(fadeIn)
  const isHomepage =
    location.pathname === '/' ||
    location.pathname === '/offline-plugin-app-shell-fallback/'

  return (
    <>
      <Typekit />
      <HostnameCheck allowedHosts={metaYaml.allowedHosts} />

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
