import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import loadable from '@loadable/component'
import LogoUnit from '../molecules/LogoUnit'
import Networks from '../molecules/Networks'
import styles from './Footer.module.css'
import { useMeta } from '../../hooks/use-meta'

const LazyVcard = loadable(() => import('../atoms/Vcard'))

const query = graphql`
  query {
    # the package.json file
    portfolioJson {
      bugs
    }
  }
`

const FooterMarkup = ({ pkg, meta, year }) => (
  <footer className={`h-card ${styles.footer}`}>
    <LogoUnit minimal />
    <Networks small />

    <p className={styles.actions}>
      <LazyVcard />
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

function Footer() {
  const metaYaml = useMeta()
  const { portfolioJson } = useStaticQuery(query)
  const year = new Date().getFullYear()

  return <FooterMarkup year={year} pkg={portfolioJson} meta={metaYaml} />
}

export default memo(Footer)
