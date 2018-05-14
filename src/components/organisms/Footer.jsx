import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Vcard from '../atoms/Vcard'
import LogoUnit from '../atoms/LogoUnit'
import Networks from '../molecules/Networks'
import './Footer.scss'

class Footer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { year: new Date().getFullYear() }
  }

  render() {
    const meta = this.props.meta
    const pkg = this.props.pkg

    return (
      <footer className="footer">
        <LogoUnit meta={meta} minimal />
        <Networks meta={meta} minimal />

        <p className="footer__actions">
          <Vcard meta={meta} />
          <a href={meta.gpg}>PGP/GPG key</a>
          <a href={pkg.bugs}>Found a bug?</a>
        </p>
        <p className="footer__copyright">
          <small>
            &copy; {this.state.year} {meta.title} &mdash; All Rights Reserved
          </small>
        </p>
      </footer>
    )
  }
}

Footer.propTypes = {
  meta: PropTypes.object,
  pkg: PropTypes.object
}

export default Footer
