import { constructVcard, init } from './_utils'

jest.mock('./imageToDataUrl', () => ({
  __esModule: true,
  imageToDataUrl: jest.fn().mockResolvedValue('data:image/png;base64,')
}))

describe('Vcard/_utils', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn()
  })

  it('combined vCard download process finishes', async () => {
    await init()
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1)
  })

  it('vCard can be constructed', () => {
    const vcard = constructVcard('data:image/jpeg;base64,00')
    expect(vcard).toBeDefined()
  })
})
