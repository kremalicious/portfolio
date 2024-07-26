import repoFilter from '@content/repos.json'
import fetch, { type FetchMock } from 'jest-fetch-mock'
import { getRepos } from './getRepos'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: (fn: () => void) => fn
}))

describe('getRepos', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should fetch repos data', async () => {
    const mockData = {
      name: 'test',
      full_name: 'test/test',
      description: 'test repo',
      html_url: 'https://github.com/test/test',
      homepage: 'https://test.com',
      stargazers_count: 100,
      pushed_at: '2022-01-01T00:00:00Z'
    }
    ;(fetch as FetchMock).mockResponse(JSON.stringify(mockData))

    const data = await getRepos()
    const count = repoFilter.length

    expect(data).toEqual(Array.from({ length: count }, () => mockData))
    expect(fetch).toHaveBeenCalledTimes(count)
  })

  it('should handle network errors', async () => {
    const consoleErrorMock: jest.SpyInstance = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    ;(fetch as FetchMock).mockRejectOnce(new Error('Network error'))

    const data = await getRepos()

    expect(data).toBeUndefined()
    expect(fetch).toHaveBeenCalledTimes(1)

    consoleErrorMock.mockRestore()
  })

  it('should handle invalid repo data', async () => {
    const mockData = { name: null }
    ;(fetch as FetchMock).mockResponseOnce(JSON.stringify(mockData))

    const data = await getRepos()

    expect(data).toBeUndefined()
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
