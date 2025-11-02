import { beforeAll, beforeEach, describe, expect, it, mock } from 'bun:test'

const saveAsMock = mock<(blob: Blob, fileName: string) => void>()
const imageToDataUrlMock = mock<(path: string) => Promise<string>>()
const avatarSource = '/avatar-mock.jpg'
const metaMock = {
  author: { name: 'Test User', label: 'Tester', email: 'test@example.com' },
  url: 'https://example.com',
  profiles: [
    { network: 'Blog', url: 'https://blog.example.com' },
    { network: 'GitHub', url: 'https://github.com/example' }
  ],
  addressbook: '/test-user.vcf'
}

mock.module('@content/meta.json', () => ({
  default: metaMock
}))

let constructVcard: typeof import('./vcard').constructVcard
let downloadVcard: typeof import('./vcard').downloadVcard

beforeAll(async () => {
  ;({ constructVcard, downloadVcard } = await import('./vcard'))
})

describe('vcard', () => {
  beforeEach(() => {
    saveAsMock.mockReset()
    imageToDataUrlMock.mockReset()
  })

  it('constructs vCard string with sanitized photo data', () => {
    const inputDataUrl = 'data:image/jpeg;base64,MTIz'
    const sanitizedData = inputDataUrl.replace(
      /^data:image\/(png|jpg|jpeg);base64,/,
      ''
    )
    const expectedVcard = `BEGIN:VCARD
VERSION:3.0
PHOTO;ENCODING=B;TYPE=JPEG:${sanitizedData},
FN:${metaMock.author.name}
TITLE:${metaMock.author.label}
EMAIL:${metaMock.author.email}
NICKNAME:kremalicious
URL;TYPE=portfolio:${metaMock.url}
URL;TYPE=blog:${metaMock.profiles[0]?.url ?? ''}
X-SOCIALPROFILE;TYPE=github:${metaMock.profiles[1]?.url ?? ''}
END:VCARD`

    const actualVcard = constructVcard(inputDataUrl)

    expect(actualVcard).toBe(expectedVcard)
  })

  it('downloads vCard to filesystem', async () => {
    const expectedDataUrl = 'data:image/jpeg;base64,Zm9v'
    imageToDataUrlMock.mockResolvedValueOnce(expectedDataUrl)

    await downloadVcard({
      readImage: imageToDataUrlMock,
      saveFile: saveAsMock,
      avatarSource
    })

    expect(imageToDataUrlMock).toHaveBeenCalledTimes(1)
    expect(imageToDataUrlMock).toHaveBeenCalledWith(avatarSource)
    expect(saveAsMock).toHaveBeenCalledTimes(1)

    const [blobArgument, fileNameArgument] = saveAsMock.mock.calls[0] as [
      Blob,
      string
    ]
    const actualContent = await blobArgument.text()

    expect(fileNameArgument).toBe('test-user.vcf')
    expect(actualContent).toBe(constructVcard(expectedDataUrl))
  })
})
