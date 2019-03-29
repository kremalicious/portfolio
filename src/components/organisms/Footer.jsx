import React, { PureComponent } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import classNames from 'classnames'
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

    contentYaml {
      title
      url
      gpg
    }
  }
`

let classes = classNames('h-card', [styles.footer])

export default class Footer extends PureComponent {
  state = { year: new Date().getFullYear() }

  FooterMarkup = ({ meta, pkg, year }) => (
    <footer className={classes}>
      <Link to={'/'}>
        <LogoUnit minimal />
      </Link>

      <Networks minimal />

      <p className={styles.actions}>
        <Vcard />
        <a className="u-key" href={meta.gpg}>
          PGP/GPG key
        </a>
        <a href={pkg.bugs}>Found a bug?</a>
      </p>
      <p className={styles.copyright}>
        <small>
          &copy; {year}{' '}
          <a className="u-url" href={meta.url}>
            {meta.title}
          </a>{' '}
          &mdash; All Rights Reserved
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
          const meta = data.contentYaml

          return (
            <this.FooterMarkup year={this.state.year} pkg={pkg} meta={meta} />
          )
        }}
      />
    )
  }
}
