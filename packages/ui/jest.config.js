/* eslint-disable @typescript-eslint/no-var-requires */

const nextJest = require('next/jest');
const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');

const createJestConfig = nextJest({ dir: '.' });

/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  moduleDirectories: ['node_modules', 'src', 'test'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  roots: ['<rootDir>', '<rootDir>/src/', '<rootDir>/test/'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(config);
