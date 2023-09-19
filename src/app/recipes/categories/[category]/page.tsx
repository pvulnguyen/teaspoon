import { getByCategory } from '@/app/api/recipes';
import { RecipeCard } from '@/components';
import styles from './page.module.css';

export default async function Page({ params }: { params: { category: string } }) {
  const category = params.category.replace(/-/g, ' ');
  const recipes = await getByCategory(category);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{category}</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </main>
  );
}
