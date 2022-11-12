import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock'
import { jest } from '@jest/globals'
import { dataLocation } from './__fixtures__/location'

// mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    route: '/',
    asPath: '/'
  }))
}))

// mock next/head
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    }
  }
})

// Mock fetch for Location component
beforeAll(() => {
  ;(global.fetch as jest.Mock) = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(dataLocation)
    })
  )
  // jest
  //   .spyOn(global, 'fetch')
  //   .mockImplementation(() =>
  //     Promise.resolve({ json: () => Promise.resolve(dataLocation) })
  //   )
})
