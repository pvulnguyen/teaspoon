import styles from './main-container.module.css';

export function MainContainer({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <main className={styles.container}>
      {title && <h1>{title}</h1>}
      {children}
    </main>
  );
}
