import styles from './pill.module.css';

export function Pill({ label }: { label: string }) {
  return (
    <div className={styles.pill}>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
