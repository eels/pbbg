/* eslint-disable @typescript-eslint/no-var-requires */

const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');

/** @type {import('ts-jest').TsJestTransformerOptions} */
const transformerOptions = {
  tsconfig: {
    jsx: 'react-jsx',
  },
};

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  moduleDirectories: ['node_modules', 'src', 'test'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' }),
  roots: ['<rootDir>', '<rootDir>/src/', '<rootDir>/test/'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  transform: { '^.+\\.[jt]sx?$': ['ts-jest', transformerOptions] },
  transformIgnorePatterns: ['node_modules/(?!(tailwind-compose))'],
};
