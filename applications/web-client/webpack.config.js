/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
  entry: path.join(process.cwd(), 'src/service-worker.ts'),

  mode: 'production',

  module: {
    rules: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        test: /\.ts?$/,
      },
    ],
  },

  output: {
    filename: 'sw.js',
    path: path.resolve(__dirname, 'public'),
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },

  stats: 'errors-only',

  target: 'web',
};
