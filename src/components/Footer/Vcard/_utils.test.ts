import { constructVcard, toDataURL, init } from './_utils'
import meta from '../../../../_content/meta.json'
import resume from '../../../../_content/resume.json'

const metaMock = {
  ...meta,
  name: resume.basics.name,
  label: resume.basics.label,
  email: resume.basics.email,
  profiles: [...resume.basics.profiles]
}

describe('Vcard/_utils', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn()
  })

  it('combined vCard download process finishes', async () => {
    await init(metaMock)
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1)
  })

  it('vCard can be constructed', async () => {
    const vcard = await constructVcard(metaMock, 'data:image/jpeg;base64,00')
    expect(vcard).toBeDefined()
  })

  it('Base64 from image can be constructed', async () => {
    const dataUrl = await toDataURL('hello', 'image/jpeg')
    expect(dataUrl).toBeDefined()
  })
})
