import { getCookbook } from '@/app/api/cookbook';
import { RecipeCard } from '@/components';
import styles from './page.module.css';

export default async function Page() {
  const cookbook = await getCookbook();
  if (!cookbook?.recipes) {
    return (
      <main className={styles.noRecipes}>
        <p>Your cookbook is empty!</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1>My Cookbook</h1>
      <ul>
        {cookbook.recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </main>
  );
}
