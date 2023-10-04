import Link from 'next/link';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@mantine/core';

import { DesktopNav } from '../desktop-nav';
import { Logo } from '../logo';
import { MobileMenu } from '../mobile-menu';

import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <MobileMenu />
      <Logo />
      <DesktopNav />
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Button size='compact-sm' component={Link} href='/sign-in'>
          Sign In
        </Button>
      </SignedOut>
    </header>
  );
}
