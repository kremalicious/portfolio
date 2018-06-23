import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Vcard from '../atoms/Vcard'
import LogoUnit from '../atoms/LogoUnit'
import Networks from '../molecules/Networks'
import styles from './Footer.module.scss'

class Footer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { year: new Date().getFullYear() }
  }

  render() {
    const meta = this.props.meta

    return (
      <StaticQuery
        query={graphql`
          query FooterQuery {
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
          const pkg = data.portfolioJson

          return (
            <footer className={styles.footer}>
              <LogoUnit meta={meta} minimal />
              <Networks meta={meta} minimal />

              <p className={styles.footer__actions}>
                <Vcard meta={meta} />
                <a href={meta.gpg}>PGP/GPG key</a>
                <a href={pkg.bugs}>Found a bug?</a>
              </p>
              <p className={styles.footer__copyright}>
                <small>
                  &copy; {this.state.year} {meta.title} &mdash; All Rights
                  Reserved
                </small>
              </p>
            </footer>
          )
        }}
      />
    )
  }
}

Footer.propTypes = {
  meta: PropTypes.object,
  pkg: PropTypes.object
}

export default Footer
