/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const replace = require('@rollup/plugin-replace');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { rollup } = require('rollup');
const { terser } = require('rollup-plugin-terser');

const production = {
  'process.env.NODE_ENV': JSON.stringify('production'),
};

const options = {
  input: path.join(process.cwd(), 'src/service-worker.ts'),

  output: {
    file: path.join(process.cwd(), 'public/sw.js'),
    format: 'iife',
    globals: {
      'workbox-cacheable-response': 'workboxCacheableResponse',
      'workbox-expiration': 'workboxExpiration',
      'workbox-routing': 'workboxRouting',
      'workbox-strategies': 'workboxStrategies',
    },
    name: 'ServiceWorker',
  },

  plugins: [
    replace({ preventAssignment: true, values: production }),
    nodeResolve({ browser: true }),
    terser(),
  ],
};

module.exports = async function buildServiceWorker() {
  const bundle = await rollup({ ...options });

  await bundle.write({ output: options.output });
  await bundle.close();
};
