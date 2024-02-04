import { render, screen } from '@testing-library/react'
import projectsMock from '../../../tests/__fixtures__/projects.json'
import reposMock from '../../../tests/__fixtures__/repos.json'
import Page from '../page'

jest.mock('../../lib/content', () => ({
  getAllProjects: jest.fn().mockImplementationOnce(() => projectsMock)
}))

jest.mock('../../lib/github', () => ({
  getGithubRepos: jest.fn().mockImplementationOnce(() => reposMock)
}))

describe('app: /page', () => {
  it('renders correctly', async () => {
    render(await Page())

    const location = await screen.findByText('Lisbon')
    expect(location).toBeInTheDocument()
  })
})
