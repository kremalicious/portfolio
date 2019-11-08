import React from 'react'
import saveAs from 'file-saver'
import vCard from 'vcf'
import { useMeta } from '../../hooks/use-meta'
import { useResume } from '../../hooks/use-resume'

export default function Vcard() {
  const metaYaml = useMeta()
  const { basics } = useResume()
  const photoSrc = basics.picture.childImageSharp.fixed.src
  const { name, label, email, profiles } = basics

  const meta = {
    ...metaYaml,
    photoSrc,
    name,
    label,
    email,
    profiles
  }

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
}

export const init = async meta => {
  // first, convert the avatar to base64, then construct all vCard elements
  const dataUrl = await toDataURL(meta.photoSrc, 'image/jpeg')
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
  const blog = meta.profiles.filter(({ network }) => network === 'Blog')[0].url
  const twitter = meta.profiles.filter(
    ({ network }) => network === 'Twitter'
  )[0].url
  const github = meta.profiles.filter(({ network }) => network === 'GitHub')[0]
    .url

  // stripping this data out of base64 string is required
  // for vcard to actually display the image for whatever reason
  // const dataUrlCleaned = dataUrl.split('data:image/jpeg;base64,').join('')
  // contact.set('photo', dataUrlCleaned, { encoding: 'b', type: 'JPEG' })
  contact.set('fn', meta.name)
  contact.set('title', meta.label)
  contact.set('email', meta.email)
  contact.set('nickname', 'kremalicious')
  contact.set('url', meta.url, { type: 'Portfolio' })
  contact.add('url', blog, { type: 'Blog' })
  contact.add('x-socialprofile', twitter, { type: 'twitter' })
  contact.add('x-socialprofile', github, { type: 'GitHub' })

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
