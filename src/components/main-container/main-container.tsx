import styles from './main-container.module.css';

type MainContainer = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export function MainContainer({ children, title, className }: MainContainer) {
  return (
    <main className={`${styles.main} ${className}`}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {children}
    </main>
  );
}
