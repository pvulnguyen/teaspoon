import Link from 'next/link';

import { currentUser } from '@clerk/nextjs';
import { Button } from '@mantine/core';

import { RecipeCard } from '@components/recipes';
import { MainContainer } from '@components/ui';
import { getCookbook } from '@lib/api';

import layout from '@styles/layout.module.css';
import styles from './cookbook.module.css';

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
    <MainContainer>
      <div className={styles.heading}>
        <h1>My Cookbook</h1>
        <Button component={Link} href='/recipes/new'>
          Add Recipe
        </Button>
      </div>
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
    </MainContainer>
  );
}
