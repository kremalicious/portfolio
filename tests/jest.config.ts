import nextJest from 'next/jest'
import type { Config } from 'jest'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  rootDir: '../', // = /
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.tsx'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.(svg)$': '<rootDir>/tests/__mocks__/svgr-mock.tsx'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.{stories,test}.{ts,tsx}',
    '!src/types/**/*.{ts,tsx}'
  ],
  // note: this does not work with Next.js, hence workaround further down
  // see: https://github.com/vercel/next.js/issues/35634#issuecomment-1115250297
  // transformIgnorePatterns: ['node_modules/(?!(uuid|remark)/)'],
  testPathIgnorePatterns: [
    'node_modules',
    '\\.cache',
    '.next',
    'coverage',
    '\\.test.jsx'
  ]
}

// https://github.com/vercel/next.js/issues/35634#issuecomment-1115250297
async function jestConfig() {
  const nextJestConfig = await createJestConfig(customJestConfig)()
  // /node_modules/ is the first pattern
  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!uuid|remark)/'
  return nextJestConfig
}

export default jestConfig
