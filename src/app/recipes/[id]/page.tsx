import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import styles from './page.module.css';

export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);
  if (!recipe) return notFound();

  return (
    <main className={styles.main}>
      <div className={styles.imageWrapper}>
        <Image src={recipe.image.url} alt={recipe.name} fill priority />
      </div>
      <h1>{recipe.name}</h1>
      {recipe.description && <p>{recipe.description}</p>}
      <div className={styles.row}>
        <p>
          <span className={styles.label}>Prep Time:</span>&nbsp;{recipe.prepTime}
        </p>
        <p>
          <span className={styles.label}>Cook Time:</span>&nbsp;{recipe.cookTime}
        </p>
      </div>
      <section>
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
      <section>
        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((instruction) => (
            <li className={styles.instruction} key={instruction.key}>
              {instruction.position}&#46;&nbsp;{instruction.text}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

async function getRecipe(id: string) {
  const recipe = await db.recipe.findUnique({
    where: { id },
    include: {
      categories: {
        select: {
          name: true,
        },
      },
      image: {
        select: {
          url: true,
        },
      },
      ingredients: {
        select: {
          amount: true,
          item: {
            select: {
              name: true,
            },
          },
          key: true,
        },
      },
      instructions: {
        select: {
          position: true,
          text: true,
          key: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  return recipe;
}