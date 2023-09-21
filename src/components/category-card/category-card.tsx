import Link from 'next/link';
import styles from './category-card.module.css';

type CategoryCard = {
  id: string;
  name: string;
  slug: string;
  image: string;
};

export function CategoryCard({ category }: { category: CategoryCard }) {
  return (
    <div className={styles.card}>
      <Link href={`/recipes/categories/${category.slug}`}>
        <div className={styles.image} style={{ backgroundImage: `url(${category.image})` }} />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h2 className={styles.title}>{category.name}</h2>
        </div>
      </Link>
    </div>
  );
}
