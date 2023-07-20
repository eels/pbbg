import '@/web/styles/style.scss';
import SessionProvider from '@/web/components/utilities/session-provider';
import SiteBody from '@/web/components/atoms/site-body';
import StringsProvider from '@/web/components/utilities/strings-provider';
import cc from 'classcat';
import { excelsior, roboto } from '@/web/config/fonts';
import { getAllIconsAsSymbols } from '@/web/services/icons';
import type { ReactElement } from 'react';

export const metadata = {
  description: 'Generated by create next app',
  title: 'Create Next App',
};

interface LayoutProps {
  children: ReactElement;
}

export default function RootLayout({ children }: LayoutProps) {
  const icons = getAllIconsAsSymbols();

  return (
    <html className={cc([excelsior.variable, roboto.variable])} lang='en'>
      <SessionProvider>
        <StringsProvider>
          <SiteBody>
            <div dangerouslySetInnerHTML={{ __html: icons ?? '' }} id='__icons' />
            {children}
          </SiteBody>
        </StringsProvider>
      </SessionProvider>
    </html>
  );
}
