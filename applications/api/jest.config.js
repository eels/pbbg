/* eslint-disable @typescript-eslint/no-var-requires */

const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverageFrom: ['src/**/*.ts'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  preset: 'ts-jest/presets/js-with-ts-esm',
  roots: ['<rootDir>/src/'],
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules/(?!(pocketbase))'],
};
