/* eslint-disable @typescript-eslint/no-var-requires */

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,tsx}'],

  plugins: [],

  theme: {
    extend: {
      sans: ['Roboto', ...defaultTheme.fontFamily.sans],
    },
  },
};
