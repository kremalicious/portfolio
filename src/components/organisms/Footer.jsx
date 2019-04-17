import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
      bugs
    }

    contentYaml {
      title
      url
      gpg
    }
  }
`

const FooterMarkup = ({ pkg, meta, year }) => {
  const classes = classNames('h-card', [styles.footer])

  return (
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
}

FooterMarkup.propTypes = {
  pkg: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired
}

export default class Footer extends PureComponent {
  state = { year: new Date().getFullYear() }

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const pkg = data.portfolioJson
          const meta = data.contentYaml

          return <FooterMarkup year={this.state.year} pkg={pkg} meta={meta} />
        }}
      />
    )
  }
}
