import { jest } from '@jest/globals'
import '@testing-library/jest-dom'
import giphyMock from './__fixtures__/giphy.json'
import { dataLocation } from './__fixtures__/location'
import reposMock from './__fixtures__/repos.json'
import './__mocks__/matchMedia'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockImplementationOnce(() => '/')
}))

jest.mock('../src/actions/getLocation', () => ({
  getLocation: jest.fn().mockImplementation(() => dataLocation),
  preloadLocation: jest.fn()
}))

jest.mock('../src/actions/getRandomGif', () => ({
  getRandomGif: jest
    .fn()
    .mockImplementation(() => giphyMock.data.images.original.mp4)
}))

jest.mock('../src/actions/getRepos', () => ({
  getRepos: jest.fn().mockImplementation(() => reposMock)
}))

const unmockedFetch = global.fetch
const unmockedEnv = process.env

beforeEach(() => {
  // jest.resetModules()
  global.fetch = unmockedFetch
  process.env = { ...unmockedEnv }
})

afterEach(() => {
  global.fetch = unmockedFetch
  process.env = unmockedEnv
  jest.restoreAllMocks()
})
