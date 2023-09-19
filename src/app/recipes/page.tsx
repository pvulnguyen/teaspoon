import { getCategories } from '@/app/api/categories';
import { CategoryCard } from '@/components';

export default async function Page() {
  const categories = await getCategories();

  return (
    <main>
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
