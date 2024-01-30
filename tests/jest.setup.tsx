import { jest } from '@jest/globals'
import '@testing-library/jest-dom'
import 'jest-canvas-mock'
import giphy from './__fixtures__/giphy.json'
import { dataLocation } from './__fixtures__/location'
import './__mocks__/matchMedia'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockImplementationOnce(() => '/')
}))

jest.mock('../src/app/actions', () => ({
  getLocation: jest.fn().mockImplementation(() => dataLocation),
  getRandomGif: jest
    .fn()
    .mockImplementation(() => giphy.data.images.original.mp4)
}))

// jest.mock('@giphy/js-fetch-api', () => ({
//   GiphyFetch: jest.fn().mockImplementation(() => ({
//     random: jest.fn().mockImplementation(() => Promise.resolve(giphy))
//   }))
// }))

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
