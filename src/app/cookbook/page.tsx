import { getCookbook } from '@/app/api/cookbook';
import { MainContainer, RecipeCard } from '@/components';

import utils from '@/lib/utils.module.css';
import styles from './page.module.css';

export default async function Page() {
  const cookbook = await getCookbook();
  if (!cookbook?.recipes) {
    return (
      <main className={utils.center}>
        <p>Your cookbook is empty!</p>
      </main>
    );
  }

  return (
    <MainContainer title='My Cookbook'>
      <ul className={styles.recipeList}>
        {cookbook.recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </MainContainer>
  );
}
