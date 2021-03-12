import React, { memo } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import LogoUnit from '../molecules/LogoUnit'
import Networks from '../molecules/Networks'
import { footer, actions, copyright } from './Footer.module.css'
import { useMeta } from '../../hooks/use-meta'

const LazyVcard = loadable(() => import('../atoms/Vcard'))

const FooterMarkup = ({ meta, year }) => (
  <footer className={`h-card ${footer}`}>
    <LogoUnit minimal />
    <Networks small />

    <p className={actions}>
      <LazyVcard />
      <a className="u-key" href={meta.gpg}>
        PGP/GPG key
      </a>
      <a href={meta.bugs}>Found a bug?</a>
    </p>
    <p className={copyright}>
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
  meta: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired
}

function Footer() {
  const metaYaml = useMeta()
  const year = new Date().getFullYear()

  return <FooterMarkup year={year} meta={metaYaml} />
}

export default memo(Footer)
