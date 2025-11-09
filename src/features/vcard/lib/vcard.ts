import meta from '@content/meta.json'
import saveAs from 'file-saver'
import avatar from '@/assets/avatar.jpg'
import { imageToDataUrl } from './imageToDataUrl'

export function constructVcard(dataUrl: string) {
  const blog = meta.profiles.filter(({ network }) => network === 'Blog')[0].url
  const github = meta.profiles.filter(({ network }) => network === 'GitHub')[0]
    .url

  // stripping this data out of base64 string is required
  // for vcard to actually display the image for whatever reason
  const dataUrlCleaned = dataUrl.replace(
    /^data:image\/(png|jpg|jpeg);base64,/,
    ''
  )
  const vCard = `BEGIN:VCARD
VERSION:3.0
PHOTO;ENCODING=B;TYPE=JPEG:${dataUrlCleaned},
FN:${meta.author.name}
TITLE:${meta.author.label}
EMAIL:${meta.author.email}
NICKNAME:kremalicious
URL;TYPE=portfolio:${meta.url}
URL;TYPE=blog:${blog}
X-SOCIALPROFILE;TYPE=github:${github}
END:VCARD`

  return vCard
}

interface DownloadVcardOptions {
  readImage?: typeof imageToDataUrl
  saveFile?: (blob: Blob, fileName: string) => void
  avatarSource?: string
}

export async function downloadVcard(options: DownloadVcardOptions = {}) {
  const readImage = options.readImage ?? imageToDataUrl
  const saveFile = options.saveFile ?? saveAs
  const avatarSource = options.avatarSource ?? avatar.src

  const dataUrl = await readImage(avatarSource)
  const vcard = constructVcard(dataUrl)

  // Construct the download from a blob of the just constructed vCard,
  const { addressbook } = meta
  const name = addressbook.split('/').join('')
  const blob = new Blob([vcard], { type: 'text/x-vcard' })

  // save it to user's file system
  saveFile(blob, name)
  window.umami?.trackEvent('Download VCard')
}
