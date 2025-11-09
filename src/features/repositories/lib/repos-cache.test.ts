import { beforeEach, describe, expect, it } from 'bun:test'
import { dirname } from 'node:path'
import {
  mkdirMock,
  readFileMock,
  setupFsMocks,
  writeFileMock
} from '@test/mock-fs'

setupFsMocks()
const { readReposCache, saveReposCache, cacheFilePath } = await import(
  './repos-cache'
)

beforeEach(() => {
  readFileMock.mockReset()
  writeFileMock.mockReset()
  mkdirMock.mockReset()
})

describe('readReposCache', () => {
  it('returns cached repos when file exists', async () => {
    const expectedRepos = [
      {
        name: 'repo',
        full_name: 'user/repo',
        description: 'desc',
        html_url: 'https://example.com/repo',
        homepage: 'https://example.com',
        stargazers_count: 1,
        pushed_at: '2024-01-01T00:00:00Z'
      }
    ]
    readFileMock.mockResolvedValueOnce(JSON.stringify(expectedRepos))

    const actualRepos = await readReposCache()

    expect(readFileMock).toHaveBeenCalledWith(cacheFilePath, 'utf8')
    expect(actualRepos).toEqual(expectedRepos)
  })

  it('returns null when cached data is not an array', async () => {
    readFileMock.mockResolvedValueOnce(JSON.stringify({ invalid: true }))

    const actualRepos = await readReposCache()

    expect(actualRepos).toBeNull()
  })

  it('returns null when cache file is missing', async () => {
    const missingError = Object.assign(new Error('missing'), { code: 'ENOENT' })
    readFileMock.mockRejectedValueOnce(missingError)

    const actualRepos = await readReposCache()

    expect(actualRepos).toBeNull()
  })
})

describe('saveReposCache', () => {
  const reposPayload = [
    {
      name: 'repo',
      full_name: 'user/repo',
      description: 'desc',
      html_url: 'https://example.com/repo',
      homepage: 'https://example.com',
      stargazers_count: 1,
      pushed_at: '2024-01-01T00:00:00Z'
    }
  ]

  it('writes repos to cache file', async () => {
    await saveReposCache({ repos: reposPayload })

    expect(mkdirMock).toHaveBeenCalledWith(dirname(cacheFilePath), {
      recursive: true
    })
    expect(writeFileMock).toHaveBeenCalledWith(
      cacheFilePath,
      JSON.stringify(reposPayload),
      'utf8'
    )
  })

  it('skips writing when repos list is empty', async () => {
    await saveReposCache({ repos: [] })

    expect(mkdirMock).not.toHaveBeenCalled()
    expect(writeFileMock).not.toHaveBeenCalled()
  })
})
