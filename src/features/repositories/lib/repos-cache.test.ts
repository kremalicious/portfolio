import { beforeEach, describe, expect, it, spyOn } from 'bun:test'
import { dirname } from 'node:path'
import {
  mkdirMock,
  readFileMock,
  setupFsMocks,
  writeFileMock
} from '@test/test-utils'

let modulePromise: Promise<typeof import('./repos-cache')> | undefined

async function loadReposCacheModule() {
  if (!modulePromise) {
    setupFsMocks()
    modulePromise = import('./repos-cache')
  }
  return modulePromise
}

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

    const { readReposCache, cacheFilePath } = await loadReposCacheModule()
    const actualRepos = await readReposCache()

    expect(readFileMock).toHaveBeenCalledWith(cacheFilePath, 'utf8')
    expect(actualRepos).toEqual(expectedRepos)
  })

  it('returns null when cached data is not an array', async () => {
    readFileMock.mockResolvedValueOnce(JSON.stringify({ invalid: true }))
    const { readReposCache } = await loadReposCacheModule()

    const actualRepos = await readReposCache()

    expect(actualRepos).toBeNull()
  })

  it('returns null when cache file is missing', async () => {
    const missingError = Object.assign(new Error('missing'), { code: 'ENOENT' })
    readFileMock.mockRejectedValueOnce(missingError)
    const consoleErrorSpy = spyOn(console, 'error').mockReturnValue()

    const { readReposCache } = await loadReposCacheModule()
    const actualRepos = await readReposCache()

    expect(actualRepos).toBeNull()
    expect(consoleErrorSpy).not.toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })

  it('logs error when reading cache fails unexpectedly', async () => {
    const crashError = Object.assign(new Error('boom'), { code: 'EACCES' })
    readFileMock.mockRejectedValueOnce(crashError)
    const consoleErrorSpy = spyOn(console, 'error').mockReturnValue()

    const { readReposCache } = await loadReposCacheModule()
    const actualRepos = await readReposCache()

    expect(actualRepos).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalledWith('boom')
    consoleErrorSpy.mockRestore()
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
    const { saveReposCache, cacheFilePath } = await loadReposCacheModule()

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
    const { saveReposCache } = await loadReposCacheModule()

    await saveReposCache({ repos: [] })

    expect(mkdirMock).not.toHaveBeenCalled()
    expect(writeFileMock).not.toHaveBeenCalled()
  })

  it('logs error when saving cache fails', async () => {
    writeFileMock.mockRejectedValueOnce(new Error('write failed'))
    const consoleErrorSpy = spyOn(console, 'error').mockReturnValue()

    const { saveReposCache } = await loadReposCacheModule()
    await saveReposCache({ repos: reposPayload })

    expect(consoleErrorSpy).toHaveBeenCalledWith('write failed')
    consoleErrorSpy.mockRestore()
  })
})
