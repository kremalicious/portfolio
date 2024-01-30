import { render } from '@testing-library/react'
import Page from '../page'
import projectsMock from '../../../tests/__fixtures__/projects.json'
import reposMock from '../../../tests/__fixtures__/repos.json'

jest.mock('../../lib/content', () => ({
  getAllProjects: jest.fn().mockImplementationOnce(() => projectsMock)
}))

jest.mock('../../lib/github', () => ({
  getGithubRepos: jest.fn().mockImplementationOnce(() => reposMock)
}))

describe('app: /page', () => {
  it('renders correctly', async () => {
    render(await Page())
  })
})
