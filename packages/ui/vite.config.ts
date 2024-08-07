import pkg from './package.json';
import tsconfigPaths from 'vite-tsconfig-paths';
import { qwikVite } from '@builder.io/qwik/optimizer';
import type { BuildOptions, LibraryOptions, UserConfig } from 'vite';

function excludeAll(obj: Record<string, string>) {
  return Object.keys(obj).map((dependency) => new RegExp(`^${dependency}(/.*)?$`));
}

const libOptions = {
  entry: './src/index.ts',
  fileName: () => 'index.qwik.mjs',
} satisfies LibraryOptions;

const rollupOptions = {
  external: [/^node:.*/, ...excludeAll(pkg.devDependencies)],
} satisfies BuildOptions['rollupOptions'];

const buildOptions = {
  lib: libOptions,
  outDir: 'dist',
  rollupOptions,
  target: 'esnext',
} satisfies BuildOptions;

export default {
  build: buildOptions,
  plugins: [qwikVite(), tsconfigPaths({ root: __dirname })],
} satisfies UserConfig;
