module.exports = {
  rootDir: '../',
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/file-mock.js',
    '\\.svg': '<rootDir>/tests/__mocks__/svgr-mock.js'
  },
  testPathIgnorePatterns: [
    'node_modules',
    '\\.cache',
    '<rootDir>.*/public',
    'coverage'
  ],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: ''
  },
  setupFiles: ['<rootDir>/tests/loadershim.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup-test-env.js']
}
