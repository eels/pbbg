/* eslint-disable @typescript-eslint/no-var-requires */

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-excelsior)', ...defaultTheme.fontFamily.mono],
        sans: ['var(--font-roboto)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
