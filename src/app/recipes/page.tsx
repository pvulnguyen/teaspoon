import { getCategories } from '@/app/api/categories';
import { CategoryCard } from '@/components';
import utils from '@/styles/utils.module.css';

export default async function Page() {
  const categories = await getCategories();

  return (
    <main className={utils.mainContainerPrimary}>
      <h1>Discover</h1>
      <section>
        <h2>By Category</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
