/* eslint-disable @typescript-eslint/no-var-requires */

const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: '.' });

const config = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],

  moduleDirectories: ['node_modules', 'src', 'test'],

  moduleFileExtensions: ['js', 'ts', 'tsx'],

  roots: ['<rootDir>/src/', '<rootDir>/test/'],

  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],

  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(config);
