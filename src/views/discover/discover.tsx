import { RecipeCard } from '@components/recipes';
import { MainContainer } from '@components/ui';
import { getRecipes } from '@lib/api';

import layout from '@styles/layout.module.css';

export async function Discover() {
  const recipes = await getRecipes();

  return (
    <MainContainer title='Discover'>
      <ul className={layout.flex}>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </MainContainer>
  );
}
