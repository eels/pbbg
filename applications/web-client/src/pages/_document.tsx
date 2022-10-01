import i18next from 'next-i18next.config';
import { Head, Html, Main, NextScript } from 'next/document';
import { getAllIconsAsSymbols } from 'services/IconService';

const icons = getAllIconsAsSymbols();

export default function CustomDocument() {
  return (
    <Html lang={i18next.i18n.defaultLocale}>
      <Head />
      <body>
        <div dangerouslySetInnerHTML={{ __html: icons }} id='__icons' />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
