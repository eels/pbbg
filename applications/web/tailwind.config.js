/** @type {import('tailwindcss').Config} */
module.exports = {
  ...require('@pbbg/tailwind-config/lib/tailwind.config'),
  content: [
    '../../node_modules/@pbbg/ui/src/**/*.{js,ts,tsx}',
    './public/**/*.svg',
    './src/**/*.{js,ts,tsx}',
  ],
};
