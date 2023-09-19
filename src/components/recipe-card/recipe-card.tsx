import Image from 'next/image';
import Link from 'next/link';
import { Pill } from '@mantine/core';
import styles from './recipe-card.module.css';

export function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <div className={styles.card}>
      <Link href={`/recipes/${recipe.id}`}>
        <div className={styles.cardMedia}>
          <Image src={recipe.image.url} alt={recipe.name} fill priority />
        </div>
        <div className={styles.cardBody}>
          <h2>{recipe.name}</h2>
          <p className={styles.description}>{recipe.description}</p>
          <ul className={styles.cardFooter}>
            {recipe.categories.map((category: { name: string }, index: number) => (
              <li key={index}>
                <Pill mt='md'>{category.name}</Pill>
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  );
}
