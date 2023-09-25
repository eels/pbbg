import compress from 'astro-compress';
import critters from 'astro-critters';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sw from 'astrojs-service-worker';
import tailwind from '@astrojs/tailwind';
import { loadEnv } from 'vite';

/** @type {import('vite').BuildOptions} */
export const viteConfig = {
  define: {
    'process.env': loadEnv('development', process.cwd(), ''),
  },
  ssr: {
    noExternal: ['path-to-regexp'],
  },
};

/** @type {import('astro').AstroUserConfig} */
export default {
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), tailwind(), sw(), critters(), compress()],
  output: 'server',
  trailingSlash: 'never',
  vite: viteConfig,
};
