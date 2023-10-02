module.exports = {
  ...require('@pbbg/prettier-config/lib/prettierrc.json'),
  overrides: [
    {
      files: '**/styled.ts',
      options: {
        multilineArraysWrapThreshold: 0,
        plugins: ['@prettier/multiline-arrays'],
      },
    },
  ],
};
