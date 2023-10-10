import styles from './landing-section.module.css';

type LandingSectionProps = {
  title: string;
  children: React.ReactNode;
  hero?: boolean;
};

export function LandingSection({ title, children, hero }: LandingSectionProps) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={hero ? styles.heroTitle : styles.title}>{title}</h2>
        {children}
      </div>
    </section>
  );
}
