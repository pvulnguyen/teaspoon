import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@mantine/core';

import { DesktopNav } from '../desktop-nav';
import { Logo } from '../logo';
import { MobileNav } from '../mobile-nav';
import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <MobileNav />
      <Logo />
      <DesktopNav />
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
    </header>
  );
}
