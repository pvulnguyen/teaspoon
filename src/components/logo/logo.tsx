import Link from 'next/link';
import styles from './logo.module.css';

export function Logo() {
  return <Link className={styles.logo} href='/'>Teaspoon</Link>;
}
