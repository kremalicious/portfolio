import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock'
import { StaticQuery, useStaticQuery } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'

import meta from './__fixtures__/meta.json'
import resume from './__fixtures__/resume.json'
import projects from './__fixtures__/projects.json'

beforeAll(() => {
  const photoSrc = getSrc(resume.contentJson.basics.picture)
  const dataMock = {
    ...meta,
    ...resume,
    photoSrc,
    ...projects
  }

  StaticQuery.mockImplementation(({ render }) => render({ ...dataMock }))
  useStaticQuery.mockImplementation(() => ({ ...dataMock }))
})
