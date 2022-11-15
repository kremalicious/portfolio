import saveAs from 'file-saver'
import vCard from 'vcf'

export async function toDataURL(photoSrc: string, outputFormat) {
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

export async function constructVcard(meta, dataUrl: string) {
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

export async function init(meta) {
  // first, convert the avatar to base64, then construct all vCard elements
  const dataUrl = await toDataURL(meta.photoSrc, 'image/jpeg')
  const vcard = await constructVcard(meta, dataUrl)

  // Construct the download from a blob of the just constructed vCard,
  const { addressbook } = meta
  const name = addressbook.split('/').join('')
  const blob = new Blob([vcard], {
    type: 'text/x-vcard'
  })
  // save it to user's file system
  saveAs(blob, name)
}
