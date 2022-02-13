/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.join(process.cwd(), 'src/index.ts'),

  externals: [nodeExternals()],

  externalsPresets: {
    node: true,
  },

  mode: 'production',

  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts?$/,
      },
    ],
  },

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
  },

  resolve: {
    alias: {
      application: path.resolve(__dirname, 'src/application'),
      bootstrap: path.resolve(__dirname, 'src/bootstrap'),
      config: path.resolve(__dirname, 'src/config'),
      http: path.resolve(__dirname, 'src/http'),
      providers: path.resolve(__dirname, 'src/providers'),
      support: path.resolve(__dirname, 'src/support'),
      types: path.resolve(__dirname, 'src/types'),
      utilities: path.resolve(__dirname, 'src/utilities'),
    },
    extensions: ['.js', '.ts'],
  },

  stats: 'errors-only',

  target: 'node',
};
