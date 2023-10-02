module.exports = {
  ...require('@pbbg/prettier-config/lib/prettierrc.json'),
  overrides: [
    {
      files: '**/*.astro',
      options: {
        astroAllowShorthand: false,
        plugins: ['prettier-plugin-astro'],
      },
    },
    {
      files: '**/styled.ts',
      options: {
        multilineArraysWrapThreshold: 0,
        plugins: ['@prettier/multiline-arrays'],
      },
    },
  ],
};
