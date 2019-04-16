import React from 'react'
import { render } from 'react-testing-library'
import { StaticQuery } from 'gatsby'
import vCard from 'vcf'
import Vcard, { constructVcard, downloadVcard, toDataURL } from './Vcard'
import data from '../../../jest/__fixtures__/meta.json'

describe('Vcard', () => {
  beforeEach(() => {
    StaticQuery.mockImplementationOnce(({ render }) => render({ ...data }))
  })

  it('renders correctly', () => {
    const { container } = render(<Vcard />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('vCard can be constructed', async () => {
    await constructVcard(data.contentYaml)
  })

  it('vCard can be downloaded', async () => {
    const contact = new vCard()
    const vcard = contact.toString('3.0')

    global.URL.createObjectURL = jest.fn(() => 'details')
    await downloadVcard(vcard, data.contentYaml)
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1)
  })

  it('Base64 from image can be constructed', () => {
    const photoSrc = data.contentYaml.avatar.childImageSharp.resize.src

    toDataURL(photoSrc, () => null, 'image/jpeg')
  })
})
