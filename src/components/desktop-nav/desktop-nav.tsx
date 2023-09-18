import Link from 'next/link';
import { routes } from '@/config';
import styles from './desktop-nav.module.css';

export function DesktopNav() {
  return (
    <nav className={styles.nav}>
      {routes.map((route, index) => (
        <Link className={styles.navLink} href={route.path} key={index}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
