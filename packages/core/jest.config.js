const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';

module.exports = {
  // preset: 'ts-jest',
  // testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js'],
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest'
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/cypress/',
    '<rootDir>/tests/storybook/'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // collectCoverage: true,
  coverageDirectory: 'tests/jest/coverage/',
  coveragePathIgnorePatterns: ['/node_modules/', '/cypress/']
};
