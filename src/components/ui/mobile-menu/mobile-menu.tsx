'use client';

import { Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { MobileNav } from '../mobile-nav';
import styles from './mobile-menu.module.css';

export function MobileMenu() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <div className={styles.mobileMenuContainer}>
      <Burger size='sm' opened={opened} onClick={toggle} />
      <MobileNav isOpen={opened} close={toggle} />
    </div>
  );
}
