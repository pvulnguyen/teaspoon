import { ClerkProvider } from '@clerk/nextjs';
import { MantineProvider } from '@mantine/core';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <ClerkProvider>{children}</ClerkProvider>
    </MantineProvider>
  );
}
