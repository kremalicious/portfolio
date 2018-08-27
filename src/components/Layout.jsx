import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Head from './molecules/Head'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import styles from './Layout.module.scss'

const Layout = ({ children, location }) => {
  const isHomepage = location.pathname === '/'

  return (
    <Fragment>
      <Head />
      <Header isHomepage={isHomepage} />

      <main className={styles.screen}>{children}</main>

      <Footer />
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired
}

export default Layout
