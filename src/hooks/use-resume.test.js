import React from 'react'
import { render } from '@testing-library/react'
import { useStaticQuery } from 'gatsby'
import { useResume } from './use-resume'
import data from '../../jest/__fixtures__/resume.json'

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => ({ ...data }))
})

describe('useResume', () => {
  it('renders correctly', () => {
    const { basics } = useResume()
    const { container } = render(<div>{basics.name}</div>)

    expect(container.textContent).toBe(data.contentJson.basics.name)
  })
})
