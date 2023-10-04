import { currentUser } from '@clerk/nextjs';

import { RecipeCard } from '@components/recipes';
import { getCookbook } from '@lib/api';

import layout from '@styles/layout.module.css';

export async function Cookbook() {
  const user = await currentUser();
  if (!user) return null;

  const cookbook = await getCookbook(user.id);
  if (cookbook && !cookbook.recipes && !cookbook.savedRecipes) {
    return (
      <div>
        <p>Your cookbook is empty!</p>
      </div>
    );
  }

  return (
    <ul className={layout.flex}>
      {cookbook?.recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
      {cookbook?.savedRecipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}
