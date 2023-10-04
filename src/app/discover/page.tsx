import { RecipeCard } from '@components/recipes';
import { getRecipes } from '@lib/api';

import layout from '@styles/layout.module.css';

export default async function Page() {
  const recipes = await getRecipes();

  return (
    <main className={layout.default}>
      <h1>Discover</h1>
      <ul className={layout.flex}>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </main>
  );
}
