import '@mantine/core/styles.css';

import type { Metadata } from 'next';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Header } from '@/components';
import { fonts, theme } from '@/config';

export const metadata: Metadata = {
  title: {
    default: 'Teaspoon',
    template: '%s | Teaspoon',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={fonts.inter.variable}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Header />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
