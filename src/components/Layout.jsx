import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Head from './molecules/Head'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import styles from './Layout.module.scss'

const Layout = ({ children, location }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          # the data/meta.yml file
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
            }
            gpg
            addressbook
          }
        }
      `}
      render={data => {
        const meta = data.dataYaml
        const isHomepage = location.pathname === '/'

        return (
          <Fragment>
            <Head meta={meta} />
            <Header meta={meta} isHomepage={isHomepage} />

            <main className={styles.screen}>{children}</main>

            <Footer meta={meta} />
          </Fragment>
        )
      }}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired
}

export default Layout
