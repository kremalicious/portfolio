import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import Vcard, { constructVcard, toDataURL, init } from './Vcard'
import meta from '../../../jest/__fixtures__/meta.json'
import resume from '../../../jest/__fixtures__/resume.json'

const metaMock = {
  ...meta.metaYaml,
  name: resume.contentJson.basics.name,
  label: resume.contentJson.basics.label,
  email: resume.contentJson.basics.email,
  profiles: [...resume.contentJson.basics.profiles]
}

describe('Vcard', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn()
  })

  it('renders correctly', () => {
    const { container } = render(<Vcard />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('Button click starts download', async () => {
    const { container } = render(<Vcard />)
    fireEvent.click(container.firstChild)
    await waitForElement(() => global.URL.createObjectURL)
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1)
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
