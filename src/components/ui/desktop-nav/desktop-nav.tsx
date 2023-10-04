import Link from 'next/link';

import { routes } from '@config/routes';

import styles from './desktop-nav.module.css';

export function DesktopNav() {
  return (
    <nav className={styles.desktopNavContainer}>
      {routes.map((route, index) => (
        <div key={index}>
          <Link href={route.path}>
            <span className={styles.routeLabel}>{route.label}</span>
          </Link>
        </div>
      ))}
    </nav>
  );
}
