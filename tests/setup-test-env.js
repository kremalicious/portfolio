import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock'
import { StaticQuery, useStaticQuery } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'

import meta from './__fixtures__/meta.json'
import resume from './__fixtures__/resume.json'
import projects from './__fixtures__/projects.json'

import axios from 'axios'
jest.mock('axios')

beforeAll(() => {
  //
  // Gatsby GraphQL data
  //
  const photoSrc = getSrc(resume.contentJson.basics.picture)
  const dataMock = {
    ...meta,
    ...resume,
    photoSrc,
    ...projects
  }

  StaticQuery.mockReturnValue({ ...dataMock })
  useStaticQuery.mockReturnValue({ ...dataMock })

  //
  // Axios mocks
  //
  const responseMock = {
    status: 'ok',
    data: {
      now: {
        city: 'Lisbon',
        country: 'Portugal',
        country_code: 'PT',
        date_start: '2021-10-01'
      },
      next: {
        city: 'Barcelona',
        country: 'Spain',
        date_start: '2021-10-04'
      }
    }
  }
  axios.mockResolvedValue(responseMock)
})
