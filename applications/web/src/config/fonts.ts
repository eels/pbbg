import localFont from 'next/font/local';
import { Roboto_Flex } from 'next/font/google'; // eslint-disable-line camelcase

export const excelsior = localFont({
  display: 'optional',
  preload: true,
  src: '../resources/fonts/fixedsys-excelsior.woff2',
  variable: '--font-excelsior',
});

export const roboto = Roboto_Flex({
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  variable: '--font-roboto',
});
