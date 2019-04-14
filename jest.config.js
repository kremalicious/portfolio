module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest/jest-preprocess.js'
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/__mocks__/file-mock.js',
    '\\.svg': '<rootDir>/jest/__mocks__/svgr-mock.js'
  },
  testPathIgnorePatterns: ['node_modules', '.cache', 'public', 'coverage'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: ''
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/jest/loadershim.js'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup-test-env.js']
}
