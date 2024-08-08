/** @type {import('tailwindcss').Config} */
module.exports = {
  ...require('@pbbg/tailwind-config/lib/tailwind.config'),
  content: [
    '../../packages/ui/src/**/*.{js,ts,tsx}',
    './public/**/*.svg',
    './src/**/*.{astro,js,ts,tsx}',
  ],
};
