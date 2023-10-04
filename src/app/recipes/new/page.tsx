import { RecipeForm } from '@components/recipes';
import { PageTitle } from '@components/ui';
import { getCategories, getItems } from '@lib/api';

import layout from '@styles/layout.module.css';

export default async function Page() {
  const categoryData = await getCategories();
  const categories = categoryData.map((category) => category.name);

  const itemData = await getItems();
  const items = itemData.map((item) => item.name);

  return (
    <main className={layout.narrow}>
      <PageTitle text='Add Recipe' />
      <RecipeForm categories={categories} items={items} />
    </main>
  );
}
