module.exports = {
  collectCoverageFrom: ['src/**/*.{js,ts}'],

  moduleDirectories: ['node_modules', 'src', 'test'],

  moduleFileExtensions: ['js', 'ts'],

  roots: ['<rootDir>/src/', '<rootDir>/test/'],

  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],

  testEnvironment: 'node',

  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
};
