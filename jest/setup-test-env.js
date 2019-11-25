import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock'
import { StaticQuery, useStaticQuery } from 'gatsby'

import meta from './__fixtures__/meta.json'
import resume from './__fixtures__/resume.json'
import projects from './__fixtures__/projects.json'

beforeAll(() => {
  const photoSrc = resume.contentJson.basics.picture.childImageSharp.fixed.src
  const dataMock = {
    ...meta,
    ...resume,
    photoSrc,
    portfolioJson: { bugs: '' },
    ...projects
  }

  StaticQuery.mockImplementation(({ render }) => render({ ...dataMock }))
  useStaticQuery.mockImplementation(() => ({ ...dataMock }))
})
