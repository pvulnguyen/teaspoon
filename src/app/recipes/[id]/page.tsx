import Link from 'next/link';
import { notFound } from 'next/navigation';

import { currentUser } from '@clerk/nextjs';
import { Button } from '@mantine/core';

import { Recipe } from '@components/recipes';
import { getRecipe } from '@lib/api';

import layout from '@styles/layout.module.css';

export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);
  if (!recipe) return notFound();

  const user = await currentUser();
  if (!recipe.isPublic && recipe.author !== user?.username) {
    return (
      <main>
        <p>This recipe has been marked private by the author.</p>
      </main>
    );
  }

  return (
    <main className={layout.narrow}>
      <Recipe recipe={recipe} />
      {recipe.author === user?.username && <Button component={Link} href={`/recipes/${recipe.id}/edit`}>Edit Recipe</Button>}
    </main>
  );
}
