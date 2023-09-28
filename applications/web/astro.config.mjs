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

/** @type {import('@astrojs/tailwind').TailwindOptions} */
const tailwindConfig = {
  applyBaseStyles: false,
};

/** @type {import('astro').ServerConfig} */
const serverConfig = {
  host: '0.0.0.0',
};

/** @type {import('astro').AstroUserConfig} */
export default {
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), tailwind(tailwindConfig), sw(), critters(), compress()],
  output: 'server',
  server: (command) => (command === 'preview' ? serverConfig : undefined),
  trailingSlash: 'never',
  vite: viteConfig,
};
