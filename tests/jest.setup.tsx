import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock'
import { jest } from '@jest/globals'
import { useLocation } from '../src/hooks/useLocation'
import framer from 'framer-motion'
import { dataLocation } from './__fixtures__/location'
import giphy from './__fixtures__/giphy.json'
import './__mocks__/matchMedia'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    route: '/',
    pathname: '/'
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

jest.mock('../src/hooks/useLocation', () => ({
  useLocation: jest.fn().mockImplementation(() => dataLocation)
}))

jest.mock('@giphy/js-fetch-api', () => ({
  GiphyFetch: jest.fn().mockImplementation(() => ({
    random: jest.fn().mockImplementation(() => Promise.resolve(giphy))
  }))
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
