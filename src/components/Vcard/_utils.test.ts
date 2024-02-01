import meta from '../../../_content/meta.json'
import { constructVcard, init, toDataURL } from './_utils'

const metaMock = {
  ...meta,
  name: meta.author.name,
  label: meta.author.label,
  email: meta.author.email,
  profiles: [...meta.profiles]
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
