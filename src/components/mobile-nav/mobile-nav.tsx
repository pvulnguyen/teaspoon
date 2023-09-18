'use client';

import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

import { Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { routes } from '@/config';
import styles from './mobile-nav.module.css';

export function MobileNav() {
  const [isOpen, { toggle, close }] = useDisclosure();

  return (
    <Fragment>
      <Burger
        className={styles.burger}
        opened={isOpen}
        onClick={toggle}
        aria-label='Toggle mobile navigation menu'
      />
      <MobileMenu opened={isOpen} closeMenu={close} />
    </Fragment>
  );
}

function MobileMenu({ opened, closeMenu }: { opened: boolean; closeMenu: () => void }) {
  if (!opened) return null;

  return createPortal(
    <div className={styles.menu}>
      <nav className={styles.menuContent}>
        {routes.map((route, index) => (
          <Link className={styles.navLink} href={route.path} key={index} onClick={closeMenu}>
            {route.icon} {route.label}
          </Link>
        ))}
      </nav>
    </div>,
    document.body,
  );
}
