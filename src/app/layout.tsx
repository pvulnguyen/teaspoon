import '@styles/global.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@uploadthing/react/styles.css';

import type { Metadata } from 'next';

import { ColorSchemeScript } from '@mantine/core';

import { Providers } from '@components/providers';
import { Header } from '@components/ui';

export const metadata: Metadata = {
  title: {
    default: 'Teaspoon',
    template: '%s | Teaspoon',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
