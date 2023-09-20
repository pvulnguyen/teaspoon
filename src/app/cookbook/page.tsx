import { getCookbook } from '@/app/api/cookbook';
import { RecipeCard } from '@/components';
import utils from '@/lib/utils.module.css';

export default async function Page() {
  const cookbook = await getCookbook();
  if (!cookbook?.recipes) {
    return (
      <main className={utils.center}>
        <p>Your cookbook is empty!</p>
      </main>
    );
  }

  return (
    <main className={utils.mainContainerPrimary}>
      <h1>My Cookbook</h1>
      <ul>
        {cookbook.recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </main>
  );
}
