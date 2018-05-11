import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FileSaver from 'file-saver'
import vCard from '../../lib/vcf/vcard'
import Social from '../molecules/Social'
import './Footer.scss'

class Footer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { year: new Date().getFullYear() }
  }

  generateFileName() {
    // results in 'matthias-kretschmann.vcf'
    return `${this.props.meta.title
      .toLowerCase()
      .split(' ')
      .join('-')}.vcf`
  }

  constructVcard() {
    const meta = this.props.meta
    const contact = new vCard()
    const photo = meta.avatarBase64

    contact.set('fn', meta.title)
    contact.set('title', meta.tagline)
    contact.set('email', meta.email)
    contact.set('url', meta.url, { type: 'Portfolio' })
    contact.add('url', meta.social.Blog, { type: 'Blog' })
    contact.set('nickname', 'kremalicious')
    contact.add('x-socialprofile', meta.social.Twitter, { type: 'twitter' })
    contact.add('x-socialprofile', meta.social.GitHub, { type: 'GitHub' })
    contact.set('photo', photo, { encoding: 'b', type: 'JPEG' })

    const vcard = contact.toString('3.0')
    this.downloadVcard(vcard)
  }

  downloadVcard(vcard) {
    const blob = new Blob([vcard], { type: 'text/x-vcard' })
    FileSaver.saveAs(blob, this.generateFileName())
  }

  handleAddressbookClick = (e) => {
    e.preventDefault()
    this.constructVcard()
  }

  render() {
    const meta = this.props.meta

    return (
      <footer className="footer">
        <Social meta={meta} minimal />
        <p className="footer__actions">
          <a
            href={`${meta.url}/${this.generateFileName()}`}
            onClick={this.handleAddressbookClick}
          >
            Add to addressbook
          </a>
          <a href={meta.gpg}>PGP/GPG key</a>
        </p>
        <p>
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
}

export default Footer
