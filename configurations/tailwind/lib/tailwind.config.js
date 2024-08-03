/* eslint-disable @typescript-eslint/no-var-requires */

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        mono: ['Excelsior', ...defaultTheme.fontFamily.mono],
        sans: ['Kanit', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        content: '860px',
        page: '960px',
      },
    },
  },
};
