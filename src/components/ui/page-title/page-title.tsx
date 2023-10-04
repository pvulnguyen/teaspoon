import styles from './page-title.module.css';

export function PageTitle({ text }: { text: string }) {
  return <h1 className={styles.pageTitle}>{text}</h1>;
}
