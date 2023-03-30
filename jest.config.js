/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '@api/(.*)': '<rootDir>/src/api/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@contexts/(.*)': '<rootDir>/src/contexts/$1',
    '@providers/(.*)': '<rootDir>/src/providers/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@views/(.*)': '<rootDir>/src/views/$1',
    '@styles/(.*)': '<rootDir>/styles/$1',
  },
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
}
