import '@mantine/core/styles.css';

import type { Metadata } from 'next';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

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
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
