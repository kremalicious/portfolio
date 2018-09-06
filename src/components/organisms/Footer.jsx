import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Vcard from '../atoms/Vcard'
import LogoUnit from '../atoms/LogoUnit'
import Networks from '../molecules/Networks'
import styles from './Footer.module.scss'

const query = graphql`
  query {
    # the package.json file
    portfolioJson {
      name
      homepage
      repository
      bugs
    }

    dataYaml {
      title
      gpg
    }
  }
`

const FooterMarkup = ({ meta, pkg, year }) => (
  <footer className={styles.footer}>
    <LogoUnit minimal />
    <Networks minimal />

    <p className={styles.footer__actions}>
      <Vcard />
      <a href={meta.gpg}>PGP/GPG key</a>
      <a href={pkg.bugs}>Found a bug?</a>
    </p>
    <p className={styles.footer__copyright}>
      <small>
        &copy; {year} {meta.title} &mdash; All Rights Reserved
      </small>
    </p>
  </footer>
)

FooterMarkup.propTypes = {
  meta: PropTypes.object,
  pkg: PropTypes.object,
  year: PropTypes.number
}

export default class Footer extends PureComponent {
  state = { year: new Date().getFullYear() }

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const pkg = data.portfolioJson
          const meta = data.dataYaml

          return <FooterMarkup year={this.state.year} pkg={pkg} meta={meta} />
        }}
      />
    )
  }
}
