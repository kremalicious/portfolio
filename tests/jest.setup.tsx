import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock'
import { jest } from '@jest/globals'
import giphy from './__fixtures__/giphy.json'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    route: '/',
    asPath: '/'
  }))
}))

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    }
  }
})

jest.mock('@giphy/js-fetch-api', () => ({
  GiphyFetch: jest.fn().mockImplementation(() => ({
    random: jest.fn().mockImplementation(() => Promise.resolve(giphy))
  }))
}))

const unmockedFetch = global.fetch

afterEach(() => {
  global.fetch = unmockedFetch
  jest.restoreAllMocks()
})
