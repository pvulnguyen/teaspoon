import { Fragment } from 'react';

import Image from 'next/image';

import { Group } from '@mantine/core';

import utils from '@styles/utils.module.css';
import styles from './recipe.module.css';

export type RecipeProps = {
  id: string;
  name: string;
  description: string | null;
  author: string;
  prepTime: string;
  cookTime: string;
  yield: string;
  isPublic: boolean;
  image: {
    url: string;
    fileKey: string;
  };
  categories: {
    name: string;
  }[];
  ingredients: {
    id: string;
    amount: string;
    item: { name: string };
    key: string;
  }[];
  instructions: {
    id: string;
    position: number;
    text: string;
    key: string;
  }[];
};

export function Recipe({ recipe }: { recipe: RecipeProps }) {
  return (
    <Fragment>
      <div className={styles.recipeImage}>
        <Image src={recipe.image.url} alt={recipe.name} objectFit='cover' fill />
      </div>
      <h1>{recipe.name}</h1>
      {recipe.description && <p>{recipe.description}</p>}
      <Group justify='space-between'>
        <p>
          <strong>Prep Time&#58;</strong>
          &nbsp;{recipe.prepTime}
        </p>
        <p>
          <strong>Cook Time&#58;</strong>
          &nbsp;{recipe.cookTime}
        </p>
      </Group>
      <section>
        <h2>Ingredients</h2>
        <p>
          <strong>Yield&#58;</strong>
          &nbsp;{recipe.yield}
        </p>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.key}>
              {ingredient.amount} {ingredient.item.name}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Instructions</h2>
        <ol className={utils.stack}>
          {recipe.instructions.map((instruction) => (
            <li key={instruction.key}>
              <strong>{instruction.position}&#46;&nbsp;</strong>
              {instruction.text}
            </li>
          ))}
        </ol>
      </section>
    </Fragment>
  );
}
