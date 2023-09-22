import type { RecipePreview } from '@/lib/api';

import Link from 'next/link';

import { RecipeCardContent } from './recipe-card-content';
import { RecipeCardImage } from './recipe-card-image';
import styles from './recipe-card.module.css';

export function RecipeCard({ recipe }: { recipe: RecipePreview }) {
  return (
    <div className={styles.card}>
      <Link href={`/recipes/${recipe.id}`}>
        <RecipeCardImage src={recipe.image.url} alt={recipe.name} />
        <RecipeCardContent recipe={recipe} />
      </Link>
    </div>
  );
}
