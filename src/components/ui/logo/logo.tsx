import Link from 'next/link';

import styles from './logo.module.css';

export function Logo() {
  return (
    <div className={styles.logoContainer}>
      <Link href='/'>
        <span className={styles.logoText}>Teaspoon</span>
      </Link>
    </div>
  );
}
