import styles from './auth.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className={styles.main}>{children}</main>;
}
