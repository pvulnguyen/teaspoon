import '@/config/global.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@uploadthing/react/styles.css';

import type { Metadata } from 'next';

import { ClerkProvider } from '@clerk/nextjs';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

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
          <ClerkProvider>
            <Header />
            {children}
          </ClerkProvider>
          <Notifications />
        </MantineProvider>
      </body>
    </html>
  );
}
