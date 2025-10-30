import { afterEach, beforeEach, describe, expect, spyOn, test } from 'bun:test'
import repoFilter from '@content/repos.json'
import { getRepos } from './get-repos'

let fetchSpy: ReturnType<typeof spyOn<typeof globalThis, 'fetch'>>

describe('getRepos', () => {
  beforeEach(() => {
    fetchSpy = spyOn(globalThis, 'fetch')
  })

  afterEach(() => {
    fetchSpy.mockRestore()
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

    fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify(mockData)))

    const actualRepos = await getRepos()

    expect(fetchSpy).toHaveBeenCalledTimes(repoFilter.length)
    expect(actualRepos).toEqual(
      Array.from({ length: repoFilter.length }, () => mockData)
    )
  })

  test('should handle network errors', async () => {
    const consoleErrorSpy = spyOn(console, 'error').mockReturnValue()

    fetchSpy.mockRejectedValueOnce(new Error('Network error'))

    const actualRepos = await getRepos()

    expect(actualRepos).toBeUndefined()
    expect(fetchSpy).toHaveBeenCalledTimes(1)

    consoleErrorSpy.mockRestore()
  })

  test('should handle invalid repo data', async () => {
    const mockData = { name: null }
    fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify(mockData)))

    const data = await getRepos()

    expect(data).toBeUndefined()
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
