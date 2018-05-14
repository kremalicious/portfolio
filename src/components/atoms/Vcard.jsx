import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FileSaver from 'file-saver'
import vCard from '../../lib/vcf/vcard'

class Vcard extends PureComponent {
  constructor(props) {
    super(props)
  }

  // Helper function to create base64 string from avatar image
  // without the need to read image file from file system
  toDataURL(src, callback, outputFormat) {
    const img = new Image()
    img.crossOrigin = 'Anonymous'

    img.onload = function() {
      // yeah, we're gonna create a fake canvas to render the image
      // and then create a base64 string from the rendered result
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

    // first, convert the avatar to base64,
    // then construct all vCard elements
    this.toDataURL(
      photoSrc,
      dataUrl => {
        // stripping this data out of base64 string is required
        // for vcard to actually display the image for whatever reason
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

  // Construct the download from a blob of the just constructed vCard,
  // and save it to user's file system
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
        // href is kinda fake, only there for usability
        // so user knows what to expect when hovering the link before clicking
        href={this.props.meta.addressbook}
        onClick={this.handleAddressbookClick}
      >
        Add to addressbook
      </a>
    )
  }
}

Vcard.propTypes = {
  meta: PropTypes.object
}

export default Vcard
