import { afterEach, beforeEach, describe, expect, spyOn, test } from 'bun:test'
import repoFilter from '@content/repos.json'
import { createFetchMock } from '@test/test-utils'
import { getRepos } from './get-repos'
import * as reposCache from './repos-cache'

let fetchSpy: ReturnType<typeof spyOn<typeof globalThis, 'fetch'>>
let readReposCacheSpy: ReturnType<
  typeof spyOn<typeof reposCache, 'readReposCache'>
>
let saveReposCacheSpy: ReturnType<
  typeof spyOn<typeof reposCache, 'saveReposCache'>
>

const originalGitHubToken = process.env.GITHUB_TOKEN

describe('getRepos', () => {
  beforeEach(() => {
    process.env.GITHUB_TOKEN = 'test-token'
    fetchSpy = spyOn(globalThis, 'fetch')
    fetchSpy.mockImplementation(createFetchMock({ body: {} }))
    readReposCacheSpy = spyOn(reposCache, 'readReposCache')
    readReposCacheSpy.mockResolvedValue(null)
    saveReposCacheSpy = spyOn(reposCache, 'saveReposCache')
    saveReposCacheSpy.mockResolvedValue()
  })

  afterEach(() => {
    fetchSpy.mockRestore()
    readReposCacheSpy.mockRestore()
    saveReposCacheSpy.mockRestore()
    if (originalGitHubToken === undefined) {
      delete process.env.GITHUB_TOKEN
      return
    }
    process.env.GITHUB_TOKEN = originalGitHubToken
  })

  test('should fetch repos data', async () => {
    const mockData = {
      name: 'test',
      full_name: 'test/test',
      description: 'test repo',
      html_url: 'https://github.com/test/test',
      homepage: 'https://test.com',
      stargazers_count: 100,
      pushed_at: '2022-01-01T00:00:00Z'
    }

    fetchSpy.mockImplementation(createFetchMock({ body: mockData }))

    const actualRepos = await getRepos()

    expect(fetchSpy).toHaveBeenCalledTimes(repoFilter.length)
    expect(actualRepos).toEqual(
      Array.from({ length: repoFilter.length }, () => mockData)
    )
  })

  test('should handle network errors', async () => {
    const consoleErrorSpy = spyOn(console, 'error').mockReturnValue()

    fetchSpy.mockImplementationOnce(
      createFetchMock({ error: new Error('Network error') })
    )

    const actualRepos = await getRepos()

    expect(actualRepos).toBeUndefined()
    expect(fetchSpy).toHaveBeenCalledTimes(1)

    consoleErrorSpy.mockRestore()
  })

  test('should handle invalid repo data', async () => {
    const mockData = { name: null }
    fetchSpy.mockImplementation(createFetchMock({ body: mockData }))

    const data = await getRepos()

    expect(data).toBeUndefined()
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })
})
