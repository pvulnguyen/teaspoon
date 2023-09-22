import type { Recipe } from '@/app/api/recipes';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { currentUser } from '@clerk/nextjs';

import { getRecipe } from '@/app/api/recipes';
import utils from '@/styles/utils.module.css';
import styles from './page.module.css';

export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);
  if (!recipe) return notFound();

  const user = await currentUser();
  if (!recipe.isPublic && recipe.author !== user?.username) {
    return renderUnauthorizedMessage();
  }

  return renderRecipe(recipe);
}

function renderUnauthorizedMessage() {
  return (
    <main className={utils.center}>
      <p>This recipe has been marked private by the author.</p>
    </main>
  );
}

function renderRecipe(recipe: Recipe) {
  return (
    <main className={styles.main}>
      <div className={styles.imageWrapper}>
        <Image src={recipe.image.url} alt={recipe.name} fill priority />
      </div>
      <div className={`${utils.stack} ${styles.recipeContent}`}>
        <h1 className={styles.title}>{recipe.name}</h1>
        {recipe.description && <p>{recipe.description}</p>}
        <div className={styles.row}>
          <p>
            <span className={styles.label}>Prep Time:</span>&nbsp;{recipe.prepTime}
          </p>
          <p>
            <span className={styles.label}>Cook Time:</span>&nbsp;{recipe.cookTime}
          </p>
        </div>
        <section className={`${utils.stack} ${styles.section}`}>
          <h2>Ingredients</h2>
          <p>
            <span className={styles.label}>Yield:</span>&nbsp;{recipe.yield}
          </p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li className={styles.ingredient} key={ingredient.key}>
                <input type='checkbox' />
                {ingredient.amount} {ingredient.item.name}
              </li>
            ))}
          </ul>
        </section>
        <section className={`${utils.stack} ${styles.section}`}>
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction) => (
              <li className={styles.instruction} key={instruction.key}>
                {instruction.position}&#46;&nbsp;{instruction.text}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
