/** @type {import('tailwindcss').Config} */
module.exports = {
  ...require('@pbbg/tailwind-config/lib/tailwind.config'),
  content: ['../../assets/icons/**/*.svg', '../../node_modules/@pbbg/ui/src/**/*.{js,ts,tsx}'],
};
