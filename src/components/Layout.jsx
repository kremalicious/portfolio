import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import { StaticQuery, graphql } from 'gatsby'
import Head from './atoms/Head'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import { FadeIn } from './atoms/Animations'
import styles from './Layout.module.scss'

class TransitionHandler extends Component {
  shouldComponentUpdate() {
    return this.props.location.pathname === window.location.pathname
  }

  render() {
    const { children } = this.props
    return <div className={styles.transitionContainer}>{children}</div>
  }
}

const Main = ({ children }) => <main className={styles.screen}>{children}</main>

const TemplateWrapper = ({ children, location }) => {
  const isHomepage = location.pathname === '/'

  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
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

          # the package.json file
          portfolioJson {
            name
            homepage
            repository
            bugs
          }
        }
      `}
      render={data => {
        const meta = data.dataYaml
        const pkg = data.portfolioJson

        return (
          <Fragment>
            <Head meta={meta} />
            <Header meta={meta} isHomepage={isHomepage} />

            <TransitionGroup
              className={styles.TransitionGroup}
              component={Main}
              appear={true}
            >
              <FadeIn
                key={location.pathname}
                timeout={{ enter: 200, exit: 150, appear: 200 }}
              >
                <TransitionHandler location={location}>
                  {children}
                </TransitionHandler>
              </FadeIn>
            </TransitionGroup>

            <Footer meta={meta} pkg={pkg} />
          </Fragment>
        )
      }}
    />
  )
}

TransitionHandler.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired
}

Main.propTypes = {
  children: PropTypes.any.isRequired
}

TemplateWrapper.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired
}

export default withRouter(TemplateWrapper)
