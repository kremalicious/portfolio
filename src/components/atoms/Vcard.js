import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FileSaver from 'file-saver'
import vCard from '../../lib/vcf/vcard'

class Vcard extends PureComponent {
  constructor(props) {
    super(props)
  }

  toDataURL(src, callback, outputFormat) {
    const img = new Image()
    img.crossOrigin = 'Anonymous'

    img.onload = function() {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      let dataURL

      canvas.height = this.naturalHeight
      canvas.width = this.naturalWidth
      ctx.drawImage(this, 0, 0)
      dataURL = canvas.toDataURL(outputFormat)
      callback(dataURL)
    }

    img.src = src
    if (img.complete || img.complete === undefined) {
      img.src =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
      img.src = src
    }
  }

  constructVcard() {
    const meta = this.props.meta
    const contact = new vCard()
    const photoSrc = meta.avatar.childImageSharp.original.src

    this.toDataURL(
      photoSrc,
      dataUrl => {
        // stripping this data out of base64 string
        // is required for vcard for whatever reason
        const dataUrlCleaned = dataUrl.split('data:image/jpeg;base64,').join('')
        contact.set('photo', dataUrlCleaned, { encoding: 'b', type: 'JPEG' })
        contact.set('fn', meta.title)
        contact.set('title', meta.tagline)
        contact.set('email', meta.email)
        contact.set('url', meta.url, { type: 'Portfolio' })
        contact.add('url', meta.social.Blog, { type: 'Blog' })
        contact.set('nickname', 'kremalicious')
        contact.add('x-socialprofile', meta.social.Twitter, { type: 'twitter' })
        contact.add('x-socialprofile', meta.social.GitHub, { type: 'GitHub' })

        const vcard = contact.toString('3.0')

        this.downloadVcard(vcard)
      },
      'image/jpeg'
    )
  }

  downloadVcard(vcard) {
    const name = this.props.meta.addressbook.split('/').join('')
    const blob = new Blob([vcard], { type: 'text/x-vcard' })
    FileSaver.saveAs(blob, name)
  }

  handleAddressbookClick = e => {
    e.preventDefault()
    this.constructVcard()
  }

  render() {
    return (
      <a
        href={this.props.meta.addressbook}
        onClick={this.handleAddressbookClick}
      >
        Add to addressbook
      </a>
    )
  }
}

Vcard.propTypes = {
  meta: PropTypes.object,
}

export default Vcard
