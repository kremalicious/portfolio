import React from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
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

    metaYaml {
      title
      url
      gpg
    }
  }
`

const FooterMarkup = ({ pkg, meta, year }) => (
  <footer className={`h-card ${styles.footer}`}>
    <LogoUnit minimal />
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

FooterMarkup.propTypes = {
  pkg: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired
}

export default function Footer() {
  const data = useStaticQuery(query)
  const pkg = data.portfolioJson
  const meta = data.metaYaml
  const year = new Date().getFullYear()

  return <FooterMarkup year={year} pkg={pkg} meta={meta} />
}
