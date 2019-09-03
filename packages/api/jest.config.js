module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  preset: 'ts-jest',
  // Use custom environment
  testEnvironment: './test/mongo-environment',
  // testEnvironment: 'node',
  // globalSetup: '<rootDir>/test/setup.js',
  // globalTeardown: '<rootDir>/test/teardown.js',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/?(*.)+(spec|test).(j|t)s?(x)'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'scss'],
  // collectCoverage: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  moduleDirectories: ['node_modules', './'],
  // Custom test order
  // testSequencer: './src/config/sequence',
};
