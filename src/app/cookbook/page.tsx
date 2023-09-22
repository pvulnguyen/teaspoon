import { getCookbook } from '@/app/api/cookbook';
import { RecipeCard } from '@/components';

import utils from '@/styles/utils.module.css';
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
    <main className={styles.main}>
      <h1 className='title'>My Cookbook</h1>
      <ul className={styles.cards}>
        {cookbook.recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </ul>
    </main>
  );
}
