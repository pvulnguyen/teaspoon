import { RecipeCard } from '@/components';
import { db } from '@/db';

import utils from '@/lib/utils.module.css';
import styles from './page.module.css';

export default async function Page({ params }: { params: { category: string } }) {
  const category = params.category.replace(/-/g, ' ');
  const recipes = await getByCategory(category);

  return (
    <main className={utils.mainContainerPrimary}>
      <h1 className={styles.title}>{category}</h1>
      {recipes?.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </main>
  );
}

async function getByCategory(name: string) {
  const recipes = await db.category.findUnique({ where: { name } }).recipes({
    where: { isPublic: true },
    select: {
      id: true,
      name: true,
      description: true,
      categories: {
        select: {
          name: true,
        },
      },
      image: {
        select: {
          url: true,
        },
      },
    },
  });

  return recipes;
}
