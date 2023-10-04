import Link from 'next/link';
import { createPortal } from 'react-dom';

import { routes } from '@config/routes';

import utils from '@styles/utils.module.css';
import styles from './mobile-nav.module.css';

export function MobileNav({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  if (!isOpen) return null;

  return createPortal(
    <nav className={styles.mobileNavContainer}>
      {routes.map((route, index) => (
        <div key={index}>
          <Link href={route.path} onClick={close}>
            <div className={utils.group}>
              {route.icon}
              <span className={styles.routeLabel}>{route.label}</span>
            </div>
          </Link>
        </div>
      ))}
    </nav>,
    document.body,
  );
}
