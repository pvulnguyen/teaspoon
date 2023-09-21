import { db } from '@/db';

export type Recipe = {
  id: string;
  name: string;
  description: string | null;
  author: string;
  prepTime: string;
  cookTime: string;
  yield: string;
  isPublic: boolean;
  image: { url: string };
  categories: { name: string }[];
  ingredients: { amount: string; item: { name: string }; key: string }[];
  instructions: { position: number; text: string; key: string }[];
};

export async function getRecipe(id: string) {
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
