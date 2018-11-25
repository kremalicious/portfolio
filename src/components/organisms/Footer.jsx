import React, { PureComponent } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Vcard from '../atoms/Vcard'
import LogoUnit from '../molecules/LogoUnit'
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

export default class Footer extends PureComponent {
  state = { year: new Date().getFullYear() }

  FooterMarkup = ({ meta, pkg, year }) => (
    <footer className={styles.footer}>
      <Link to={'/'}>
        <LogoUnit minimal />
      </Link>

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

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const pkg = data.portfolioJson
          const meta = data.dataYaml

          return (
            <this.FooterMarkup year={this.state.year} pkg={pkg} meta={meta} />
          )
        }}
      />
    )
  }
}
