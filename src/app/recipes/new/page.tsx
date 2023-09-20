import { getCategories } from '@/app/api/categories';
import { getItems } from '@/app/api/items';
import { RecipeForm } from '@/components';
import utils from '@/lib/utils.module.css';
import styles from './page.module.css';

export default async function Page() {
  const categoryData = await getCategories();
  const categories = categoryData.map((category) => category.name);

  const itemData = await getItems();
  const items = itemData.map((item) => item.name);

  return (
    <main className={`${utils.mainContainerPrimary} ${styles.main}`}>
      <h1>New Recipe</h1>
      <RecipeForm categories={categories} items={items} />
    </main>
  );
}
