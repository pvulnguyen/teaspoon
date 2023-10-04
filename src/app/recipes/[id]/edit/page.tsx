import { notFound } from 'next/navigation';

import { currentUser } from '@clerk/nextjs';

import { RecipeForm } from '@components/recipes';
import { getCategories, getItems, getRecipe } from '@lib/api';

import layout from '@styles/layout.module.css';

export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);
  if (!recipe) return notFound();

  const user = await currentUser();
  if (!user || user && recipe.author !== user.username) {
    return (
      <main>
        <p>Unauthorized.</p>
      </main>
    );
  }

  const categoryData = await getCategories();
  const categories = categoryData.map((category) => category.name);

  const itemData = await getItems();
  const items = itemData.map((item) => item.name);

  return (
    <main className={layout.narrow}>
      <h1>Edit Recipe</h1>
      <RecipeForm categories={categories} items={items} recipe={recipe} />
    </main>
  );
}
