module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.globals.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native|@react-native|@tanstack)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^expo$': '<rootDir>/__mocks__/expo.js',
  },
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
  ],
};
