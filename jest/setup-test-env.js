import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock'
import { StaticQuery, useStaticQuery } from 'gatsby'

import meta from './__fixtures__/meta.json'
import resume from './__fixtures__/resume.json'

beforeAll(() => {
  const photoSrc = resume.contentJson.basics.picture.childImageSharp.fixed.src
  const dataMock = {
    ...meta,
    ...resume,
    photoSrc,
    portfolioJson: { bugs: '' }
  }

  StaticQuery.mockImplementation(({ render }) => render({ ...dataMock }))
  useStaticQuery.mockImplementation(() => {
    return { ...dataMock }
  })
})
