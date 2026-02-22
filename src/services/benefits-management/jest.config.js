module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      { tsconfig: 'tsconfig.test.json' },
    ],
  },
  collectCoverageFrom: ['src/**/*.(t|j)s', '!src/main.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules/', 'generated/'],
  moduleNameMapper: {
    '^hrms-shared$': '<rootDir>/../shared/src',
    '^hrms-shared/(.*)$': '<rootDir>/../shared/src/$1',
  },
};
