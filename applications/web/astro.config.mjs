import compress from 'astro-compress';
import critters from 'astro-critters';
import node from '@astrojs/node';
import qwikdev from '@qwikdev/astro';
import sw from 'astrojs-service-worker';
import tailwind from '@astrojs/tailwind';
import { loadEnv } from 'vite';

/** @type {import('vite').BuildOptions} */
export const viteConfig = {
  define: {
    'process.env': loadEnv('development', process.cwd(), ''),
  },
};

/** @type {import('@astrojs/tailwind').TailwindOptions} */
const tailwindConfig = {
  applyBaseStyles: false,
};

/** @type {import('astro').AstroUserConfig['integrations']} */
const integrations = [
  qwikdev(),
  tailwind(tailwindConfig),
  sw(),
  critters(),
  compress(),
];

/** @type {import('astro').AstroUserConfig} */
export default {
  adapter: node({ mode: 'standalone' }),
  integrations,
  output: 'server',
  trailingSlash: 'never',
  vite: viteConfig,
};
