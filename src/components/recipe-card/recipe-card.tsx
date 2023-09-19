import Image from 'next/image';
import Link from 'next/link';
import { Pill } from '@mantine/core';
import styles from './recipe-card.module.css';

export function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <Link href={`/recipes/${recipe.id}`} className={styles.card}>
      <div className={styles.cardMedia}>
        <Image src={recipe.image.url} alt={recipe.name} fill priority />
      </div>
      <div className={styles.cardBody}>
        <h2>{recipe.name}</h2>
        <p className={styles.description}>{recipe.description}</p>
        <ul>
          {recipe.categories.map((category: any, index: number) => (
            <li key={index}>
              <Pill mt='md'>{category.name}</Pill>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
