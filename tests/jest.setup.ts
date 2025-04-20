import { jest } from '@jest/globals'
import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'
import giphyMock from './__fixtures__/giphy.json'
import { dataLocation } from './__fixtures__/location'
import './__mocks__/matchMedia'

fetchMock.enableMocks()

// Mock ResizeObserver which is not available in JSDOM
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
})) as unknown as typeof ResizeObserver

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockImplementationOnce(() => '/')
}))

jest.mock('../src/lib/getLocation', () => ({
  getLocation: jest.fn().mockImplementation(() => dataLocation),
  preloadLocation: jest.fn()
}))

jest.mock('../src/lib/getRandomGif', () => ({
  getRandomGif: jest
    .fn()
    .mockImplementation(() => giphyMock.data.images.original.mp4)
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
