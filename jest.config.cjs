/* eslint-disable @typescript-eslint/no-var-requires */

const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');

/** @type {import('ts-jest').TsJestTransformerOptions} */
const transformerOptions = {
  tsconfig: {
    jsx: 'react-jsx',
  },
};

/** @type {string[]} */
const transformIgnorePackages = [
  'pocketbase',
  'tailwind-compose',
];

/** @type {Record<string, string | [string, Record<string, unknown>]>} */
const transformConfig = {
  '^.+\\.[jt]sx?$': ['ts-jest', transformerOptions],
  '^.+\\.css$': 'jest-transform-css',
};

/** @type {import('ts-jest').JestConfigWithTsJest} */
const defaultConfigOptions = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  transform: transformConfig,
  transformIgnorePatterns: [`node_modules/(?!(${transformIgnorePackages.join('|')}}))`],
};

/** @type {import('ts-jest').JestConfigWithTsJest[]} */
const projects = [
  {
    displayName: '@pbbg/api',
    preset: 'ts-jest/presets/js-with-ts-esm',
    roots: ['<rootDir>/applications/api'],
    testEnvironment: 'node',
  },
  {
    displayName: '@pbbg/http',
    preset: 'ts-jest',
    roots: ['<rootDir>/packages/http'],
    testEnvironment: 'node',
  },
  {
    displayName: '@pbbg/ui',
    roots: ['<rootDir>/packages/ui'],
    setupFilesAfterEnv: ['<rootDir>/packages/ui/test/setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
  },
  {
    displayName: '@pbbg/utilities',
    preset: 'ts-jest',
    roots: ['<rootDir>/packages/utilities'],
    testEnvironment: 'node',
  },
];

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  projects: projects.map((project) => ({ ...defaultConfigOptions, ...project })),
  testEnvironment: 'jsdom',
};

module.exports = config;
