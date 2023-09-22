import type { RecipePreview } from '@/lib/api';

import { Pill } from '../pill';
import styles from './recipe-card.module.css';

export function RecipeCardContent({ recipe }: { recipe: RecipePreview }) {
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>{recipe.name}</h2>
      <ul className={styles.tags}>
        {recipe.categories.map((category: { name: string }, index: number) => (
          <Pill label={category.name} key={index} />
        ))}
      </ul>
    </div>
  );
}
