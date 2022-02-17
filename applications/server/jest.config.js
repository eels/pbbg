module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],

  moduleDirectories: ['node_modules', 'src', 'test'],

  moduleFileExtensions: ['js', 'ts', 'tsx'],

  roots: ['<rootDir>/src/', '<rootDir>/test/'],

  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],

  testEnvironment: 'node',

  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};
