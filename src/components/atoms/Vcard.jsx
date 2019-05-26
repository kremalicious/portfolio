import React, { PureComponent } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import saveAs from 'file-saver'
import vCard from 'vcf'

const query = graphql`
  query {
    metaYaml {
      title
      tagline
      description
      url
      email
      avatar {
        childImageSharp {
          resize {
            src
          }
        }
      }
      social {
        Email
        Blog
        Twitter
        GitHub
        Dribbble
      }
      gpg
      addressbook
    }
  }
`

export default class Vcard extends PureComponent {
  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const meta = data.metaYaml

          const handleAddressbookClick = e => {
            e.preventDefault()
            init(meta)
          }

          return (
            <a
              // href is kinda fake, only there for usability
              // so user knows what to expect when hovering the link before clicking
              href={meta.addressbook}
              onClick={handleAddressbookClick}
            >
              Add to addressbook
            </a>
          )
        }}
      />
    )
  }
}

export const init = async meta => {
  const photoSrc = meta.avatar.childImageSharp.resize.src

  // first, convert the avatar to base64, then construct all vCard elements
  const dataUrl = await toDataURL(photoSrc, 'image/jpeg')
  const vcard = await constructVcard(dataUrl, meta)

  downloadVcard(vcard, meta)
}

// Construct the download from a blob of the just constructed vCard,
// and save it to user's file system
export const downloadVcard = (vcard, meta) => {
  const { addressbook } = meta
  const name = addressbook.split('/').join('')
  const blob = new Blob([vcard], { type: 'text/x-vcard' })
  saveAs(blob, name)
}

export const constructVcard = async (dataUrl, meta) => {
  const contact = new vCard()

  // stripping this data out of base64 string is required
  // for vcard to actually display the image for whatever reason
  // const dataUrlCleaned = dataUrl.split('data:image/jpeg;base64,').join('')
  // contact.set('photo', dataUrlCleaned, { encoding: 'b', type: 'JPEG' })
  contact.set('fn', meta.title)
  contact.set('title', meta.tagline)
  contact.set('email', meta.email)
  contact.set('url', meta.url, { type: 'Portfolio' })
  contact.add('url', meta.social.Blog, { type: 'Blog' })
  contact.set('nickname', 'kremalicious')
  contact.add('x-socialprofile', meta.social.Twitter, { type: 'twitter' })
  contact.add('x-socialprofile', meta.social.GitHub, { type: 'GitHub' })

  const vcard = contact.toString('3.0')

  return vcard
}

// Helper function to create base64 string from avatar image
// without the need to read image file from file system
export const toDataURL = async (photoSrc, outputFormat) => {
  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.src = photoSrc

  img.onload = () => {}

  // yeah, we're gonna create a fake canvas to render the image
  // and then create a base64 string from the rendered result
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  let dataURL

  canvas.height = img.naturalHeight
  canvas.width = img.naturalWidth
  ctx.drawImage(img, 0, 0)
  dataURL = canvas.toDataURL(outputFormat)

  // img.src = photoSrc

  // if (img.complete || img.complete === undefined) {
  //   img.src =
  //     'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
  //   img.src = photoSrc
  // }

  return dataURL
}
