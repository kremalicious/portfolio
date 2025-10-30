import { beforeEach, describe, expect, it, mock } from 'bun:test'
import { constructVcard, downloadVcard } from './vcard'

mock.module('./getVcardData', () => ({
  getVcardData: mock().mockResolvedValue({
    fullName: 'John Doe',
    organization: 'Acme Corp',
    title: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St, Anytown, USA',
    photo: 'https://example.com/photo.jpg'
  })
}))

describe('Vcard/_utils', () => {
  beforeEach(() => {
    global.URL.createObjectURL = mock()
  })

  it('combined vCard download process finishes', async () => {
    await downloadVcard()
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1)
  })

  it('vCard can be constructed', () => {
    const vcard = constructVcard('data:image/jpeg;base64,00')
    expect(vcard).toBeDefined()
  })
})
