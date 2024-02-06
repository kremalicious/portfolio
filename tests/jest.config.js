import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './'
})

/** @type {import('jest').Config} */
const customJestConfig = {
  rootDir: '../',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@content/(.*)$': '<rootDir>/_content/$1',
    '^@generated/(.*)$': '<rootDir>/generated/$1',
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
  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!uuid|remark)/'
  return nextJestConfig
}

export default jestConfig
