import { render, screen } from '@testing-library/react'
import reposMock from '../../../tests/__fixtures__/repos.json'
import Page from '../page'

jest.mock('../../lib/getRepos', () => ({
  getRepos: jest.fn().mockImplementation(() => reposMock)
}))

describe('app: /page', () => {
  it('renders correctly', async () => {
    render(await Page())

    const location = await screen.findByText('Lisbon')
    expect(location).toBeInTheDocument()
  })
})
